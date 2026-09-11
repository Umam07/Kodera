"use client";

import React, { useState, useEffect } from "react";
import {
  GripVertical,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ArrowUp,
  ArrowDown,
  Info,
  Terminal,
  Layers,
  Code2,
  ChevronRight,
  BookOpen,
  ArrowLeft,
  Lightbulb,
} from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { DragDropExercise, DragDropItem, DragDropType } from "@/lib/types";
import { useProgress } from "@/lib/context/ProgressContext";
import { renderFormattedText } from "@/components/ui/MarkdownText";

interface DragDropExerciseProps {
  exercise?: DragDropExercise;
  exercises?: DragDropExercise[];
  onSuccess?: () => void;
  onBackToTheory?: () => void;
}

export function DragDropExerciseComponent({
  exercise,
  exercises,
  onSuccess,
  onBackToTheory,
}: DragDropExerciseProps) {
  const { isExerciseCompleted, completeExercise } = useProgress();
  const shouldReduceMotion = useReducedMotion();

  // Normalize exercise list
  const exerciseList: DragDropExercise[] = React.useMemo(() => {
    if (exercises && exercises.length > 0) return exercises;
    if (exercise) return [exercise];
    return [];
  }, [exercises, exercise]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentExercise = exerciseList[currentIndex] || exerciseList[0];

  const [items, setItems] = useState<DragDropItem[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);
  const [xpEarnedNotice, setXpEarnedNotice] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Initialize and shuffle items for current exercise
  const initializeItems = () => {
    if (!currentExercise) return;
    const raw = [...currentExercise.items];
    const scrambled = [...raw].sort((a, b) => (a.id > b.id ? 1 : -1));
    const isSorted = scrambled.every((item, i) => item.correctPosition === i + 1);
    if (isSorted) scrambled.reverse();
    setItems(scrambled);
    setChecked(false);
    setIsAllCorrect(false);
    setXpEarnedNotice(null);
    setShowExplanation(false);
  };

  useEffect(() => {
    initializeItems();
  }, [currentExercise?.id]);

  if (!currentExercise) return null;

  const isAlreadyDone = isExerciseCompleted(currentExercise.id);

  // Reorder functions
  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= items.length) return;
    const updated = [...items];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setItems(updated);
    setChecked(false);
  };

  // Drag & drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    moveItem(draggedIndex, index);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Verification
  const handleCheckAnswer = () => {
    const correct = items.every((item, index) => item.correctPosition === index + 1);
    setIsAllCorrect(correct);
    setChecked(true);
    setShowExplanation(true);

    if (correct) {
      const { xpEarned } = completeExercise(
        currentExercise.id,
        "drag_drop",
        currentExercise.xpReward,
        { passedTests: items.length, totalTests: items.length }
      );
      if (xpEarned > 0) {
        setXpEarnedNotice(xpEarned);
      }
      if (onSuccess) onSuccess();
    }
  };

  // Get sorted items for solution breakdown
  const sortedSolutionItems = [...currentExercise.items].sort(
    (a, b) => a.correctPosition - b.correctPosition
  );

  const getExerciseTypeInfo = (type?: DragDropType) => {
    switch (type) {
      case "concept_order":
        return {
          label: "Urutan Konsep & Logika",
          icon: <Layers className="w-3.5 h-3.5 text-[#1a3300]" />,
          colorBg: "bg-[#d5f5c2]",
        };
      case "block_assembly":
        return {
          label: "Struktur Blok Program",
          icon: <Code2 className="w-3.5 h-3.5 text-[#1a3300]" />,
          colorBg: "bg-[#f6d0ff]",
        };
      case "code_order":
      default:
        return {
          label: "Penggalan Kode Java",
          icon: <Terminal className="w-3.5 h-3.5 text-[#1a3300]" />,
          colorBg: "bg-[#ffe95c]",
        };
    }
  };

  const currentTypeInfo = getExerciseTypeInfo(currentExercise.type);

  return (
    <div className="bg-[#fcfaf5] border-2 border-[#1a3300] rounded-[12px] p-5 sm:p-7 shadow-xs">
      {/* Top Workspace Bar: Return to Theory & Question Stepper */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#b6b6b6] pb-4 mb-6">
        <div className="flex items-center gap-2">
          {onBackToTheory && (
            <button
              type="button"
              onClick={onBackToTheory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#1a3300] hover:bg-[#ffe95c]/30 rounded-[6px] text-xs font-semibold text-[#1a3300] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Materi</span>
            </button>
          )}

          {exerciseList.length > 1 && (
            <span className="text-xs font-mono text-[#1a3300]/70 font-semibold">
              Soal {currentIndex + 1} dari {exerciseList.length}
            </span>
          )}
        </div>

        {/* Multi-Question Selector Stepper */}
        {exerciseList.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {exerciseList.map((ex, idx) => {
              const isDone = isExerciseCompleted(ex.id);
              const isActive = idx === currentIndex;
              return (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1 text-xs font-mono rounded-[6px] border transition-colors flex items-center gap-1 ${
                    isActive
                      ? "bg-[#1a3300] text-[#fcfaf5] border-[#1a3300] font-bold"
                      : isDone
                      ? "bg-[#d5f5c2] text-[#1a3300] border-[#1a3300]/30 hover:border-[#1a3300]"
                      : "bg-white text-[#1a3300] border-[#b6b6b6] hover:border-[#1a3300]"
                  }`}
                >
                  {isDone && <CheckCircle2 className="w-3 h-3 text-[#1a3300]" />}
                  <span>Soal {idx + 1}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Question Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 ${currentTypeInfo.colorBg} text-[#1a3300] font-mono text-xs font-semibold rounded-[4px] border border-[#1a3300]/20`}
            >
              {currentTypeInfo.icon}
              <span>{currentTypeInfo.label}</span>
            </span>
            <span className="text-xs font-mono text-[#1a3300]/70 uppercase">
              Tingkat: {currentExercise.difficulty}
            </span>
          </div>
          <h3 className="font-bricolage text-xl sm:text-2xl font-bold text-[#1a3300]">
            {currentExercise.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {isAlreadyDone && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a3300] bg-[#d5f5c2] px-2.5 py-1 rounded-[6px] border border-[#1a3300]/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1a3300]" />
              Selesai
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#cb5521] bg-white px-2.5 py-1 rounded-[6px] border border-[#cb5521]/30">
            <Award className="w-3.5 h-3.5" />
            +{currentExercise.xpReward} XP
          </span>
        </div>
      </div>

      {/* Instruction Box */}
      <div className="p-3.5 bg-white border border-[#1a3300]/20 rounded-[8px] text-xs sm:text-sm text-[#1a3300] leading-relaxed mb-6 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#1a3300] shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Instruksi:</strong>{" "}
          {renderFormattedText(currentExercise.instruction)}
          <div className="text-[11px] text-[#1a3300]/70 mt-1">
            Tarik & geser urutan baris, atau gunakan tombol panah (▲ / ▼) untuk menyusun alur yang tepat.
          </div>
        </div>
      </div>

      {/* Reorderable Items List */}
      <div className="space-y-2.5 mb-6" role="list">
        {items.map((item, index) => {
          const isItemCorrect = checked && item.correctPosition === index + 1;
          const isItemWrong = checked && item.correctPosition !== index + 1;
          const isDragging = draggedIndex === index;
          const isOver = dragOverIndex === index;

          return (
            <motion.div
              layout={!shouldReduceMotion}
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              style={{ willChange: "transform" }}
              className={`p-3 sm:p-4 rounded-[8px] border-2 transition-colors select-none ${
                isDragging
                  ? "opacity-50 border-dashed border-[#1a3300] bg-[#ffe95c]/20"
                  : isOver
                  ? "border-[#1a3300] bg-[#a8e5e5]/40"
                  : checked
                  ? isItemCorrect
                    ? "bg-[#d5f5c2]/70 border-[#1a3300]"
                    : "bg-[#f6d0ff]/70 border-[#cb5521]"
                  : "bg-white border-[#1a3300] hover:border-[#1a3300]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-x-auto flex-1">
                  <div
                    className="cursor-grab active:cursor-grabbing text-[#1a3300]/50 hover:text-[#1a3300] p-1 shrink-0"
                    title="Tarik untuk memindahkan"
                  >
                    <GripVertical className="w-4 h-4" />
                  </div>

                  {/* Line position indicator */}
                  <span className="w-6 h-6 flex items-center justify-center bg-[#ffe95c] border border-[#1a3300] text-[#1a3300] font-mono font-bold rounded-[4px] text-xs shrink-0">
                    {index + 1}
                  </span>

                  {/* Code or Concept Fragment */}
                  <div
                    className={`${
                      currentExercise.type === "concept_order"
                        ? "text-xs sm:text-sm font-medium text-[#1a3300]"
                        : "font-mono text-xs sm:text-sm text-[#1a3300] font-semibold whitespace-pre"
                    }`}
                  >
                    {renderFormattedText(item.codeFragment)}
                  </div>
                </div>

                {/* Status Indicator & Mobile Shift Buttons */}
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  {checked && (
                    <span>
                      {isItemCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-[#1a3300]" />
                      ) : (
                        <XCircle className="w-5 h-5 text-[#cb5521]" />
                      )}
                    </span>
                  )}

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveItem(index, index - 1)}
                      disabled={index === 0}
                      className="p-1.5 bg-[#fcfaf5] border border-[#b6b6b6] hover:border-[#1a3300] rounded-[4px] disabled:opacity-30 transition-colors"
                      aria-label={`Geser baris ${index + 1} ke atas`}
                    >
                      <ArrowUp className="w-3.5 h-3.5 text-[#1a3300]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItem(index, index + 1)}
                      disabled={index === items.length - 1}
                      className="p-1.5 bg-[#fcfaf5] border border-[#b6b6b6] hover:border-[#1a3300] rounded-[4px] disabled:opacity-30 transition-colors"
                      aria-label={`Geser baris ${index + 1} ke bawah`}
                    >
                      <ArrowDown className="w-3.5 h-3.5 text-[#1a3300]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Per-Item Explanation Callout when checked */}
              {checked && item.explanation && (
                <div className="mt-2.5 pt-2 border-t border-[#1a3300]/15 text-xs text-[#1a3300]/90 flex items-start gap-1.5">
                  <span className="font-mono font-bold text-[#cb5521] shrink-0">
                    Posisi Benar: #{item.correctPosition}
                  </span>
                  <span>— {renderFormattedText(item.explanation)}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Result feedback banner */}
      {checked && (
        <div
          className={`p-4 rounded-[8px] border-2 mb-5 transition-all ${
            isAllCorrect
              ? "bg-[#d5f5c2] border-[#1a3300] text-[#1a3300]"
              : "bg-[#f6d0ff] border-[#cb5521] text-[#1a3300]"
          }`}
        >
          <div className="flex items-center gap-2.5 font-bold text-sm">
            {isAllCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-[#1a3300]" />
                <span>Susunan Tepat! Urutan logika dan sintaks Java kamu benar.</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-[#cb5521]" />
                <span>Urutan Masih Keliru! Perhatikan baris yang berlatar merah muda.</span>
              </>
            )}
          </div>

          {isAllCorrect && xpEarnedNotice !== null && (
            <div className="mt-2 text-xs font-mono font-semibold text-[#1a3300] inline-block bg-white/80 px-2.5 py-1 rounded-[4px] border border-[#1a3300]/20">
              +{xpEarnedNotice} XP berhasil ditambahkan ke profilmu!
            </div>
          )}

          {!isAllCorrect && (
            <p className="text-xs text-[#1a3300]/80 mt-2">
              Kamu bisa menggeser kembali baris yang keliru, atau klik tombol di bawah untuk melihat penjelasan logika di balik susunan yang tepat.
            </p>
          )}
        </div>
      )}

      {/* Comprehensive Solution Explanation Panel */}
      {checked && (
        <div className="mb-6 bg-white border-2 border-[#1a3300] rounded-[8px] p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-[#b6b6b6] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#cb5521]" />
              <h4 className="font-bold text-sm text-[#1a3300]">
                Penjelasan Kunci & Urutan yang Benar
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-xs font-mono text-[#1a3300] hover:underline"
            >
              {showExplanation ? "Tutup Rincian ▲" : "Buka Rincian ▼"}
            </button>
          </div>

          {/* Solution Explanation Narrative */}
          {currentExercise.solutionExplanation && (
            <div className="text-xs sm:text-sm text-[#1a3300]/90 leading-relaxed mb-4">
              {renderFormattedText(currentExercise.solutionExplanation)}
            </div>
          )}

          {/* Step-by-Step Item Breakdown */}
          {showExplanation && (
            <div className="space-y-2.5 pt-2 border-t border-[#f1f1f1]">
              <div className="text-xs font-mono font-bold text-[#1a3300] uppercase tracking-wider mb-2">
                Rincian Langkah per Baris:
              </div>
              {sortedSolutionItems.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 bg-[#fcfaf5] border border-[#b6b6b6] rounded-[6px] text-xs flex flex-col sm:flex-row sm:items-start gap-2"
                >
                  <span className="w-5 h-5 flex items-center justify-center bg-[#ffe95c] border border-[#1a3300] rounded-[4px] font-mono font-bold text-[11px] shrink-0">
                    {item.correctPosition}
                  </span>
                  <div className="flex-1">
                    <div className="font-mono font-semibold text-[#1a3300] mb-0.5">
                      {renderFormattedText(item.codeFragment)}
                    </div>
                    {item.explanation && (
                      <div className="text-[#1a3300]/80">
                        {renderFormattedText(item.explanation)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons & Next Question Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#b6b6b6]/40">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={initializeItems}
            className="px-3.5 py-2 border border-[#b6b6b6] hover:border-[#1a3300] rounded-[6px] text-xs font-medium text-[#1a3300] flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Acak Ulang Posisi</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* If all correct and more questions exist, offer Next Question button */}
          {checked && isAllCorrect && currentIndex < exerciseList.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="px-6 py-2.5 bg-[#ffe95c] border border-[#1a3300] text-[#1a3300] text-xs sm:text-sm font-bold rounded-[6px] hover:bg-[#ffe95c]/80 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <span>Lanjut ke Soal {currentIndex + 2}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCheckAnswer}
              className="px-6 py-2.5 bg-[#1a3300] text-[#fcfaf5] text-xs sm:text-sm font-medium rounded-[6px] hover:bg-[#1a3300]/90 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <span>→ Cek Jawaban</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
