-- Add attachments column to scholarships table
alter table public.scholarships 
add column if not exists attachments jsonb[] default array[]::jsonb[];

comment on column public.scholarships.attachments is 'List of file attachments [{name, url, size, type}]';
