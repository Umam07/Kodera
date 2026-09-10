import { NextRequest, NextResponse } from "next/server";
import { JAVA_COURSE_DATA } from "@/lib/data/javaCourseData";
import { executeJudge0 } from "@/lib/judge/judge0Client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { exerciseId, code } = body;

    if (!exerciseId || typeof code !== "string") {
      return NextResponse.json(
        { error: "Invalid request: exerciseId and code are required." },
        { status: 400 }
      );
    }

    // Locate problem definition
    let targetProblem = null;
    let targetLesson = null;
    for (const mod of JAVA_COURSE_DATA.modules) {
      for (const lesson of mod.lessons) {
        if (lesson.codingProblem && lesson.codingProblem.id === exerciseId) {
          targetProblem = lesson.codingProblem;
          targetLesson = lesson;
          break;
        }
      }
      if (targetProblem) break;
    }

    if (!targetProblem) {
      return NextResponse.json(
        { error: `Coding problem with id "${exerciseId}" was not found.` },
        { status: 404 }
      );
    }

    // "Submit" executes all test cases (visible + hidden)
    const executionResult = await executeJudge0(
      code,
      targetProblem.methodSignature,
      targetProblem.testCases,
      targetProblem.timeLimitMs,
      targetProblem.memoryLimitKb
    );

    const allPassed = executionResult.status === "accepted";

    return NextResponse.json({
      success: true,
      status: executionResult.status,
      compilerMessage: executionResult.compilerMessage,
      executionTimeMs: executionResult.executionTimeMs,
      testResults: executionResult.testResults,
      allPassed,
      xpReward: allPassed ? targetProblem.xpReward : 0,
      lessonId: targetLesson?.id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in /api/judge/submit:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while evaluating submission." },
      { status: 500 }
    );
  }
}
