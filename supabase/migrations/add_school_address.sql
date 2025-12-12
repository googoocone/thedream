-- Add address columns for schools
alter table public.users 
add column if not exists school_address text,
add column if not exists high_school_address text;
