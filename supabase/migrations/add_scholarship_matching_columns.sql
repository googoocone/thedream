-- Add new columns to scholarships table for advanced matching
ALTER TABLE scholarships
ADD COLUMN IF NOT EXISTS target_grade TEXT DEFAULT '1,2,3,4', -- 대상학년 (e.g., "1,2,3,4")
ADD COLUMN IF NOT EXISTS min_gpa NUMERIC DEFAULT 0, -- 최소학점
ADD COLUMN IF NOT EXISTS max_income INTEGER DEFAULT 10, -- 최대소득 (분위)
ADD COLUMN IF NOT EXISTS target_gender TEXT DEFAULT 'any', -- 성별 (male, female, any)
ADD COLUMN IF NOT EXISTS target_school_type TEXT DEFAULT 'university,college,grad_school', -- 대학종류
ADD COLUMN IF NOT EXISTS target_major_category TEXT DEFAULT '무관', -- 전공계열
ADD COLUMN IF NOT EXISTS min_prev_semester_credits INTEGER DEFAULT 0, -- 직전이수학점
ADD COLUMN IF NOT EXISTS special_criteria TEXT[] DEFAULT '{}', -- 특화자격 (매칭용 태그)
ADD COLUMN IF NOT EXISTS target_nationality TEXT DEFAULT 'Korea', -- 국적
ADD COLUMN IF NOT EXISTS target_university_region TEXT DEFAULT '전국', -- 대학교 소재지
ADD COLUMN IF NOT EXISTS target_high_school_region TEXT DEFAULT '전국', -- 고등학교 소재지
ADD COLUMN IF NOT EXISTS max_csat_grade INTEGER DEFAULT 9, -- 수능등급
ADD COLUMN IF NOT EXISTS max_school_grade INTEGER DEFAULT 9; -- 내신등급

-- Note: target_region and target_parents_region might already exist, but adding if not just in case
ALTER TABLE scholarships ADD COLUMN IF NOT EXISTS target_region TEXT DEFAULT '전국';
ALTER TABLE scholarships ADD COLUMN IF NOT EXISTS target_parents_region TEXT DEFAULT '전국';
