
-- Add group_name column to scholarships table
ALTER TABLE public.scholarships 
ADD COLUMN group_name text;

COMMENT ON COLUMN public.scholarships.group_name IS 'Group name for linking related scholarship variants (e.g., Regional Talent I, II)';
