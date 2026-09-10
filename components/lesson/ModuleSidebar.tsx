"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Layers,
  Code2,
  Award,
  Menu,
  X,
} from "lucide-react";
import { JAVA_COURSE_DATA } from "@/lib/data/javaCourseData";
import { useProgress } from "@/lib/context/ProgressContext";

interface ModuleSidebarProps {
  currentModuleSlug: string;
  currentLessonSlug: string;
}

export function ModuleSidebar({ currentModuleSlug, currentLessonSlug }: ModuleSidebarProps) {
  const { progress, getModuleProgress } = useProgress();
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [currentModuleSlug]: true,
  });

  const toggleModule = (slug: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-[#fcfaf5] border border-[#1a3300] rounded-[8px] text-xs font-semibold text-[#1a3300]"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Daftar Modul & Pelajaran</span>
          </span>
          {isOpenMobile ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`w-full lg:w-80 shrink-0 bg-[#fcfaf5] border border-[#b6b6b6] rounded-[12px] p-4 lg:block shadow-2xs ${
          isOpenMobile ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#b6b6b6] pb-3 mb-4">
          <div>
            <span className="text-[11px] font-mono text-[#1a3300]/60 uppercase tracking-wider block">
              Kurikulum Java
            </span>
            <h3 className="font-bricolage text-lg font-bold text-[#1a3300]">
              Daftar Materi
            </h3>
          </div>
          <Link
            href="/java"
            className="text-xs font-semibold text-[#1a3300] hover:underline"
          >
            Silabus →
          </Link>
        </div>

        {/* Modules Accordion List */}
        <div className="space-y-3 max-h-[calc(100vh-240px)] overflow-y-auto pr-1">
          {JAVA_COURSE_DATA.modules.map((mod) => {
            const isCurrentModule = mod.slug === currentModuleSlug;
            const isExpanded = expandedModules[mod.slug] ?? isCurrentModule;
            const modProgress = getModuleProgress(mod.slug);
            const isDone = modProgress.percent === 100;

            return (
              <div
                key={mod.id}
                className={`border rounded-[8px] overflow-hidden transition-all ${
                  isCurrentModule
                    ? "border-[#1a3300] bg-white shadow-2xs"
                    : "border-[#b6b6b6]/60 bg-[#fcfaf5]"
                }`}
              >
                {/* Module Title Bar */}
                <button
                  type="button"
                  onClick={() => toggleModule(mod.slug)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-[#ffe95c]/20 transition-colors"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-[#1a3300] shrink-0" />
                    ) : (
                      <span className="w-5 h-5 rounded-[4px] bg-[#fcfaf5] border border-[#1a3300]/40 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {mod.order}
                      </span>
                    )}
                    <span
                      className={`text-xs font-bold truncate ${
                        isCurrentModule ? "text-[#1a3300]" : "text-[#1a3300]/80"
                      }`}
                    >
                      {mod.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-[10px] font-mono text-[#1a3300]/60">
                      {modProgress.completedLessons}/{mod.lessons.length}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-[#1a3300]" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-[#1a3300]" />
                    )}
                  </div>
                </button>

                {/* Lessons in Module */}
                {isExpanded && (
                  <div className="border-t border-[#f1f1f1] bg-[#fcfaf5] px-2 py-1.5 space-y-1">
                    {mod.lessons.map((lesson) => {
                      const isCurrentLesson =
                        isCurrentModule && lesson.slug === currentLessonSlug;
                      const isLessonDone = progress.completedLessonIds.includes(
                        lesson.id
                      );

                      return (
                        <Link
                          key={lesson.id}
                          href={`/java/${mod.slug}/${lesson.slug}`}
                          onClick={() => setIsOpenMobile(false)}
                          className={`flex items-center justify-between p-2 rounded-[6px] text-xs font-medium transition-all ${
                            isCurrentLesson
                              ? "bg-[#1a3300] text-[#fcfaf5] font-semibold"
                              : "text-[#1a3300] hover:bg-[#ffe95c]/40"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {isLessonDone ? (
                              <CheckCircle2
                                className={`w-3.5 h-3.5 shrink-0 ${
                                  isCurrentLesson
                                    ? "text-[#d5f5c2]"
                                    : "text-[#1a3300]"
                                }`}
                              />
                            ) : (
                              <span
                                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] font-mono shrink-0 ${
                                  isCurrentLesson
                                    ? "border-[#fcfaf5]"
                                    : "border-[#b6b6b6]"
                                }`}
                              >
                                {lesson.order}
                              </span>
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0 ml-1">
                            {lesson.dragDropExercise && (
                              <span
                                className={`text-[9px] font-mono px-1 py-0.2 rounded-[2px] ${
                                  isCurrentLesson
                                    ? "bg-[#d5f5c2] text-[#1a3300]"
                                    : "bg-[#d5f5c2]/80 text-[#1a3300]"
                                }`}
                                title="Memiliki latihan Drag & Drop"
                              >
                                D&D
                              </span>
                            )}
                            {lesson.codingProblem && (
                              <span
                                className={`text-[9px] font-mono px-1 py-0.2 rounded-[2px] ${
                                  isCurrentLesson
                                    ? "bg-[#a8e5e5] text-[#1a3300]"
                                    : "bg-[#a8e5e5]/80 text-[#1a3300]"
                                }`}
                                title="Memiliki latihan Coding"
                              >
                                Code
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
