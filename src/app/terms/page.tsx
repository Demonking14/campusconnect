"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing or using Campus Connect ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the Platform. These terms apply to all users, including students offering services ("Sellers") and students seeking services ("Buyers").`,
  },
  {
    title: "Eligibility",
    content: `Campus Connect is exclusively available to currently enrolled students of VIT Bhopal University. You must register using a valid @vitbhopal.ac.in Google account. By creating an account, you confirm that you are a currently enrolled student and that all information provided is accurate and truthful.`,
  },
  {
    title: "User Accounts",
    content: `You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. Campus Connect is not liable for any loss or damage arising from your failure to comply with this obligation.`,
  },
  {
    title: "Services & Listings",
    content: `Sellers may list their skills and services on the Platform. All listings must be legitimate, accurately described, and comply with university policies and applicable laws. Campus Connect reserves the right to remove any listing that violates these terms, is fraudulent, misleading, or inappropriate without prior notice.`,
  },
  {
    title: "Transactions & Payments",
    content: `All transactions occur directly between Buyers and Sellers. Campus Connect acts solely as a platform to connect students and does not process, hold, or guarantee any payments. Users are responsible for agreeing on payment terms, methods, and amounts independently. Campus Connect is not liable for any payment disputes between users.`,
  },
  {
    title: "AI-Powered Features",
    content: `Campus Connect uses AI to help match Buyers with relevant Sellers. AI recommendations are provided for convenience only and do not constitute endorsements. The accuracy, reliability, or suitability of AI-generated matches is not guaranteed, and users should exercise their own judgment when engaging with other users.`,
  },
  {
    title: "Prohibited Conduct",
    content: `Users must not: post false, misleading, or fraudulent listings; harass, threaten, or abuse other users; attempt to circumvent or manipulate the Platform; use the Platform for any illegal activity; share another user's personal information without consent; or impersonate any person or entity.`,
  },
  {
    title: "Intellectual Property",
    content: `All content, branding, and technology on Campus Connect is owned by or licensed to Campus Connect. Users retain ownership of the content they post but grant Campus Connect a non-exclusive, royalty-free license to display such content on the Platform. You must not reproduce, distribute, or create derivative works without express permission.`,
  },
  {
    title: "Disclaimer of Warranties",
    content: `Campus Connect is provided on an "as is" and "as available" basis without warranties of any kind. We do not warrant that the Platform will be uninterrupted, error-free, or free of harmful components. Your use of the Platform is at your own risk.`,
  },
  {
    title: "Limitation of Liability",
    content: `To the maximum extent permitted by law, Campus Connect and its creators shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform, including but not limited to loss of data, revenue, or disputes between users.`,
  },
  {
    title: "Modifications to Terms",
    content: `We reserve the right to update or modify these Terms and Conditions at any time. Changes will be effective upon posting to the Platform. Continued use of the Platform after changes constitutes your acceptance of the revised terms. We encourage you to review these terms periodically.`,
  },
  {
    title: "Governing Law",
    content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts located in Bhopal, Madhya Pradesh.`,
  },
  {
    title: "Contact",
    content: `For questions about these Terms and Conditions, please reach out through the Campus Connect platform or contact your student community representative. We aim to respond to all inquiries within 3 business days.`,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5 },
  }),
};

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
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 bg-[#F5F2EE]/80 backdrop-blur-md border-b border-black/5">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="font-black text-lg text-gray-900 tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Campus Connect
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/privacy">
            <button className="px-4 py-2 rounded-full border border-black/10 text-sm font-semibold text-gray-600 hover:bg-white transition">
              Privacy Policy
            </button>
          </Link>
          <Link href="/login">
            <button className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition">
              Sign in
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E24B4A]/10 text-[#E24B4A] text-xs font-bold uppercase tracking-widest mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E24B4A] animate-pulse" />
          Legal
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-[clamp(40px,7vw,80px)] font-black leading-[0.95] tracking-tight text-gray-900 mb-6"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Terms &amp;<br />
          <span className="text-[#E24B4A]">Conditions.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-base max-w-xl leading-relaxed"
        >
          Please read these terms carefully before using Campus Connect. By
          accessing the platform, you agree to be bound by the following
          conditions.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-3 text-xs text-gray-400"
        >
          Last updated: June 2026
        </motion.p>
      </section>

      {/* Divider */}
      <div className="border-t border-black/8 mx-8" />

      {/* Content */}
      <section className="px-8 py-16 max-w-4xl mx-auto">
        <div className="flex flex-col gap-10">
          {sections.map((sec, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              className="group grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-10 items-start"
            >
              {/* Section number + title */}
              <div className="flex md:flex-col gap-3 md:gap-2">
                <span
                  className="text-4xl font-black leading-none text-black/5"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2
                  className="font-black text-gray-900 text-base leading-tight pt-0.5"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {sec.title}
                </h2>
              </div>

              {/* Content box */}
              <div className="bg-white rounded-2xl px-7 py-6 border border-black/5 text-sm text-gray-500 leading-relaxed shadow-sm group-hover:shadow-md transition-shadow">
                {sec.content}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 pb-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900 rounded-3xl px-10 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute -left-12 -bottom-12 w-52 h-52 rounded-full border border-white/5" />
          <div className="absolute right-20 -top-16 w-64 h-64 rounded-full border border-white/5" />

          <div className="relative z-10">
            <p className="text-gray-500 text-sm mb-1">Ready to join?</p>
            <h3
              className="text-2xl font-black text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              I agree — let&apos;s get started.
            </h3>
          </div>
          <Link href="/login" className="relative z-10 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 py-3.5 bg-white text-gray-900 rounded-2xl font-black text-sm"
            >
              Sign in with Gmail →
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/8 px-8 py-6 flex items-center justify-between text-xs text-gray-400 max-w-4xl mx-auto">
        <span className="font-bold text-gray-600">Campus Connect</span>
        <div className="flex items-center gap-5">
          <Link href="/terms" className="hover:text-gray-600 transition font-medium text-gray-900">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-gray-600 transition">
            Privacy
          </Link>
          <Link href="/" className="hover:text-gray-600 transition">
            Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
