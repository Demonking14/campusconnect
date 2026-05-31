"use client"
import React, {useState , useRef , useEffect} from "react";
import axios from "axios";
interface Service{
    _id:string;
    title:string;
    description:string;
    price:number;
    serviceby:{
        username:string;
        avatar:string;
        email:string
    };
}
interface Message{
    role:"user" | "ai";
    text?:string;
    services?:Service[];
    loading?:boolean;
}
export default function AIMatchModal(){
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages , setMessages] = useState<Message[]>([
        {role:"ai", 
            text:"Hey! Describe what you neeed and I'll find the best services for you",
        },
    ]);
    const [loading , setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior:"smooth"});
    } , [messages]);
    const handleSend = async()=>{
        if(!input.trim() || loading)return;

        const userMesssage = input.trim();
        setInput("");
        setMessages((prev)=>[...prev , {role:"user" , text:userMesssage}]);
        setMessages((prev)=>[...prev , {role:"ai" , loading:true}]);
        setLoading(true);
        try {
            const {data} = await axios.post("/api/match" , {query:userMesssage});

            setMessages((prev)=>{
                const updated = prev.filter((m)=>!m.loading);
                if(data.success && data.data.length > 0){
                    return [ ...updated , {
                        role:"ai" , 
                        text:  `Found ${data.data.length} services matching your requrest!`,
                        services:data.data,
                    },];
                }else{
                    return [...updated , {
                        role:"ai",
                        text:"No matching services found. Try describing differently!",
                    }]
                }
            })
        } catch (error) {
            setMessages((prev)=>{
                const updated = prev.filter((m)=>!m.loading);
                return [
                    ...updated,
                    {role:"ai" , text:"Something went wrong. Please try again!"},
                ]
            });   
        }finally {
            setLoading(false);
        }
    };

    const handlekeyDown = (e:React.KeyboardEvent)=>{
        if(e.key == "Enter" && !e.shiftKey){
            e.preventDefault();
            handleSend();
        }
    };

  return (
    <>
      {/* Floating Button */}
      <button
  onClick={() => setOpen(true)}
  className="fixed bottom-24 right-4 z-40 md:bottom-6 md:right-6 md:z-50 w-14 h-14 rounded-full bg-linear-to-br from-violet-500 to-pink-500 text-white text-2xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
  title="AI Service Matcher"
>
  ✨
</button>

      {/* Modal Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          {/* Modal Box */}
          <div className="bg-white rounded-3xl w-full max-w-md h-145 flex flex-col overflow-hidden shadow-2xl animate-modal">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-sm">
                  ✨
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">AI Matcher</p>
                  <p className="text-xs text-gray-400">Powered by Gemini</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                x
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.loading ? (
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1 items-center h-5">
                        <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
                        <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
                        <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
                      </div>
                    </div>
                  ) : (
                    <div className={`max-w-[85%] flex flex-col gap-2`}>
                      {msg.text && (
                        <div
                          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                            msg.role === "user"
                              ? "bg-linear-to-br from-violet-500 to-pink-500 text-white rounded-tr-sm"
                              : "bg-gray-100 text-gray-800 rounded-tl-sm"
                          }`}
                        >
                          {msg.text}
                        </div>
                      )}

                      {/* Service Cards */}
                      {msg.services && msg.services.map((service) => (
                        <div
                          key={service._id}
                          className="bg-white border border-gray-200 rounded-2xl p-3 hover:border-violet-300 hover:shadow-sm transition cursor-pointer"
                          onClick={() => {
                            window.location.href = `/services/${service._id}`;
                          }}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="font-semibold text-gray-900 text-sm leading-tight">
                              {service.title}
                            </p>
                            <span className="text-green-600 font-bold text-sm whitespace-nowrap">
                              ₹{service.price}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                            {service.description}
                          </p>
                          <div className="flex items-center gap-1">
                            <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold">
                              {service.serviceby?.username?.[0]?.toUpperCase()}
                            </div>
                            <span className="text-xs text-gray-400">
                              {service.serviceby?.username}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100 flex gap-2 items-end">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handlekeyDown}
                placeholder="e.g. I need someone to design my club logo..."
                rows={1}
                className="flex-1 resize-none px-4 py-2 rounded-2xl border border-gray-200 text-sm outline-none focus:border-violet-400 max-h-24 leading-relaxed"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-full bg-linear-to-br from-violet-500 to-pink-500 text-white flex items-center justify-center disabled:opacity-40 hover:scale-105 transition-transform shrink-0"
              >
                ↑
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );





}