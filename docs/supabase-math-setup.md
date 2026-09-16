# 수학아 놀자(math) Supabase 설정

수학아 놀자는 기존 놀자 계열과 **같은 Supabase 프로젝트**를 공유합니다.

- 프로젝트: `ybhiznlelnpwaicyoifa`
- 기록: `public.math_progress` · `math_practice_logs` · `math_quiz_logs` · `math_worksheet_logs`
- 계정: `auth.users` (공통)

> 전용 스키마를 만들지 않은 이유: 공통 로그인 모듈 `cg-auth.js` 의 기록 헬퍼가
> `public` 스키마를 기본으로 합니다. 최신 형제 서비스처럼 **public + 서비스 접두사**를 씁니다.

---

## 1. SQL 실행 (Supabase > SQL Editor)

| 순서 | 파일 | 내용 |
|---|---|---|
| 1 | `play_project/_shared/sql/01-profiles.sql` | 공통 `public.profiles` · 관리자 지정 |
| 2 | `_shared/sql/02-entitlements.sql` | `cg_is_admin()` 등 |
| 3 | `_shared/sql/03-records.sql` | 다른 서비스 기록 테이블 |
| 4 | `_shared/sql/04-rls.sql` | 공통 RLS |
| 5 | `_shared/sql/05-recent.sql` | `cg_recent` (service='math' 로 최근 본 공식) |
| 6 | `_shared/sql/06-service-extras.sql` | `cg_touch_updated_at()` |
| 7 | `_shared/sql/09-math.sql` | **`public.math_*` 4종 생성 · RLS · 권한** |

`09-math.sql` 사본이 `math/supabase/migrations/001_math_schema.sql` 에 있습니다.

---

## 2. 테이블 요약

| 테이블 | 키 | 용도 |
|---|---|---|
| `math_progress` | `(user_id, formula_id)` 유일 | 공식 학습 완료 |
| `math_practice_logs` | — | 연습 정답 여부·점수 |
| `math_quiz_logs` | — | 퀴즈 유형·점수 |
| `math_worksheet_logs` | — | 학습지 생성 이력 |

RLS: 4개 모두 `cg_*_own`(본인 전권) + `cg_*_select_admin`(관리자 조회).

---

## 3. 서비스 가입 (`public.service_members`)

책·말씀 서비스와 동일하게 **첫 이용 시** 클라이언트(`js/math-sync.js` 의 `ensureMembership`)가 upsert 합니다.

```sql
insert into public.service_members (user_id, service, last_seen_at)
values (auth.uid(), 'math', now())
on conflict (user_id, service) do update set last_seen_at = now(), updated_at = now();
```

---

## 4. API Exposed schemas

`public` 스키마라 추가 설정이 필요 없습니다.

---

## 5. 실행 후 확인

```sql
select count(*) from public.math_progress;
select count(*) from public.math_quiz_logs;
select service, count(*) from public.service_members group by 1 order by 1;
```

```sql
select public.cg_is_admin();   -- 관리자 로그인 상태에서 true
```

---

## 6. 관리자 지정

```sql
update public.profiles set role = 'admin', updated_at = now()
 where email = '관리자이메일@example.com';
```

---

## 7. 배포 시 확인 사항

- 도메인 `math.chatgpts.kr` → 정적 호스팅 루트 `math/`
- Redirect URL: `https://math.chatgpts.kr/**`, `https://math.chatgpts.kr/login.html`
- 로그인은 공통 `cg-auth.js`(`data-service="math"`) 가 그대로 동작합니다.
