"use client";

import { useState, useEffect } from "react";
import { Task, Exam, Certificate, StudentProfile, Subject, MockTestItem } from "./types";

const TASKS_KEY = "study_prime_tasks";
const EXAMS_KEY = "study_prime_exams";
const CERTS_KEY = "study_prime_certs";
const PROFILE_KEY = "study_prime_profile";
const TESTS_KEY = "study_prime_tests";

// Initial Demo Exams with BLANK syllabi
const INITIAL_EXAMS: Exam[] = [
  {
    id: "exam-1",
    name: "Semester Final: Computer Networks",
    code: "CS-402",
    date: "2026-10-22",
    createdAt: Date.now() - 86400000,
    subjects: [],
  },
  {
    id: "exam-2",
    name: "GATE Computer Science 2027",
    code: "GATE-CS",
    date: "2027-02-14",
    createdAt: Date.now(),
    subjects: [],
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

const INITIAL_TESTS: MockTestItem[] = [
  {
    id: "test-1",
    title: "Test on: Boolean Algebra & Logic Minimization",
    topics: "Boolean Algebra, De Morgan's Laws, K-Maps",
    filterType: "Topic Wise",
    questionCount: 5,
    durationMinutes: 15,
    createdAt: Date.now() - 3600000 * 24,
    questions: [
      {
        id: "q-1",
        question: "Which of the following is equivalent to (A + B)' according to De Morgan's Laws?",
        options: ["A' + B'", "A' * B'", "A * B", "(A * B)'"],
        correctOptionIndex: 1,
      },
      {
        id: "q-2",
        question: "What is the dual of the Boolean expression A + 0 = A?",
        options: ["A * 1 = A", "A + 1 = 1", "A' * 0 = 0", "A * 0 = 0"],
        correctOptionIndex: 0,
      },
      {
        id: "q-3",
        question: "How many cells are present in a 4-variable Karnaugh Map (K-Map)?",
        options: ["8", "16", "32", "4"],
        correctOptionIndex: 1,
      },
      {
        id: "q-4",
        question: "Which logic gate outputs 1 only when both inputs are identical?",
        options: ["XOR", "XNOR", "NAND", "NOR"],
        correctOptionIndex: 1,
      },
      {
        id: "q-5",
        question: "The Boolean expression A + A'B simplifies directly to which of the following?",
        options: ["A + B", "A * B", "B", "A"],
        correctOptionIndex: 0,
      },
    ],
  },
];

export function useWorkspaceStorage() {
  const [exams, setExams] = useState<Exam[]>(INITIAL_EXAMS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [certs, setCerts] = useState<Certificate[]>(INITIAL_CERTS);
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_PROFILE);
  const [tests, setTests] = useState<MockTestItem[]>(INITIAL_TESTS);
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
      const savedTests = localStorage.getItem(TESTS_KEY);
      if (savedTests) setTests(JSON.parse(savedTests));
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

  const saveTests = (newTests: MockTestItem[]) => {
    setTests(newTests);
    try { localStorage.setItem(TESTS_KEY, JSON.stringify(newTests)); } catch {}
  };

  const updateExamSyllabus = (examId: string, subjects: Subject[]) => {
    const updated = exams.map((ex) => (ex.id === examId ? { ...ex, subjects } : ex));
    saveExams(updated);
  };

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
    tests,
    isLoaded,
    saveExams,
    saveTasks,
    saveCerts,
    saveProfile,
    saveTests,
    updateExamSyllabus,
    toggleMicroTopic,
  };
}
