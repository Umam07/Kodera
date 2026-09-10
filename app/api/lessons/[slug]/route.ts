import { NextRequest, NextResponse } from "next/server";
import { JAVA_COURSE_DATA } from "@/lib/data/javaCourseData";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    let foundLesson = null;
    let parentModule = null;

    for (const mod of JAVA_COURSE_DATA.modules) {
      const lesson = mod.lessons.find((l) => l.slug === slug);
      if (lesson) {
        foundLesson = lesson;
        parentModule = {
          id: mod.id,
          slug: mod.slug,
          title: mod.title,
          order: mod.order,
          levelGroup: mod.levelGroup,
          levelName: mod.levelName,
        };
        break;
      }
    }

    if (!foundLesson) {
      return NextResponse.json(
        { error: `Lesson with slug "${slug}" was not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      module: parentModule,
      lesson: foundLesson,
    });
  } catch (error) {
    console.error("Error in /api/lessons/[slug]:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
