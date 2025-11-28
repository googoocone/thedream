-- Add major category columns to users table
alter table public.users 
add column if not exists major_large_category text,
add column if not exists major_middle_category text;
