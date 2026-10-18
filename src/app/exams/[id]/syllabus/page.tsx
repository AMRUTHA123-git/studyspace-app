"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SyllabusRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/syllabus");
  }, [router]);

  return (
    <div className="p-8 text-slate-400 font-semibold animate-pulse">
      Redirecting to Syllabus Builder...
    </div>
  );
}
