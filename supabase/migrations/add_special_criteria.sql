-- Add special_criteria column to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS special_criteria TEXT[] DEFAULT '{}';

-- Remove old columns if they exist (optional, but cleaner)
-- We can keep them for now to avoid data loss during dev, or drop them.
-- Let's drop them to enforce usage of the new column.
ALTER TABLE users DROP COLUMN IF EXISTS is_single_parent;
ALTER TABLE users DROP COLUMN IF EXISTS is_multicultural;
ALTER TABLE users DROP COLUMN IF EXISTS is_disabled;
