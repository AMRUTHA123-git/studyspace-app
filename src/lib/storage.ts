"use client";

import { useState, useEffect } from "react";
import { Task, Exam, Certificate, StudentProfile, Subject } from "./types";

const TASKS_KEY = "study_prime_tasks";
const EXAMS_KEY = "study_prime_exams";
const CERTS_KEY = "study_prime_certs";
const PROFILE_KEY = "study_prime_profile";

// Initial Demo Exams with BLANK syllabi (No hardcoded dummy syllabus data)
const INITIAL_EXAMS: Exam[] = [
  {
    id: "exam-1",
    name: "Semester Final: Computer Networks",
    code: "CS-402",
    date: "2026-10-22",
    createdAt: Date.now() - 86400000,
    subjects: [], // Starts completely blank
  },
  {
    id: "exam-2",
    name: "GATE Computer Science 2027",
    code: "GATE-CS",
    date: "2027-02-14",
    createdAt: Date.now(),
    subjects: [], // Starts completely blank
  },
];

const INITIAL_TASKS: Task[] = [
  { id: "t-1", text: "Revise TCP 3-way Handshake & SYN Floods", date: "2026-10-18", category: "today", completed: true, priority: "high", createdAt: Date.now() },
  { id: "t-2", text: "Solve 10 GATE Past MCQs on Concurrency", date: "2026-10-18", category: "today", completed: true, priority: "high", createdAt: Date.now() },
  { id: "t-3", text: "Review Banker's Deadlock Algorithm proofs", date: "2026-10-18", category: "today", completed: false, priority: "urgent", createdAt: Date.now() },
  { id: "t-4", text: "Upload 2023 OS Midterm PDF for AI extraction", date: "2026-10-18", category: "today", completed: false, priority: "medium", createdAt: Date.now() },
  { id: "t-5", text: "Mock Test: Virtual Memory & Page Replacement", date: "2026-10-19", category: "tomorrow", completed: false, priority: "high", createdAt: Date.now() },
];

const INITIAL_CERTS: Certificate[] = [
  { id: "cert-1", title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", issueDate: "Aug 2026", badgeEmoji: "☁️", tag: "Cloud" },
  { id: "cert-2", title: "Meta Front-End Developer Specialization", issuer: "Meta & Coursera", issueDate: "May 2026", badgeEmoji: "⚛️", tag: "Development" },
  { id: "cert-3", title: "GATE CS Algorithm Foundation Honor", issuer: "NPTEL / IIT Madras", issueDate: "Jan 2026", badgeEmoji: "🏅", tag: "Algorithms" },
];

const INITIAL_PROFILE: StudentProfile = {
  name: "Alex Sharma",
  study: "B.Tech Computer Science (3rd Year)",
  avatar: "🎓",
  avatarImage: null,
  targetExam: "GATE CS 2027 & Semester Finals",
  streakDays: 14,
};

export function useWorkspaceStorage() {
  const [exams, setExams] = useState<Exam[]>(INITIAL_EXAMS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [certs, setCerts] = useState<Certificate[]>(INITIAL_CERTS);
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_PROFILE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedExams = localStorage.getItem(EXAMS_KEY);
      if (savedExams) setExams(JSON.parse(savedExams));
      const savedTasks = localStorage.getItem(TASKS_KEY);
      if (savedTasks) setTasks(JSON.parse(savedTasks));
      const savedCerts = localStorage.getItem(CERTS_KEY);
      if (savedCerts) setCerts(JSON.parse(savedCerts));
      const savedProfile = localStorage.getItem(PROFILE_KEY);
      if (savedProfile) setProfile(JSON.parse(savedProfile));
    } catch {}
    setIsLoaded(true);
  }, []);

  const saveExams = (newExams: Exam[]) => {
    setExams(newExams);
    try { localStorage.setItem(EXAMS_KEY, JSON.stringify(newExams)); } catch {}
  };

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    try { localStorage.setItem(TASKS_KEY, JSON.stringify(newTasks)); } catch {}
  };

  const saveCerts = (newCerts: Certificate[]) => {
    setCerts(newCerts);
    try { localStorage.setItem(CERTS_KEY, JSON.stringify(newCerts)); } catch {}
  };

  const saveProfile = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile)); } catch {}
  };

  // Helper to link newly built syllabus to an exam
  const updateExamSyllabus = (examId: string, subjects: Subject[]) => {
    const updated = exams.map((ex) => (ex.id === examId ? { ...ex, subjects } : ex));
    saveExams(updated);
  };

  // Helper to toggle a micro-topic in an exam
  const toggleMicroTopic = (
    examId: string,
    subjectId: string,
    chapterId: string,
    topicId: string
  ) => {
    const updated = exams.map((ex) => {
      if (ex.id !== examId) return ex;
      return {
        ...ex,
        subjects: ex.subjects.map((sub) => {
          if (sub.id !== subjectId) return sub;
          return {
            ...sub,
            chapters: sub.chapters.map((ch) => {
              if (ch.id !== chapterId) return ch;
              return {
                ...ch,
                microTopics: ch.microTopics.map((mt) => {
                  if (mt.id !== topicId) return mt;
                  const nextState = !mt.isCompleted;
                  return {
                    ...mt,
                    isCompleted: nextState,
                    completedThisWeek: nextState,
                  };
                }),
              };
            }),
          };
        }),
      };
    });
    saveExams(updated);
  };

  return {
    exams,
    tasks,
    certs,
    profile,
    isLoaded,
    saveExams,
    saveTasks,
    saveCerts,
    saveProfile,
    updateExamSyllabus,
    toggleMicroTopic,
  };
}
