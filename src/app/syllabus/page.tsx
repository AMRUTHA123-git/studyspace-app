"use client";

import React, { useState } from "react";
import { useWorkspaceStorage } from "@/lib/storage";
import { parseSyllabusOutline } from "@/lib/syllabusParser";
import {
  BookOpen,
  Plus,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Check,
  Upload,
  Layers,
  GraduationCap,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export default function DynamicSyllabusPage() {
  const { exams, updateExamSyllabus, toggleMicroTopic, isLoaded } = useWorkspaceStorage();

  // Active exam selection for viewing
  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || "exam-1");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalExamId, setModalExamId] = useState<string>(exams[0]?.id || "exam-1");
  const [outlineText, setOutlineText] = useState("");
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});

  const activeExam = exams.find((e) => e.id === selectedExamId) || exams[0];

  const handleOpenModal = () => {
    setModalExamId(selectedExamId || exams[0]?.id || "");
    setIsModalOpen(true);
  };

  const handleInsertSample = () => {
    setOutlineText(`Subject: ${activeExam ? activeExam.name : "Computer Networks"}
Chapter 1: Transport Layer Protocols
- TCP 3-Way Handshake & SYN Floods
- TCP Tahoe vs. Reno Congestion Control
- UDP Header Format & Checksum Calculations

Chapter 2: Network Security & Cryptography
- Public Key Cryptography & RSA Steps
- Firewalls, Packet Filtering & NAT
- Transport Layer Security (TLS 1.3)`);
  };

  const handleBuildSyllabus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!outlineText.trim()) return;

    const targetExam = exams.find((ex) => ex.id === modalExamId);
    const parsedSubjects = parseSyllabusOutline(
      outlineText,
      targetExam ? targetExam.name : "General Subject"
    );

    if (parsedSubjects.length === 0) {
      alert("Unable to detect chapters or topics. Please check your text format.");
      return;
    }

    updateExamSyllabus(modalExamId, parsedSubjects);
    setSelectedExamId(modalExamId);
    setIsModalOpen(false);
    setOutlineText("");

    // Auto expand all chapters
    const openMap: Record<string, boolean> = {};
    parsedSubjects.forEach((sub) => {
      sub.chapters.forEach((ch) => {
        openMap[ch.id] = true;
      });
    });
    setOpenChapters(openMap);
  };

  const toggleChapter = (chId: string) => {
    setOpenChapters((prev) => ({ ...prev, [chId]: !prev[chId] }));
  };

  const handleClearSyllabus = () => {
    if (confirm("Are you sure you want to clear this syllabus outline?")) {
      updateExamSyllabus(activeExam.id, []);
    }
  };

  if (!isLoaded) return <div className="p-8 text-slate-400">Loading syllabus builder...</div>;

  // Calculate syllabus metrics
  let totalTopics = 0;
  let doneTopics = 0;
  let weeklyTopics = 0;

  if (activeExam?.subjects) {
    activeExam.subjects.forEach((s) => {
      s.chapters.forEach((c) => {
        totalTopics += c.microTopics.length;
        doneTopics += c.microTopics.filter((m) => m.isCompleted).length;
        weeklyTopics += c.microTopics.filter((m) => m.isCompleted && m.completedThisWeek).length;
      });
    });
  }

  const completionPct = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

  return (
    <div className="p-8 space-y-8 flex-1">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Syllabus <span className="text-emerald-600">Builder & Tracker</span>
            </h1>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Interactive Checklist
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Build dynamic, chapter-by-chapter checklists directly from AI outlines linked to your exams.
          </p>
        </div>

        {/* Action Button: "+ Add Syllabus" */}
        <button
          onClick={handleOpenModal}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-2xl transition shadow-md shadow-emerald-600/25 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Syllabus</span>
        </button>
      </div>

      {/* Exam Selector Bar */}
      {exams.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-4 h-4 text-emerald-600 ml-2" />
            <span className="text-xs font-bold text-slate-700">Target Exam:</span>
            <select
              value={activeExam?.id || ""}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="bg-slate-50 border border-slate-200 font-bold text-xs text-slate-900 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {exams.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name} ({ex.code || "EXAM"})
                </option>
              ))}
            </select>
          </div>

          {activeExam?.subjects?.length > 0 && (
            <div className="flex items-center gap-2 pr-2">
              <button
                onClick={handleClearSyllabus}
                className="text-xs font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Outline</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Content Area */}
      {!activeExam || !activeExam.subjects || activeExam.subjects.length === 0 ? (
        /* 1. BLANK STATE (No Hardcoded Dummy Data) */
        <div className="py-16 text-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-8 space-y-4 shadow-xs">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl">
            📖
          </div>
          <h3 className="text-lg font-black text-slate-900">No Syllabus Added Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            You haven't set up the syllabus outline for{" "}
            <span className="font-bold text-slate-700">{activeExam ? activeExam.name : "your target exam"}</span>.
            Use our AI Outline Bridge to convert your syllabus PDF into an interactive checklist in 3 simple steps!
          </p>
          <div className="pt-2">
            <button
              onClick={handleOpenModal}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-2xl transition shadow-md shadow-emerald-600/25 flex items-center gap-2 mx-auto cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Syllabus for {activeExam ? activeExam.name.split(":")[0] : "Exam"}</span>
            </button>
          </div>
        </div>
      ) : (
        /* 2. DYNAMIC SYLLABUS CHECKLIST */
        <div className="space-y-6">
          {/* Progress Overview Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>Overall Syllabus Progress</span>
              </span>
              <span className="text-emerald-600 font-extrabold text-sm">
                {doneTopics} of {totalTopics} Topics ({completionPct}%)
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>

          {/* Subjects Hierarchy */}
          {activeExam.subjects.map((sub) => {
            let subTotal = 0;
            let subDone = 0;
            sub.chapters.forEach((c) => {
              subTotal += c.microTopics.length;
              subDone += c.microTopics.filter((m) => m.isCompleted).length;
            });
            const subPct = subTotal > 0 ? Math.round((subDone / subTotal) * 100) : 0;

            return (
              <div
                key={sub.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden"
              >
                {/* Subject Header */}
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">{sub.name}</h3>
                      <span className="text-xs text-slate-500 font-medium">
                        {subDone} of {subTotal} micro-topics mastered
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {subPct}%
                  </span>
                </div>

                {/* Chapters */}
                <div className="p-4 space-y-3.5">
                  {sub.chapters.map((ch) => {
                    const chTotal = ch.microTopics.length;
                    const chDone = ch.microTopics.filter((m) => m.isCompleted).length;
                    const chPct = chTotal > 0 ? Math.round((chDone / chTotal) * 100) : 0;
                    const isOpen = openChapters[ch.id] ?? true;

                    return (
                      <div
                        key={ch.id}
                        className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs"
                      >
                        {/* Chapter Accordion Toggle */}
                        <div
                          onClick={() => toggleChapter(ch.id)}
                          className="p-3 bg-slate-50/60 hover:bg-slate-100/60 cursor-pointer flex items-center justify-between transition select-none"
                        >
                          <div className="flex items-center gap-2">
                            {isOpen ? (
                              <ChevronDown className="w-4 h-4 text-slate-500" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-500" />
                            )}
                            <h4 className="font-bold text-xs text-slate-800">{ch.title}</h4>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">
                            {chDone}/{chTotal} ({chPct}%)
                          </span>
                        </div>

                        {/* Micro-topics Checklist */}
                        {isOpen && (
                          <div className="p-3.5 space-y-2 border-t border-slate-100 bg-white">
                            {ch.microTopics.map((mt) => (
                              <label
                                key={mt.id}
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition select-none group"
                              >
                                <div className="flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    checked={mt.isCompleted}
                                    onChange={() =>
                                      toggleMicroTopic(activeExam.id, sub.id, ch.id, mt.id)
                                    }
                                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-0 cursor-pointer"
                                  />
                                  <span
                                    className={`text-xs font-medium transition ${
                                      mt.isCompleted
                                        ? "line-through text-slate-400"
                                        : "text-slate-800 group-hover:text-emerald-600"
                                    }`}
                                  >
                                    {mt.title}
                                  </span>
                                </div>
                                {mt.isCompleted && (
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                    Done
                                  </span>
                                )}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. INSTRUCTIONAL MODAL (THE CORE FEATURE) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-7 max-w-xl w-full shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-lg">
                  📚
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">Add Exam Syllabus</h3>
                  <p className="text-[11px] text-slate-400">Step-by-step AI Outline Bridge</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-base font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* 3-STEP INSTRUCTIONAL GUIDE */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                How to convert your syllabus:
              </h4>

              <div className="grid grid-cols-1 gap-2.5">
                {/* Step 1 */}
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-blue-900">Upload PDF to AI</h5>
                    <p className="text-[11px] text-blue-700 mt-0.5">
                      Upload your official syllabus PDF to an AI like ChatGPT or Gemini.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-amber-900">Request a Clean Outline</h5>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      Ask the AI: <em>"Convert this syllabus into a clean text outline: Subject &gt; Chapters &gt; bullet topics."</em>
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-emerald-900">Paste Text Below</h5>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      Copy that text outline and paste it into the box below.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Form & Exam Linking */}
            <form onSubmit={handleBuildSyllabus} className="space-y-4 pt-1">
              {/* Dropdown: Which Exam is this for? */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Which Exam is this for?
                </label>
                <select
                  value={modalExamId}
                  onChange={(e) => setModalExamId(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {exams.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name} ({ex.code || "EXAM"})
                    </option>
                  ))}
                </select>
              </div>

              {/* Large Textarea */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Paste AI Outline Text
                  </label>
                  <button
                    type="button"
                    onClick={handleInsertSample}
                    className="text-[11px] font-bold text-emerald-600 hover:underline cursor-pointer"
                  >
                    📋 Insert Sample Outline
                  </button>
                </div>
                <textarea
                  value={outlineText}
                  onChange={(e) => setOutlineText(e.target.value)}
                  rows={6}
                  required
                  placeholder={`Subject: Computer Networks
Chapter: Transport Layer
- TCP 3-Way Handshake
- Congestion Control
- UDP Header Format
Chapter: Network Security
- Public Key Cryptography
- Firewalls & Packet Inspection`}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 font-mono focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              {/* Submit Action */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl transition shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>⚡ Build Syllabus</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
