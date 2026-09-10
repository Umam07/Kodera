-- ==============================================================================
-- Kodera Database Schema Migration (PostgreSQL / Supabase)
-- Matching PRD v0.4 Section 7.2
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID UNIQUE,
    display_name TEXT NOT NULL,
    campus TEXT DEFAULT 'Teknik Informatika',
    total_xp INT DEFAULT 0,
    level INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. COURSES
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    language TEXT NOT NULL,
    description TEXT,
    "order" INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. MODULES
CREATE TABLE IF NOT EXISTS modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT,
    level_group INT NOT NULL DEFAULT 1,
    level_name TEXT NOT NULL,
    "order" INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. LESSONS
CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content_markdown TEXT NOT NULL,
    "order" INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. EXERCISES
CREATE TABLE IF NOT EXISTS exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('drag_drop', 'coding')),
    title TEXT NOT NULL,
    instruction TEXT,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    xp_reward INT NOT NULL DEFAULT 15,
    "order" INT NOT NULL DEFAULT 1,
    required_level INT DEFAULT 1,
    solution_explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. DRAG_DROP_ITEMS
CREATE TABLE IF NOT EXISTS drag_drop_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
    code_fragment TEXT NOT NULL,
    correct_position INT NOT NULL,
    explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CODING_PROBLEMS
CREATE TABLE IF NOT EXISTS coding_problems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    problem_statement TEXT NOT NULL,
    method_signature TEXT NOT NULL,
    starter_code TEXT NOT NULL,
    solution_code TEXT,
    time_limit_ms INT DEFAULT 2000,
    memory_limit_kb INT DEFAULT 128000,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TEST_CASES
CREATE TABLE IF NOT EXISTS test_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coding_problem_id UUID REFERENCES coding_problems(id) ON DELETE CASCADE,
    input TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_hidden BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SUBMISSIONS
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
    submitted_code TEXT,
    status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'wrong_answer', 'compile_error', 'runtime_error', 'time_limit_exceeded')),
    execution_time_ms INT,
    judge_result JSONB DEFAULT '{}'::jsonb,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. USER_PROGRESS
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'completed',
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(profile_id, lesson_id)
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Public content read access
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE drag_drop_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE coding_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Courses are viewable by everyone" ON courses FOR SELECT USING (true);
CREATE POLICY "Modules are viewable by everyone" ON modules FOR SELECT USING (true);
CREATE POLICY "Lessons are viewable by everyone" ON lessons FOR SELECT USING (true);
CREATE POLICY "Exercises are viewable by everyone" ON exercises FOR SELECT USING (true);
CREATE POLICY "Drag Drop items are viewable by everyone" ON drag_drop_items FOR SELECT USING (true);
CREATE POLICY "Coding problems are viewable by everyone" ON coding_problems FOR SELECT USING (true);

-- Test cases: visible test cases can be viewed, hidden test cases restricted
CREATE POLICY "Visible test cases are viewable by everyone" ON test_cases FOR SELECT USING (is_hidden = false);

-- User-specific data
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = auth_user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can view own submissions" ON submissions FOR SELECT USING (
    profile_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
);
CREATE POLICY "Users can insert own submissions" ON submissions FOR INSERT WITH CHECK (
    profile_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
);

CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (
    profile_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
);
CREATE POLICY "Users can upsert own progress" ON user_progress FOR ALL USING (
    profile_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
);
