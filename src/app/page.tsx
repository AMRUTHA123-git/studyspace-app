"use client";

import React from "react";
import { QuickActionGrid } from "@/components/dashboard/QuickActionGrid";
import { MetricSummaryCards } from "@/components/dashboard/MetricSummaryCards";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { NoticeBoardWidget } from "@/components/dashboard/NoticeBoardWidget";
import { useWorkspaceStorage } from "@/lib/storage";
import Link from "next/link";

export default function DashboardHomePage() {
  const { exams, tasks, certs, profile, isLoaded } = useWorkspaceStorage();

  if (!isLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="text-slate-400 font-semibold animate-pulse text-sm">
          Loading workspace portal...
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 flex-1">
      {/* Top Portal Banner (matching School-Prime header) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Student<span className="text-blue-600">Portal</span>
            </h1>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
              Workspace Hub
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Central dashboard for to-dos, upcoming exams, syllabus progress, and credentials.
          </p>
        </div>

        {/* User Profile Mini Pill */}
        <Link
          href="/profile"
          className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-lg overflow-hidden shrink-0">
            {profile.avatarImage ? (
              <img
                src={profile.avatarImage}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{profile.avatar}</span>
            )}
          </div>
          <div className="text-left text-xs">
            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition">
              {profile.name}
            </div>
            <div className="text-[10px] text-slate-500 font-medium truncate max-w-[180px]">
              {profile.study}
            </div>
          </div>
        </Link>
      </div>

      {/* 1. Quick Action & Module Grid (6 large colorful cards) */}
      <QuickActionGrid />

      {/* 2. Four Large Summary Metric Cards */}
      <MetricSummaryCards exams={exams} tasks={tasks} certs={certs} />

      {/* 3. Bottom Section: Calendar Widget (7 Cols) & Notice Board (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <CalendarWidget exams={exams} />
        </div>
        <div className="lg:col-span-5">
          <NoticeBoardWidget />
        </div>
      </div>
    </div>
  );
}
