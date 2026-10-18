# StudyOrbit — Student Life & Productivity Workspace

A comprehensive, aesthetic **"Notion meets Duolingo"** full-stack workspace application designed for modern students. Tracks everything from dynamic daily to-dos to high-stakes exam preparation, automated 1-week urgency alerts, interactive syllabus drill-down, and Gemini-powered mock test engines.

---

## 🌟 Core Modules & Architecture

1. **Dashboard & Dynamic Task Management**
   - Categorized to-dos: `Today`, `Tomorrow`, and `Calendar Date-specific`.
   - Live completion ratio and progress bar.
   - Priority indicators (`Urgent`, `High`, `Medium`, `Low`).

2. **Exam Tracker & Syllabus Drill-Down**
   - Target exams with exact date badges and live real-time countdown clocks.
   - **1-Week Urgency Alerts:** Glowing amber banner automatically highlights when an exam is ≤ 7 days away.
   - **Hierarchical Drill-Down:** `Subject` ➔ `Chapters` ➔ `Micro-Topics`.
   - **Reactive Progress Sync:** Checking any micro-topic recalculates chapter, subject, and overall exam coverage without page refresh.

3. **AI Test & Practice Engine**
   - **Auto-Extract Past Papers:** Upload PDF exam papers for Gemini 1.5 Multimodal question extraction with structured Zod schemas.
   - **Weekly Revision Tests:** Synthesizes mock tests strictly from the sub-topics the student checked off during the past 7 days.
   - **Strict-Timer Mock Engine:** Client-side Web Worker + server-verified completion timestamps.

4. **Gamified Portfolio & Profile**
   - **Duolingo-style Motivation:** Active streak tracker (`14 Days Streak 🔥`), XP points (`1,840 XP ⚡`), and Scholar level progression.
   - **Trophy Cabinet:** Badges like *"7-Day Ninja"*, *"Syllabus Slayer"*, and *"Night Owl"*.
   - **Activity Heatmap:** 16-week GitHub-style study density contribution graph.

5. **Resource Hub & Database**
   - Complete Prisma ORM schema modeling `User`, `Task`, `Exam`, `Subject`, `Chapter`, `MicroTopic`, `Question`, `MockTest`, `TestAttempt`, `Badge`, `StudyLog`, and `Resource`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and fill in your PostgreSQL and Gemini API keys:
```bash
cp .env.example .env
```

### 3. Database Migration (Prisma)
```bash
npx prisma generate
# When connected to a live Postgres database:
# npx prisma migrate dev --name init
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the workspace dashboard.

### 5. Production Build
```bash
npm run build
npm run start
```
