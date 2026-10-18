"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Plus,
  CheckCircle2,
  Circle,
  Trash2,
  Clock,
  GraduationCap,
  Sparkles,
  X,
} from "lucide-react";
import { Exam, Task } from "@/lib/types";
import { useWorkspaceStorage } from "@/lib/storage";

interface CalendarWidgetProps {
  exams?: Exam[];
}

export function CalendarWidget({ exams: propExams }: CalendarWidgetProps) {
  const { exams: storageExams, tasks, saveTasks, saveExams } = useWorkspaceStorage();
  const exams = propExams || storageExams;

  // 1. Current viewed month/year in React state
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  // Selected date for viewing / adding reminders
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Quick-add form states for the selected date
  const [activeTab, setActiveTab] = useState<"reminder" | "exam">("reminder");
  const [reminderText, setReminderText] = useState("");
  const [reminderPriority, setReminderPriority] = useState<"urgent" | "high" | "medium">("high");
  const [examName, setExamName] = useState("");
  const [examCode, setExamCode] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Real today
  const today = new Date();

  // Navigation handlers with year rollovers
  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleGoToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
  };

  // Month & Year calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Days in month and starting day index (0 = Sun, 1 = Mon ... 6 = Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  // Trailing previous month days
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const prevMonthFiller = Array.from({ length: startDay }).map((_, i) => {
    return daysInPrevMonth - startDay + 1 + i;
  });

  // Helper date formatter
  const formatDateKey = (d: Date): string => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const selectedDateStr = formatDateKey(selectedDate);

  // Find exams and tasks for the selected date
  const selectedDateExams = exams.filter((e) => e.date === selectedDateStr);
  const selectedDateTasks = tasks.filter((t) => t.date === selectedDateStr);

  // Month name display
  const monthYearTitle = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Adding reminder for selected date
  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderText.trim()) return;

    const isToday = formatDateKey(today) === selectedDateStr;
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const isTomorrow = formatDateKey(tomorrow) === selectedDateStr;

    const category: "today" | "tomorrow" | "upcoming" = isToday
      ? "today"
      : isTomorrow
      ? "tomorrow"
      : "upcoming";

    const newTask: Task = {
      id: `task-${Date.now()}`,
      text: reminderText.trim(),
      date: selectedDateStr,
      category,
      completed: false,
      priority: reminderPriority,
      createdAt: Date.now(),
    };

    saveTasks([newTask, ...tasks]);
    setReminderText("");
    setShowAddForm(false);
  };

  // Adding exam for selected date
  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examName.trim()) return;

    const newExam: Exam = {
      id: `exam-${Date.now()}`,
      name: examName.trim(),
      code: examCode.trim() || "EXAM",
      date: selectedDateStr,
      createdAt: Date.now(),
      subjects: [
        {
          id: `sub-${Date.now()}`,
          name: examName.trim(),
          code: examCode.trim() || "MOD-1",
          chapters: [],
        },
      ],
    };

    saveExams([...exams, newExam]);
    setExamName("");
    setExamCode("");
    setShowAddForm(false);
  };

  const handleToggleTask = (id: string) => {
    saveTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    saveTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-blue-600" />
            <span>Interactive Calendar</span>
          </h3>
          <p className="text-xs text-slate-400">
            Click any date to view and schedule target exams & reminders
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick jump to Today */}
          <button
            onClick={handleGoToday}
            className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition cursor-pointer"
            title="Jump to current date"
          >
            Today
          </button>

          {/* Previous / Next Month Navigation */}
          <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
            <button
              onClick={handlePrevMonth}
              aria-label="Previous Month"
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-xs transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-bold text-xs text-slate-800 min-w-[115px] text-center select-none">
              {monthYearTitle}
            </span>

            <button
              onClick={handleNextMonth}
              aria-label="Next Month"
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-xs transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid: 7 Columns (Sunday to Saturday) */}
      <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
        {/* Day of Week Headers */}
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="font-extrabold text-slate-400 py-1.5 uppercase tracking-wider text-[11px]">
            {day}
          </div>
        ))}

        {/* Previous Month Filler */}
        {prevMonthFiller.map((dayNum, i) => (
          <div
            key={`prev-${i}`}
            className="py-2.5 rounded-xl text-slate-300 font-medium select-none text-[11px]"
          >
            {dayNum}
          </div>
        ))}

        {/* Current Month Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const cellDate = new Date(year, month, dayNum);
          const cellDateStr = formatDateKey(cellDate);

          const isActualToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === dayNum;

          const isSelected =
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month &&
            selectedDate.getDate() === dayNum;

          const dayExams = exams.filter((e) => e.date === cellDateStr);
          const dayTasks = tasks.filter((t) => t.date === cellDateStr);
          const hasExam = dayExams.length > 0;
          const hasTask = dayTasks.length > 0;

          return (
            <button
              key={`day-${dayNum}`}
              type="button"
              onClick={() => setSelectedDate(cellDate)}
              className={`py-2 rounded-xl text-xs font-bold transition relative cursor-pointer flex flex-col items-center justify-center min-h-[42px] border ${
                isSelected
                  ? "border-blue-600 bg-blue-50 text-blue-900 shadow-xs ring-2 ring-blue-500/30"
                  : isActualToday
                  ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/25"
                  : hasExam
                  ? "border-amber-300 bg-amber-50 text-amber-950 font-black hover:bg-amber-100/70"
                  : "border-transparent text-slate-700 hover:bg-slate-100 hover:border-slate-200"
              }`}
            >
              <span>{dayNum}</span>

              {/* Badges / Dots Indicator */}
              <div className="flex items-center gap-1 mt-0.5">
                {hasExam && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActualToday ? "bg-amber-300" : "bg-amber-500"
                    }`}
                    title="Target Exam Scheduled"
                  />
                )}
                {hasTask && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActualToday ? "bg-white" : "bg-blue-500"
                    }`}
                    title="Study Reminder"
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Calendar Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-slate-500 border-t border-slate-100 font-medium">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Today
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Target Exam
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Reminder / Task
          </span>
        </div>
        <span className="text-[10px] text-slate-400">
          Showing: {monthYearTitle}
        </span>
      </div>

      {/* 5. Selected Date Panel: View & Add Reminders / Exams */}
      <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-blue-600" />
            <h4 className="text-xs font-extrabold text-slate-900">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </h4>
            {formatDateKey(today) === selectedDateStr && (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                Today
              </span>
            )}
          </div>

          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs hover:shadow-xs transition cursor-pointer"
          >
            {showAddForm ? (
              <>
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add Event</span>
              </>
            )}
          </button>
        </div>

        {/* Collapsible Add Form */}
        {showAddForm && (
          <div className="bg-white p-3.5 rounded-xl border border-blue-200 shadow-xs space-y-3">
            <div className="flex gap-2 border-b border-slate-100 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab("reminder")}
                className={`text-xs font-bold px-3 py-1 rounded-lg transition cursor-pointer ${
                  activeTab === "reminder"
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Reminder / Task
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("exam")}
                className={`text-xs font-bold px-3 py-1 rounded-lg transition cursor-pointer ${
                  activeTab === "exam"
                    ? "bg-amber-500 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Target Exam
              </button>
            </div>

            {activeTab === "reminder" ? (
              <form onSubmit={handleAddReminder} className="space-y-2.5">
                <input
                  type="text"
                  value={reminderText}
                  onChange={(e) => setReminderText(e.target.value)}
                  placeholder="e.g. Revise Virtual Memory & Page Replacement"
                  required
                  className="w-full text-xs p-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-800"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="font-semibold text-[11px]">Priority:</span>
                    <select
                      value={reminderPriority}
                      onChange={(e) => setReminderPriority(e.target.value as any)}
                      className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-0.5 text-slate-700"
                    >
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition shadow-xs cursor-pointer"
                  >
                    Save Reminder
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleAddExam} className="space-y-2.5">
                <input
                  type="text"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  placeholder="e.g. GATE CS Full Mock Exam"
                  required
                  className="w-full text-xs p-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-amber-500 text-slate-800"
                />
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={examCode}
                    onChange={(e) => setExamCode(e.target.value)}
                    placeholder="Code: e.g. CS-2027"
                    className="flex-1 text-xs p-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-amber-500 text-slate-800"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-lg transition shadow-xs cursor-pointer shrink-0"
                  >
                    Schedule Exam
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* List of items on this date */}
        <div className="space-y-2">
          {selectedDateExams.length === 0 && selectedDateTasks.length === 0 ? (
            <p className="text-xs text-slate-400 py-1 text-center font-medium">
              No target exams or reminders scheduled for this date.
            </p>
          ) : (
            <>
              {/* Exams on this date */}
              {selectedDateExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <span className="font-black text-amber-950">{exam.name}</span>
                      <span className="text-[10px] font-mono text-amber-700 ml-1.5 font-bold">
                        ({exam.code || "EXAM"})
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                    Exam Day
                  </span>
                </div>
              ))}

              {/* Tasks / Reminders on this date */}
              {selectedDateTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2 text-xs"
                >
                  <div
                    onClick={() => handleToggleTask(task.id)}
                    className="flex items-center gap-2 cursor-pointer flex-1 min-w-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                    )}
                    <span
                      className={`truncate font-medium ${
                        task.completed ? "line-through text-slate-400" : "text-slate-800"
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        task.priority === "urgent"
                          ? "bg-rose-100 text-rose-700"
                          : task.priority === "high"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-slate-300 hover:text-rose-500 p-1 transition cursor-pointer"
                      title="Delete reminder"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
