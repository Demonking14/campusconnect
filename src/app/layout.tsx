import "./globals.css";
import { getServerSession } from "next-auth";
import SessionWrapper from "@/components/SessionWrapper";
export default async function RootLayout({
  children,
}: {children:React.ReactNode}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <SessionWrapper session={session}>
          {children}
          </SessionWrapper>
      </body>
    </html>
  );
}
