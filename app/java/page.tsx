"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  Zap,
  Lock,
  ChevronRight,
  Layers,
  Terminal,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { JAVA_COURSE_DATA } from "@/lib/data/javaCourseData";
import { useProgress } from "@/lib/context/ProgressContext";
export default function JavaCourseOverviewPage() {
  const { progress, getModuleProgress, overallProgressPercent, levelInfo } = useProgress();
  const shouldReduceMotion = useReducedMotion();
  // Group modules by levelGroup
  const levelGroups = [
    { level: 1, name: "Level 1 — Fundamental", desc: "Fondasi sintaks dasar Java, deklarasi memori, dan operator logika." },
    { level: 2, name: "Level 2 — Control & Data", desc: "Pengendalian alur program dengan percabangan, loop, dan struktur array." },
    { level: 3, name: "Level 3 — Method", desc: "Modularitas kode: parameter, return value, dan overloading method." },
    { level: 4, name: "Level 4 — OOP Dasar", desc: "Pilar Object-Oriented: class, object, constructor, dan encapsulation." },
    { level: 5, name: "Level 5 — OOP Lanjutan", desc: "Hierarki pewarisan (inheritance), overriding method, dan upcasting polimorfisme." },
    { level: 6, name: "Level 6 — Abstraction", desc: "Membangun kontrak arsitektur program dengan interface dan abstract class." },
    { level: 7, name: "Level 7 — Error & Collections", desc: "Ketahanan aplikasi lewat try-catch dan struktur data dinamis ArrayList/HashMap." },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
      {/* HEADER SECTION */}
      <div className="mb-10">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="font-bricolage text-3xl sm:text-5xl font-extrabold text-[#1a3300] tracking-tight">
              Kurikulum <span className="highlight-wash">Java Runtut</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#1a3300]/80 max-w-2xl leading-relaxed">
              14 modul berurutan dari dasar hingga OOP lanjutan. Setiap modul dilengkapi materi konsep, latihan susun potongan kode (drag & drop), dan soal coding auto-graded.
            </p>
          </div>

          {/* User Course Progress Pill Card */}
          <div className="bg-[#fcfaf5] border border-[#1a3300] rounded-[12px] p-4 min-w-[260px] shadow-2xs">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-medium text-[#1a3300]">Progres Keseluruhan:</span>
              <span className="font-mono font-bold text-[#1a3300]">{overallProgressPercent}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2.5 bg-[#f1f1f1] border border-[#1a3300]/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#1a3300] rounded-full"
                initial={shouldReduceMotion ? { width: `${overallProgressPercent}%` } : { width: 0 }}
                animate={{ width: `${overallProgressPercent}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 22 }}
                style={{ willChange: "transform" }}
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-[#1a3300]/70">
              <span>{progress.completedLessonIds.length} Selesai</span>
              <span>Total 14 Modul</span>
            </div>
          </div>
        </div>
      </div>

      {/* PROGRESSION LEVELS LIST */}
      <div className="space-y-12">
        {levelGroups.map((group) => {
          const modulesInGroup = JAVA_COURSE_DATA.modules.filter(
            (m) => m.levelGroup === group.level
          );

          // Calculate group completion
          const isGroupCompleted = modulesInGroup.every(
            (m) => getModuleProgress(m.slug).percent === 100
          );

          return (
            <section key={group.level} className="relative">
              {/* Level Group Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#b6b6b6] pb-3 mb-6 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-[6px] bg-[#1a3300] text-[#fcfaf5] font-mono font-bold text-xs flex items-center justify-center">
                    {group.level}
                  </div>
                  <div>
                    <h2 className="font-bricolage text-2xl font-bold text-[#1a3300]">
                      {group.name}
                    </h2>
                    <p className="text-xs text-[#1a3300]/70">{group.desc}</p>
                  </div>
                </div>

                {isGroupCompleted && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a3300] bg-[#d5f5c2] px-2.5 py-1 rounded-[6px] border border-[#1a3300]/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Level Tuntas
                  </span>
                )}
              </div>

              {/* Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {modulesInGroup.map((mod) => {
                  const modProgress = getModuleProgress(mod.slug);
                  const isDone = modProgress.percent === 100;
                  const isStarted = modProgress.completedLessons > 0 && !isDone;
                  const firstLessonSlug = mod.lessons[0]?.slug || "";

                  return (
                    <motion.div
                      key={mod.id}
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      style={{ willChange: "transform" }}
                      className="bg-white border border-[#b6b6b6] hover:border-[#1a3300] rounded-[12px] p-5 sm:p-6 transition-colors flex flex-col justify-between shadow-2xs hover:shadow-xs group"
                    >
                      <div>
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-[#fcfaf5] text-[#1a3300] rounded-[4px] border border-[#b6b6b6]">
                            Modul {mod.order}
                          </span>

                          {isDone ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1a3300] bg-[#d5f5c2] px-2 py-0.5 rounded-[4px] border border-[#1a3300]/20">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#1a3300]" />
                              Selesai 100%
                            </span>
                          ) : isStarted ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1a3300] bg-[#ffe95c] px-2 py-0.5 rounded-[4px]">
                              <Clock className="w-3.5 h-3.5 text-[#1a3300]" />
                              Sedang Dipelajari
                            </span>
                          ) : (
                            <span className="text-xs font-mono text-[#1a3300]/50">
                              Belum Dimulai
                            </span>
                          )}
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-inter font-bold text-xl text-[#1a3300] group-hover:text-[#1a3300] mb-2">
                          {mod.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#1a3300]/75 leading-relaxed mb-4">
                          {mod.shortDescription}
                        </p>

                        {/* Lesson Items Preview List */}
                        <div className="space-y-1.5 pt-2 border-t border-[#f1f1f1]">
                          {mod.lessons.map((lesson) => {
                            const lessonDone = progress.completedLessonIds.includes(lesson.id);
                            return (
                              <Link
                                key={lesson.id}
                                href={`/java/${mod.slug}/${lesson.slug}`}
                                className="flex items-center justify-between p-2 rounded-[6px] hover:bg-[#ffe95c]/20 text-xs font-medium text-[#1a3300] transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  {lessonDone ? (
                                    <CheckCircle2 className="w-4 h-4 text-[#1a3300]" />
                                  ) : (
                                    <span className="w-4 h-4 rounded-full border border-[#b6b6b6] flex items-center justify-center text-[9px] font-mono">
                                      {lesson.order}
                                    </span>
                                  )}
                                  <span>{lesson.title}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#1a3300]/60">
                                  {lesson.dragDropExercise && (
                                    <span className="px-1.5 py-0.5 bg-[#d5f5c2] text-[#1a3300] rounded-[3px]">
                                      D&D
                                    </span>
                                  )}
                                  {lesson.codingProblem && (
                                    <span className="px-1.5 py-0.5 bg-[#a8e5e5] text-[#1a3300] rounded-[3px]">
                                      Code
                                    </span>
                                  )}
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-6 pt-4 border-t border-[#b6b6b6]/30 flex items-center justify-between">
                        <div className="text-xs font-mono text-[#1a3300]/70">
                          Reward: <span className="font-semibold text-[#1a3300]">+35-45 XP</span>
                        </div>
                        <Link
                          href={`/java/${mod.slug}/${firstLessonSlug}`}
                          className={`px-4 py-2 text-xs font-medium rounded-[6px] transition-all flex items-center gap-1.5 ${
                            isDone
                              ? "bg-[#fcfaf5] border border-[#1a3300] text-[#1a3300] hover:bg-[#ffe95c]/30"
                              : "bg-[#1a3300] text-[#fcfaf5] hover:bg-[#1a3300]/90"
                          }`}
                        >
                          <span>{isDone ? "Ulangi Modul" : isStarted ? "Lanjut Belajar" : "Buka Modul"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
