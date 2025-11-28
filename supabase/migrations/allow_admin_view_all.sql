-- Policy: Admins can view all profiles
create policy "Admins can view all profiles"
  on public.users for select
  using (
    exists (
      select 1 from public.users
      where id = auth.uid() and is_admin = true
    )
  );
