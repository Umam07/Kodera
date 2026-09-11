"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowLeft,
  Code2,
  Layers,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Copy,
  Check,
  ArrowRight,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import { Lesson, Module } from "@/lib/types";
import { useProgress } from "@/lib/context/ProgressContext";
import { MarkdownRenderer, renderFormattedText } from "@/components/ui/MarkdownText";
import { DragDropExerciseComponent } from "@/components/exercise/DragDropExercise";
import { CodingExerciseComponent } from "@/components/exercise/CodingExercise";
import { InteractiveTheoryViewer } from "./InteractiveTheoryViewer";
interface LessonContentProps {
  currentModule: Module;
  currentLesson: Lesson;
  previousLessonUrl?: string;
  nextLessonUrl?: string;
}

export function LessonContent({
  currentModule,
  currentLesson,
  previousLessonUrl,
  nextLessonUrl,
}: LessonContentProps) {
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const isDone = isLessonCompleted(currentLesson.id);

  // Active tab: 'theory' | 'dragdrop' | 'coding'
  const [activeTab, setActiveTab] = useState<"theory" | "dragdrop" | "coding">("theory");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const dragDropList =
    currentLesson.dragDropExercises && currentLesson.dragDropExercises.length > 0
      ? currentLesson.dragDropExercises
      : currentLesson.dragDropExercise
      ? [currentLesson.dragDropExercise]
      : [];
  const hasDragDrop = dragDropList.length > 0;
  const totalDragDropXp = dragDropList.reduce((sum, ex) => sum + ex.xpReward, 0);

  const handleMarkComplete = () => {
    markLessonComplete(currentLesson.id);
  };

  const handleCopy = (code: string, index: number) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  return (
    <div className="flex-1 min-w-0">
      {/* Breadcrumbs & Module Category */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#1a3300]/70">
          <Link href="/java" className="hover:underline">
            Silabus Java
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#1a3300]">{currentModule.title}</span>
        </div>

        {isDone ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#d5f5c2] border border-[#1a3300]/30 rounded-[6px] text-xs font-semibold text-[#1a3300]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Pelajaran Selesai
          </span>
        ) : (
          <button
            type="button"
            onClick={handleMarkComplete}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffe95c] hover:bg-[#ffe95c]/80 border border-[#1a3300]/30 rounded-[6px] text-xs font-semibold text-[#1a3300] transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            Tandai Selesai
          </button>
        )}
      </div>

      {/* Main Lesson Title */}
      <div className="mb-6">
        <h1 className="font-bricolage text-3xl sm:text-4xl font-extrabold text-[#1a3300] tracking-tight">
          {currentLesson.title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#1a3300]/80 leading-relaxed">
          {currentLesson.description}
        </p>
      </div>

      {/* TABS NAVIGATION (Materi / Drag & Drop / Coding) */}
      <div className="flex border-b border-[#b6b6b6] gap-2 mb-8 overflow-x-auto">
        {/* Tab 1: Theory */}
        <button
          type="button"
          onClick={() => setActiveTab("theory")}
          className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === "theory"
              ? "border-[#1a3300] text-[#1a3300] bg-[#ffe95c]/20 rounded-t-[6px]"
              : "border-transparent text-[#1a3300]/70 hover:text-[#1a3300]"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Materi & Contoh Kode</span>
        </button>

        {/* Tab 2: Drag & Drop */}
        {hasDragDrop && (
          <button
            type="button"
            onClick={() => setActiveTab("dragdrop")}
            className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "dragdrop"
                ? "border-[#1a3300] text-[#1a3300] bg-[#d5f5c2]/40 rounded-t-[6px]"
                : "border-transparent text-[#1a3300]/70 hover:text-[#1a3300]"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Latihan Drag & Drop</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#d5f5c2] rounded-[3px] border border-[#1a3300]/20 font-bold">
              {dragDropList.length > 1 ? `${dragDropList.length} Soal` : `+${totalDragDropXp} XP`}
            </span>
          </button>
        )}

        {/* Tab 3: Coding Exercise */}
        {currentLesson.codingProblem && (
          <button
            type="button"
            onClick={() => setActiveTab("coding")}
            className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "coding"
                ? "border-[#1a3300] text-[#1a3300] bg-[#a8e5e5]/40 rounded-t-[6px]"
                : "border-transparent text-[#1a3300]/70 hover:text-[#1a3300]"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Latihan Coding Auto-Judge</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#a8e5e5] rounded-[3px] border border-[#1a3300]/20 font-bold">
              +{currentLesson.codingProblem.xpReward} XP
            </span>
          </button>
        )}
      </div>

      {/* TAB CONTENT AREAS */}
      {/* TAB 1: THEORY & READING (Bite-Sized Interactive Flow) */}
      {activeTab === "theory" && (
        <div className="animate-in fade-in duration-200">
          <InteractiveTheoryViewer
            contentMarkdown={currentLesson.contentMarkdown}
            keyConcepts={currentLesson.keyConcepts}
            codeExamples={currentLesson.codeExamples}
            hasExercise={hasDragDrop || Boolean(currentLesson.codingProblem)}
            onStartExercise={() => {
              if (hasDragDrop) {
                setActiveTab("dragdrop");
              } else if (currentLesson.codingProblem) {
                setActiveTab("coding");
              }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}

      {/* TAB 2: DRAG & DROP EXERCISE */}
      {activeTab === "dragdrop" && hasDragDrop && (
        <div className="animate-in fade-in duration-200">
          <DragDropExerciseComponent
            exercises={dragDropList}
            onSuccess={handleMarkComplete}
            onBackToTheory={() => setActiveTab("theory")}
          />
        </div>
      )}

      {/* TAB 3: CODING EXERCISE */}
      {activeTab === "coding" && currentLesson.codingProblem && (
        <div className="animate-in fade-in duration-200">
          <CodingExerciseComponent
            problem={currentLesson.codingProblem}
            onSuccess={handleMarkComplete}
            onBackToTheory={() => setActiveTab("theory")}
          />
        </div>
      )}

      {/* PAGINATION / NAVIGATION FOOTER */}
      <div className="mt-12 pt-6 border-t border-[#b6b6b6] flex flex-wrap items-center justify-between gap-4">
        {previousLessonUrl ? (
          <Link
            href={previousLessonUrl}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#1a3300] rounded-[6px] text-xs font-medium text-[#1a3300] hover:bg-[#ffe95c]/30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Pelajaran Sebelumnya</span>
          </Link>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-3">
          <Link
            href="/java"
            className="text-xs font-medium text-[#1a3300]/80 hover:text-[#1a3300] hover:underline"
          >
            Daftar Modul
          </Link>

          {nextLessonUrl ? (
            <Link
              href={nextLessonUrl}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#1a3300] text-[#fcfaf5] rounded-[6px] text-xs font-medium hover:bg-[#1a3300]/90 transition-all shadow-xs"
            >
              <span>Lanjut Pelajaran Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#1a3300] text-[#fcfaf5] rounded-[6px] text-xs font-medium hover:bg-[#1a3300]/90 transition-all shadow-xs"
            >
              <span>Lihat Progres di Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
