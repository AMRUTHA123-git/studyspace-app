export interface Task {
  id: string;
  text: string;
  date: string; // YYYY-MM-DD
  category: "today" | "tomorrow" | "upcoming";
  completed: boolean;
  priority: "urgent" | "high" | "medium";
  createdAt: number;
}

export interface MicroTopic {
  id: string;
  title: string;
  isCompleted: boolean;
  completedThisWeek: boolean;
  estimatedMins?: number;
}

export interface Chapter {
  id: string;
  title: string;
  microTopics: MicroTopic[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  chapters: Chapter[];
}

export interface Exam {
  id: string;
  name: string;
  code?: string;
  date: string; // YYYY-MM-DD
  subjects: Subject[];
  createdAt: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  imageUrl?: string;
  badgeEmoji: string;
  tag: string;
}

export interface StudentProfile {
  name: string;
  study: string;
  avatar: string;
  avatarImage: string | null;
  targetExam: string;
  streakDays: number;
}
