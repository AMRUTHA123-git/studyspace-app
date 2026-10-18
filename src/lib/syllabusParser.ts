import { Subject, Chapter, MicroTopic } from "./types";

/**
 * Robust multi-format parser for syllabus outlines.
 * Safely parses any text into Subject -> Chapter -> MicroTopic hierarchy.
 *
 * Supported Formats:
 * 1. Arrow-separated:
 *    - "Subject > Topic"
 *    - "Subject > Chapter > Topic"
 * 2. Colon-separated:
 *    - "Subject: Topic"
 *    - "Subject: Chapter: Topic"
 * 3. Structured / Markdown / AI outlines:
 *    - "Subject: Computer Networks"
 *    - "Chapter 1: Transport Layer"
 *    - "- TCP 3-Way Handshake"
 *    - "# Operating Systems", "## CPU Scheduling", "* Round Robin"
 * 4. Plain lines without separators:
 *    - Groups lines under "General / Custom Topics" -> "Core Topics"
 */
export function parseSyllabusOutline(
  rawText: string,
  defaultSubjectName: string = "General / Custom Topics"
): Subject[] {
  try {
    if (!rawText || !rawText.trim()) {
      return [];
    }

    const lines = rawText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      return [];
    }

    // Map to group subjects and chapters hierarchically and avoid duplicates
    const subjectMap = new Map<
      string,
      {
        subject: Subject;
        chapterMap: Map<string, Chapter>;
      }
    >();

    const getOrCreateSubject = (subName: string): { subject: Subject; chapterMap: Map<string, Chapter> } => {
      const cleanName = subName.trim() || defaultSubjectName || "General / Custom Topics";
      const key = cleanName.toLowerCase();
      if (!subjectMap.has(key)) {
        const newSub: Subject = {
          id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: cleanName,
          code: cleanName.substring(0, 4).toUpperCase().replace(/[^A-Z]/g, "") || "SUB",
          chapters: [],
        };
        subjectMap.set(key, { subject: newSub, chapterMap: new Map() });
      }
      return subjectMap.get(key)!;
    };

    const getOrCreateChapter = (
      subEntry: { subject: Subject; chapterMap: Map<string, Chapter> },
      chName: string
    ): Chapter => {
      const cleanChName = chName.trim() || "Core Topics";
      const key = cleanChName.toLowerCase();
      if (!subEntry.chapterMap.has(key)) {
        const newCh: Chapter = {
          id: `ch-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          title: cleanChName,
          microTopics: [],
        };
        subEntry.chapterMap.set(key, newCh);
        subEntry.subject.chapters.push(newCh);
      }
      return subEntry.chapterMap.get(key)!;
    };

    const addTopicToChapter = (chapter: Chapter, topicTitle: string) => {
      const cleanTopic = topicTitle.trim();
      if (!cleanTopic) return;
      chapter.microTopics.push({
        id: `mt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: cleanTopic,
        isCompleted: false,
        completedThisWeek: false,
      });
    };

    // State trackers for traditional markdown/block outline parsing
    let activeSubjectEntry = getOrCreateSubject(defaultSubjectName);
    let activeChapter: Chapter | null = null;

    for (const line of lines) {
      // Format 1: Lines with '>' separator
      if (line.includes(">")) {
        const parts = line.split(">").map((p) => p.trim()).filter(Boolean);
        if (parts.length === 1) {
          const ch = getOrCreateChapter(activeSubjectEntry, "Core Topics");
          addTopicToChapter(ch, parts[0]);
        } else if (parts.length === 2) {
          // "Subject > Topic"
          const subEntry = getOrCreateSubject(parts[0]);
          const ch = getOrCreateChapter(subEntry, "Core Topics");
          addTopicToChapter(ch, parts[1]);
        } else {
          // "Subject > Chapter > Topic(s)"
          const subEntry = getOrCreateSubject(parts[0]);
          const ch = getOrCreateChapter(subEntry, parts[1]);
          for (let p = 2; p < parts.length; p++) {
            addTopicToChapter(ch, parts[p]);
          }
        }
        continue;
      }

      // Format 2 & 3: Explicit Subject Header
      // e.g. "Subject: Operating Systems", "# Operating Systems", "[Operating Systems]", "Module: Networks"
      if (
        /^(subject|module|course)\s*[:\-]/i.test(line) ||
        /^#\s+/i.test(line) ||
        /^\[.+\]$/.test(line)
      ) {
        const subTitle = line
          .replace(/^(subject|module|course)\s*[:\-]\s*/i, "")
          .replace(/^#\s+/, "")
          .replace(/^\[(.*)\]$/, "$1")
          .trim();

        activeSubjectEntry = getOrCreateSubject(subTitle || defaultSubjectName);
        activeChapter = null;
        continue;
      }

      // Explicit Chapter Header
      // e.g. "Chapter 1: CPU Scheduling", "## Memory Management", "Unit 2: Paging", "1. Sorting"
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

        activeChapter = getOrCreateChapter(activeSubjectEntry, chTitle || "Chapter");
        continue;
      }

      // Bullet topics
      // e.g. "- TCP 3-Way Handshake", "* Round Robin", "+ Page Tables", "a) Binary Search"
      if (/^[\-\*\•\+]\s+/.test(line) || /^[a-z0-9][\.\)]\s+/i.test(line)) {
        const topicTitle = line
          .replace(/^[\-\*\•\+]\s+/, "")
          .replace(/^[a-z0-9][\.\)]\s+/i, "")
          .trim();

        if (!activeChapter) {
          activeChapter = getOrCreateChapter(activeSubjectEntry, "Core Topics");
        }
        addTopicToChapter(activeChapter, topicTitle);
        continue;
      }

      // Format 2: Colon-separated line "Subject: Topic" or "Chapter: Topic"
      if (line.includes(":")) {
        const colonIdx = line.indexOf(":");
        const left = line.substring(0, colonIdx).trim();
        const right = line.substring(colonIdx + 1).trim();

        if (left && right) {
          // If left looks like a subject and right has topic(s)
          const subEntry = getOrCreateSubject(left);
          const ch = getOrCreateChapter(subEntry, "Core Topics");

          // Right could be comma-separated topics or a single topic
          const subTopics = right.split(",").map((s) => s.trim()).filter(Boolean);
          if (subTopics.length > 0) {
            subTopics.forEach((t) => addTopicToChapter(ch, t));
          } else {
            addTopicToChapter(ch, right);
          }
          continue;
        }
      }

      // Format 4: Plain line without separators
      // Group under "General / Custom Topics" or active subject's Core Topics
      const targetChapter =
        activeChapter || getOrCreateChapter(activeSubjectEntry, "Core Topics");
      addTopicToChapter(targetChapter, line);
    }

    const result: Subject[] = [];
    subjectMap.forEach(({ subject }) => {
      // Only include subjects that have at least one topic across chapters
      const hasTopics = subject.chapters.some((ch) => ch.microTopics.length > 0);
      if (hasTopics) {
        // Filter out chapters with 0 microTopics
        subject.chapters = subject.chapters.filter((ch) => ch.microTopics.length > 0);
        result.push(subject);
      }
    });

    // Fallback if empty but rawText was provided
    if (result.length === 0 && lines.length > 0) {
      const fallbackSubject: Subject = {
        id: `sub-${Date.now()}`,
        name: defaultSubjectName || "General / Custom Topics",
        code: "GEN",
        chapters: [
          {
            id: `ch-${Date.now()}`,
            title: "Core Topics",
            microTopics: lines.map((l, idx) => ({
              id: `mt-${Date.now()}-${idx}`,
              title: l,
              isCompleted: false,
              completedThisWeek: false,
            })),
          },
        ],
      };
      return [fallbackSubject];
    }

    return result;
  } catch (error) {
    console.error("Error in parseSyllabusOutline, activating safe fallback:", error);
    // Safe crash-proof fallback
    const lines = (rawText || "")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length === 0) return [];

    return [
      {
        id: `sub-${Date.now()}`,
        name: defaultSubjectName || "General / Custom Topics",
        code: "GEN",
        chapters: [
          {
            id: `ch-${Date.now()}`,
            title: "Core Topics",
            microTopics: lines.map((l, idx) => ({
              id: `mt-${Date.now()}-${idx}`,
              title: l,
              isCompleted: false,
              completedThisWeek: false,
            })),
          },
        ],
      },
    ];
  }
}
