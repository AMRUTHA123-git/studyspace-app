"use client";

import React, { useState } from "react";
import { useWorkspaceStorage } from "@/lib/storage";
import { TestFilterType, MockTestItem, MockTestQuestion } from "@/lib/types";
import { generateGateMockTest } from "@/lib/gateQuestionsBank";
import {
  ClipboardCheck,
  Sparkles,
  BookOpen,
  Layers,
  FileText,
  Play,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Calculator,
  Award,
  Zap,
  Tag,
} from "lucide-react";

const FILTER_OPTIONS: { id: TestFilterType; label: string; icon: React.ElementType }[] = [
  { id: "Whole Syllabus", label: "Whole Syllabus", icon: BookOpen },
  { id: "Chapter Wise", label: "Chapter Wise", icon: Layers },
  { id: "Topic Wise", label: "Topic Wise", icon: FileText },
];

const QUICK_COUNTS = [5, 10, 15, 25, 30, 65];

const QUICK_TOPIC_CHIPS = [
  "Cache Memory & AMAT",
  "Paging & Virtual Memory",
  "CPU Scheduling (SRTF / RR)",
  "TCP Congestion Control & Window",
  "CIDR Subnetting & IP",
  "Master Theorem & Recurrences",
  "Binary Search Trees & Traversal",
  "K-Maps & Prime Implicants",
  "Eigenvalues & Linear Algebra",
  "Probability & Bayes Theorem",
  "DFA Minimization & Decidability",
  "Normalization & Candidate Keys",
  "B+ Tree Indexing",
  "LL(1) & LR Parsing",
];

