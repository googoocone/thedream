-- Add category column to scholarships table
ALTER TABLE scholarships 
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'private'; -- 'private'(민간), 'public'(공공), 'university'(대학)
