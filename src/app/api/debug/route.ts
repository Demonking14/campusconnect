// app/api/debug/route.ts
export async function GET(req: Request) {
  return Response.json({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID?.slice(0, 10) + "...",
    NODE_ENV: process.env.NODE_ENV,
  })
}