"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  CheckSquare,
  Award,
  User,
  Flame,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/exams", label: "Target Exams", icon: GraduationCap },
  { href: "/syllabus", label: "Syllabus Builder", icon: BookOpen },
  { href: "/tests", label: "Practice Tests", icon: ClipboardCheck },
  { href: "/todo", label: "To-Do List", icon: CheckSquare },
  { href: "/certificates", label: "Certificates Vault", icon: Award },
  { href: "/profile", label: "Student Profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-b from-[#1E3A8A] to-[#1E40AF] text-white flex flex-col justify-between p-5 min-h-screen shrink-0 shadow-2xl relative z-20">
      <div className="space-y-6">
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3 px-2 pt-1 group">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1E3A8A] font-extrabold text-xl shadow-md group-hover:scale-105 transition">
            ⚡
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-white leading-tight">
              Study<span className="text-amber-400">Prime</span>
            </h2>
            <p className="text-[10px] text-blue-200 font-medium">Student Workspace</p>
          </div>
        </Link>

        {/* Navigation Items (School-Prime Style) */}
        <nav className="space-y-1.5 pt-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition select-none ${
                  isActive
                    ? "bg-white text-[#1E3A8A] shadow-md shadow-blue-950/20 translate-x-1"
                    : "text-blue-100 hover:bg-blue-800/60 hover:text-white"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? "text-[#1E3A8A]" : "text-blue-200"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom Student Motivation Card */}
      <div className="p-4 rounded-2xl bg-blue-900/60 border border-blue-700/50 text-center space-y-1.5 mt-6">
        <div className="text-2xl mb-1">🏃‍♂️🎒</div>
        <p className="text-xs font-bold text-white">Consistent Learning</p>
        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
          <Flame className="w-3 h-3 fill-amber-300" />
          <span>14-Day Streak</span>
        </div>
      </div>
    </aside>
  );
}
