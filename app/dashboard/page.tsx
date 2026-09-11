"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Zap,
  CheckCircle2,
  Clock,
  BookOpen,
  Layers,
  Code2,
  ArrowRight,
  ChevronRight,
  User,
  RotateCcw,
  GraduationCap,
  Calendar,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { JAVA_COURSE_DATA } from "@/lib/data/javaCourseData";
import { useProgress } from "@/lib/context/ProgressContext";
import { AuthModal } from "@/components/auth/AuthModal";
export default function DashboardPage() {
  const {
    progress,
    levelInfo,
    isLoggedIn,
    getModuleProgress,
    overallProgressPercent,
  } = useProgress();
  const shouldReduceMotion = useReducedMotion();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  // Find next unfinished lesson to recommend "Lanjutkan Belajar"
  let nextLessonToLearn: {
    moduleSlug: string;
    lessonSlug: string;
    moduleTitle: string;
    lessonTitle: string;
  } | null = null;

  for (const mod of JAVA_COURSE_DATA.modules) {
    for (const lesson of mod.lessons) {
      if (!progress.completedLessonIds.includes(lesson.id)) {
        nextLessonToLearn = {
          moduleSlug: mod.slug,
          lessonSlug: lesson.slug,
          moduleTitle: mod.title,
          lessonTitle: lesson.title,
        };
        break;
      }
    }
    if (nextLessonToLearn) break;
  }

  // Fallback to first lesson if all finished
  if (!nextLessonToLearn && JAVA_COURSE_DATA.modules.length > 0) {
    const firstMod = JAVA_COURSE_DATA.modules[0];
    const firstLes = firstMod.lessons[0];
    nextLessonToLearn = {
      moduleSlug: firstMod.slug,
      lessonSlug: firstLes.slug,
      moduleTitle: firstMod.title,
      lessonTitle: firstLes.title,
    };
  }

  // Count total completed exercises
  const totalExercisesCompleted = progress.completedExerciseIds.length;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
      {/* HEADER WITH TITLE & PERSONA SWITCHER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#b6b6b6] pb-6 mb-8">
        <div>
          <h1 className="font-bricolage text-3xl sm:text-4xl font-extrabold text-[#1a3300]">
            Progres Belajar & Leveling
          </h1>
          <p className="text-xs sm:text-sm text-[#1a3300]/70 mt-1">
            Pantau perolehan XP, kenaikan level, dan status penyelesaian setiap modul Java.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAuthOpen(true)}
            className="px-4 py-2 bg-white border border-[#1a3300] rounded-[6px] text-xs font-medium text-[#1a3300] hover:bg-[#ffe95c]/30 transition-colors flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5" />
            <span>Ganti Akun / Persona</span>
          </button>
        </div>
      </div>

      {/* TOP GRID: PROFILE & XP LEVEL CARD + COURSE SUMMARY CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* CARD 1: LEVEL & XP PROGRESSION (Mint / Sticky Card Style) */}
        <div className="lg:col-span-2 bg-[#d5f5c2] border-2 border-[#1a3300] rounded-[16px] p-6 sm:p-8 relative shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#ffe95c] border border-[#1a3300] rounded-[8px] flex items-center justify-center font-bold text-lg text-[#1a3300] shadow-xs">
                  Lv.{levelInfo.level}
                </div>
                <div>
                  <h2 className="font-bricolage text-2xl font-extrabold text-[#1a3300] leading-tight">
                    {progress.displayName}
                  </h2>
                  <div className="text-xs font-mono text-[#1a3300]/70 flex items-center gap-2">
                    <span>{progress.campus}</span>
                    <span>•</span>
                    <strong className="text-[#1a3300] underline decoration-[#ffe95c]">
                      {levelInfo.title}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="px-3 py-1.5 bg-[#fcfaf5] border border-[#1a3300] rounded-[6px] text-right">
                <div className="text-[10px] uppercase font-mono text-[#1a3300]/60">
                  Total XP
                </div>
                <div className="font-mono font-bold text-lg text-[#cb5521] flex items-center gap-1">
                  <Zap className="w-4 h-4 fill-[#cb5521]" />
                  <span>{progress.totalXp} XP</span>
                </div>
              </div>
            </div>

            {/* Level progress bar */}
            <div className="mt-6 pt-4 border-t border-[#1a3300]/20">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="font-semibold text-[#1a3300]">
                  Target Level {levelInfo.level + 1}
                </span>
                <span className="text-[#1a3300]/80">
                  {progress.totalXp} / {levelInfo.nextLevelXp} XP ({levelInfo.progressPercent}%)
                </span>
              </div>
              <div className="w-full h-3 bg-white/70 border border-[#1a3300] rounded-full overflow-hidden p-0.5">
                <motion.div
                  className="h-full bg-[#1a3300] rounded-full"
                  initial={shouldReduceMotion ? { width: `${levelInfo.progressPercent}%` } : { width: 0 }}
                  animate={{ width: `${levelInfo.progressPercent}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 22 }}
                  style={{ willChange: "transform" }}
                />
              </div>
                Kurang <strong>{Math.max(0, levelInfo.nextLevelXp - progress.totalXp)} XP lagi</strong> untuk membuka tingkatan level berikutnya.
              </div>
            </div>
          </div>

          {/* Quick Resume CTA inside card */}
          {nextLessonToLearn && (
            <div className="mt-6 pt-4 border-t border-[#1a3300]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-[#1a3300]">
                Rekomendasi berikutnya:{" "}
                <strong className="font-semibold">{nextLessonToLearn.lessonTitle}</strong>
              </div>
              <Link
                href={`/java/${nextLessonToLearn.moduleSlug}/${nextLessonToLearn.lessonSlug}`}
                className="px-4 py-2 bg-[#1a3300] text-[#fcfaf5] text-xs font-medium rounded-[6px] hover:bg-[#1a3300]/90 transition-colors inline-flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>→ Lanjutkan Belajar</span>
              </Link>
            </div>
          )}
        </div>

        {/* CARD 2: COURSE STATS OVERVIEW */}
        <div className="bg-[#fcfaf5] border border-[#1a3300] rounded-[16px] p-6 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="text-xs font-mono uppercase font-bold text-[#1a3300]/70 mb-4">
              Ringkasan Kursus Java
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-[#1a3300]">
                    Penyelesaian Keseluruhan
                  </span>
                  <span className="font-mono font-bold text-[#1a3300]">
                    {overallProgressPercent}%
                  </span>
                </div>
                <div className="w-full h-2 bg-[#f1f1f1] border border-[#1a3300]/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#1a3300] rounded-full"
                    initial={shouldReduceMotion ? { width: `${overallProgressPercent}%` } : { width: 0 }}
                    animate={{ width: `${overallProgressPercent}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 22 }}
                    style={{ willChange: "transform" }}
                  />
                </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white border border-[#b6b6b6] rounded-[8px]">
                  <div className="text-[11px] text-[#1a3300]/60 font-mono">
                    Pelajaran Tuntas
                  </div>
                  <div className="font-bricolage text-2xl font-bold text-[#1a3300]">
                    {progress.completedLessonIds.length}
                  </div>
                  <div className="text-[10px] text-[#1a3300]/60 font-mono">
                    dari 24 materi
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#b6b6b6] rounded-[8px]">
                  <div className="text-[11px] text-[#1a3300]/60 font-mono">
                    Latihan Diselesaikan
                  </div>
                  <div className="font-bricolage text-2xl font-bold text-[#cb5521]">
                    {totalExercisesCompleted}
                  </div>
                  <div className="text-[10px] text-[#1a3300]/60 font-mono">
                    soal diverifikasi
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#b6b6b6]/40 text-center">
            <Link
              href="/java"
              className="text-xs font-semibold text-[#1a3300] hover:underline inline-flex items-center gap-1"
            >
              <span>Buka Seluruh Silabus 14 Modul</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* MODULE PROGRESS BREAKDOWN (14 Modules) */}
      <section className="mb-12">
        <div className="flex items-center justify-between border-b border-[#b6b6b6] pb-3 mb-6">
          <div>
            <h2 className="font-bricolage text-2xl font-bold text-[#1a3300]">
              Status Progres per Modul
            </h2>
            <p className="text-xs text-[#1a3300]/70">
              Lacak materi yang sudah tuntas dan lanjutkan yang belum selesai.
            </p>
          </div>
          <span className="text-xs font-mono text-[#1a3300]/60">14 Modul</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {JAVA_COURSE_DATA.modules.map((mod) => {
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
                className="bg-white border border-[#b6b6b6] hover:border-[#1a3300] rounded-[12px] p-4 transition-colors flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-[#fcfaf5] border border-[#b6b6b6] rounded-[3px] text-[#1a3300] font-semibold">
                      Modul {mod.order}
                    </span>
                    {isDone ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1a3300] bg-[#d5f5c2] px-2 py-0.5 rounded-[4px]">
                        <CheckCircle2 className="w-3 h-3 text-[#1a3300]" />
                        100%
                      </span>
                    ) : isStarted ? (
                      <span className="text-[11px] font-mono font-medium text-[#1a3300] bg-[#ffe95c] px-2 py-0.5 rounded-[4px]">
                        {modProgress.percent}%
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#1a3300]/50">
                        0%
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-sm text-[#1a3300] mb-1">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-[#1a3300]/70 line-clamp-2 mb-3">
                    {mod.shortDescription}
                  </p>

                  {/* Tiny progress bar */}
                  <div className="w-full h-1.5 bg-[#f1f1f1] rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-[#1a3300] rounded-full"
                      style={{ width: `${modProgress.percent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#f1f1f1]">
                  <span className="text-[11px] font-mono text-[#1a3300]/60">
                    {modProgress.completedLessons}/{mod.lessons.length} Pelajaran
                  </span>
                  <Link
                    href={`/java/${mod.slug}/${firstLessonSlug}`}
                    className="text-xs font-semibold text-[#1a3300] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{isDone ? "Buka" : "Lanjut"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* RECENT ACTIVITY & SUBMISSION HISTORY */}
      <section>
        <div className="flex items-center justify-between border-b border-[#b6b6b6] pb-3 mb-6">
          <div>
            <h2 className="font-bricolage text-2xl font-bold text-[#1a3300]">
              Riwayat Aktivitas & Submission
            </h2>
            <p className="text-xs text-[#1a3300]/70">
              Catatan latihan drag & drop dan kode yang telah kamu kerjakan.
            </p>
          </div>
          <span className="text-xs font-mono text-[#1a3300]/60">
            {progress.submissions.length} Riwayat
          </span>
        </div>

        {progress.submissions.length === 0 ? (
          <div className="p-8 text-center bg-white border border-[#b6b6b6] rounded-[12px]">
            <p className="text-sm text-[#1a3300]/70">
              Belum ada submission. Kerjakan latihan drag & drop atau tantangan coding pertama kamu!
            </p>
            <Link
              href="/java/variabel-dan-tipe-data/pengenalan-variabel"
              className="mt-4 inline-block px-5 py-2.5 bg-[#1a3300] text-[#fcfaf5] text-xs font-medium rounded-[6px]"
            >
              → Mulai Latihan Modul 1
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-[#1a3300] rounded-[12px] overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#fcfaf5] border-b border-[#1a3300] font-mono text-[#1a3300]">
                  <tr>
                    <th className="p-3 sm:p-4">Latihan / Exercise</th>
                    <th className="p-3 sm:p-4">Tipe</th>
                    <th className="p-3 sm:p-4">Status Hasil</th>
                    <th className="p-3 sm:p-4 hidden sm:table-cell">Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f1f1]">
                  {progress.submissions.map((sub) => {
                    const isAccepted = sub.status === "accepted";
                    const isDragDrop = sub.type === "drag_drop";
                    const dateFormatted = new Date(sub.submittedAt).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    });

                    return (
                      <tr key={sub.id} className="hover:bg-[#ffe95c]/10">
                        <td className="p-3 sm:p-4 font-medium text-[#1a3300]">
                          <div className="flex items-center gap-2">
                            {isAccepted ? (
                              <CheckCircle2 className="w-4 h-4 text-[#1a3300] shrink-0" />
                            ) : (
                              <Clock className="w-4 h-4 text-[#cb5521] shrink-0" />
                            )}
                            <span className="font-mono font-semibold">{sub.exerciseId}</span>
                          </div>
                        </td>
                        <td className="p-3 sm:p-4">
                          <span
                            className={`px-2 py-0.5 rounded-[4px] font-mono text-[10px] font-medium border ${
                              isDragDrop
                                ? "bg-[#d5f5c2] border-[#1a3300]/20 text-[#1a3300]"
                                : "bg-[#a8e5e5] border-[#1a3300]/20 text-[#1a3300]"
                            }`}
                          >
                            {isDragDrop ? "Drag & Drop" : "Coding Judge"}
                          </span>
                        </td>
                        <td className="p-3 sm:p-4">
                          <span
                            className={`px-2 py-0.5 rounded-[4px] font-mono text-[10px] font-bold ${
                              isAccepted
                                ? "bg-[#d5f5c2] text-[#1a3300]"
                                : "bg-[#f6d0ff] text-[#cb5521]"
                            }`}
                          >
                            {sub.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 sm:p-4 font-mono text-[#1a3300]/70 hidden sm:table-cell">
                          {dateFormatted}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Auth modal for persona switching */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
