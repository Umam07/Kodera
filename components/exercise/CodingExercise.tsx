"use client";

import React, { useState } from "react";
import {
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  Clock,
  Copy,
  Check,
  ChevronRight,
  Terminal,
  ArrowLeft,
  History,
  Code2,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CodingProblem, TestCase } from "@/lib/types";
import { useProgress } from "@/lib/context/ProgressContext";
import { renderFormattedText } from "@/components/ui/MarkdownText";
import { CodeEditor } from "./CodeEditor";

interface CodingExerciseProps {
  problem: CodingProblem;
  onSuccess?: () => void;
  onBackToTheory?: () => void;
}

interface RunResultItem {
  id: string;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  isHidden?: boolean;
}

export function CodingExerciseComponent({
  problem,
  onSuccess,
  onBackToTheory,
}: CodingExerciseProps) {
  const { isExerciseCompleted, completeExercise, progress } = useProgress();
  const shouldReduceMotion = useReducedMotion();
  const isAlreadyDone = isExerciseCompleted(problem.id);

  const [code, setCode] = useState(problem.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTestTab, setActiveTestTab] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const [runStatus, setRunStatus] = useState<
    "accepted" | "wrong_answer" | "compile_error" | "runtime_error" | "time_limit_exceeded" | null
  >(null);
  const [results, setResults] = useState<RunResultItem[]>([]);
  const [compilerError, setCompilerError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [xpEarnedNotice, setXpEarnedNotice] = useState<number | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  // Filter submissions for this problem
  const problemSubmissions = (progress.submissions || []).filter(
    (sub) => sub.exerciseId === problem.id
  );

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleResetCode = () => {
    setCode(problem.starterCode);
    setHasRun(false);
    setRunStatus(null);
    setCompilerError(null);
  };

  // Run visible test cases via /api/judge/run
  const handleRun = async () => {
    setIsRunning(true);
    setHasRun(true);
    setCompilerError(null);

    try {
      const response = await fetch("/api/judge/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId: problem.id,
          code,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal menghubungi server execution engine.");
      }

      const data = await response.json();
      setRunStatus(data.status);
      setCompilerError(data.compilerMessage || null);
      setResults(data.testResults || []);
      setExecutionTime(data.executionTimeMs || 60);
    } catch (err: unknown) {
      console.error("Run error:", err);
      setRunStatus("runtime_error");
      setCompilerError("Gagal menghubungi Judge engine. Silakan coba sesaat lagi.");
    } finally {
      setIsRunning(false);
    }
  };

  // Submit all test cases via /api/judge/submit
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setHasRun(true);
    setCompilerError(null);

    try {
      const response = await fetch("/api/judge/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId: problem.id,
          code,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengevaluasi submission di server.");
      }

      const data = await response.json();
      setRunStatus(data.status);
      setCompilerError(data.compilerMessage || null);
      setResults(data.testResults || []);
      setExecutionTime(data.executionTimeMs || 80);

      const passed = data.allPassed || data.status === "accepted";

      if (passed) {
        const { xpEarned } = completeExercise(
          problem.id,
          "coding",
          problem.xpReward,
          {
            submittedCode: code,
            status: "accepted",
            executionTimeMs: data.executionTimeMs,
            totalTests: (data.testResults || []).length,
          }
        );
        if (xpEarned > 0) {
          setXpEarnedNotice(xpEarned);
        }
        if (onSuccess) onSuccess();
      } else {
        // Log attempt in progress
        completeExercise(problem.id, "coding", 0, {
          submittedCode: code,
          status: data.status,
          executionTimeMs: data.executionTimeMs,
        });
      }
    } catch (err: unknown) {
      console.error("Submit error:", err);
      setRunStatus("runtime_error");
      setCompilerError("Terjadi kendala saat menghubungi server judge. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fcfaf5] border-2 border-[#1a3300] rounded-[12px] p-5 sm:p-7 shadow-xs">
      {/* Top Workspace Bar: Return to Theory & Status */}
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
          <span className="text-xs font-mono text-[#1a3300]/70 font-semibold">
            Mode Fokus Coding Auto-Judge
          </span>
        </div>

        {/* History Toggle */}
        <button
          type="button"
          onClick={() => setShowHistory(!showHistory)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono border transition-colors ${
            showHistory
              ? "bg-[#1a3300] text-[#fcfaf5] border-[#1a3300]"
              : "bg-white text-[#1a3300] border-[#b6b6b6] hover:border-[#1a3300]"
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Riwayat ({problemSubmissions.length})</span>
        </button>
      </div>

      {/* Problem Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 bg-[#a8e5e5] text-[#1a3300] font-mono text-xs font-semibold rounded-[4px] border border-[#1a3300]/20">
              Coding Auto-Judge
            </span>
            <span className="text-xs font-mono text-[#1a3300]/70 uppercase">
              Tingkat: {problem.difficulty}
            </span>
          </div>
          <h3 className="font-bricolage text-xl sm:text-2xl font-bold text-[#1a3300]">
            {problem.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {isAlreadyDone && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a3300] bg-[#d5f5c2] px-2.5 py-1 rounded-[6px] border border-[#1a3300]/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1a3300]" />
              Accepted
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#cb5521] bg-white px-2.5 py-1 rounded-[6px] border border-[#cb5521]/30">
            <Award className="w-3.5 h-3.5" />
            +{problem.xpReward} XP
          </span>
        </div>
      </div>

      {/* Submissions History Drawer/Panel */}
      {showHistory && (
        <div className="mb-6 p-4 bg-white border-2 border-[#1a3300] rounded-[8px]">
          <div className="flex items-center justify-between border-b border-[#b6b6b6] pb-2 mb-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1a3300] flex items-center gap-1.5">
              <History className="w-4 h-4 text-[#1a3300]" />
              <span>Riwayat Submission untuk Soal Ini</span>
            </h4>
            <span className="text-xs font-mono text-[#1a3300]/60">
              {problemSubmissions.length} tercatat
            </span>
          </div>

          {problemSubmissions.length === 0 ? (
            <p className="text-xs text-[#1a3300]/60 font-mono py-2">
              Belum ada submission yang tercatat untuk tantangan ini.
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {problemSubmissions.map((sub, idx) => (
                <div
                  key={sub.id || idx}
                  className="flex items-center justify-between p-2.5 bg-[#fcfaf5] border border-[#b6b6b6] rounded-[6px] text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 font-mono text-[10px] font-bold rounded-[3px] uppercase ${
                        sub.status === "accepted"
                          ? "bg-[#d5f5c2] text-[#1a3300]"
                          : "bg-[#f6d0ff] text-[#cb5521]"
                      }`}
                    >
                      {sub.status.replace("_", " ")}
                    </span>
                    <span className="text-[11px] font-mono text-[#1a3300]/70">
                      {new Date(sub.submittedAt).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </div>

                  {sub.submittedCode && (
                    <button
                      type="button"
                      onClick={() => setCode(sub.submittedCode || "")}
                      className="text-[11px] font-mono text-[#1a3300] underline hover:text-[#cb5521]"
                    >
                      Muat ke Editor
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Problem Statement Card */}
      <div className="bg-white border border-[#b6b6b6] rounded-[8px] p-4 sm:p-5 mb-5 shadow-2xs">
        <h4 className="text-xs font-mono uppercase tracking-wider text-[#1a3300]/70 mb-2">
          Deskripsi Masalah
        </h4>
        <div className="text-sm text-[#1a3300] leading-relaxed mb-4">
          {renderFormattedText(problem.problemStatement)}
        </div>

        {/* Method Signature Box */}
        <div className="p-3 bg-[#fcfaf5] border border-[#1a3300]/20 rounded-[6px]">
          <div className="text-[11px] font-mono text-[#1a3300]/70 mb-1">
            Method Signature:
          </div>
          <code className="text-xs sm:text-sm font-mono font-bold text-[#1a3300]">
            {problem.methodSignature}
          </code>
        </div>
      </div>

      {/* Code Editor Section (Powered by Monaco) */}
      <div className="border-2 border-[#1a3300] rounded-[8px] overflow-hidden bg-white mb-5 shadow-2xs">
        {/* Editor Top Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#fcfaf5] border-b border-[#1a3300]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1a3300]" />
            <span className="text-xs font-mono font-semibold text-[#1a3300]">
              Solution.java
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopyCode}
              className="p-1.5 text-xs text-[#1a3300] hover:bg-[#ffe95c]/30 rounded-[4px] flex items-center gap-1 transition-colors"
              title="Salin kode"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[11px] font-mono">
                {copied ? "Tersalin" : "Salin"}
              </span>
            </button>
            <button
              type="button"
              onClick={handleResetCode}
              className="p-1.5 text-xs text-[#1a3300] hover:bg-[#ffe95c]/30 rounded-[4px] flex items-center gap-1 transition-colors"
              title="Kembalikan kode awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] font-mono">Reset</span>
            </button>
          </div>
        </div>

        {/* Monaco Editor Component */}
        <CodeEditor
          value={code}
          onChange={setCode}
          language="java"
          height="280px"
        />

        {/* Editor Bottom Bar / Info */}
        <div className="px-4 py-2 bg-[#fcfaf5] border-t border-[#b6b6b6]/50 flex items-center justify-between text-[11px] font-mono text-[#1a3300]/70">
          <span>Java 17 (OpenJDK) • Function Harness Mode</span>
          <span>Batas Waktu: {problem.timeLimitMs}ms</span>
        </div>
      </div>

      {/* Action Buttons (Run & Submit) */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="text-xs text-[#1a3300]/70 font-mono">
          Tekan <strong>Run</strong> untuk uji kasus terlihat, atau <strong>Submit</strong> untuk penilaian tuntas.
        </div>

        <div className="flex items-center gap-2">
          {/* RUN BUTTON */}
          <motion.button
            type="button"
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ willChange: "transform" }}
            className="px-4 py-2 bg-white border border-[#1a3300] text-[#1a3300] text-xs sm:text-sm font-medium rounded-[6px] hover:bg-[#ffe95c]/30 disabled:opacity-50 transition-colors flex items-center gap-1.5"
          >
            {isRunning ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-[#1a3300] border-t-transparent rounded-full animate-spin" />
                <span>Menjalankan...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-[#1a3300]" />
                <span>Run (Uji Coba)</span>
              </>
            )}
          </motion.button>

          {/* SUBMIT BUTTON */}
          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ willChange: "transform" }}
            className="px-6 py-2 bg-[#1a3300] text-[#fcfaf5] text-xs sm:text-sm font-medium rounded-[6px] hover:bg-[#1a3300]/90 disabled:opacity-50 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            {isSubmitting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Memeriksa...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>→ Submit Solusi</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* RESULTS & TEST CASES PANEL */}
      <div className="border border-[#1a3300] rounded-[8px] bg-white p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#b6b6b6] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#1a3300]" />
            <h4 className="font-mono text-xs uppercase font-bold text-[#1a3300]">
              Hasil Verifikasi & Test Cases
            </h4>
          </div>

          {hasRun && (
            <div className="flex items-center gap-3 text-xs font-mono">
              {runStatus === "accepted" ? (
                <span className="inline-flex items-center gap-1 font-bold text-[#1a3300] bg-[#d5f5c2] px-2.5 py-0.5 rounded-[4px] border border-[#1a3300]/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  ACCEPTED
                </span>
              ) : runStatus === "compile_error" ? (
                <span className="inline-flex items-center gap-1 font-bold text-[#cb5521] bg-[#ffe95c] px-2.5 py-0.5 rounded-[4px]">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  COMPILE ERROR
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 font-bold text-[#cb5521] bg-[#f6d0ff] px-2.5 py-0.5 rounded-[4px]">
                  <XCircle className="w-3.5 h-3.5" />
                  {runStatus === "time_limit_exceeded" ? "TIME LIMIT EXCEEDED" : "WRONG ANSWER"}
                </span>
              )}

              {executionTime > 0 && (
                <span className="text-[#1a3300]/60 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {executionTime}ms
                </span>
              )}
            </div>
          )}
        </div>

        {/* Level up or XP celebration banner */}
        {runStatus === "accepted" && xpEarnedNotice !== null && (
          <div className="mb-4 p-3 bg-[#d5f5c2] border border-[#1a3300] rounded-[6px] flex items-center justify-between text-xs font-medium text-[#1a3300]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1a3300]" />
              <span>
                Solusi diterima! Kamu mendapatkan <strong>+{xpEarnedNotice} XP</strong>.
              </span>
            </div>
            <span className="font-mono font-bold">First Accepted!</span>
          </div>
        )}

        {/* Compiler error output view */}
        {compilerError ? (
          <div className="p-3 bg-[#1a3300] text-[#ffe95c] font-mono text-xs rounded-[6px] overflow-x-auto whitespace-pre">
            {compilerError}
          </div>
        ) : !hasRun ? (
          <div className="py-6 text-center text-xs font-mono text-[#1a3300]/60">
            Klik tombol <strong>Run</strong> untuk menguji kode terhadap test case contoh, atau{" "}
            <strong>Submit</strong> untuk penilaian seluruh test case.
          </div>
        ) : (
          <div>
            {/* Test Case Tab Selector */}
            <div className="flex items-center gap-2 border-b border-[#f1f1f1] pb-2 mb-4 overflow-x-auto">
              {results.map((res, index) => (
                <button
                  key={res.id}
                  type="button"
                  onClick={() => setActiveTestTab(index)}
                  className={`px-3 py-1.5 rounded-[6px] text-xs font-mono flex items-center gap-1.5 transition-colors ${
                    activeTestTab === index
                      ? "bg-[#1a3300] text-[#fcfaf5] font-semibold"
                      : "bg-[#fcfaf5] text-[#1a3300] hover:bg-[#ffe95c]/30"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      res.passed ? "bg-[#d5f5c2]" : "bg-[#cb5521]"
                    }`}
                  />
                  <span>
                    Case {index + 1}
                    {res.isHidden ? " (Hidden)" : ""}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Test Case Detail */}
            {results[activeTestTab] && (
              <div className="space-y-3 font-mono text-xs">
                {results[activeTestTab].isHidden ? (
                  <div className="p-3 bg-[#fcfaf5] border border-[#b6b6b6] rounded-[6px]">
                    <div className="text-[11px] text-[#1a3300]/70 mb-1">Status Kasus Uji:</div>
                    <div
                      className={`font-semibold ${
                        results[activeTestTab].passed ? "text-[#1a3300]" : "text-[#cb5521]"
                      }`}
                    >
                      {results[activeTestTab].passed
                        ? "✓ Lolos (Passed)"
                        : "✗ Gagal (Expected output tidak sesuai)"}
                    </div>
                    <div className="text-[10px] text-[#1a3300]/60 mt-1">
                      (Input dan expected value disembunyikan untuk mencegah hard-coding)
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-[#fcfaf5] border border-[#b6b6b6] rounded-[6px]">
                      <div className="text-[11px] text-[#1a3300]/70 mb-1">Input:</div>
                      <div className="text-[#1a3300] font-semibold whitespace-pre">
                        {results[activeTestTab].input}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-[#fcfaf5] border border-[#b6b6b6] rounded-[6px]">
                        <div className="text-[11px] text-[#1a3300]/70 mb-1">Expected Output:</div>
                        <div className="text-[#1a3300] font-semibold whitespace-pre">
                          {results[activeTestTab].expected}
                        </div>
                      </div>

                      <div
                        className={`p-3 border rounded-[6px] ${
                          results[activeTestTab].passed
                            ? "bg-[#d5f5c2]/40 border-[#1a3300]"
                            : "bg-[#f6d0ff]/50 border-[#cb5521]"
                        }`}
                      >
                        <div className="text-[11px] text-[#1a3300]/70 mb-1">Actual Output:</div>
                        <div
                          className={`font-semibold whitespace-pre ${
                            results[activeTestTab].passed ? "text-[#1a3300]" : "text-[#cb5521]"
                          }`}
                        >
                          {results[activeTestTab].actual}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
