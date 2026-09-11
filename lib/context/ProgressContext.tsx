"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import confetti from "canvas-confetti";
import { JAVA_COURSE_DATA } from "../data/javaCourseData";
import { UserProgressState, UserSubmission } from "../types";

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  nextLevelXp: number;
  progressPercent: number;
}

export function calculateLevelInfo(totalXp: number): LevelInfo {
  const levels = [
    { level: 1, title: "Java Novice", minXp: 0, nextLevelXp: 100 },
    { level: 2, title: "Syntax Apprentice", minXp: 100, nextLevelXp: 250 },
    { level: 3, title: "Logic Craftsman", minXp: 250, nextLevelXp: 450 },
    { level: 4, title: "OOP Architect", minXp: 450, nextLevelXp: 700 },
    { level: 5, title: "Polymorphic Wizard", minXp: 700, nextLevelXp: 1000 },
    { level: 6, title: "Abstraction Master", minXp: 1000, nextLevelXp: 1400 },
    { level: 7, title: "Java Grandmaster", minXp: 1400, nextLevelXp: 2000 },
  ];

  for (let i = 0; i < levels.length; i++) {
    const current = levels[i];
    if (totalXp < current.nextLevelXp || i === levels.length - 1) {
      const range = current.nextLevelXp - current.minXp;
      const gainedInLevel = Math.max(0, totalXp - current.minXp);
      const progressPercent = Math.min(100, Math.round((gainedInLevel / range) * 100));
      return {
        level: current.level,
        title: current.title,
        minXp: current.minXp,
        nextLevelXp: current.nextLevelXp,
        progressPercent,
      };
    }
  }

  return {
    level: 7,
    title: "Java Grandmaster",
    minXp: 1400,
    nextLevelXp: 2000,
    progressPercent: 100,
  };
}

interface ProgressContextType {
  progress: UserProgressState;
  levelInfo: LevelInfo;
  isLoggedIn: boolean;
  loginUser: (displayName: string, campus: string) => void;
  logoutUser: () => void;
  completeExercise: (
    exerciseId: string,
    type: "drag_drop" | "coding",
    xpReward: number,
    submissionDetails?: Record<string, unknown>
  ) => { isNewCompletion: boolean; xpEarned: number; leveledUp: boolean };
  markLessonComplete: (lessonId: string) => void;
  isExerciseCompleted: (exerciseId: string) => boolean;
  isLessonCompleted: (lessonId: string) => boolean;
  getModuleProgress: (moduleSlug: string) => { totalLessons: number; completedLessons: number; percent: number };
  overallProgressPercent: number;
  levelUpNotification: { show: boolean; newLevel: number; title: string } | null;
  dismissLevelUp: () => void;
}

const STORAGE_KEY = "kodera_user_progress_v1";

const DEFAULT_STATE: UserProgressState = {
  userId: "user-umam-01",
  displayName: "Muhammad Syafi'ul Umam",
  campus: "Teknik Informatika",
  totalXp: 65,
  level: 1,
  completedLessonIds: ["les-var-1"],
  completedExerciseIds: ["dnd-var-1"],
  submissions: [
    {
      id: "sub-seed-1",
      exerciseId: "dnd-var-1",
      type: "drag_drop",
      submittedAt: new Date().toISOString(),
      status: "accepted",
      details: { passedTests: 4, totalTests: 4 },
    },
  ],
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgressState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [levelUpNotification, setLevelUpNotification] = useState<{ show: boolean; newLevel: number; title: string } | null>(null);
  const [, startTransition] = useTransition();

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setProgress(parsed);
      }
    } catch {
      // ignore
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch {
        // ignore
      }
    }
  }, [progress, isLoaded]);

  const levelInfo = calculateLevelInfo(progress.totalXp);

  const loginUser = (displayName: string, campus: string) => {
    setProgress((prev) => ({
      ...prev,
      displayName: displayName || "Muhammad Syafi'ul Umam",
      campus: campus || "Teknik Informatika",
    }));
  };

  const logoutUser = () => {
    setProgress((prev) => ({
      ...prev,
      displayName: "Tamu (Belum Login)",
      campus: "-",
    }));
  };

  const completeExercise = (
    exerciseId: string,
    type: "drag_drop" | "coding",
    xpReward: number,
    submissionDetails?: Record<string, unknown>
  ) => {
    const isNew = !progress.completedExerciseIds.includes(exerciseId);
    const newXp = isNew ? progress.totalXp + xpReward : progress.totalXp;
    const oldLevel = calculateLevelInfo(progress.totalXp).level;
    const newLevelInfo = calculateLevelInfo(newXp);
    const leveledUp = isNew && newLevelInfo.level > oldLevel;

    const subStatus = (submissionDetails?.status as UserSubmission["status"]) || "accepted";
    const submittedCode = (submissionDetails?.submittedCode as string) || undefined;

    const newSubmission: UserSubmission = {
      id: `sub-${Date.now()}`,
      exerciseId,
      type,
      submittedAt: new Date().toISOString(),
      status: subStatus,
      submittedCode,
      details: submissionDetails as UserSubmission["details"],
    };

    startTransition(() => {
      setProgress((prev) => ({
        ...prev,
        totalXp: newXp,
        level: newLevelInfo.level,
        completedExerciseIds: isNew ? [...prev.completedExerciseIds, exerciseId] : prev.completedExerciseIds,
        submissions: [newSubmission, ...prev.submissions],
      }));
    });

    if (leveledUp) {
      setLevelUpNotification({
        show: true,
        newLevel: newLevelInfo.level,
        title: newLevelInfo.title,
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#ffe95c", "#1a3300", "#d5f5c2", "#a8e5e5"],
        });
      } catch {
        // ignore in non-browser
      }
    }

    return {
      isNewCompletion: isNew,
      xpEarned: isNew ? xpReward : 0,
      leveledUp,
    };
  };

  const markLessonComplete = (lessonId: string) => {
    if (!progress.completedLessonIds.includes(lessonId)) {
      setProgress((prev) => ({
        ...prev,
        completedLessonIds: [...prev.completedLessonIds, lessonId],
      }));
    }
  };

  const isExerciseCompleted = (exerciseId: string) => progress.completedExerciseIds.includes(exerciseId);
  const isLessonCompleted = (lessonId: string) => progress.completedLessonIds.includes(lessonId);

  const getModuleProgress = (moduleSlug: string) => {
    const targetModule = JAVA_COURSE_DATA.modules.find((m) => m.slug === moduleSlug);
    if (!targetModule) return { totalLessons: 0, completedLessons: 0, percent: 0 };
    const total = targetModule.lessons.length;
    const completed = targetModule.lessons.filter((l) => progress.completedLessonIds.includes(l.id)).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { totalLessons: total, completedLessons: completed, percent };
  };

  const totalLessonsInCourse = JAVA_COURSE_DATA.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalCompletedInCourse = progress.completedLessonIds.length;
  const overallProgressPercent = totalLessonsInCourse === 0 ? 0 : Math.min(100, Math.round((totalCompletedInCourse / totalLessonsInCourse) * 100));

  const dismissLevelUp = () => setLevelUpNotification(null);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        levelInfo,
        isLoggedIn: progress.displayName !== "Tamu (Belum Login)",
        loginUser,
        logoutUser,
        completeExercise,
        markLessonComplete,
        isExerciseCompleted,
        isLessonCompleted,
        getModuleProgress,
        overallProgressPercent,
        levelUpNotification,
        dismissLevelUp,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
