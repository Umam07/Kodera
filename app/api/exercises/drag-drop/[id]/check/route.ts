import { NextRequest, NextResponse } from "next/server";
import { JAVA_COURSE_DATA } from "@/lib/data/javaCourseData";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { orderedIds } = body;

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json(
        { error: "Invalid request: orderedIds must be an array of item IDs." },
        { status: 400 }
      );
    }

    // Find exercise across lessons and modules
    let targetExercise = null;
    for (const mod of JAVA_COURSE_DATA.modules) {
      for (const lesson of mod.lessons) {
        if (lesson.dragDropExercise && lesson.dragDropExercise.id === id) {
          targetExercise = lesson.dragDropExercise;
          break;
        }
        if (lesson.dragDropExercises) {
          const found = lesson.dragDropExercises.find((e) => e.id === id);
          if (found) {
            targetExercise = found;
            break;
          }
        }
      }
      if (targetExercise) break;
    }

    if (!targetExercise) {
      return NextResponse.json(
        { error: `Exercise with id "${id}" was not found.` },
        { status: 404 }
      );
    }

    // Verify ordering against server-side secret correct positions
    const itemById: Record<string, (typeof targetExercise.items)[0]> = {};
    for (const it of targetExercise.items) {
      itemById[it.id] = it;
    }
    const feedback = orderedIds.map((itemId: string, index: number) => {
      const item = itemById[itemId];
      const isCorrect = item ? item.correctPosition === index + 1 : false;
      return {
        id: itemId,
        userPosition: index + 1,
        correctPosition: item ? item.correctPosition : null,
        isCorrect,
        explanation: item?.explanation || null,
      };
    });

    const isAllCorrect = feedback.every((f) => f.isCorrect);

    return NextResponse.json({
      success: true,
      isAllCorrect,
      xpEarned: isAllCorrect ? targetExercise.xpReward : 0,
      feedback,
      solutionExplanation: targetExercise.solutionExplanation || null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in /api/exercises/drag-drop/[id]/check:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while verifying answer." },
      { status: 500 }
    );
  }
}
