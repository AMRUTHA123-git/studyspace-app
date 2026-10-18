"use client";

import React, { useState } from "react";
import { useWorkspaceStorage } from "@/lib/storage";
import { TestFilterType, MockTestItem, MockTestQuestion } from "@/lib/types";
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
} from "lucide-react";

const FILTER_OPTIONS: { id: TestFilterType; label: string; icon: React.ElementType }[] = [
  { id: "Whole Syllabus", label: "Whole Syllabus", icon: BookOpen },
  { id: "Chapter Wise", label: "Chapter Wise", icon: Layers },
  { id: "Topic Wise", label: "Topic Wise", icon: FileText },
];

export default function TestsPage() {
  const { tests, saveTests, isLoaded } = useWorkspaceStorage();

  // Active filter state
  const [selectedFilter, setSelectedFilter] = useState<TestFilterType>("Topic Wise");

  // Topic input state
  const [topicsInput, setTopicsInput] = useState("");

  // Filter view state for the grid
  const [viewFilter, setViewFilter] = useState<"ALL" | TestFilterType>("ALL");

  // Taking Test Modal state
  const [activeTestForTaking, setActiveTestForTaking] = useState<MockTestItem | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  // Helper generator to construct realistic test questions from the user's topics
  const generateQuestionsForTopics = (topicsStr: string): MockTestQuestion[] => {
    const rawList = topicsStr
      .split(/[,;\n]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    const primaryTopic = rawList[0] || "Core Concepts";
    const secondaryTopic = rawList[1] || primaryTopic;

    return [
      {
        id: `q-1-${Date.now()}`,
        question: `In the study of ${primaryTopic}, which of the following statements represents a fundamental principle?`,
        options: [
          `The primary theorem governing ${primaryTopic} states that operational efficiency scales linearly with input size.`,
          `All basic constraints must be satisfied simultaneously under standard invariant conditions.`,
          `The secondary parameter strictly negates the primary state transition.`,
          `No boundary condition applies when operating under equilibrium.`,
        ],
        correctOptionIndex: 1,
      },
      {
        id: `q-2-${Date.now()}`,
        question: `When analyzing a practical problem in ${primaryTopic}, what is the recommended first step?`,
        options: [
          `Decompose the problem into atomic components and verify edge conditions.`,
          `Ignore input constraints until the final verification stage.`,
          `Apply an asymptotic upper bound without defining standard parameters.`,
          `Reverse the sequence of transformations arbitrarily.`,
        ],
        correctOptionIndex: 0,
      },
      {
        id: `q-3-${Date.now()}`,
        question: `How does ${secondaryTopic} complement the theoretical foundations of ${primaryTopic}?`,
        options: [
          `It acts as an independent subsystem with no shared state.`,
          `It provides an analytical framework to validate correctness and performance benchmarks.`,
          `It completely supersedes the fundamental axioms of the domain.`,
          `It requires redundant execution loops to guarantee convergence.`,
        ],
        correctOptionIndex: 1,
      },
      {
        id: `q-4-${Date.now()}`,
        question: `Which of the following common pitfalls should be avoided when evaluating ${primaryTopic}?`,
        options: [
          `Failing to account for boundary conditions and off-by-one errors.`,
          `Writing unit tests for each transformation step.`,
          `Documenting operational assumptions clearly.`,
          `Comparing experimental results with theoretical lower bounds.`,
        ],
        correctOptionIndex: 0,
      },
      {
        id: `q-5-${Date.now()}`,
        question: `What is the expected complexity or outcome when synthesizing ${primaryTopic} with ${secondaryTopic}?`,
        options: [
          `The combined system achieves predictable, deterministic behavior within specified tolerances.`,
          `The problem space becomes non-computable in polynomial time.`,
          `All previously verified invariant states become invalid.`,
          `The runtime decreases to zero regardless of workload.`,
        ],
        correctOptionIndex: 0,
      },
    ];
  };

  const handleGenerateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicsInput.trim()) return;

    const trimmedTopics = topicsInput.trim();
    const generatedQuestions = generateQuestionsForTopics(trimmedTopics);

    const newTest: MockTestItem = {
      id: `test-${Date.now()}`,
      title: `Test on: ${trimmedTopics.split(/[,;\n]+/)[0]?.trim() || "Studied Topics"}`,
      topics: trimmedTopics,
      filterType: selectedFilter,
      questionCount: generatedQuestions.length,
      durationMinutes: 15,
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
    if (!activeTestForTaking) return { correct: 0, total: 0, scorePct: 0 };
    let correct = 0;
    activeTestForTaking.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correct++;
      }
    });
    const total = activeTestForTaking.questions.length;
    const scorePct = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { correct, total, scorePct };
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
              Practice <span className="text-rose-600">Tests</span>
            </h1>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
              AI Test Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generate customized practice tests based on what you studied today across syllabus, chapters, or micro-topics.
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

        {/* Core Feature 2: Topic Input Form */}
        <form onSubmit={handleGenerateTest} className="space-y-4 pt-1">
          <div>
            <label className="block text-sm font-extrabold text-slate-900 mb-1">
              What topics have you studied today?
            </label>
            <p className="text-xs text-slate-500 mb-2.5">
              Type the names of the topics or concepts (e.g. <em>Boolean Algebra, K-Maps, De Morgan's Laws</em>).
            </p>
            <textarea
              value={topicsInput}
              onChange={(e) => setTopicsInput(e.target.value)}
              rows={3}
              required
              placeholder="e.g. TCP 3-Way Handshake, Congestion Control, Fast Retransmit..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <span className="text-xs text-slate-400 font-medium">
              Filter: <strong className="text-slate-700">{selectedFilter}</strong> • Generates 5 targeted questions with strict scoring.
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-extrabold text-sm rounded-2xl transition shadow-md shadow-rose-600/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Mock Test</span>
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
              Review and launch mock tests customized to your study sessions.
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

        {/* Core Feature 4: Test Cards Grid */}
        {displayedTests.length === 0 ? (
          <div className="py-16 text-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-8 space-y-3 shadow-xs">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-2xl">
              📝
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              No Mock Tests Found
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Type the topics you studied today in the form above and click <strong>Generate Mock Test</strong> to build your first practice session.
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
                    {/* Badge showing the filter type */}
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

                    {/* Test Title with Selected Topics */}
                    <h3 className="font-extrabold text-base text-slate-900 leading-snug group-hover:text-rose-600 transition line-clamp-2">
                      {test.title}
                    </h3>

                    {/* Topics covered pill */}
                    <p className="text-xs text-slate-500 font-medium line-clamp-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <strong>Topics:</strong> {test.topics}
                    </p>
                  </div>

                  {/* Metadata & Take Test Action Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{test.durationMinutes} Mins</span>
                      <span>•</span>
                      <span>{test.questionCount} Questions</span>
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

      {/* 4. Interactive "Take Test" Modal Drawer */}
      {activeTestForTaking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-7 max-w-2xl w-full shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
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
                  {activeTestForTaking.questions.length} Questions • 15 Minutes
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
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-emerald-900">
                      Test Completed!
                    </h4>
                    <p className="text-xs text-emerald-700">
                      You scored {calculateScore().correct} out of {calculateScore().total} ({calculateScore().scorePct}%)
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-3 py-1 rounded-xl border border-emerald-200">
                  {calculateScore().scorePct >= 70 ? "Passing Grade 🎉" : "Needs Review 📚"}
                </span>
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
                    className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {qIndex + 1}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 leading-snug">
                        {q.question}
                      </h4>
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
                              "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                          } else if (isChosen && !isCorrect) {
                            optionStyle =
                              "bg-rose-50 border-rose-300 text-rose-700 line-through";
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
                  </div>
                );
              })}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-medium">
                {Object.keys(selectedAnswers).length} of {activeTestForTaking.questions.length} Answered
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
