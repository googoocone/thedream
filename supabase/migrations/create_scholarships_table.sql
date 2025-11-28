-- Drop table if exists to recreate with new schema (since we are in dev)
drop table if exists public.scholarships cascade;

create table public.scholarships (
  id uuid default gen_random_uuid() primary key,
  
  -- Basic Info
  name text not null, -- 장학 제목
  foundation text not null, -- 접수 기관 / 후원 기관
  category text, -- 장학 종류 (공공/민간 등)
  
  -- Benefit Info
  benefit_type text, -- 혜택 유형 (등록금/생활비 등)
  amount text, -- 지원 금액
  payment_method text, -- 지급 방식
  payment_period text, -- 지원 기간 (지급 기간)
  extra_benefits text, -- 추가 혜택
  
  -- Target Info
  target_hashtags text[], -- 대상 해시태그 (Array)
  target_description text, -- 선발 대상
  eligibility text, -- 지원 자격 (신청 자격)
  selection_count text, -- 선발 인원
  
  -- Application Info
  application_count text, -- 접수 횟수
  application_period text, -- 접수 기간 (String description)
  application_start date, -- Parsed from period or deadline if possible
  application_end date, -- 마감 기한 (Parsed date)
  application_method text, -- 접수 방법
  required_documents text, -- 제출 서류
  
  -- Details
  description text, -- 상세 내용
  contact text, -- 문의처
  link text, -- url
  
  -- System
  tags text[], -- For internal matching logic (from extra columns later)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.scholarships enable row level security;

-- Policies
create policy "Public can view scholarships" on public.scholarships for select using (true);

create policy "Admins can insert scholarships" on public.scholarships for insert with check (exists (select 1 from public.users where id = auth.uid() and is_admin = true));

create policy "Admins can update scholarships" on public.scholarships for update using (exists (select 1 from public.users where id = auth.uid() and is_admin = true));

create policy "Admins can delete scholarships" on public.scholarships for delete using (exists (select 1 from public.users where id = auth.uid() and is_admin = true));
