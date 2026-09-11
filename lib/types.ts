export type Difficulty = "easy" | "medium" | "hard";

export interface DragDropItem {
  id: string;
  codeFragment: string;
  correctPosition: number;
  explanation?: string;
}

export type DragDropType = "code_order" | "concept_order" | "block_assembly";

export interface DragDropExercise {
  id: string;
  lessonId: string;
  title: string;
  instruction: string;
  type?: DragDropType;
  difficulty: Difficulty;
  xpReward: number;
  items: DragDropItem[];
  solutionExplanation?: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface CodingProblem {
  id: string;
  lessonId: string;
  title: string;
  problemStatement: string;
  methodSignature: string;
  starterCode: string;
  solutionCode?: string;
  harnessTemplate?: string;
  timeLimitMs: number;
  memoryLimitKb: number;
  difficulty: Difficulty;
  xpReward: number;
  testCases: TestCase[];
  hints?: string[];
}

export interface Lesson {
  id: string;
  moduleSlug: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  contentMarkdown: string;
  keyConcepts: string[];
  codeExamples: {
    title: string;
    code: string;
    explanation: string;
  }[];
  dragDropExercise?: DragDropExercise;
  dragDropExercises?: DragDropExercise[];
  codingProblem?: CodingProblem;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  levelGroup: number;
  levelName: string;
  order: number;
  iconName: string;
  accentColor?: "mint" | "yellow" | "teal" | "blush" | "terracotta";
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  language: string;
  description: string;
  totalModules: number;
  totalLessons: number;
  modules: Module[];
}

export interface UserSubmission {
  id: string;
  exerciseId: string;
  type: "drag_drop" | "coding";
  submittedAt: string;
  status: "accepted" | "wrong_answer" | "compile_error" | "runtime_error" | "time_limit_exceeded";
  submittedCode?: string;
  details?: {
    passedTests?: number;
    totalTests?: number;
    executionTimeMs?: number;
    compilerOutput?: string;
    testResults?: {
      id: string;
      input: string;
      expected: string;
      actual: string;
      passed: boolean;
      isHidden?: boolean;
    }[];
  };
}

export interface UserProgressState {
  userId: string;
  displayName: string;
  campus: string;
  totalXp: number;
  level: number;
  completedLessonIds: string[];
  completedExerciseIds: string[];
  submissions: UserSubmission[];
}
