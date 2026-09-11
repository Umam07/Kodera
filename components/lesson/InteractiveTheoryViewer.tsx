"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Layers,
  FileText,
  Copy,
  Check,
  Lightbulb,
  ArrowRight,
  ListOrdered,
} from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { MarkdownRenderer, renderFormattedText } from "@/components/ui/MarkdownText";

interface CodeExampleItem {
  title: string;
  code: string;
  explanation: string;
}

interface InteractiveTheoryViewerProps {
  contentMarkdown: string;
  keyConcepts: string[];
  codeExamples: CodeExampleItem[];
  onStartExercise?: () => void;
  hasExercise?: boolean;
}

interface Chapter {
  id: string;
  title: string;
  shortTitle: string;
  type: "concepts" | "markdown" | "code_examples";
  content?: string;
}

export function InteractiveTheoryViewer({
  contentMarkdown,
  keyConcepts,
  codeExamples,
  onStartExercise,
  hasExercise = false,
}: InteractiveTheoryViewerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<"stepper" | "full">("stepper");
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Automatically segment lesson content into bite-sized chapters
  const chapters: Chapter[] = useMemo(() => {
    const list: Chapter[] = [];

    // Parse top-level headings (### ) from markdown
    const rawSections = contentMarkdown.split(/(?=\n###\s+)/);

    rawSections.forEach((section, idx) => {
      const trimmed = section.trim();
      if (!trimmed) return;

      const headerMatch = trimmed.match(/^###\s+([^\n]+)/);
      const rawTitle = headerMatch
        ? headerMatch[1].replace(/^[📦🎯🔤📑]\s*/, "").trim()
        : idx === 0
        ? "Konsep & Deklarasi Variabel"
        : `Bagian ${idx + 1}`;

      let shortTitle = rawTitle;
      if (rawTitle.toLowerCase().includes("tabel perbandingan")) {
        shortTitle = "Tabel Perbandingan";
      } else if (rawTitle.toLowerCase().includes("bilangan bulat")) {
        shortTitle = "Bilangan Bulat";
      } else if (rawTitle.toLowerCase().includes("desimal")) {
        shortTitle = "Bilangan Desimal";
      } else if (rawTitle.toLowerCase().includes("karakter")) {
        shortTitle = "Karakter & Boolean";
      } else if (rawTitle.toLowerCase().includes("referensi") || rawTitle.toLowerCase().includes("string")) {
        shortTitle = "String & Referensi";
      } else if (rawTitle.toLowerCase().includes("final")) {
        shortTitle = "Konstanta final";
      } else if (rawTitle.toLowerCase().includes("penamaan")) {
        shortTitle = "Aturan Penamaan";
      }

      list.push({
        id: `sec-${idx + 1}`,
        title: rawTitle,
        shortTitle,
        type: "markdown",
        content: headerMatch
          ? trimmed.replace(/^###\s+[^\n]+(\n+|$)/, "").trim()
          : trimmed,
      });
    });

    // Final Chapter: Code Examples
    if (codeExamples && codeExamples.length > 0) {
      list.push({
        id: "sec-code-examples",
        title: "Contoh Kode Nyata",
        shortTitle: "Contoh Kode",
        type: "code_examples",
      });
    }

    return list;
  }, [contentMarkdown, codeExamples]);

  const currentChapter = chapters[activeChapterIndex] || chapters[0];
  const progressPercent = Math.round(
    ((activeChapterIndex + 1) / Math.max(1, chapters.length)) * 100
  );

  const handleCopy = (code: string, index: number) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const goToNextChapter = useCallback(() => {
    if (activeChapterIndex < chapters.length - 1) {
      setActiveChapterIndex((prev) => prev + 1);
      window.scrollTo({ top: 180, behavior: "smooth" });
    } else if (onStartExercise) {
      onStartExercise();
    }
  }, [activeChapterIndex, chapters.length, onStartExercise]);

  const goToPrevChapter = useCallback(() => {
    if (activeChapterIndex > 0) {
      setActiveChapterIndex((prev) => prev - 1);
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  }, [activeChapterIndex]);

  // Keyboard navigation for accessible, fast reading (Left & Right arrows)
  useEffect(() => {
    if (viewMode !== "stepper") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input/textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNextChapter();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevChapter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, goToNextChapter, goToPrevChapter]);

  return (
    <div className="space-y-6">
      {/* Reading Mode Bar & Progress Indicator */}
      <div className="bg-[#fcfaf5] border-2 border-[#1a3300] rounded-[12px] p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1a3300]" />
            <span
              className="text-xs font-mono font-bold text-[#1a3300] uppercase tracking-wider"
              style={{ fontVariantNumeric: "tabular-nums" }}
              aria-live="polite"
            >
              {viewMode === "stepper"
                ? `Bab ${activeChapterIndex + 1} dari ${chapters.length}`
                : "Mode Dokumen Penuh"}
            </span>
            <span className="text-xs font-mono text-[#1a3300]/50">•</span>
            <span
              className="text-xs font-mono font-semibold text-[#1a3300]/70"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {viewMode === "stepper" ? `${progressPercent}% selesai` : "Semua Bab"}
            </span>
          </div>

          {/* View Mode Toggle Button */}
          <button
            type="button"
            onClick={() => setViewMode(viewMode === "stepper" ? "full" : "stepper")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#1a3300] rounded-[6px] text-xs font-medium text-[#1a3300] hover:bg-[#ffe95c]/30 transition-colors focus-visible:ring-2 focus-visible:ring-[#1a3300] focus-visible:outline-none"
            style={{ touchAction: "manipulation" }}
            aria-label={
              viewMode === "stepper"
                ? "Beralih ke tampilan dokumen penuh"
                : "Beralih ke tampilan bab terarah"
            }
          >
            {viewMode === "stepper" ? (
              <>
                <FileText className="w-3.5 h-3.5" />
                <span>Lihat Dokumen Penuh</span>
              </>
            ) : (
              <>
                <ListOrdered className="w-3.5 h-3.5" />
                <span>Mode Bab Terarah (Fokus)</span>
              </>
            )}
          </button>
        </div>

        {/* Progress Bar (Visible in Stepper Mode) */}
        {viewMode === "stepper" && (
          <div className="w-full h-2 bg-[#f1f1f1] border border-[#1a3300]/20 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-[#1a3300] rounded-full"
              initial={false}
              animate={{ width: `${progressPercent}%` }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 140, damping: 22 }
              }
              style={{ willChange: "transform" }}
            />
          </div>
        )}

        {/* Chapter Stepper Selector Pills */}
        <nav
          aria-label="Navigasi Bab Materi"
          className="flex items-center gap-1.5 overflow-x-auto pb-1"
        >
          {chapters.map((ch, idx) => {
            const isActive = viewMode === "stepper" && idx === activeChapterIndex;
            const isCompleted = idx < activeChapterIndex;

            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => {
                  if (viewMode === "full") {
                    const el = document.getElementById(ch.id);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    setActiveChapterIndex(idx);
                    window.scrollTo({ top: 180, behavior: "smooth" });
                  }
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-[6px] border transition-all whitespace-nowrap flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#1a3300] focus-visible:outline-none ${
                  isActive
                    ? "bg-[#1a3300] text-[#fcfaf5] border-[#1a3300] font-bold shadow-xs"
                    : isCompleted
                    ? "bg-[#d5f5c2] text-[#1a3300] border-[#1a3300]/30 hover:border-[#1a3300]"
                    : "bg-white text-[#1a3300] border-[#b6b6b6] hover:border-[#1a3300]"
                }`}
                style={{ touchAction: "manipulation" }}
              >
                <span
                  className="font-bold text-[11px]"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {idx + 1}.
                </span>
                <span>{ch.shortTitle}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* STEPPER MODE: Focus on 1 digestible chapter at a time */}
      {viewMode === "stepper" && (
        <div className="space-y-6">
          {/* Key Concepts Box: Display on Chapter 1 */}
          {activeChapterIndex === 0 && keyConcepts && keyConcepts.length > 0 && (
            <section
              aria-label="Poin Kunci Konsep"
              className="bg-[#fcfaf5] border-2 border-[#1a3300] rounded-[12px] p-5 sm:p-6 shadow-2xs"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#1a3300] mb-3">
                <Lightbulb className="w-4 h-4 text-[#cb5521]" />
                <span>Poin Kunci yang Wajib Dikuasai</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#1a3300] leading-relaxed">
                {keyConcepts.map((concept, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a3300] shrink-0 mt-2" />
                    <span>{renderFormattedText(concept)}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Active Chapter Body Card */}
          <article className="bg-white border-2 border-[#1a3300] rounded-[14px] p-6 sm:p-8 shadow-xs min-h-[360px] flex flex-col justify-between">
            <div>
              {/* Chapter Header */}
              <div className="border-b border-[#b6b6b6]/40 pb-4 mb-6">
                <div className="text-xs font-mono text-[#cb5521] font-bold uppercase tracking-wider mb-1">
                  Bagian {activeChapterIndex + 1} dari {chapters.length}
                </div>
                <h2 className="font-bricolage text-2xl sm:text-3xl font-bold text-[#1a3300] text-pretty">
                  {currentChapter.title}
                </h2>
              </div>

              {/* Chapter Content Rendering */}
              {currentChapter.type === "markdown" && currentChapter.content && (
                <div className="leading-relaxed">
                  <MarkdownRenderer content={currentChapter.content} />
                </div>
              )}

              {/* Code Examples Section */}
              {currentChapter.type === "code_examples" && (
                <div className="space-y-6">
                  {codeExamples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-[#1a3300] rounded-[12px] overflow-hidden bg-white shadow-2xs"
                    >
                      {/* Code Header */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-[#fcfaf5] border-b border-[#1a3300]">
                        <span className="font-mono text-xs font-bold text-[#1a3300]">
                          {ex.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(ex.code, idx)}
                          className="flex items-center gap-1.5 text-xs font-mono text-[#1a3300] px-2.5 py-1 rounded-[4px] hover:bg-[#ffe95c]/40 transition-colors focus-visible:ring-2 focus-visible:ring-[#1a3300]"
                          style={{ touchAction: "manipulation" }}
                          aria-label={`Salin contoh kode ${ex.title}`}
                        >
                          {copiedIndex === idx ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedIndex === idx ? "Tersalin" : "Salin Kode"}</span>
                        </button>
                      </div>

                      {/* Code Block */}
                      <pre className="p-4 sm:p-5 bg-white text-[#1a3300] font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
                        <code>{ex.code}</code>
                      </pre>

                      {/* Explanation footer */}
                      <div className="px-4 py-3 bg-[#fcfaf5] border-t border-[#b6b6b6]/40 text-xs text-[#1a3300]/80">
                        <strong className="font-semibold text-[#1a3300]">
                          Penjelasan:
                        </strong>{" "}
                        {renderFormattedText(ex.explanation)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Stepper Action Bar */}
            <div className="pt-8 mt-8 border-t border-[#b6b6b6]/40 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={goToPrevChapter}
                disabled={activeChapterIndex === 0}
                className="px-4 py-2.5 bg-white border border-[#1a3300] rounded-[6px] text-xs font-medium text-[#1a3300] hover:bg-[#ffe95c]/30 disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#1a3300]"
                style={{ touchAction: "manipulation" }}
                aria-label="Beralih ke bab sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Bab Sebelumnya</span>
              </button>

              <div className="flex items-center gap-2">
                {activeChapterIndex < chapters.length - 1 ? (
                  <motion.button
                    type="button"
                    onClick={goToNextChapter}
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                    className="px-6 py-2.5 bg-[#1a3300] text-[#fcfaf5] text-xs sm:text-sm font-semibold rounded-[6px] hover:bg-[#1a3300]/90 transition-colors flex items-center gap-1.5 shadow-xs focus-visible:ring-2 focus-visible:ring-[#ffe95c]"
                    style={{ touchAction: "manipulation", willChange: "transform" }}
                  >
                    <span>Lanjut ke Bab {activeChapterIndex + 2}</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                ) : hasExercise && onStartExercise ? (
                  <motion.button
                    type="button"
                    onClick={onStartExercise}
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                    className="px-6 py-2.5 bg-[#cb5521] text-white text-xs sm:text-sm font-bold rounded-[6px] hover:bg-[#cb5521]/90 transition-colors flex items-center gap-2 shadow-xs focus-visible:ring-2 focus-visible:ring-[#ffe95c]"
                    style={{ touchAction: "manipulation", willChange: "transform" }}
                  >
                    <span>Selesai Teori, Mulai Latihan!</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                ) : null}
              </div>
            </div>
          </article>
        </div>
      )}

      {/* FULL DOCUMENT MODE: Continuous reading with smooth anchor jump */}
      {viewMode === "full" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Key Concepts */}
          {keyConcepts && keyConcepts.length > 0 && (
            <section
              aria-label="Poin Kunci Konsep"
              className="bg-[#fcfaf5] border-2 border-[#1a3300] rounded-[12px] p-5 sm:p-6 shadow-2xs"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#1a3300] mb-3">
                <Lightbulb className="w-4 h-4 text-[#cb5521]" />
                <span>Poin Kunci Konsep</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#1a3300] leading-relaxed">
                {keyConcepts.map((concept, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a3300] shrink-0 mt-2" />
                    <span>{renderFormattedText(concept)}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Full Markdown Body */}
          <article className="bg-white border-2 border-[#1a3300] rounded-[12px] p-6 sm:p-8 shadow-xs">
            <MarkdownRenderer content={contentMarkdown} />
          </article>

          {/* Full Code Examples */}
          {codeExamples && codeExamples.length > 0 && (
            <section id="sec-code-examples" className="space-y-6 pt-2 scroll-mt-24">
              <h3 className="font-bricolage text-2xl font-bold text-[#1a3300]">
                Contoh Kode Java
              </h3>

              {codeExamples.map((ex, idx) => (
                <div
                  key={idx}
                  className="border-2 border-[#1a3300] rounded-[12px] overflow-hidden bg-white shadow-2xs"
                >
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#fcfaf5] border-b border-[#1a3300]">
                    <span className="font-mono text-xs font-bold text-[#1a3300]">
                      {ex.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(ex.code, idx)}
                      className="flex items-center gap-1 text-xs font-mono text-[#1a3300] px-2 py-1 rounded hover:bg-[#ffe95c]/40 transition-colors focus-visible:ring-2 focus-visible:ring-[#1a3300]"
                      style={{ touchAction: "manipulation" }}
                      aria-label={`Salin contoh kode ${ex.title}`}
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedIndex === idx ? "Tersalin" : "Salin"}</span>
                    </button>
                  </div>

                  <pre className="p-4 sm:p-5 bg-white text-[#1a3300] font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
                    <code>{ex.code}</code>
                  </pre>

                  <div className="px-4 py-3 bg-[#fcfaf5] border-t border-[#b6b6b6]/40 text-xs text-[#1a3300]/80">
                    <strong className="font-semibold text-[#1a3300]">
                      Penjelasan:
                    </strong>{" "}
                    {renderFormattedText(ex.explanation)}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Action Prompt to Practice */}
          {hasExercise && onStartExercise && (
            <div className="p-5 bg-[#d5f5c2]/40 border-2 border-[#1a3300] rounded-[12px] flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div>
                <h4 className="font-bold text-sm text-[#1a3300]">
                  Siap Menguji Pemahamanmu?
                </h4>
                <p className="text-xs text-[#1a3300]/80 mt-0.5">
                  Kamu telah menyelesaikan pembacaan materi teori. Lanjutkan ke latihan interaktif.
                </p>
              </div>
              <button
                type="button"
                onClick={onStartExercise}
                className="px-5 py-2.5 bg-[#1a3300] text-[#fcfaf5] text-xs font-bold rounded-[6px] hover:bg-[#1a3300]/90 transition-colors shadow-xs flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-[#ffe95c]"
                style={{ touchAction: "manipulation" }}
              >
                <span>Mulai Latihan Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
