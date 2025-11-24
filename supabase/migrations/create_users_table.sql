-- 0. Cleanup existing objects
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop table if exists public.users cascade;

-- 1. Create the public users table
create table public.users (
  id uuid not null references auth.users on delete cascade,
  email text,
  nickname text,
  profile_image text,
  
  -- 1. Personal Information
  birth_date date,
  gender text,
  phone_number text,
  address text,
  nationality text default 'Korea',
  parents_address text,
  residence_type text, -- 'same' or 'diff'
  religion text,

  -- 2. Education Level
  enrollment_status text,
  school_name text,
  school_type text,
  graduation_year int,
  degree_level text,
  completed_semesters int,
  current_grade int,
  current_semester int,
  major text,
  sub_major text,
  gpa numeric,

  -- 3. Financial/Household
  income_bracket int,
  family_size int,
  is_single_parent boolean,
  is_multicultural boolean,
  is_disabled boolean,
  welfare_status text[],

  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- 2. Enable Row Level Security (RLS)
alter table public.users enable row level security;

-- 3. Create Policies
-- Allow users to view their own profile
create policy "Users can view their own profile." 
  on public.users for select 
  using (auth.uid() = id);

-- Allow users to update their own profile
create policy "Users can update their own profile." 
  on public.users for update 
  using (auth.uid() = id);

-- 4. Create a function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, nickname, profile_image)
  values (
    new.id,
    new.email,
    -- Try to get nickname from metadata, fallback to email username
    coalesce(new.raw_user_meta_data->>'nickname', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    -- Try to get avatar/profile image from metadata
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'profile_image')
  );
  return new;
end;
$$ language plpgsql security definer;

-- 5. Create the trigger
-- Drop if exists to avoid errors on repeated runs
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
