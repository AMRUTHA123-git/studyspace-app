"use client";

import React from "react";
import Link from "next/link";
import {
  CheckSquare,
  GraduationCap,
  BookOpen,
  Award,
  Timer,
  UserCheck,
} from "lucide-react";

interface ActionItem {
  title: string;
  href: string;
  icon: React.ElementType;
  bgLight: string;
  borderColor: string;
  iconColor: string;
  hoverBorder: string;
}

const ACTIONS: ActionItem[] = [
  {
    title: "View To-Do",
    href: "/todo",
    icon: CheckSquare,
    bgLight: "bg-blue-50",
    borderColor: "border-blue-100",
    iconColor: "text-blue-600",
    hoverBorder: "hover:border-blue-300",
  },
  {
    title: "Target Exams",
    href: "/exams",
    icon: GraduationCap,
    bgLight: "bg-amber-50",
    borderColor: "border-amber-100",
    iconColor: "text-amber-600",
    hoverBorder: "hover:border-amber-300",
  },
  {
    title: "Syllabus Tracker",
    href: "/syllabus",
    icon: BookOpen,
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-100",
    iconColor: "text-emerald-600",
    hoverBorder: "hover:border-emerald-300",
  },
  {
    title: "Certificates",
    href: "/certificates",
    icon: Award,
    bgLight: "bg-purple-50",
    borderColor: "border-purple-100",
    iconColor: "text-purple-600",
    hoverBorder: "hover:border-purple-300",
  },
  {
    title: "Practice Mock",
    href: "/tests",
    icon: Timer,
    bgLight: "bg-rose-50",
    borderColor: "border-rose-100",
    iconColor: "text-rose-600",
    hoverBorder: "hover:border-rose-300",
  },
  {
    title: "Student Profile",
    href: "/profile",
    icon: UserCheck,
    bgLight: "bg-teal-50",
    borderColor: "border-teal-100",
    iconColor: "text-teal-600",
    hoverBorder: "hover:border-teal-300",
  },
];

export function QuickActionGrid() {
  return (
    <div className="space-y-3">
      <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
        Quick Actions & Modules
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {ACTIONS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md ${item.hoverBorder} transition cursor-pointer flex flex-col items-center text-center group`}
            >
              <div
                className={`w-14 h-14 rounded-2xl ${item.bgLight} border ${item.borderColor} flex items-center justify-center group-hover:scale-110 transition shadow-inner`}
              >
                <Icon className={`w-7 h-7 ${item.iconColor}`} />
              </div>
              <span className="font-bold text-xs text-slate-800 mt-3 group-hover:text-blue-600 transition">
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
