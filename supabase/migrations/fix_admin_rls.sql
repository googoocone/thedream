-- 1. Drop the problematic policy
drop policy if exists "Admins can view all profiles" on public.users;

-- 2. Create a security definer function to check admin status
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1
    from public.users
    where id = auth.uid()
    and is_admin = true
  );
end;
$$ language plpgsql security definer;

-- 3. Create the safe policy using the function
create policy "Admins can view all profiles"
  on public.users for select
  using ( public.is_admin() );
