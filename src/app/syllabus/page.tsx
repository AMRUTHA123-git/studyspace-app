"use client";

import React, { useState, useEffect } from "react";
import { useWorkspaceStorage } from "@/lib/storage";
import { parseSyllabusOutline } from "@/lib/syllabusParser";
import { GATE_2027_CS_SYLLABUS } from "@/lib/gateSyllabusData";
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
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function DynamicSyllabusPage() {
  const { exams, updateExamSyllabus, saveExams, toggleMicroTopic, isLoaded } =
    useWorkspaceStorage();

  // Active exam selection for viewing
  const [selectedExamId, setSelectedExamId] = useState<string>(
    exams[0]?.id || "exam-1"
  );

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalExamId, setModalExamId] = useState<string>(
    exams[0]?.id || "exam-1"
  );
  // Controlled rawText state for textarea
  const [rawText, setRawText] = useState("");
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});
  const [notification, setNotification] = useState<string | null>(null);

  // Sync selected exam when exams change
  useEffect(() => {
    if (exams.length > 0 && !exams.some((e) => e.id === selectedExamId)) {
      setSelectedExamId(exams[0].id);
    }
  }, [exams, selectedExamId]);

  const activeExam =
    exams.find((e) => e.id === selectedExamId) || exams[0];

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenModal = () => {
    setModalExamId(selectedExamId || exams[0]?.id || "");
    setIsModalOpen(true);
  };

  // Sample format insert helpers for multi-format parser testing
  const handleInsertArrowSample = () => {
    setRawText(`Digital Logic > Boolean Algebra > K-Maps (2, 3, 4 Variables)
Digital Logic > Boolean Algebra > Quine-McCluskey Minimization
Digital Logic > Combinational Circuits > Multiplexers & Decoders
Computer Networks > Transport Layer > TCP 3-Way Handshake
Computer Networks > Transport Layer > Congestion Control & Fast Recovery`);
  };

  const handleInsertColonSample = () => {
    setRawText(`Operating Systems: CPU Scheduling (FCFS, Round Robin, SJF)
Operating Systems: Virtual Memory & Page Replacement (FIFO, LRU, Optimal)
Databases: Normalization (1NF, 2NF, 3NF, BCNF)
Databases: SQL Queries & Aggregations
Algorithms: Dijkstra & Bellman-Ford Shortest Path`);
  };

  const handleInsertPlainSample = () => {
    setRawText(`Binary Search Trees & AVL Rotations
Asymptotic Notations (Big-O, Big-Omega, Big-Theta)
Master Theorem for Divide-and-Conquer
Eulerian and Hamiltonian Graph Connectivity
Eigenvalues and Cayley-Hamilton Theorem`);
  };

  // One-click load complete GATE 2027 CS & General Aptitude Syllabus
  const handleLoadDefaultGateSyllabus = () => {
    try {
      let targetExam = exams.find(
        (e) => e.code === "GATE-CS" || e.name.toLowerCase().includes("gate")
      );
      let updatedExams = [...exams];

      if (!targetExam) {
        targetExam = {
          id: `exam-${Date.now()}`,
          name: "GATE Computer Science 2027",
          code: "GATE-CS",
          date: "2027-02-14",
          createdAt: Date.now(),
          subjects: GATE_2027_CS_SYLLABUS,
        };
        updatedExams = [targetExam, ...exams];
        saveExams(updatedExams);
        setSelectedExamId(targetExam.id);
      } else {
        const examToUpdateId = activeExam?.id || targetExam.id;
        updateExamSyllabus(examToUpdateId, GATE_2027_CS_SYLLABUS);
        setSelectedExamId(examToUpdateId);
      }

      // Auto expand all chapters for clean immediate inspection
      const openMap: Record<string, boolean> = {};
      GATE_2027_CS_SYLLABUS.forEach((sub) => {
        sub.chapters.forEach((ch) => {
          openMap[ch.id] = true;
        });
      });
      setOpenChapters(openMap);
      setIsModalOpen(false);
      showToast("Loaded complete GATE 2027 CS & General Aptitude syllabus (11 Subjects)!");
    } catch (err) {
      console.error("Error loading default GATE syllabus:", err);
      alert("Failed to load default GATE syllabus.");
    }
  };

  // Robust Multi-Format Parser submission
  const handleBuildSyllabus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    try {
      const targetExam =
        exams.find((ex) => ex.id === modalExamId) || activeExam;
      const parsedSubjects = parseSyllabusOutline(
        rawText,
        targetExam ? targetExam.name : "General / Custom Topics"
      );

      if (parsedSubjects.length === 0) {
        alert("Unable to parse syllabus topics. Please check your text format.");
        return;
      }

      const examIdToUpdate = modalExamId || activeExam?.id || exams[0]?.id;
      updateExamSyllabus(examIdToUpdate, parsedSubjects);
      setSelectedExamId(examIdToUpdate);
      setIsModalOpen(false);
      setRawText("");

      // Auto expand all chapters
      const openMap: Record<string, boolean> = {};
      parsedSubjects.forEach((sub) => {
        sub.chapters.forEach((ch) => {
          openMap[ch.id] = true;
        });
      });
      setOpenChapters(openMap);
      showToast(
        `Added syllabus with ${parsedSubjects.length} subject(s) & persisted to workspace!`
      );
    } catch (error) {
      console.error("Error parsing syllabus text:", error);
      alert("An unexpected error occurred while parsing. Please try again.");
    }
  };

  const toggleChapter = (chId: string) => {
    setOpenChapters((prev) => ({ ...prev, [chId]: !prev[chId] }));
  };

  const handleClearSyllabus = () => {
    if (
      confirm(
        `Are you sure you want to reset the syllabus for "${
          activeExam?.name || "this exam"
        }"?`
      )
    ) {
      updateExamSyllabus(activeExam.id, []);
      showToast("Syllabus outline cleared.");
    }
  };

  if (!isLoaded)
    return (
      <div className="p-8 text-slate-400 font-semibold animate-pulse">
        Loading syllabus builder...
      </div>
    );

  // Calculate syllabus metrics
  let totalTopics = 0;
  let doneTopics = 0;
  let weeklyTopics = 0;

  if (activeExam?.subjects) {
    activeExam.subjects.forEach((s) => {
      s.chapters.forEach((c) => {
        totalTopics += c.microTopics.length;
        doneTopics += c.microTopics.filter((m) => m.isCompleted).length;
        weeklyTopics += c.microTopics.filter(
          (m) => m.isCompleted && m.completedThisWeek
        ).length;
      });
    });
  }

  const completionPct =
    totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

  return (
    <div className="p-8 space-y-8 flex-1">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

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
            Build dynamic, chapter-by-chapter checklists directly from pasted outlines or load official GATE 2027 curriculum.
          </p>
        </div>

        {/* Action Buttons: "Load Default GATE 2027 CS Syllabus" & "+ Add Syllabus" */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleLoadDefaultGateSyllabus}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-2xl transition shadow-md shadow-blue-600/25 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Load Default GATE 2027 CS Syllabus</span>
          </button>

          <button
            onClick={handleOpenModal}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-2xl transition shadow-md shadow-emerald-600/25 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Syllabus</span>
          </button>
        </div>
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

          <div className="flex items-center gap-3">
            {activeExam?.subjects?.length > 0 && (
              <span className="text-xs font-semibold text-slate-500">
                {activeExam.subjects.length} Subjects • {totalTopics} Micro-Topics
              </span>
            )}

            {activeExam?.subjects?.length > 0 && (
              <button
                onClick={handleClearSyllabus}
                className="text-xs font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer pr-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Outline</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {!activeExam || !activeExam.subjects || activeExam.subjects.length === 0 ? (
        /* 1. BLANK STATE */
        <div className="py-16 text-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-8 space-y-5 shadow-xs">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl">
            📖
          </div>
          <h3 className="text-lg font-black text-slate-900">
            No Syllabus Added Yet for {activeExam ? activeExam.name : "Your Exam"}
          </h3>
          <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
            Quickly get started by either loading the official <strong>GATE 2027 CS & General Aptitude Syllabus</strong> (covers 11 core subjects with full chapter drill-downs) or pasting your own custom outline!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleLoadDefaultGateSyllabus}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-2xl transition shadow-md shadow-blue-600/25 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Load Default GATE 2027 CS Syllabus</span>
            </button>

            <button
              onClick={handleOpenModal}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-2xl transition shadow-md shadow-emerald-600/25 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Paste Custom Outline</span>
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
                <span>Overall Syllabus Progress ({activeExam.name})</span>
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
            const subPct =
              subTotal > 0 ? Math.round((subDone / subTotal) * 100) : 0;

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
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-sm text-slate-900">
                          {sub.name}
                        </h3>
                        {sub.code && (
                          <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded">
                            {sub.code}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        {subDone} of {subTotal} micro-topics mastered ({sub.chapters.length} chapters)
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                    {subPct}%
                  </span>
                </div>

                {/* Chapters */}
                <div className="p-4 space-y-3.5">
                  {sub.chapters.map((ch) => {
                    const chTotal = ch.microTopics.length;
                    const chDone = ch.microTopics.filter(
                      (m) => m.isCompleted
                    ).length;
                    const chPct =
                      chTotal > 0 ? Math.round((chDone / chTotal) * 100) : 0;
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
                            <h4 className="font-bold text-xs text-slate-800">
                              {ch.title}
                            </h4>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 font-medium">
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
                                      toggleMicroTopic(
                                        activeExam.id,
                                        sub.id,
                                        ch.id,
                                        mt.id
                                      )
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
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
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

      {/* 3. ROBUST MULTI-FORMAT MODAL */}
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
                  <h3 className="font-black text-base text-slate-900">
                    Add Exam Syllabus
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Multi-Format Parser (Subject &gt; Topic, Subject: Topic, Plain Lines)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-base font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Default GATE 2027 Button Banner */}
            <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-bold text-xs text-blue-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Preparing for GATE 2027 CS?</span>
                </div>
                <p className="text-[11px] text-blue-700">
                  Load all 11 subjects (Math, COA, OS, Networks, DBMS, TOC, etc.) with 1 click.
                </p>
              </div>
              <button
                type="button"
                onClick={handleLoadDefaultGateSyllabus}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer shrink-0"
              >
                Load GATE 2027
              </button>
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

              {/* Multi-Format Textarea with Controlled State */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Paste Syllabus Text (Any Format)
                  </label>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-700">
                    <span>Try:</span>
                    <button
                      type="button"
                      onClick={handleInsertArrowSample}
                      className="hover:underline cursor-pointer bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200"
                    >
                      Subject &gt; Topic
                    </button>
                    <button
                      type="button"
                      onClick={handleInsertColonSample}
                      className="hover:underline cursor-pointer bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200"
                    >
                      Subject: Topic
                    </button>
                    <button
                      type="button"
                      onClick={handleInsertPlainSample}
                      className="hover:underline cursor-pointer bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200"
                    >
                      Plain Lines
                    </button>
                  </div>
                </div>

                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  rows={7}
                  required
                  placeholder={`Supports all formats:
1. Subject > Topic (e.g. Operating Systems > CPU Scheduling)
2. Subject: Topic (e.g. Computer Networks: TCP 3-Way Handshake)
3. Plain topics (e.g. Binary Search Trees)
4. AI outlines with # Headings & bullet lists`}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 font-mono focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              {/* Submit Action */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl transition shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Build & Save Syllabus</span>
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
