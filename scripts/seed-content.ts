import { createClient } from "@supabase/supabase-js";
import { JAVA_COURSE_DATA } from "../lib/data/javaCourseData";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mock-project.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "mock-service-key";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedContent() {
  console.log("🚀 Starting Kodera content synchronization...");

  // 1. Seed Course
  const { data: course, error: courseErr } = await supabase
    .from("courses")
    .upsert(
      {
        slug: "java",
        title: JAVA_COURSE_DATA.title,
        language: JAVA_COURSE_DATA.language,
        description: JAVA_COURSE_DATA.description,
        order: 1,
      },
      { onConflict: "slug" }
    )
    .select()
    .single();

  if (courseErr) {
    console.error("Failed to seed course:", courseErr.message);
    return;
  }
  console.log(`✓ Course synchronized: ${course.title} (${course.id})`);

  // 2. Seed Modules & Lessons
  for (const mod of JAVA_COURSE_DATA.modules) {
    const { data: moduleData, error: modErr } = await supabase
      .from("modules")
      .upsert(
        {
          course_id: course.id,
          slug: mod.slug,
          title: mod.title,
          short_description: mod.shortDescription,
          level_group: mod.levelGroup,
          level_name: mod.levelName,
          order: mod.order,
        },
        { onConflict: "slug" }
      )
      .select()
      .single();

    if (modErr) {
      console.error(`Failed to seed module ${mod.title}:`, modErr.message);
      continue;
    }

    console.log(`  ✓ Module [${mod.order}]: ${mod.title}`);

    for (const lesson of mod.lessons) {
      const { data: lessonData, error: lesErr } = await supabase
        .from("lessons")
        .upsert(
          {
            module_id: moduleData.id,
            slug: lesson.slug,
            title: lesson.title,
            description: lesson.description,
            content_markdown: lesson.contentMarkdown,
            order: lesson.order,
          },
          { onConflict: "slug" }
        )
        .select()
        .single();

      if (lesErr) {
        console.error(`Failed to seed lesson ${lesson.title}:`, lesErr.message);
        continue;
      }

      // Seed Drag & Drop exercises
      const dndList = lesson.dragDropExercises || (lesson.dragDropExercise ? [lesson.dragDropExercise] : []);
      for (const dnd of dndList) {
        const { data: exData } = await supabase
          .from("exercises")
          .upsert(
            {
              lesson_id: lessonData.id,
              type: "drag_drop",
              title: dnd.title,
              instruction: dnd.instruction,
              difficulty: dnd.difficulty,
              xp_reward: dnd.xpReward,
              order: 1,
              solution_explanation: dnd.solutionExplanation || null,
            }
          )
          .select()
          .single();

        if (exData) {
          for (const item of dnd.items) {
            await supabase.from("drag_drop_items").upsert({
              exercise_id: exData.id,
              code_fragment: item.codeFragment,
              correct_position: item.correctPosition,
              explanation: item.explanation || null,
            });
          }
        }
      }

      // Seed Coding Problem
      if (lesson.codingProblem) {
        const cp = lesson.codingProblem;
        const { data: codingExData } = await supabase
          .from("exercises")
          .upsert(
            {
              lesson_id: lessonData.id,
              type: "coding",
              title: cp.title,
              instruction: cp.problemStatement,
              difficulty: cp.difficulty,
              xp_reward: cp.xpReward,
              order: 2,
            }
          )
          .select()
          .single();

        if (codingExData) {
          const { data: probData } = await supabase.from("coding_problems").upsert({
            exercise_id: codingExData.id,
            title: cp.title,
            problem_statement: cp.problemStatement,
            method_signature: cp.methodSignature,
            starter_code: cp.starterCode,
            solution_code: cp.solutionCode || null,
            time_limit_ms: cp.timeLimitMs,
            memory_limit_kb: cp.memoryLimitKb,
          }).select().single();

          if (probData && cp.testCases) {
            for (const tc of cp.testCases) {
              await supabase.from("test_cases").upsert({
                coding_problem_id: probData.id,
                input: tc.input,
                expected_output: tc.expectedOutput,
                is_hidden: tc.isHidden || false,
              });
            }
          }
        }
      }
    }
  }

  console.log("🎉 Content seeding completed successfully!");
}

seedContent().catch(console.error);
