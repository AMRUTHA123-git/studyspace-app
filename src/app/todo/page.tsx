"use client";

import React, { useState } from "react";
import { useWorkspaceStorage } from "@/lib/storage";
import { CheckSquare, Plus, Trash2, Calendar, Check } from "lucide-react";
import { Task } from "@/lib/types";

export default function TodoPage() {
  const { tasks, saveTasks, isLoaded } = useWorkspaceStorage();
  const [currentCategory, setCurrentCategory] = useState<"today" | "tomorrow" | "upcoming">("today");
  const [newText, setNewText] = useState("");
  const [priority, setPriority] = useState<"urgent" | "high" | "medium">("high");

  const filtered = tasks.filter((t) => t.category === currentCategory);
  const completedCount = filtered.filter((t) => t.completed).length;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      text: newText.trim(),
      date: new Date().toISOString().split("T")[0],
      category: currentCategory,
      completed: false,
      priority,
      createdAt: Date.now(),
    };

    saveTasks([newTask, ...tasks]);
    setNewText("");
  };

  const handleToggle = (id: string) => {
    saveTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleDelete = (id: string) => {
    saveTasks(tasks.filter((t) => t.id !== id));
  };

  if (!isLoaded) return <div className="p-8 text-slate-400">Loading tasks...</div>;

  return (
    <div className="p-8 space-y-8 flex-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              To-Do <span className="text-blue-600">Task Manager</span>
            </h1>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              {completedCount} of {filtered.length} Done
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Focus your daily cognitive energy on prioritized study to-dos and revisions.
          </p>
        </div>

        {/* Category Tabs: Today, Tomorrow, Upcoming */}
        <div className="flex p-1 bg-white rounded-2xl border border-slate-200 shadow-sm text-xs font-bold">
          {(["today", "tomorrow", "upcoming"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCurrentCategory(cat)}
              className={`px-4 py-2 rounded-xl capitalize transition cursor-pointer ${
                currentCategory === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Add Task Card */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-600" />
            <span>Create New Task</span>
          </h3>

          <form onSubmit={handleAddTask} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Task Description
              </label>
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="e.g. Revise Dijkstra algorithm proofs..."
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Priority Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["urgent", "high", "medium"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`py-1.5 rounded-lg text-xs font-bold uppercase transition border ${
                      priority === p
                        ? p === "urgent"
                          ? "bg-rose-50 border-rose-300 text-rose-700"
                          : p === "high"
                          ? "bg-amber-50 border-amber-300 text-amber-700"
                          : "bg-blue-50 border-blue-300 text-blue-700"
                        : "border-slate-200 text-slate-400 bg-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition shadow-md shadow-blue-600/20 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add to {currentCategory}</span>
            </button>
          </form>
        </div>

        {/* Right: Task List */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900 capitalize">
            {currentCategory} Focus List
          </h3>

          {filtered.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 text-sm">
              ✨ All clear for {currentCategory}! Add a task to get in the zone.
            </div>
          ) : (
            filtered.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-2xl bg-white border transition shadow-sm flex items-center justify-between gap-3 ${
                  task.completed ? "border-slate-200 bg-slate-50/60" : "border-slate-200/90"
                }`}
              >
                <div
                  onClick={() => handleToggle(task.id)}
                  className="flex items-center gap-3.5 flex-1 cursor-pointer select-none"
                >
                  <div
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center transition ${
                      task.completed
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-slate-300 bg-white hover:border-blue-500"
                    }`}
                  >
                    {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <div>
                    <span
                      className={`text-sm font-semibold transition ${
                        task.completed ? "line-through text-slate-400" : "text-slate-800"
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                      task.priority === "urgent"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : task.priority === "high"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    {task.priority}
                  </span>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
