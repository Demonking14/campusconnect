import { StateGraph, END, START, Annotation } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import dbConnect from "./db";
import { ServiceModel } from "@/models/service.model";
import {z} from 'zod'

const KeywordSchema =z.object({
  keywords:z.array(z.string()).min(1).max(10)
});
const rankSchema = z.object({
  indexes: z.array(z.number()).min(1).max(3),
});
const AgentState = Annotation.Root({
  userQuery : Annotation<string>(),
  keywords: Annotation<string[]>({value: (_ , update)=>update, default: ()=>[]}),
  services:Annotation<any[]>({
    value:(_, update)=>update, default: ()=>[]
  }),
  matches: Annotation<any[]>({
    value:(_, update)=>update, default:()=>[]
  }),
})

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

async function extractKeywords(
  state: typeof AgentState.State
): Promise<Partial<typeof AgentState.State>> {
  try {
    const response = await llm.invoke(`
      You are a keyword extractor for a student service marketplace.
  Extract only the core service-related keywords from this request.
  Return ONLY a JSON array of 2-4 simple keywords. No markdown, no explanation.
  
  Example input: "I need someone to design my club logo"
  Example output: ["logo", "design"]
  
  Example input: "need help with DSA preparation"  
  Example output: ["DSA", "coding", "tutoring"]

  Now extract from: "${state.userQuery}"
    `);

    const text = (response.content as string)
      .replace(/```json|```/g, "")
      .trim();

    // console.log("Keywords raw response:", text);
    const keywords = JSON.parse(text);
    return { keywords };
  } catch (error) {
    console.error("extractKeywords error:", error);
    return { keywords: [state.userQuery] };
  }
}
async function searchServices(
  state: typeof AgentState.State
): Promise<Partial<typeof AgentState.State>> {
  await dbConnect();

  // if no keywords fallback to userQuery words
  const searchTerms = state.keywords.length > 0 
    ? state.keywords 
    : state.userQuery.split(" ");

  const regexQueries = searchTerms.flatMap((kw) => [
    { title: { $regex: kw, $options: "i" } },
    { description: { $regex: kw, $options: "i" } },
  ]);

  const services = await ServiceModel.find({
    isActive: true,
    $or: regexQueries,
  })
    .populate("serviceby", "username avatar email")
    .limit(10);

  // console.log("Search terms used:", searchTerms);
  // console.log("Services found:", services.length);

  // ← if still empty, return ALL active services for ranking
  if (services.length === 0) {
    // console.log("No keyword match, fetching all services");
    const allServices = await ServiceModel.find({ isActive: true })
      .populate("serviceby", "username avatar email")
      .limit(10);
    return { services: allServices };
  }

  return { services };
}
async function rankResults(
  state: typeof AgentState.State
): Promise<Partial<typeof AgentState.State>> {
  // console.log("Rank results working"); // ← check if this shows
  
  if (state.services.length === 0) {
    // console.log("No services to rank");
    return { matches: [] };
  }

  try {
    const serviceList = state.services
      .map((s, i) => `${i}. Title: ${s.title} | Description: ${s.description} | Price: ₹${s.price}`)
      .join("\n");

    // ← no withStructuredOutput, just raw invoke
    const response = await llm.invoke(`
      User is looking for: "${state.userQuery}"
      
      Here are available services:
      ${serviceList}
      
      Return ONLY a JSON array of top 3 indexes, no markdown, no explanation.
      Example: [1, 0, 2]
    `);

    const text = (response.content as string)
      .replace(/```json|```/g, "")
      .trim();

    // console.log("LLM rank response:", text);

    const indexes: number[] = JSON.parse(text);
    const matches = indexes.map((i) => state.services[i]).filter(Boolean);
    // console.log("Final matches:", matches.length);
    return { matches };

  } catch (error) {
    console.error("rankResults error:", error);
    // fallback — just return all services if ranking fails
    return { matches: state.services };
  }
}
export async function runMatchAgent(userQuery: string) {
  const graph = new StateGraph(AgentState).addNode("extractKeywords", extractKeywords).addNode("searchServices", searchServices).addNode("rankResults", rankResults).addEdge(START , "extractKeywords").addEdge("extractKeywords" , "searchServices").addEdge("searchServices" , "rankResults").addEdge("rankResults" , END)
  const app = graph.compile();
  const result = await app.invoke({ userQuery });
  return result.matches;
}