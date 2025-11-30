
-- Create the storage bucket 'user_documents'
insert into storage.buckets (id, name, public)
values ('user_documents', 'user_documents', false)
on conflict (id) do nothing;

-- Set up RLS policies for the bucket
create policy "Authenticated users can upload files"
on storage.objects for insert
with check (
  bucket_id = 'user_documents' and
  auth.role() = 'authenticated' and
  (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can view their own files"
on storage.objects for select
using (
  bucket_id = 'user_documents' and
  auth.role() = 'authenticated' and
  (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can delete their own files"
on storage.objects for delete
using (
  bucket_id = 'user_documents' and
  auth.role() = 'authenticated' and
  (storage.foldername(name))[1] = auth.uid()::text
);
