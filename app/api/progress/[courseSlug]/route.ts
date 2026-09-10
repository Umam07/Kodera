import { NextRequest, NextResponse } from "next/server";
import { JAVA_COURSE_DATA } from "@/lib/data/javaCourseData";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseSlug: string }> }
) {
  try {
    const { courseSlug } = await params;

    if (courseSlug !== "java" && courseSlug !== "java-course") {
      return NextResponse.json(
        { error: `Course "${courseSlug}" not found.` },
        { status: 404 }
      );
    }

    const totalModules = JAVA_COURSE_DATA.modules.length;
    let totalLessons = 0;
    let totalExercises = 0;
    let totalAvailableXp = 0;

    const moduleStats = JAVA_COURSE_DATA.modules.map((m) => {
      const lessonCount = m.lessons.length;
      totalLessons += lessonCount;

      let modXp = 0;
      let modExercises = 0;

      for (const l of m.lessons) {
        if (l.dragDropExercise) {
          modXp += l.dragDropExercise.xpReward;
          modExercises++;
        }
        if (l.dragDropExercises) {
          for (const d of l.dragDropExercises) {
            modXp += d.xpReward;
            modExercises++;
          }
        }
        if (l.codingProblem) {
          modXp += l.codingProblem.xpReward;
          modExercises++;
        }
      }

      totalExercises += modExercises;
      totalAvailableXp += modXp;

      return {
        id: m.id,
        slug: m.slug,
        title: m.title,
        order: m.order,
        levelGroup: m.levelGroup,
        levelName: m.levelName,
        lessonCount,
        exerciseCount: modExercises,
        availableXp: modXp,
      };
    });

    return NextResponse.json({
      success: true,
      course: {
        title: JAVA_COURSE_DATA.title,
        language: JAVA_COURSE_DATA.language,
        totalModules,
        totalLessons,
        totalExercises,
        totalAvailableXp,
      },
      modules: moduleStats,
    });
  } catch (error) {
    console.error("Error in /api/progress/[courseSlug]:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
