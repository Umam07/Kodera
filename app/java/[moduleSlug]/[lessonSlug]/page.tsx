import React from "react";
import { notFound } from "next/navigation";
import { JAVA_COURSE_DATA } from "@/lib/data/javaCourseData";
import { ModuleSidebar } from "@/components/lesson/ModuleSidebar";
import { LessonContent } from "@/components/lesson/LessonContent";

interface PageProps {
  params: Promise<{
    moduleSlug: string;
    lessonSlug: string;
  }>;
}

export async function generateStaticParams() {
  const paramsList: { moduleSlug: string; lessonSlug: string }[] = [];

  JAVA_COURSE_DATA.modules.forEach((mod) => {
    mod.lessons.forEach((lesson) => {
      paramsList.push({
        moduleSlug: mod.slug,
        lessonSlug: lesson.slug,
      });
    });
  });

  return paramsList;
}

export default async function LessonPage({ params }: PageProps) {
  const { moduleSlug, lessonSlug } = await params;

  // Flatten all lessons across modules in sequential order to calculate next/prev
  const allLessonsWithModule: {
    moduleSlug: string;
    lessonSlug: string;
    moduleTitle: string;
    lessonTitle: string;
  }[] = [];

  JAVA_COURSE_DATA.modules.forEach((m) => {
    m.lessons.forEach((l) => {
      allLessonsWithModule.push({
        moduleSlug: m.slug,
        lessonSlug: l.slug,
        moduleTitle: m.title,
        lessonTitle: l.title,
      });
    });
  });

  const currentIndex = allLessonsWithModule.findIndex(
    (item) => item.moduleSlug === moduleSlug && item.lessonSlug === lessonSlug
  );

  const currentModule = JAVA_COURSE_DATA.modules.find((m) => m.slug === moduleSlug);
  const currentLesson = currentModule?.lessons.find((l) => l.slug === lessonSlug);

  if (!currentModule || !currentLesson) {
    notFound();
  }

  const prevItem = currentIndex > 0 ? allLessonsWithModule[currentIndex - 1] : null;
  const nextItem =
    currentIndex >= 0 && currentIndex < allLessonsWithModule.length - 1
      ? allLessonsWithModule[currentIndex + 1]
      : null;

  const previousLessonUrl = prevItem
    ? `/java/${prevItem.moduleSlug}/${prevItem.lessonSlug}`
    : undefined;
  const nextLessonUrl = nextItem
    ? `/java/${nextItem.moduleSlug}/${nextItem.lessonSlug}`
    : undefined;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col lg:flex-row items-start gap-8">
        <ModuleSidebar
          currentModuleSlug={moduleSlug}
          currentLessonSlug={lessonSlug}
        />
        <LessonContent
          currentModule={currentModule}
          currentLesson={currentLesson}
          previousLessonUrl={previousLessonUrl}
          nextLessonUrl={nextLessonUrl}
        />
      </div>
    </div>
  );
}