export default function TestsPage() {
  const { tests, saveTests, isLoaded } = useWorkspaceStorage();

  // Active filter state
  const [selectedFilter, setSelectedFilter] = useState<TestFilterType>("Topic Wise");

  // Topic input state
  const [topicsInput, setTopicsInput] = useState("");

  // Question count state (Fix 3: selector for 5, 10, 15, 25, 30, 65 or custom)
  const [questionCount, setQuestionCount] = useState<number>(10);

  // Filter view state for the grid
  const [viewFilter, setViewFilter] = useState<"ALL" | TestFilterType>("ALL");

  // Taking Test Modal state
  const [activeTestForTaking, setActiveTestForTaking] = useState<MockTestItem | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  // Duration in minutes calculated based on GATE benchmark (approx 2.75 min/question or 180m for full 65Q)
  const calculateDuration = (count: number): number => {
    if (count >= 65) return 180;
    return Math.max(10, Math.round(count * 2.75));
  };

  const handleChipClick = (chip: string) => {
    if (!topicsInput.trim()) {
      setTopicsInput(chip);
    } else if (!topicsInput.includes(chip)) {
      setTopicsInput(`${topicsInput}, ${chip}`);
    }
  };

  const handleGenerateTest = (e: React.FormEvent) => {
    e.preventDefault();

    let finalTopics = topicsInput.trim();
    if (selectedFilter === "Whole Syllabus" && !finalTopics) {
      finalTopics = "All 11 GATE CS Subjects (Math, COA, OS, Networks, DBMS, DS, Algo, TOC, CD, Digital, GA)";
    }

    if (!finalTopics) {
      alert("Please enter or select at least one topic or chapter.");
      return;
    }

    const exactCount = Math.max(1, questionCount || 10);
    const duration = calculateDuration(exactCount);

    // Call authentic GATE questions generator
    const generatedQuestions = generateGateMockTest(
      selectedFilter,
      finalTopics,
      exactCount
    );

    const firstTopic = finalTopics.split(/[,;\n]+/)[0]?.trim() || "GATE CS";
    const testTitle =
      selectedFilter === "Whole Syllabus"
        ? `GATE CS Full-Length Mock (${exactCount} Qs)`
        : selectedFilter === "Chapter Wise"
        ? `GATE Chapter Drill: ${firstTopic}`
        : `GATE Topic Test: ${firstTopic}`;

    const newTest: MockTestItem = {
      id: `test-${Date.now()}`,
      title: testTitle,
      topics: finalTopics,
      filterType: selectedFilter,
      questionCount: generatedQuestions.length,
      durationMinutes: duration,
      createdAt: Date.now(),
      questions: generatedQuestions,
    };

    saveTests([newTest, ...tests]);
    setTopicsInput("");
  };

  const handleDeleteTest = (id: string) => {
    saveTests(tests.filter((t) => t.id !== id));
  };

  const handleStartTakingTest = (test: MockTestItem) => {
    setActiveTestForTaking(test);
    setSelectedAnswers({});
    setTestSubmitted(false);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (testSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitTest = () => {
    setTestSubmitted(true);
  };

  const calculateScore = () => {
    if (!activeTestForTaking) return { correct: 0, total: 0, scorePct: 0, wrong: 0, unattempted: 0 };
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    activeTestForTaking.questions.forEach((q) => {
      const chosen = selectedAnswers[q.id];
      if (chosen === undefined) {
        unattempted++;
      } else if (chosen === q.correctOptionIndex) {
        correct++;
      } else {
        wrong++;
      }
    });

    const total = activeTestForTaking.questions.length;
    const scorePct = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { correct, wrong, unattempted, total, scorePct };
  };

  // Filtered list for the display grid
  const displayedTests =
    viewFilter === "ALL" ? tests : tests.filter((t) => t.filterType === viewFilter);

  if (!isLoaded) {
    return (
      <div className="p-8 text-slate-400 font-semibold animate-pulse">
        Loading Practice Tests...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 flex-1">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              GATE <span className="text-rose-600">Mock Test Generator</span>
            </h1>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
              GATE Rigor Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generate authentic GATE-level mock tests with NAT calculations, conceptual MSQs, and comprehensive step-by-step solutions.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-xs text-xs font-bold text-slate-600">
          <ClipboardCheck className="w-4 h-4 text-rose-500" />
          <span>{tests.length} Generated Tests</span>
        </div>
      </div>

      {/* 2. Top Section: Filters & Topic Input Form Card */}
      <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        {/* Core Feature 1: Filter Selection Toggle */}
        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400">
            1. Select Test Scope
          </label>
          <div className="flex flex-wrap gap-2.5">
            {FILTER_OPTIONS.map((filter) => {
              const Icon = filter.icon;
              const isSelected = selectedFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer border ${
                    isSelected
                      ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-slate-500"}`} />
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Core Feature 2: Question Count Selector (Fix 3 Requirement 1) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400">
              2. Number of Questions
            </label>
            <span className="text-xs font-bold text-rose-600 font-mono">
              Estimated Duration: {calculateDuration(questionCount)} Mins
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {QUICK_COUNTS.map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => setQuestionCount(cnt)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer border ${
                  questionCount === cnt
                    ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cnt} Qs {cnt === 65 && "(Full Mock)"}
              </button>
            ))}

            {/* Custom Count Input */}
            <div className="flex items-center gap-1.5 ml-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1">
              <span className="text-[11px] font-bold text-slate-500">Custom:</span>
              <input
                type="number"
                min={1}
                max={100}
                value={questionCount}
                onChange={(e) => setQuestionCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-14 text-xs font-extrabold text-slate-900 bg-white border border-slate-200 rounded px-1.5 py-1 text-center focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>
        </div>

        {/* Core Feature 3: Topic Input Form & Quick Chips */}
        <form onSubmit={handleGenerateTest} className="space-y-4 pt-1">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-extrabold text-slate-900">
                {selectedFilter === "Whole Syllabus"
                  ? "Syllabus Scope (All 11 GATE CS Subjects)"
                  : "Target Topics or Chapters"}
              </label>
              <span className="text-[11px] text-slate-400">
                {selectedFilter === "Whole Syllabus"
                  ? "Covers entire GATE CS curriculum"
                  : "Click quick tags or type custom concepts"}
              </span>
            </div>

            {selectedFilter !== "Whole Syllabus" && (
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {QUICK_TOPIC_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleChipClick(chip)}
                    className="text-[11px] font-semibold bg-rose-50/70 hover:bg-rose-100 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-lg transition cursor-pointer"
                  >
                    + {chip}
                  </button>
                ))}
              </div>
            )}

            <textarea
              value={topicsInput}
              onChange={(e) => setTopicsInput(e.target.value)}
              rows={3}
              placeholder={
                selectedFilter === "Whole Syllabus"
                  ? "Generating full GATE CS exam covering Math, GA, COA, OS, Networks, DBMS, TOC, Compiler, Algorithms, Digital Logic..."
                  : "e.g. Cache Memory & AMAT, Paging & TLB EMAT, Dijkstra Shortest Path, K-Maps..."
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition leading-relaxed font-mono"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <span className="text-xs text-slate-500 font-medium">
              Generating <strong className="text-slate-800">{questionCount} authentic GATE questions</strong> (NAT Numericals + Conceptual MSQ + MCQ).
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-extrabold text-xs rounded-2xl transition shadow-md shadow-rose-600/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate GATE Mock ({questionCount} Qs)</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. Test Dashboard Grid Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-black text-slate-900">
              Mock Test Dashboard
            </h2>
            <p className="text-xs text-slate-500">
              Launch real GATE mock tests or review your completed scores.
            </p>
          </div>

          {/* Quick Filter Pill Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs text-xs font-bold">
            {(["ALL", "Whole Syllabus", "Chapter Wise", "Topic Wise"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setViewFilter(opt)}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  viewFilter === opt
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {opt === "ALL" ? "All Tests" : opt}
              </button>
            ))}
          </div>
        </div>

        {/* Test Cards Grid */}
        {displayedTests.length === 0 ? (
          <div className="py-16 text-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-8 space-y-3 shadow-xs">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-2xl">
              📝
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              No Mock Tests Found
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Select your question count and topics above to generate your first authentic GATE practice test.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedTests.map((test) => {
              const filterBadgeStyles = {
                "Whole Syllabus": "bg-purple-50 text-purple-700 border-purple-200",
                "Chapter Wise": "bg-blue-50 text-blue-700 border-blue-200",
                "Topic Wise": "bg-rose-50 text-rose-700 border-rose-200",
              };

              return (
                <div
                  key={test.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2.5">
                    {/* Badge showing filter type and questions count */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                          filterBadgeStyles[test.filterType]
                        }`}
                      >
                        {test.filterType}
                      </span>
                      <button
                        onClick={() => handleDeleteTest(test.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 rounded-lg hover:bg-rose-50 transition"
                        title="Delete Test"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Test Title */}
                    <h3 className="font-extrabold text-base text-slate-900 leading-snug group-hover:text-rose-600 transition line-clamp-2">
                      {test.title}
                    </h3>

                    {/* Topics covered */}
                    <p className="text-xs text-slate-500 font-medium line-clamp-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <strong>Focus:</strong> {test.topics}
                    </p>
                  </div>

                  {/* Metadata & Take Test Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{test.durationMinutes} Mins</span>
                      <span>•</span>
                      <span className="font-bold text-slate-700">
                        {test.questionCount} Questions
                      </span>
                    </div>

                    <button
                      onClick={() => handleStartTakingTest(test)}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition shadow-sm shadow-rose-600/20 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Take Test</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Interactive "Take Test" Modal Drawer with Full Solutions */}
      {activeTestForTaking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-7 max-w-3xl w-full shadow-2xl border border-slate-200 space-y-6 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                  {activeTestForTaking.filterType}
                </span>
                <h3 className="font-black text-lg text-slate-900 mt-1">
                  {activeTestForTaking.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {activeTestForTaking.questions.length} Questions • {activeTestForTaking.durationMinutes} Minutes Allotted
                </p>
              </div>
              <button
                onClick={() => setActiveTestForTaking(null)}
                className="text-slate-400 hover:text-slate-700 text-base font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Score Banner when Submitted */}
            {testSubmitted && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-emerald-950">
                        Test Completed & Evaluated!
                      </h4>
                      <p className="text-xs text-emerald-700">
                        Score: <strong>{calculateScore().correct}</strong> of <strong>{calculateScore().total}</strong> correct ({calculateScore().scorePct}%) • {calculateScore().wrong} incorrect • {calculateScore().unattempted} skipped
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-900 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
                    {calculateScore().scorePct >= 70
                      ? "GATE Rank Target 🎉"
                      : calculateScore().scorePct >= 40
                      ? "Solid Progress 📈"
                      : "Review Topics 📚"}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-800 bg-white/70 p-2.5 rounded-xl border border-emerald-200/60 font-medium">
                  💡 <strong>Detailed Solutions Available:</strong> Scroll down to review the step-by-step mathematical explanations and derivations for every question.
                </div>
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-6">
              {activeTestForTaking.questions.map((q, qIndex) => {
                const selectedOpt = selectedAnswers[q.id];
                const isAnswered = selectedOpt !== undefined;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3.5"
                  >
                    {/* Question Header & Type Tag */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {qIndex + 1}
                        </span>
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm text-slate-900 leading-snug whitespace-pre-line">
                            {q.question}
                          </h4>
                          {q.subject && (
                            <span className="text-[10px] text-slate-400 font-semibold block">
                              {q.subject} {q.topic ? `• ${q.topic}` : ""}
                            </span>
                          )}
                        </div>
                      </div>

                      {q.type && (
                        <span
                          className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border shrink-0 ${
                            q.type === "NAT" || q.type === "Numerical"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : q.type === "MSQ"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}
                        >
                          {q.type}
                        </span>
                      )}
                    </div>

                    {/* Multiple-Choice Options */}
                    <div className="space-y-2 pl-8">
                      {q.options.map((opt, optIndex) => {
                        const isChosen = selectedOpt === optIndex;
                        const isCorrect = optIndex === q.correctOptionIndex;

                        let optionStyle =
                          "bg-white border-slate-200 hover:border-rose-400 text-slate-800";
                        if (isChosen) {
                          optionStyle =
                            "bg-rose-50 border-rose-500 text-rose-900 font-semibold shadow-xs";
                        }
                        if (testSubmitted) {
                          if (isCorrect) {
                            optionStyle =
                              "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold";
                          } else if (isChosen && !isCorrect) {
                            optionStyle =
                              "bg-rose-50 border-rose-300 text-rose-800 line-through";
                          } else {
                            optionStyle = "bg-white border-slate-200 text-slate-400 opacity-60";
                          }
                        }

                        return (
                          <div
                            key={optIndex}
                            onClick={() => handleSelectOption(q.id, optIndex)}
                            className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between select-none ${optionStyle}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center font-bold text-[10px] bg-slate-50 text-slate-600">
                                {String.fromCharCode(65 + optIndex)}
                              </span>
                              <span>{opt}</span>
                            </div>

                            {testSubmitted && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {testSubmitted && isChosen && !isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Step-by-Step Solution & Derivation (Visible after Submission) */}
                    {testSubmitted && q.explanation && (
                      <div className="ml-8 p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1 text-xs">
                        <div className="font-extrabold text-blue-900 flex items-center gap-1.5">
                          <Calculator className="w-3.5 h-3.5 text-blue-600" />
                          <span>Step-by-Step Solution & GATE Derivation:</span>
                        </div>
                        <p className="text-blue-800 text-[11px] leading-relaxed whitespace-pre-line font-mono">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-medium">
                {Object.keys(selectedAnswers).length} of {activeTestForTaking.questions.length} Attempted
              </span>

              <div className="flex items-center gap-3">
                {!testSubmitted ? (
                  <button
                    onClick={handleSubmitTest}
                    className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl transition shadow-md shadow-rose-600/20 cursor-pointer"
                  >
                    Submit Test
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTestForTaking(null)}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    Close Test
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
