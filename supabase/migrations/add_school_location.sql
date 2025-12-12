-- Add school_location column to users table
alter table public.users 
add column if not exists school_location text default 'domestic'; -- 'domestic' or 'overseas'

comment on column public.users.school_location is 'School location: domestic (국내) or overseas (해외)';
