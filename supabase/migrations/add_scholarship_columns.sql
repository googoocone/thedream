-- Add missing columns to scholarships table
ALTER TABLE public.scholarships
ADD COLUMN IF NOT EXISTS target_grade text, -- 대상학년
ADD COLUMN IF NOT EXISTS min_gpa text, -- 최소학점
ADD COLUMN IF NOT EXISTS max_income text, -- 최대소득
ADD COLUMN IF NOT EXISTS target_gender text, -- 성별
ADD COLUMN IF NOT EXISTS target_school_type text, -- 대학종류
ADD COLUMN IF NOT EXISTS target_region text, -- 지역
ADD COLUMN IF NOT EXISTS target_major text, -- 전공계열
ADD COLUMN IF NOT EXISTS min_prev_semester_credits text, -- 직전이수학점
ADD COLUMN IF NOT EXISTS specific_qualification text, -- 특화자격
ADD COLUMN IF NOT EXISTS target_nationality text; -- 국적
