"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f7f4]">
        <div className="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f7f4] p-6 overflow-hidden relative">

      {/* Background blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-400/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-2/3 w-72 h-72 bg-green-400/10 rounded-full blur-3xl" />

      {/* Card */}
      <div
        className="bg-white rounded-3xl p-10 w-full max-w-sm border border-black/6 relative z-10 transition-all duration-700"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
        }}
      >
        {/* Logo dots */}
        <div className="flex gap-1.5 mb-6">
          <span className="w-3 h-3 rounded-full" />
          <span className="w-3 h-3 rounded-full " />
          <span className="w-3 h-3 rounded-full " />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-black leading-none tracking-tight text-gray-900 mb-3">
          Campus<br />Connect
        </h1>

        <p className="text-sm text-gray-400 leading-relaxed mb-7">
          The student service marketplace<br />
        </p>

        {/* Features */}
        <div className="flex flex-col gap-2.5 mb-7">
          {["Offer your skills", "Find student services", "AI-powered matching"].map((f, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              <span className="text-sm font-medium text-gray-600">{f}</span>
            </div>
          ))}
        </div>

        <hr className="border-gray-100 mb-7" />

        {/* Google Button */}
        <button
          onClick={() => signIn("google" , {callbackUrl:'/dashboard'})}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl border-2 border-gray-100 bg-white text-sm font-semibold text-gray-800 hover:border-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 mb-4"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.84l6.1-6.1C34.46 3.09 29.5 1 24 1 14.82 1 7.07 6.48 3.64 14.22l7.1 5.52C12.4 13.67 17.73 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.74H24v9h12.42c-.54 2.9-2.18 5.36-4.64 7.02l7.1 5.52C43.18 37.36 46.1 31.4 46.1 24.5z"/>
            <path fill="#FBBC05" d="M10.74 28.26A14.54 14.54 0 0 1 9.5 24c0-1.48.25-2.91.74-4.26l-7.1-5.52A23.94 23.94 0 0 0 0 24c0 3.86.92 7.5 2.56 10.72l7.1-5.52-.92-.94z"/>
            <path fill="#34A853" d="M24 47c5.5 0 10.12-1.82 13.5-4.94l-7.1-5.52C28.64 38.3 26.44 39 24 39c-6.27 0-11.6-4.17-13.26-9.74l-7.1 5.52C7.07 42.52 14.82 47 24 47z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-xs text-gray-300">
          Only @gmail.com accounts allowed
        </p>
      </div>
    </div>
  );
}