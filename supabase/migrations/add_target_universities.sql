-- Add target_universities column to scholarships table
ALTER TABLE scholarships
ADD COLUMN IF NOT EXISTS target_universities TEXT DEFAULT NULL;

COMMENT ON COLUMN scholarships.target_universities IS 'Comma-separated list of target universities (e.g., "서울대학교, 고려대학교"). If null/empty, no restriction.';
