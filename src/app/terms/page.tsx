"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const TERMS_MARQUEE = [
  "Acceptance", "Eligibility", "Accounts", "Listings",
  "Payments", "AI Matching", "Conduct", "Intellectual Property",
  "Liability", "Governing Law",
];

const rules = [
  {
    num: "01",
    title: "Acceptance",
    accent: "#E24B4A",
    short: "By using Campus Connect, you agree to these terms.",
    body: "Accessing or using the Platform means you accept these Terms. If you disagree, please don't use Campus Connect. These terms apply to all users — Buyers and Sellers alike.",
  },
  {
    num: "02",
    title: "Eligibility",
    accent: "#378ADD",
    short: "VIT Bhopal students only.",
    body: "Campus Connect is exclusively for currently enrolled VIT Bhopal students. You must register with a valid @vitbhopal.ac.in Google account. All information you provide must be accurate.",
  },
  {
    num: "03",
    title: "Your Account",
    accent: "#1D9E75",
    short: "You're responsible for your account security.",
    body: "Keep your account credentials confidential. You're responsible for all activity under your account. Report any unauthorized access to us immediately.",
  },
  {
    num: "04",
    title: "Listings & Services",
    accent: "#EF9F27",
    short: "All listings must be legitimate and accurate.",
    body: "Sellers may list real skills and services only. Listings must be accurately described and comply with university policies and applicable law. We can remove any listing that violates these terms without notice.",
  },
  {
    num: "05",
    title: "Payments",
    accent: "#E24B4A",
    short: "Transactions are between users — we don't process payments.",
    body: "Campus Connect connects students but does not handle money. All payment terms, methods, and amounts are agreed directly between Buyers and Sellers. We are not liable for payment disputes.",
  },
  {
    num: "06",
    title: "AI Features",
    accent: "#378ADD",
    short: "AI suggestions are guidance, not guarantees.",
    body: "Our AI recommends matches based on your profile and listings. These are for convenience only — not endorsements. Use your own judgment when engaging with other users.",
  },
  {
    num: "07",
    title: "Prohibited Conduct",
    accent: "#1D9E75",
    short: "Don't misuse the platform.",
    body: "You must not post false or fraudulent listings, harass other users, attempt to manipulate the Platform, use it for illegal activity, share another user's private information, or impersonate anyone.",
  },
  {
    num: "08",
    title: "Intellectual Property",
    accent: "#EF9F27",
    short: "Your content is yours — but you let us display it.",
    body: "All Campus Connect branding and tech is ours. You keep ownership of content you post, but grant us a license to display it on the Platform. Don't reproduce our content without permission.",
  },
  {
    num: "09",
    title: "Liability",
    accent: "#E24B4A",
    short: "We're a student platform — use at your own risk.",
    body: "Campus Connect is provided 'as is'. We're not liable for indirect or consequential damages, payment disputes between users, or data loss. Your use of the Platform is at your own risk.",
  },
  {
    num: "10",
    title: "Governing Law",
    accent: "#378ADD",
    short: "Indian law governs these terms.",
    body: "These Terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of courts in Bhopal, Madhya Pradesh.",
  },
];

export default function TermsPage() {
  return (
    <div
      className="min-h-screen bg-[#F5F2EE] overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.025]"
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
        <Link href="/">
          <span
            className="font-black text-lg text-gray-900 tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Campus Connect
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/privacy">
            <button className="px-4 py-2 rounded-full border border-black/10 text-sm font-medium text-gray-600 hover:bg-white/80 transition">
              Privacy Policy
            </button>
          </Link>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E24B4A]/10 text-[#E24B4A] text-xs font-bold uppercase tracking-widest mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E24B4A] animate-pulse" />
          Legal · Last updated June 2026
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-end">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-[clamp(52px,9vw,110px)] font-black leading-[0.92] tracking-tight text-gray-900"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Terms &amp;<br />
              <span className="text-[#E24B4A]">Conditions.</span>
            </motion.h1>

            {/* Marquee */}
            <div className="mt-8 overflow-hidden -mx-8">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex gap-3 pl-8 w-max"
              >
                {[...TERMS_MARQUEE, ...TERMS_MARQUEE].map((item, i) => (
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

          {/* Right — summary card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="bg-gray-900 rounded-3xl p-8 relative overflow-hidden mb-0 lg:mb-6"
          >
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full border border-white/5" />
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">
              tl;dr
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "VIT Bhopal students only",
                "No payment processing — you handle it",
                "Your content, your rights",
                "Don't be a bad actor",
                "Indian law governs everything",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E24B4A] shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="pb-16" />
      </section>

      {/* ── DIVIDER ── */}
      <div className="border-t border-black/8 mx-8" />

      {/* ── TERMS BENTO ── */}
      <section className="px-8 py-20 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-10"
        >
          The full picture
        </motion.p>

        <div className="flex flex-col gap-0 divide-y divide-black/5">
          {rules.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.04 }}
              className="group grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-6 items-start py-10 hover:bg-white/40 px-4 -mx-4 rounded-2xl transition-colors"
            >
              {/* Number */}
              <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-1">
                <span
                  className="text-5xl font-black leading-none"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    color: `${rule.accent}20`,
                  }}
                >
                  {rule.num}
                </span>
                <div
                  className="h-0.5 w-6 rounded-full hidden md:block"
                  style={{ backgroundColor: rule.accent }}
                />
              </div>

              {/* Title + short */}
              <div className="flex flex-col gap-2">
                <h2
                  className="font-black text-gray-900 text-2xl leading-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {rule.title}
                </h2>
                <p
                  className="text-sm font-semibold"
                  style={{ color: rule.accent }}
                >
                  {rule.short}
                </p>
              </div>

              {/* Body */}
              <p className="text-sm text-gray-500 leading-relaxed">{rule.body}</p>
            </motion.div>
          ))}
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
          <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full border border-white/5" />
          <div className="absolute right-32 -top-20 w-72 h-72 rounded-full border border-white/5" />
          <div className="relative z-10">
            <p className="text-gray-500 text-sm mb-2">Got it — ready to hustle?</p>
            <h2
              className="text-4xl sm:text-5xl font-black text-white leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              I agree.<br />
              <span style={{ color: "#E24B4A" }}>Let&apos;s go.</span>
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
        <span className="font-bold text-gray-600">Campus Connect</span>
        <div className="flex items-center gap-6">
          <Link href="/terms" className="text-gray-900 font-medium">Terms</Link>
          <Link href="/privacy" className="hover:text-gray-600 transition">Privacy</Link>
          <Link href="/" className="hover:text-gray-600 transition">Home</Link>
        </div>
      </footer>
    </div>
  );
}
