import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "StudyPrime — Student Life & Productivity Workspace",
  description: "School-portal inspired student productivity workspace with target exams, syllabus drill-down, and certificate vault.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F1F5F9] text-slate-800 flex antialiased">
        {/* Persistent Left Sidebar */}
        <Sidebar />

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
