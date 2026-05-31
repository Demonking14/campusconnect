"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AIMatchModal from "@/components/AIMatchModel";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: "🏠", label: "Dashboard" },
    { href: "/services", icon: "🛍️", label: "Services" },
    { href: "/services/create", icon: "➕", label: "Offer Service" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 h-14 flex items-center px-5 justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition"
          >
            {collapsed ? "→" : "←"}
          </button>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          </div>
          <span className="font-black text-gray-900 text-lg tracking-tight">
            Campus Connect
          </span>
        </div>
      </header>

      <div className="flex flex-1 pt-14">

        {/* Sidebar — desktop */}
        <aside
          className={`hidden md:flex flex-col fixed left-0 top-14 bottom-0 bg-white border-r border-gray-100 z-30 transition-all duration-300 ${
            collapsed ? "w-16" : "w-56"
          }`}
        >
          {/* User Profile */}
          <div className={`flex items-center gap-3 p-4 border-b border-gray-100 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-red-400 to-blue-400 shrink-0 overflow-hidden">
              {session?.user?.image ? (
                <img src={session.user.image} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                  {session?.user?.name?.[0]}
                </div>
              )}
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {session?.user?.email}
                </p>
              </div>
            )}
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  } ${collapsed ? "justify-center" : ""}`}
                  title={collapsed ? item.label : ""}
                >
                  <span className="text-base shrink-0">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-gray-100">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition ${
                collapsed ? "justify-center" : ""
              }`}
              title={collapsed ? "Logout" : ""}
            >
              <span className="text-base shrink-0">🚪</span>
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 pb-20 md:pb-0 ${
            collapsed ? "md:ml-16" : "md:ml-56"
          }`}
        >
          {children}
        </main>
      </div>

      {/* Bottom Nav — mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 flex items-center justify-around px-2 h-16">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition ${
                active ? "text-gray-900" : "text-gray-400"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-red-400"
        >
          <span className="text-xl">🚪</span>
          <span className="text-[10px] font-medium">Logout</span>
        </button>
      </nav>

      {/* AI Match Modal — above bottom nav on mobile */}
      <AIMatchModal />

    </div>
  );
}