-- Create the storage bucket
insert into storage.buckets (id, name, public)
values ('scholarship-attachments', 'scholarship-attachments', true)
on conflict (id) do nothing;

-- Set up security policies
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'scholarship-attachments' );

-- Allow authenticated users (admins) to upload
-- Note: In a real prod env, you might want to strictly check for is_admin=true
create policy "Authenticated Insert"
  on storage.objects for insert
  with check ( bucket_id = 'scholarship-attachments' and auth.role() = 'authenticated' );

create policy "Authenticated Update"
  on storage.objects for update
  using ( bucket_id = 'scholarship-attachments' and auth.role() = 'authenticated' );

create policy "Authenticated Delete"
  on storage.objects for delete
  using ( bucket_id = 'scholarship-attachments' and auth.role() = 'authenticated' );
