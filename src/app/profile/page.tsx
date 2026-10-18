"use client";

import React, { useState } from "react";
import { useWorkspaceStorage } from "@/lib/storage";
import { User, Edit3, Check, Upload, GraduationCap, Flame, ShieldCheck } from "lucide-react";

const AVATAR_PRESETS = ["🎓", "⚡", "🚀", "💻", "💡", "🧠"];

export default function ProfilePage() {
  const { profile, saveProfile, isLoaded } = useWorkspaceStorage();
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [study, setStudy] = useState("");
  const [targetExam, setTargetExam] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🎓");
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  const startEdit = () => {
    setName(profile.name);
    setStudy(profile.study);
    setTargetExam(profile.targetExam);
    setSelectedAvatar(profile.avatar);
    setAvatarImage(profile.avatarImage);
    setIsEditing(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setAvatarImage(evt.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    saveProfile({
      ...profile,
      name: name.trim(),
      study: study.trim() || "Student",
      targetExam: targetExam.trim() || "Target Exams",
      avatar: selectedAvatar,
      avatarImage,
    });
    setIsEditing(false);
  };

  if (!isLoaded) return <div className="p-8 text-slate-400">Loading profile...</div>;

  return (
    <div className="p-8 space-y-8 flex-1">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Student <span className="text-teal-600">Profile</span>
            </h1>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
              Verified Scholar
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Personal learning identity, current academic milestones, and study streaks.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={startEdit}
            className="px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-sm transition flex items-center gap-2 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-2xl">
        {isEditing ? (
          <form
            onSubmit={handleSave}
            className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5"
          >
            <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">
              Update Student Information
            </h3>

            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Avatar / Profile Picture
              </label>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-3xl overflow-hidden shadow-inner shrink-0">
                  {avatarImage ? (
                    <img src={avatarImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span>{selectedAvatar}</span>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {avatarImage && (
                    <button
                      type="button"
                      onClick={() => setAvatarImage(null)}
                      className="block text-[11px] text-rose-500 hover:underline"
                    >
                      Remove uploaded image
                    </button>
                  )}
                </div>
              </div>

              {/* Presets */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 mr-1">Or choose:</span>
                {AVATAR_PRESETS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setSelectedAvatar(emoji);
                      setAvatarImage(null);
                    }}
                    className={`w-9 h-9 rounded-xl text-lg border transition ${
                      selectedAvatar === emoji && !avatarImage
                        ? "bg-teal-50 border-teal-500 shadow-sm"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Study Status</label>
              <input
                type="text"
                value={study}
                onChange={(e) => setStudy(e.target.value)}
                placeholder="e.g. B.Tech Computer Science (3rd Year)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Goals / Exams</label>
              <input
                type="text"
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                placeholder="e.g. GATE CS 2027 & Semester Finals"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition shadow-md shadow-teal-600/20 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          /* Profile Card View */
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 space-y-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-3xl bg-amber-100 border border-amber-200 flex items-center justify-center text-4xl overflow-hidden shadow-sm shrink-0">
                {profile.avatarImage ? (
                  <img src={profile.avatarImage} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{profile.avatar}</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-slate-900">{profile.name}</h2>
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                </div>
                <p className="text-sm font-semibold text-slate-500 mt-0.5">{profile.study}</p>
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-bold text-xs">
                  <span>🎯 Target:</span>
                  <span>{profile.targetExam}</span>
                </div>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-2xl font-black text-slate-900">14 Days</div>
                <div className="text-xs font-bold text-slate-400 mt-1 flex items-center justify-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> Active Streak
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-2xl font-black text-teal-700">Level 7</div>
                <div className="text-xs font-bold text-slate-400 mt-1">
                  Scholar Ranking
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
