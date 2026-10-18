"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Exam } from "@/lib/types";

export function CalendarWidget({ exams }: { exams: Exam[] }) {
  const [currentDate] = useState(new Date("2026-10-18")); // Current simulated demo date

  // Days in October 2026: starts on Thursday (index 3 with 0 = Mon)
  // Weeks generator for October 2026
  const daysInMonth = 31;
  const startDayOffset = 3; // Oct 1, 2026 was Thursday (0=Mon, 1=Tue, 2=Wed, 3=Thu)

  const examDates = new Set(
    exams.map((e) => {
      const d = new Date(e.date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    })
  );

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-blue-600" />
            <span>Calendar & Schedule</span>
          </h3>
          <p className="text-xs text-slate-400">Exam milestones & study sessions</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <button className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-sm px-1">October 2026</span>
          <button className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid: 7 Columns */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs">
        {/* Day headers */}
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <div key={day} className="font-extrabold text-slate-400 py-1">
            {day}
          </div>
        ))}

        {/* Previous month filler */}
        {Array.from({ length: startDayOffset }).map((_, i) => (
          <div key={`prev-${i}`} className="py-2.5 rounded-lg text-slate-300">
            {28 + i}
          </div>
        ))}

        {/* October Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const isToday = dayNum === 18;
          const isExamDay = examDates.has(`2026-10-${dayNum}`);

          return (
            <div
              key={`day-${dayNum}`}
              className={`py-2 rounded-xl text-xs font-semibold transition relative cursor-pointer ${
                isToday
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 font-bold"
                  : isExamDay
                  ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/40 font-bold"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {dayNum}
              {isExamDay && !isToday && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 absolute top-1 right-1" />
              )}
            </div>
          );
        })}
      </div>

      {/* Calendar Legend */}
      <div className="flex items-center gap-5 pt-2 text-[11px] text-slate-500 border-t border-slate-100 font-medium">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Today
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Target Exam
        </span>
      </div>
    </div>
  );
}
