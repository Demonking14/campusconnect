import "./globals.css";
import { getServerSession } from "next-auth";
import SessionWrapper from "@/components/SessionWrapper";
import { Syne, DM_Sans } from "next/font/google";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });
export default async function RootLayout({
  children,
}: {children:React.ReactNode}) {
  const session = await getServerSession();
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="min-h-full flex flex-col">
        <SessionWrapper session={session}>
          {children}
          </SessionWrapper>
      </body>
    </html>
  );
}
