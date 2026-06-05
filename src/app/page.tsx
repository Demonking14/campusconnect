"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SERVICES = [
  { emoji: "🎨", label: "Logo Design", price: "₹299", tag: "Design" },
  { emoji: "💻", label: "Web Dev", price: "₹499", tag: "Code" },
  { emoji: "📸", label: "Photography", price: "₹399", tag: "Visual" },
  { emoji: "📝", label: "Resume Writing", price: "₹199", tag: "Writing" },
  { emoji: "🎓", label: "DSA Tutoring", price: "₹149/hr", tag: "Teach" },
  { emoji: "🎬", label: "Video Editing", price: "₹249", tag: "Media" },
];

const WORDS = ["skills", "services", "talent", "hustle"];

const MARQUEE = [
  "Logo Design", "Web Dev", "Photography", "DSA Tutoring",
  "Video Editing", "Resume Writing", "UI Design", "Music Lessons",
  "Data Analysis", "Content Writing", "3D Modeling", "App Dev",
];

export default function LandingPage() {
  const [wordIndex, setWordIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  useEffect(() => {
    const t = setInterval(() => setWordIndex(i => (i + 1) % WORDS.length), 1800);
    return () => clearInterval(t);
  }, []);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen bg-[#F5F2EE] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EE] overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 bg-[#F5F2EE]/80 backdrop-blur-md border-b border-black/5"
      >
        <div className="flex items-center gap-2">
          <span className="font-black text-lg text-gray-900 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Campus Connect
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold"
            >
              Sign in
            </motion.button>
          </Link>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-0 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">

          {/* Left — big type */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E24B4A]/10 text-[#E24B4A] text-xs font-bold uppercase tracking-widest mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E24B4A] animate-pulse" />
              Students
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-[clamp(52px,9vw,110px)] font-black leading-[0.92] tracking-tight text-gray-900 mb-0"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Your campus.
              <br />
              Your{" "}
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="inline-block text-[#E24B4A]"
                  >
                    {WORDS[wordIndex]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            {/* Scrolling marquee — sits under the heading */}
            <div className="mt-8 overflow-hidden -mx-8">
              <motion.div
                style={{ x: marqueeX }}
                className="flex gap-3 pl-8"
              >
                {[...MARQUEE, ...MARQUEE].map((item, i) => (
                  <span
                    key={i}
                    className="shrink-0 px-4 py-2 rounded-full border border-black/10 text-sm font-medium text-gray-500 bg-white/60"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right — stacked card preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="relative h-120 hidden lg:block"
          >
            {SERVICES.slice(0, 4).map((s, i) => (
              <motion.div
                key={i}
                initial={{ rotate: (i - 1.5) * 4, y: i * 10 }}
                whileHover={{ rotate: 0, y: -8, scale: 1.03, zIndex: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute w-full bg-white rounded-3xl p-6 shadow-sm border border-black/5 cursor-pointer"
                style={{
                  top: i * 28,
                  zIndex: SERVICES.length - i,
                  transformOrigin: "bottom center",
                }}
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="text-3xl">{s.emoji}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
                    {s.tag}
                  </span>
                </div>
                <p className="font-black text-xl text-gray-900 mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {s.label}
                </p>
                <p className="text-sm text-gray-400">Starting from <span className="font-bold text-[#1D9E75]">{s.price}</span></p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-4 mt-12 pb-16 flex-wrap"
        >
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-base"
            >
              Start for free →
            </motion.button>
          </Link>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="flex -space-x-2">
              {["A", "R", "K", "S"].map((l, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#F5F2EE] flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: ["#E24B4A", "#378ADD", "#1D9E75", "#EF9F27"][i] }}>
                  {l}
                </div>
              ))}
            </div>
            <span>Start your hustle today</span>
          </div>
        </motion.div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="border-t border-black/8 mx-8" />

      {/* ── BENTO SECTION ── */}
      <section className="px-8 py-20 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-10"
        >
          Everything you need
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-auto gap-4">

          {/* Big card — AI */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="col-span-2 row-span-1 bg-white rounded-3xl p-8 border border-black/5 relative overflow-hidden group"
          >
            <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full border-40 border-[#F5F2EE] opacity-50" />
            <div className="absolute right-8 top-8 text-5xl">✨</div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">AI Matching</p>
            <h3 className="text-3xl font-black text-gray-900 leading-tight mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
              Describe it.<br />We find it.
            </h3>
            <p className="text-sm text-gray-400 max-w-xs">
              Tell our AI what you need in plain words. It reads every listing and finds your best match.
            </p>
          </motion.div>

          {/* Chat card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1 bg-[#E24B4A] rounded-3xl p-6 relative overflow-hidden"
          >
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">Real-time</p>
            <h3 className="text-2xl font-black text-white leading-tight mb-8" style={{ fontFamily: "'Syne', sans-serif" }}>
              Chat &<br />Negotiate
            </h3>
            {/* Mini chat preview */}
            <div className="flex flex-col gap-2">
              {[
                { me: false, text: "Can you do ₹250?" },
                { me: true, text: "Deal! ✓" },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.me ? 10 : -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium w-fit max-w-[80%] ${m.me ? "self-end bg-white text-gray-900 ml-auto" : "bg-white/20 text-white"}`}
                >
                  {m.text}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stat card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="col-span-1 bg-[#1D9E75] rounded-3xl p-6 flex flex-col justify-between"
          >
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Avg price</p>
            <div>
              <p className="text-5xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>₹299</p>
              <p className="text-white/60 text-xs mt-1">way cheaper than agencies</p>
            </div>
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 bg-white rounded-3xl p-6 border border-black/5"
          >
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Exclusive</p>
            <p className="text-3xl mb-3">🎓</p>
            <h3 className="font-black text-gray-900 text-lg leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Studentsl<br />only
            </h3>
            <p className="text-xs text-gray-400 mt-2">@gmail.com verified</p>
          </motion.div>

          {/* Offer card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="col-span-1 bg-[#378ADD] rounded-3xl p-6 flex flex-col justify-between"
          >
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Earn</p>
            <div>
              <h3 className="text-2xl font-black text-white leading-tight mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                List your<br />skills
              </h3>
              <p className="text-white/60 text-xs">Set your own price. Get hired.</p>
            </div>
          </motion.div>

          {/* Wide bottom card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-2 bg-gray-900 rounded-3xl p-8 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Ready?</p>
              <h3 className="text-3xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                Join the hustle
              </h3>
            </div>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="px-6 py-3 bg-white text-gray-900 rounded-xl font-bold text-sm shrink-0"
              >
                Sign in  →
              </motion.button>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-t border-black/8 px-8 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4"
            >
              How it works
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black text-gray-900 leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Three steps,<br />zero friction.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { num: "1", title: "Sign in", desc: "Use your Google account. Takes 10 seconds.", accent: "#E24B4A" },
              { num: "2", title: "Find or offer", desc: "Browse services or list your own skill. Set your own price.", accent: "#378ADD" },
              { num: "3", title: "Chat & deliver", desc: "Negotiate in real-time, agree on terms, get it done.", accent: "#1D9E75" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg text-white mb-5"
                  style={{ background: step.accent, fontFamily: "'Syne', sans-serif" }}
                >
                  {step.num}
                </div>
                <h4 className="font-black text-gray-900 text-lg mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {step.title}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-8 pb-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900 rounded-3xl px-10 py-16 flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full border border-white/5" />
          <div className="absolute -left-8 -bottom-8 w-40 h-40 rounded-full border border-white/5" />
          <div className="absolute right-32 -top-20 w-72 h-72 rounded-full border border-white/5" />

          <div className="relative z-10">
            <p className="text-gray-500 text-sm mb-2">Start today — it's free</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Your campus.<br />
              <span style={{ color: "#E24B4A" }}>Your money.</span>
            </h2>
          </div>

          <Link href="/login" className="relative z-10 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-black text-base"
            >
              Sign in with Gmail →
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/8 px-8 py-6 flex items-center justify-between text-xs text-gray-400 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-600">Campus Connect</span>
        </div>
        <p>Built for  students ✦ 2026</p>
      </footer>

    </div>
  );
}