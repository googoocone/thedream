-- Add new columns for high school type and additional info
alter table public.users 
add column if not exists high_school_type text,
add column if not exists high_school_name text,
add column if not exists high_school_address text,
add column if not exists csat_grade text,
add column if not exists high_school_gpa float,
add column if not exists additional_info text;
