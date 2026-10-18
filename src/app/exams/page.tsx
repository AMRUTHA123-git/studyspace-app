"use client";

import React, { useState } from "react";
import { useWorkspaceStorage } from "@/lib/storage";
import Link from "next/link";
import {
  GraduationCap,
  Calendar,
  Plus,
  Trash2,
  BookOpen,
  AlertCircle,
  Clock,
} from "lucide-react";

export default function ExamsPage() {
  const { exams, saveExams, isLoaded } = useWorkspaceStorage();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [date, setDate] = useState("");

  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !date) return;

    const newExam = {
      id: `exam-${Date.now()}`,
      name: name.trim(),
      code: code.trim() || "EXAM",
      date,
      createdAt: Date.now(),
      subjects: [
        {
          id: `sub-${Date.now()}`,
          name: name.trim(),
          code: code.trim() || "MOD-1",
          chapters: [
            {
              id: `ch-${Date.now()}`,
              title: "General Topics & Foundations",
              microTopics: [
                { id: `mt-1-${Date.now()}`, title: "Core Concepts & Fundamentals", isCompleted: false, completedThisWeek: false },
                { id: `mt-2-${Date.now()}`, title: "High-Yield Applications & Problem Solving", isCompleted: false, completedThisWeek: false }
              ]
            }
          ]
        }
      ]
    };

    saveExams([...exams, newExam]);
    setName("");
    setCode("");
    setDate("");
  };

  const handleDelete = (id: string) => {
    saveExams(exams.filter((e) => e.id !== id));
  };

  const getDaysLeft = (targetStr: string) => {
    const target = new Date(targetStr);
    const today = new Date();
    target.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  if (!isLoaded) return <div className="p-8 text-slate-400">Loading exams...</div>;

  return (
    <div className="p-8 space-y-8 flex-1">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Target <span className="text-amber-600">Exams</span>
            </h1>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              {exams.length} Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track key milestones, countdown urgencies, and dive into chapter syllabus breakdowns.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Schedule New Exam Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Plus className="w-4 h-4 text-amber-600" />
            <span>Schedule New Target Exam</span>
          </h3>

          <form onSubmit={handleAddExam} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Exam Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. GATE CS 2027 or Operating Systems"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject / Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. CS-402 or GATE-CS"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Exam Date (Calendar)</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Exam to Timeline</span>
            </button>
          </form>
        </div>

        {/* Right: Exams List */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900">
            Active Targets & Countdowns
          </h3>

          {exams.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 text-sm">
              No target exams scheduled yet.
            </div>
          ) : (
            exams.map((exam) => {
              const daysLeft = getDaysLeft(exam.date);
              const isUrgent = daysLeft <= 7 && daysLeft >= 0;

              return (
                <div
                  key={exam.id}
                  className={`p-5 rounded-2xl bg-white border transition shadow-sm hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isUrgent ? "border-amber-300 ring-1 ring-amber-200" : "border-slate-200/80"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 font-bold ${
                        isUrgent ? "bg-amber-100 text-amber-700" : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {isUrgent ? "⚠️" : "🎓"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-base text-slate-900">{exam.name}</h4>
                        {exam.code && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {exam.code}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(exam.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className={isUrgent ? "text-amber-600 font-bold" : "text-blue-600 font-semibold"}>
                          {daysLeft <= 0 ? "Today!" : `${daysLeft} days remaining`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <Link
                      href="/syllabus"
                      className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>View Syllabus</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(exam.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition"
                      title="Delete exam"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
