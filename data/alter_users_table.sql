-- Add missing columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS degree_level text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS school_location text DEFAULT 'domestic';
ALTER TABLE users ADD COLUMN IF NOT EXISTS sub_major text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS graduation_year integer;
ALTER TABLE users ADD COLUMN IF NOT EXISTS additional_info text;

-- Add comments for clarity
COMMENT ON COLUMN users.degree_level IS 'Degree level for graduate school or graduates (e.g. master, doctor)';
COMMENT ON COLUMN users.school_location IS 'School location (domestic or overseas)';
COMMENT ON COLUMN users.sub_major IS 'Minor or double major';
COMMENT ON COLUMN users.graduation_year IS 'Expected or actual graduation year';
COMMENT ON COLUMN users.additional_info IS 'Additional comments from user profile';
