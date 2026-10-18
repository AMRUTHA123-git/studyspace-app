"use client";

import React from "react";
import { GraduationCap, CheckCircle2, TrendingUp, Award } from "lucide-react";
import { Exam, Task, Certificate } from "@/lib/types";

interface MetricProps {
  exams: Exam[];
  tasks: Task[];
  certs: Certificate[];
}

export function MetricSummaryCards({ exams, tasks, certs }: MetricProps) {
  // Calculations
  const urgentExams = exams.filter((e) => {
    const diff = new Date(e.date).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days <= 7 && days >= 0;
  });

  const todayTasks = tasks.filter((t) => t.category === "today");
  const completedToday = todayTasks.filter((t) => t.completed).length;

  // Syllabus calculation across all exams
  let totalTopics = 0;
  let completedTopics = 0;
  exams.forEach((ex) => {
    ex.subjects.forEach((sub) => {
      sub.chapters.forEach((ch) => {
        totalTopics += ch.microTopics.length;
        completedTopics += ch.microTopics.filter((m) => m.isCompleted).length;
      });
    });
  });
  const syllabusPct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 58;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* 1. Target Exams */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0">
          <GraduationCap className="w-8 h-8" />
        </div>
        <div>
          <div className="text-3xl font-black text-slate-900 leading-none">
            {exams.length}
          </div>
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mt-1.5">
            Target Exams
          </div>
          <span className="inline-block mt-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
            {urgentExams.length > 0 ? `${urgentExams.length} Urgent (<7d)` : "On Track"}
          </span>
        </div>
      </div>

      {/* 2. Tasks Today */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <div className="text-3xl font-black text-slate-900 leading-none">
            {todayTasks.length}
          </div>
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mt-1.5">
            Tasks Today
          </div>
          <span className="inline-block mt-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
            {completedToday} of {todayTasks.length} Completed
          </span>
        </div>
      </div>

      {/* 3. Syllabus Coverage */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
          <TrendingUp className="w-8 h-8" />
        </div>
        <div>
          <div className="text-3xl font-black text-slate-900 leading-none">
            {syllabusPct}%
          </div>
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mt-1.5">
            Syllabus Mastered
          </div>
          <span className="inline-block mt-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
            {completedTopics} Topics Mastered
          </span>
        </div>
      </div>

      {/* 4. Certificates */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition">
        <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
          <Award className="w-8 h-8" />
        </div>
        <div>
          <div className="text-3xl font-black text-slate-900 leading-none">
            {certs.length}
          </div>
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mt-1.5">
            Certificates Vault
          </div>
          <span className="inline-block mt-1 text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-200/60">
            Verified Portfolio
          </span>
        </div>
      </div>
    </div>
  );
}
