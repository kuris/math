-- ============================================================
-- 수학아 놀자 (math) 기록 테이블 — _shared/sql/09-math.sql 의 복사본
-- 직접 수정하지 말고 <play_project>/_shared/sql/09-math.sql 에서 고친 뒤 복사하세요.
-- 실행: Supabase > SQL Editor (01~06 먼저 실행 필요)
-- ============================================================
-- ============================================================
-- [09] 수학아 놀자 (math) 기록 테이블
--
--  실행 대상 : Supabase 대시보드 > SQL Editor
--  ※ 01~06 을 먼저 실행하세요.
--     (06 의 public.cg_touch_updated_at() 와 02 의 public.cg_is_admin() 재사용)
--  ※ drop table / truncate / delete 가 하나도 없습니다.
--    기존 정책도 삭제하지 않고 'cg_' 접두사 정책만 새로 만듭니다.
--    여러 번 실행해도 안전합니다.
--
--  [스키마를 따로 만들지 않은 이유]
--    최신 형제 서비스(bible/book 등)와 동일하게
--    "public 스키마 + 서비스 접두사 테이블" 을 씁니다.
--    공통 모듈(cg-auth.js)의 기록 헬퍼가 public 스키마를 기본으로 합니다.
--
--  [추가 SQL 이 필요 없는 것들]
--    · 로그인/프로필 → public.profiles          (01)
--    · 구독/광고제거 → public.user_entitlements (02)
--    · 최근 본 공식   → public.cg_recent        (05, service='math')
--    · 방문 통계      → public.page_views       (기존, service='math')
--    · 서비스 가입    → public.service_members  (기존, service='math')
-- ============================================================

-- ---------- 1) 공식 학습 진도 ----------
create table if not exists public.math_progress (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  formula_id  text not null,
  status      text not null default 'done',   -- 'done' | 'learning'
  learned_at  timestamptz not null default now(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id, formula_id)
);
create index if not exists math_progress_user_idx
  on public.math_progress (user_id, learned_at desc);

-- ---------- 2) 연습 기록 ----------
create table if not exists public.math_practice_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  formula_id  text,
  is_correct  boolean not null default false,
  score       int not null default 0,
  total       int not null default 1,
  detail      jsonb,
  created_at  timestamptz not null default now()
);
create index if not exists math_practice_user_idx
  on public.math_practice_logs (user_id, created_at desc);

-- ---------- 3) 퀴즈 기록 ----------
create table if not exists public.math_quiz_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  quiz_type   text not null default 'mixed',   -- 'mixed' | 'elementary' | 'middle' | 'high'
  score       int  not null,
  total       int  not null,
  detail      jsonb,
  created_at  timestamptz not null default now()
);
create index if not exists math_quiz_user_idx
  on public.math_quiz_logs (user_id, created_at desc);

-- ---------- 4) 학습지 기록 ----------
create table if not exists public.math_worksheet_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text,
  score       int,
  total       int,
  detail      jsonb,
  created_at  timestamptz not null default now()
);
create index if not exists math_worksheet_user_idx
  on public.math_worksheet_logs (user_id, created_at desc);

comment on table public.math_progress       is '수학아 놀자 공식 학습 완료';
comment on table public.math_practice_logs  is '수학아 놀자 연습 기록';
comment on table public.math_quiz_logs      is '수학아 놀자 퀴즈 기록';
comment on table public.math_worksheet_logs is '수학아 놀자 학습지 기록';

-- ---------- 5) RLS : 본인만 전권, 관리자는 조회 ----------
do $$
declare t text;
begin
  foreach t in array array[
    'math_progress',
    'math_practice_logs',
    'math_quiz_logs',
    'math_worksheet_logs'
  ]
  loop
    execute format('alter table public.%I enable row level security', t);

    execute format('drop policy if exists cg_%s_own on public.%I', t, t);
    execute format(
      'create policy cg_%s_own on public.%I for all
         using (auth.uid() = user_id) with check (auth.uid() = user_id)', t, t);

    execute format('drop policy if exists cg_%s_select_admin on public.%I', t, t);
    execute format(
      'create policy cg_%s_select_admin on public.%I
         for select using (public.cg_is_admin())', t, t);
  end loop;
end $$;

-- ---------- 6) updated_at 자동 갱신 (공용 함수 재사용) ----------
drop trigger if exists math_progress_touch on public.math_progress;
create trigger math_progress_touch before update on public.math_progress
  for each row execute function public.cg_touch_updated_at();

-- ---------- 7) 권한 ----------
grant select, insert, update, delete on table
  public.math_progress,
  public.math_practice_logs,
  public.math_quiz_logs,
  public.math_worksheet_logs
to authenticated;

grant all on table
  public.math_progress,
  public.math_practice_logs,
  public.math_quiz_logs,
  public.math_worksheet_logs
to service_role;

-- ---------- 8) 서비스 가입은 첫 이용 시 클라이언트에서 upsert ----------
--    insert into public.service_members (user_id, service, last_seen_at)
--    values (auth.uid(), 'math', now())
--    on conflict (user_id, service) do update set last_seen_at = now(), updated_at = now();

-- ---------- 9) 확인용 ----------
--  select count(*) from public.math_progress;
--  select service, count(*) from public.page_views group by 1 order by 2 desc;
--  select service, count(*) from public.service_members group by 1 order by 1;
