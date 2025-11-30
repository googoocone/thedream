-- Create documents table
create table public.documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  file_path text not null,
  file_type text,
  size_bytes bigint,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.documents enable row level security;

-- Policies
create policy "Users can view their own documents."
  on public.documents for select
  using (auth.uid() = user_id);

create policy "Users can insert their own documents."
  on public.documents for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own documents."
  on public.documents for delete
  using (auth.uid() = user_id);

-- Storage bucket policy (Note: Bucket creation usually needs to be done in Supabase Dashboard or via API, 
-- but we can try to insert into storage.buckets if we have permissions, or just assume it exists/will be created)
-- For now, we'll focus on the table. The user might need to create the bucket 'user_documents' manually in Supabase.
