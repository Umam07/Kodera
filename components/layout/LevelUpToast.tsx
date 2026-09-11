"use client";

import React from "react";
import { Zap, X, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useProgress } from "@/lib/context/ProgressContext";

export function LevelUpToast() {
  const { levelUpNotification, dismissLevelUp } = useProgress();
  const shouldReduceMotion = useReducedMotion();
  const isVisible = Boolean(levelUpNotification?.show);

  return (
    <AnimatePresence>
      {isVisible && levelUpNotification && (
        <motion.aside
          aria-label="Notifikasi Naik Level"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.95 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          style={{ willChange: "transform, opacity" }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full"
        >
          <div className="bg-[#d5f5c2] border-2 border-[#1a3300] rounded-[12px] p-5 relative">
        <button
          onClick={dismissLevelUp}
          className="absolute top-3 right-3 p-1 text-[#1a3300] hover:bg-[#1a3300]/10 rounded-[4px] transition-colors"
          aria-label="Tutup notifikasi"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 bg-[#ffe95c] border border-[#1a3300] rounded-[6px] flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5 text-[#1a3300]" />
          </div>
          <div className="flex-1 pr-4">
            <div className="inline-block px-2 py-0.5 bg-[#1a3300] text-[#fcfaf5] text-[10px] font-mono uppercase tracking-wider rounded-[3px] mb-1">
              Level Up!
            </div>
            <h4 className="font-bricolage text-xl font-bold text-[#1a3300] leading-tight">
              Selamat, Naik ke Level {levelUpNotification.newLevel}!
            </h4>
            <p className="text-xs text-[#1a3300]/80 mt-1">
              Gelar barumu: <strong className="text-[#1a3300] underline decoration-[#ffe95c] decoration-2">{levelUpNotification.title}</strong>
            </p>

            <div className="mt-3 flex items-center gap-2">
              <Link
                href="/dashboard"
                onClick={dismissLevelUp}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a3300] hover:underline"
              >
                <span>Lihat badge di Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
