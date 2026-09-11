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

    // Locate problem definition across modules and lessons
    let targetProblem = null;
    for (const mod of JAVA_COURSE_DATA.modules) {
      for (const lesson of mod.lessons) {
        if (lesson.codingProblem && lesson.codingProblem.id === exerciseId) {
          targetProblem = lesson.codingProblem;
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

    // "Run" only executes visible test cases
    const visibleTestCases = targetProblem.testCases.filter((tc) => !tc.isHidden);

    const executionResult = await executeJudge0(
      code,
      targetProblem.methodSignature,
      visibleTestCases,
      targetProblem.timeLimitMs,
      targetProblem.memoryLimitKb
    );

    return NextResponse.json({
      success: true,
      status: executionResult.status,
      compilerMessage: executionResult.compilerMessage,
      executionTimeMs: executionResult.executionTimeMs,
      testResults: executionResult.testResults,
    });
  } catch (error) {
    console.error("Error in /api/judge/run:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while executing code." },
      { status: 500 }
    );
  }
}
