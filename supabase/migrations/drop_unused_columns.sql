-- Drop unused columns from users table
alter table public.users 
drop column if exists completed_semesters,
drop column if exists degree_level;
