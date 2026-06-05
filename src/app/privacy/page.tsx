"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    icon: "🔍",
    title: "Information We Collect",
    color: "#378ADD",
    items: [
      {
        sub: "Account Information",
        text: "When you sign in with Google, we collect your name, email address (@vitbhopal.ac.in), and profile picture to create and identify your account.",
      },
      {
        sub: "Service Listings",
        text: "Information you provide when creating service listings, including descriptions, pricing, categories, and any images you upload.",
      },
      {
        sub: "Messages",
        text: "Chat messages exchanged between users on the platform are stored to facilitate communication and resolve disputes.",
      },
      {
        sub: "Usage Data",
        text: "We automatically collect information about how you interact with Campus Connect, including pages visited, features used, and time spent on the platform.",
      },
    ],
  },
  {
    icon: "⚙️",
    title: "How We Use Your Information",
    color: "#1D9E75",
    items: [
      {
        sub: "Providing the Service",
        text: "To create and manage your account, display your listings, and facilitate connections between Buyers and Sellers.",
      },
      {
        sub: "AI Matching",
        text: "Your profile data and listed skills are used by our AI system to generate relevant service recommendations for other users.",
      },
      {
        sub: "Communications",
        text: "To send you important updates about your account, transactions, or changes to the Platform.",
      },
      {
        sub: "Safety & Security",
        text: "To detect and prevent fraudulent activity, abuse, and violations of our Terms and Conditions.",
      },
    ],
  },
  {
    icon: "🔒",
    title: "Data Security",
    color: "#E24B4A",
    items: [
      {
        sub: "Encryption",
        text: "All data transmitted between your browser and our servers is encrypted using industry-standard TLS/SSL protocols.",
      },
      {
        sub: "Access Controls",
        text: "Access to user data is strictly limited to authorized team members who need it to operate and improve the Platform.",
      },
      {
        sub: "Storage",
        text: "Your data is securely stored in MongoDB with appropriate access controls and regular security reviews.",
      },
      {
        sub: "Breach Response",
        text: "In the event of a data breach, we will notify affected users promptly and take immediate action to mitigate any harm.",
      },
    ],
  },
  {
    icon: "🤝",
    title: "Sharing of Information",
    color: "#EF9F27",
    items: [
      {
        sub: "Other Users",
        text: "Your public profile information and service listings are visible to other registered Campus Connect users.",
      },
      {
        sub: "No Third-Party Sales",
        text: "We do not sell, rent, or trade your personal information to any third parties for marketing purposes.",
      },
      {
        sub: "Legal Requirements",
        text: "We may disclose your information if required by law, court order, or to protect the rights and safety of our users.",
      },
      {
        sub: "Service Providers",
        text: "We may share data with trusted service providers (e.g., Google Auth, cloud hosting) solely to operate the Platform.",
      },
    ],
  },
  {
    icon: "🎮",
    title: "Your Rights & Controls",
    color: "#378ADD",
    items: [
      {
        sub: "Access",
        text: "You can view all personal information associated with your account at any time through your profile settings.",
      },
      {
        sub: "Deletion",
        text: "You may request deletion of your account and associated data by contacting us. We will process requests within 30 days.",
      },
      {
        sub: "Correction",
        text: "If your personal information is inaccurate or incomplete, you can update it directly through your account settings.",
      },
      {
        sub: "Opt-Out",
        text: "You may opt out of non-essential communications at any time through your account notification preferences.",
      },
    ],
  },
  {
    icon: "🍪",
    title: "Cookies & Tracking",
    color: "#1D9E75",
    items: [
      {
        sub: "Session Cookies",
        text: "We use essential session cookies to keep you logged in and maintain your authentication state across pages.",
      },
      {
        sub: "Analytics",
        text: "We may use privacy-respecting analytics tools to understand how users interact with the Platform in aggregate.",
      },
      {
        sub: "No Ad Tracking",
        text: "We do not use advertising trackers or share your data with advertising networks of any kind.",
      },
      {
        sub: "Control",
        text: "You can control cookie settings through your browser, though disabling cookies may affect Platform functionality.",
      },
    ],
  },
  {
    icon: "👶",
    title: "Age & Eligibility",
    color: "#E24B4A",
    items: [
      {
        sub: "18+ Requirement",
        text: "Campus Connect is intended for students who are 18 years of age or older. By using the Platform, you confirm you meet this requirement.",
      },
      {
        sub: "Student Verification",
        text: "Use of a @vitbhopal.ac.in email is our mechanism for ensuring only current VIT Bhopal students access the Platform.",
      },
    ],
  },
  {
    icon: "📝",
    title: "Changes to this Policy",
    color: "#EF9F27",
    items: [
      {
        sub: "Updates",
        text: "We may update this Privacy Policy from time to time. When we do, we will revise the 'Last Updated' date and, for significant changes, notify users via the Platform.",
      },
      {
        sub: "Continued Use",
        text: "Your continued use of Campus Connect after any changes to this Privacy Policy constitutes your acceptance of the updated policy.",
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5 },
  }),
};

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
          <Link href="/terms">
            <button className="px-4 py-2 rounded-full border border-black/10 text-sm font-semibold text-gray-600 hover:bg-white transition">
              Terms &amp; Conditions
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
      <section className="pt-32 pb-16 px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#378ADD]/10 text-[#378ADD] text-xs font-bold uppercase tracking-widest mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#378ADD] animate-pulse" />
          Legal
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-[clamp(40px,7vw,80px)] font-black leading-[0.95] tracking-tight text-gray-900 mb-6"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Privacy<br />
          <span style={{ color: "#378ADD" }}>Policy.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-base max-w-xl leading-relaxed"
        >
          Your privacy matters to us. This policy explains what data we collect,
          why we collect it, and how we protect it — written in plain language
          you can actually understand.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-3 text-xs text-gray-400"
        >
          Last updated: June 2026
        </motion.p>

        {/* Quick summary cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12"
        >
          {[
            { icon: "🚫", label: "No ads ever" },
            { icon: "🔐", label: "Encrypted data" },
            { icon: "🎓", label: "Students only" },
            { icon: "✋", label: "You're in control" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl px-4 py-4 border border-black/5 flex items-center gap-3 shadow-sm"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-semibold text-gray-700">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/8 mx-8" />

      {/* Content */}
      <section className="px-8 py-16 max-w-5xl mx-auto">
        <div className="flex flex-col gap-10">
          {sections.map((sec, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Section header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ backgroundColor: `${sec.color}15` }}
                >
                  {sec.icon}
                </div>
                <h2
                  className="font-black text-gray-900 text-xl"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {sec.title}
                </h2>
                <div
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: sec.color }}
                />
              </div>

              {/* Sub-items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sec.items.map((item, j) => (
                  <div key={j} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-1 h-4 rounded-full shrink-0"
                        style={{ backgroundColor: sec.color }}
                      />
                      <p
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: sec.color }}
                      >
                        {item.sub}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed pl-3">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 pb-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900 rounded-3xl px-10 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute -left-12 -bottom-12 w-52 h-52 rounded-full border border-white/5" />
          <div className="absolute right-20 -top-16 w-64 h-64 rounded-full border border-white/5" />

          <div className="relative z-10">
            <p className="text-gray-500 text-sm mb-1">
              Questions about your data?
            </p>
            <h3
              className="text-2xl font-black text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              We&apos;re transparent, always.
            </h3>
          </div>
          <Link href="/login" className="relative z-10 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 py-3.5 bg-white text-gray-900 rounded-2xl font-black text-sm"
            >
              Join Campus Connect →
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/8 px-8 py-6 flex items-center justify-between text-xs text-gray-400 max-w-5xl mx-auto">
        <span className="font-bold text-gray-600">Campus Connect</span>
        <div className="flex items-center gap-5">
          <Link href="/terms" className="hover:text-gray-600 transition">
            Terms
          </Link>
          <Link
            href="/privacy"
            className="hover:text-gray-600 transition font-medium text-gray-900"
          >
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
