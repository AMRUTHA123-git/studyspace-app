"use client";

import React from "react";
import { AlertTriangle, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function NoticeBoardWidget() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
      {/* Notice Board Header */}
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <span>📌</span> Notice Board
          </h3>
          <p className="text-xs text-slate-400">High-priority alerts & focus reminders</p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
          High Urgency
        </span>
      </div>

      {/* Notice Cards List */}
      <div className="space-y-3">
        {/* Notice 1: Warm Golden Urgent Card */}
        <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-amber-200 flex items-start gap-3.5 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 text-base">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-amber-900">
                Semester Final: Computer Networks
              </h4>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded">
                Oct 22 (4 Days)
              </span>
            </div>
            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
              Target date is in 4 days. 3 chapters pending in syllabus. Click to drill high-yield topics.
            </p>
            <div className="mt-2.5">
              <Link
                href="/syllabus"
                className="text-xs font-bold text-amber-900 hover:text-amber-700 underline"
              >
                Drill Syllabus ➔
              </Link>
            </div>
          </div>
        </div>

        {/* Notice 2: Soft Blue AI Revision Card */}
        <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-blue-200 flex items-start gap-3.5 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 text-base">
            <Sparkles className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-blue-900">
                Weekly AI Revision Mock Ready
              </h4>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                Spaced Prep
              </span>
            </div>
            <p className="text-xs text-blue-800 mt-1 leading-relaxed">
              15 questions synthesized exclusively from the micro-topics you checked off this week.
            </p>
            <div className="mt-2.5">
              <Link
                href="/syllabus"
                className="text-xs font-bold text-blue-900 hover:text-blue-700 underline"
              >
                Launch Mock Session ➔
              </Link>
            </div>
          </div>
        </div>

        {/* Notice 3: Emerald Success Card */}
        <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-emerald-200 flex items-start gap-3.5 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-base">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-emerald-900">
                Certificates Vault Synchronized
              </h4>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                Verified
              </span>
            </div>
            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
              AWS Cloud Practitioner and Meta Front-End credentials active on student portfolio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
