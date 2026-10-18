import { Subject, Chapter, MicroTopic } from "./types";

/**
 * Intelligent frontend parser that converts arbitrary AI-generated syllabus text outlines
 * (from ChatGPT, Gemini, Claude, etc.) into structured Subject -> Chapter -> MicroTopic hierarchy.
 */
export function parseSyllabusOutline(
  rawText: string,
  defaultSubjectName: string = "Main Subject"
): Subject[] {
  const lines = rawText.split("\n");
  const subjects: Subject[] = [];

  let currentSubject: Subject = {
    id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: defaultSubjectName,
    code: "SYL",
    chapters: [],
  };

  let currentChapter: Chapter | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    // 1. Detect Subject Headers (e.g. "Subject: Computer Networks", "# Mathematics", "Module: Operating Systems")
    if (
      /^(subject|module|course)\s*[:\-]/i.test(line) ||
      /^#\s+/i.test(line) ||
      /^\[.*\]$/.test(line)
    ) {
      const subTitle = line
        .replace(/^(subject|module|course)\s*[:\-]\s*/i, "")
        .replace(/^#\s+/, "")
        .replace(/^\[(.*)\]$/, "$1")
        .trim();

      if (currentSubject.chapters.length > 0) {
        subjects.push(currentSubject);
      }

      currentSubject = {
        id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: subTitle || "Subject",
        code: "SUB",
        chapters: [],
      };
      currentChapter = null;
      continue;
    }

    // 2. Detect Chapter Headers (e.g. "Chapter 1: Transport Layer", "## Concurrency", "Unit 2: Database Design", "1. CPU Scheduling")
    if (
      /^(chapter|unit|section|part)\s*(\d+|[ivx]+)?\s*[:\-]/i.test(line) ||
      /^##\s+/i.test(line) ||
      /^\d+[\.\)]\s+[A-Za-z]/.test(line)
    ) {
      const chTitle = line
        .replace(/^(chapter|unit|section|part)\s*(\d+|[ivx]+)?\s*[:\-]\s*/i, "")
        .replace(/^##\s+/, "")
        .replace(/^\d+[\.\)]\s+/, "")
        .trim();

      currentChapter = {
        id: `ch-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: chTitle || "Chapter",
        microTopics: [],
      };
      currentSubject.chapters.push(currentChapter);
      continue;
    }

    // 3. Detect Micro-topics (e.g. "- TCP 3-Way Handshake", "* Congestion Control", "• UDP Header", "a) Limits")
    if (/^[\-\*\•\+]\s+/.test(line) || /^[a-z0-9][\.\)]\s+/i.test(line)) {
      const topicTitle = line
        .replace(/^[\-\*\•\+]\s+/, "")
        .replace(/^[a-z0-9][\.\)]\s+/i, "")
        .trim();

      if (!currentChapter) {
        currentChapter = {
          id: `ch-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          title: "General Foundations",
          microTopics: [],
        };
        currentSubject.chapters.push(currentChapter);
      }

      currentChapter.microTopics.push({
        id: `mt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: topicTitle,
        isCompleted: false,
        completedThisWeek: false,
      });
      continue;
    }

    // 4. Fallback line: treat as chapter header if no chapter exists yet, or as topic if in chapter
    if (!currentChapter) {
      currentChapter = {
        id: `ch-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: line,
        microTopics: [],
      };
      currentSubject.chapters.push(currentChapter);
    } else {
      currentChapter.microTopics.push({
        id: `mt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: line,
        isCompleted: false,
        completedThisWeek: false,
      });
    }
  }

  if (currentSubject.chapters.length > 0) {
    subjects.push(currentSubject);
  }

  return subjects;
}
