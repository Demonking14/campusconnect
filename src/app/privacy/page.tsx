"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const PRIVACY_MARQUEE = [
  "Data We Collect", "How We Use It", "No Ad Tracking",
  "Encrypted Storage", "Your Rights", "Cookies", "Third Parties",
  "Data Deletion", "Security", "Students Only",
];

// Bento-style top cards
const highlights = [
  { emoji: "🚫", title: "Zero ads.", desc: "We don't sell your data or show you ads. Ever.", color: "#E24B4A", span: "col-span-1" },
  { emoji: "🔐", title: "Encrypted.", desc: "All traffic is TLS-encrypted. Your data is stored securely.", color: "#378ADD", span: "col-span-1" },
  { emoji: "✋", title: "You're in control.", desc: "Delete your account and all data anytime. 30-day processing.", color: "#1D9E75", span: "col-span-2" },
];

const sections = [
  {
    num: "01",
    title: "What we collect",
    accent: "#E24B4A",
    items: [
      { label: "Account info", text: "Your name, @vitbhopal.ac.in email, and profile picture from Google Sign-In." },
      { label: "Listings", text: "Service descriptions, pricing, and categories you create on the platform." },
      { label: "Messages", text: "Chat messages between users, stored to support communication and dispute resolution." },
      { label: "Usage data", text: "Pages visited, features used, and time on platform — to improve Campus Connect." },
    ],
  },
  {
    num: "02",
    title: "Why we use it",
    accent: "#378ADD",
    items: [
      { label: "Running the platform", text: "Creating accounts, displaying listings, and connecting Buyers with Sellers." },
      { label: "AI matching", text: "Your skills and profile data power our AI service recommendations." },
      { label: "Safety", text: "Detecting fraud, abuse, and violations of our Terms and Conditions." },
      { label: "Updates", text: "Sending you essential communications about your account or the Platform." },
    ],
  },
  {
    num: "03",
    title: "Sharing your data",
    accent: "#1D9E75",
    items: [
      { label: "Other students", text: "Your public profile and listings are visible to registered Campus Connect users." },
      { label: "No third-party sales", text: "We do not sell, rent, or trade your personal information — period." },
      { label: "Service providers", text: "Trusted providers (Google Auth, cloud hosting) receive only what they need to operate." },
      { label: "Legal obligations", text: "We may disclose data when required by law or to protect user safety." },
    ],
  },
  {
    num: "04",
    title: "Your rights",
    accent: "#EF9F27",
    items: [
      { label: "Access", text: "View all personal data tied to your account at any time via profile settings." },
      { label: "Correction", text: "Update inaccurate information directly in your account settings." },
      { label: "Deletion", text: "Request full account and data deletion — processed within 30 days." },
      { label: "Opt-out", text: "Manage notification preferences from your account settings at any time." },
    ],
  },
  {
    num: "05",
    title: "Cookies & tracking",
    accent: "#E24B4A",
    items: [
      { label: "Session cookies", text: "Essential cookies to keep you logged in across pages." },
      { label: "No ad trackers", text: "We don't use advertising pixels, retargeting scripts, or ad networks." },
      { label: "Analytics", text: "Privacy-respecting aggregate analytics only — never individual tracking sold on." },
      { label: "Your browser", text: "You can control cookies via browser settings, though some features may break." },
    ],
  },
];

