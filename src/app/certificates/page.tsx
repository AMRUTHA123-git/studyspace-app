"use client";

import React, { useState } from "react";
import { useWorkspaceStorage } from "@/lib/storage";
import { Award, Plus, Trash2, Upload, ExternalLink, ShieldCheck } from "lucide-react";
import { Certificate } from "@/lib/types";

export default function CertificatesPage() {
  const { certs, saveCerts, isLoaded } = useWorkspaceStorage();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [tag, setTag] = useState("Course");
  const [badgeEmoji, setBadgeEmoji] = useState("🏆");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setUploadedImage(evt.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issuer.trim()) return;

    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      title: title.trim(),
      issuer: issuer.trim(),
      issueDate: issueDate || "Oct 2026",
      tag,
      badgeEmoji,
      imageUrl: uploadedImage || undefined,
    };

    saveCerts([newCert, ...certs]);
    setShowUploadModal(false);
    setTitle("");
    setIssuer("");
    setIssueDate("");
    setUploadedImage(null);
  };

  const handleDelete = (id: string) => {
    saveCerts(certs.filter((c) => c.id !== id));
  };

  if (!isLoaded) return <div className="p-8 text-slate-400">Loading certificates...</div>;

  return (
    <div className="p-8 space-y-8 flex-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Certificates & <span className="text-purple-600">Vault</span>
            </h1>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
              {certs.length} Verified
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visual showcase of earned course completions, honors, and verified credentials.
          </p>
        </div>

        {/* Upload Action */}
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-2xl transition shadow-md shadow-purple-600/20 cursor-pointer flex items-center gap-2 shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Certificate</span>
        </button>
      </div>

      {/* Visual Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
          >
            {/* Top Certificate Header or Image Banner */}
            <div className="p-6 bg-gradient-to-br from-purple-50/60 to-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white border border-purple-100 shadow-sm flex items-center justify-center text-2xl">
                {cert.badgeEmoji}
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-100/80 text-purple-800 border border-purple-200">
                {cert.tag}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-purple-600 transition leading-snug">
                  {cert.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                  <span>{cert.issuer}</span>
                </p>
              </div>

              {cert.imageUrl && (
                <div className="w-full h-32 rounded-xl overflow-hidden border border-slate-200 mt-2">
                  <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Issued: {cert.issueDate}</span>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition"
                  title="Remove certificate"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Upload Modal Dialog */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span>Upload New Achievement</span>
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCert} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Certificate Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Deep Learning Specialization"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  placeholder="e.g. Stanford University / Coursera"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Issue Date / Month
                  </label>
                  <input
                    type="text"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    placeholder="e.g. Oct 2026"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge</label>
                  <select
                    value={badgeEmoji}
                    onChange={(e) => setBadgeEmoji(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-purple-500"
                  >
                    <option value="🏆">🏆 Trophy</option>
                    <option value="🏅">🏅 Medal</option>
                    <option value="☁️">☁️ Cloud</option>
                    <option value="⚛️">⚛️ Dev</option>
                    <option value="📜">📜 Diploma</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload Image / PDF Preview (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm rounded-xl transition shadow-md shadow-purple-600/20 cursor-pointer"
                >
                  Save to Vault
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm rounded-xl transition cursor-pointer"
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