export default function PrivacyPage() {
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
          <Link href="/terms">
            <button className="px-4 py-2 rounded-full border border-black/10 text-sm font-medium text-gray-600 hover:bg-white/80 transition">
              Terms &amp; Conditions
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
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#378ADD]/10 text-[#378ADD] text-xs font-bold uppercase tracking-widest mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#378ADD] animate-pulse" />
          Legal · Last updated June 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-[clamp(52px,9vw,110px)] font-black leading-[0.92] tracking-tight text-gray-900 mb-0"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Your data.<br />
          <span className="text-[#378ADD]">Our promise.</span>
        </motion.h1>

        {/* Marquee */}
        <div className="mt-8 overflow-hidden -mx-8">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex gap-3 pl-8 w-max"
          >
            {[...PRIVACY_MARQUEE, ...PRIVACY_MARQUEE].map((item, i) => (
              <span
                key={i}
                className="shrink-0 px-4 py-2 rounded-full border border-black/10 text-sm font-medium text-gray-500 bg-white/60"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="pb-16" />
      </section>

      {/* ── DIVIDER ── */}
      <div className="border-t border-black/8 mx-8" />

      {/* ── BENTO HIGHLIGHTS ── */}
      <section className="px-8 py-20 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-10"
        >
          The short version
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {/* Big stat card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="col-span-2 bg-gray-900 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full border-[30px] border-white/5" />
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Our commitment</p>
            <h3
              className="text-3xl font-black text-white leading-tight mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              We don&apos;t sell<br />your data.
            </h3>
            <p className="text-sm text-gray-400 max-w-xs">
              Campus Connect is built for students by students. Your privacy isn&apos;t a product.
            </p>
          </motion.div>

          {/* Encrypted card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1 bg-[#378ADD] rounded-3xl p-6 flex flex-col justify-between"
          >
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Security</p>
            <div>
              <p className="text-4xl font-black text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>TLS</p>
              <p className="text-white/60 text-xs">All data encrypted in transit</p>
            </div>
          </motion.div>

          {/* Control card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="col-span-1 bg-[#1D9E75] rounded-3xl p-6 flex flex-col justify-between"
          >
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Deletion</p>
            <div>
              <p className="text-4xl font-black text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>30d</p>
              <p className="text-white/60 text-xs">Account deletion processed in 30 days</p>
            </div>
          </motion.div>

          {/* No ads */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 bg-white rounded-3xl p-6 border border-black/5"
          >
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Ads</p>
            <p className="text-3xl mb-3">🚫</p>
            <h3
              className="font-black text-gray-900 text-xl leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Zero.<br />Nada.
            </h3>
            <p className="text-xs text-gray-400 mt-2">No ad trackers. Ever.</p>
          </motion.div>

          {/* Students only */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="col-span-1 bg-[#E24B4A] rounded-3xl p-6 flex flex-col justify-between"
          >
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Access</p>
            <div>
              <h3
                className="text-2xl font-black text-white leading-tight mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Students<br />only.
              </h3>
              <p className="text-white/60 text-xs">@vitbhopal.ac.in verified</p>
            </div>
          </motion.div>

          {/* Wide — rights */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-2 bg-white rounded-3xl p-8 border border-black/5 flex items-center justify-between gap-6"
          >
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Your rights</p>
              <h3
                className="text-2xl font-black text-gray-900"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Access · Correct · Delete
              </h3>
              <p className="text-sm text-gray-400 mt-1">Full control over your data, always.</p>
            </div>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm shrink-0"
              >
                Join →
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* ── DETAILED SECTIONS ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-10"
        >
          The full picture
        </motion.p>

        <div className="flex flex-col gap-0 divide-y divide-black/5">
          {sections.map((sec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.05 }}
              className="py-12 hover:bg-white/40 px-4 -mx-4 rounded-2xl transition-colors"
            >
              {/* Section header */}
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="text-5xl font-black leading-none"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    color: `${sec.accent}20`,
                  }}
                >
                  {sec.num}
                </span>
                <div>
                  <div
                    className="h-0.5 w-5 rounded-full mb-2"
                    style={{ backgroundColor: sec.accent }}
                  />
                  <h2
                    className="font-black text-gray-900 text-2xl"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {sec.title}
                  </h2>
                </div>
              </div>

              {/* Grid of items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pl-2">
                {sec.items.map((item, j) => (
                  <div key={j} className="flex flex-col gap-1.5">
                    <p
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: sec.accent }}
                    >
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
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
            <p className="text-gray-500 text-sm mb-2">Transparent, always.</p>
            <h2
              className="text-4xl sm:text-5xl font-black text-white leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Your campus.<br />
              <span style={{ color: "#378ADD" }}>Your data.</span>
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
          <Link href="/terms" className="hover:text-gray-600 transition">Terms</Link>
          <Link href="/privacy" className="text-gray-900 font-medium">Privacy</Link>
          <Link href="/" className="hover:text-gray-600 transition">Home</Link>
        </div>
      </footer>
    </div>
  );
}
