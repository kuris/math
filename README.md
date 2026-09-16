# 🔢 수학아 놀자! (math.chatgpts.kr)

초등부터 고등까지 수학 공식을 **쉬운 설명·재미있는 비유·외우는 꿀팁**으로 배우고,
연습 문제·퀴즈·학습지로 확인하는 정적 웹앱입니다.

> **AI 기능이 없습니다.** 모든 공식 설명과 문제는 정적 데이터(`formula-*.js`, `problem-*.js`)이며,
> 숫자 바꾸기 연습도 브라우저 안에서 숫자를 바꾸는 것뿐입니다. 어떤 값도 AI API 로 보내지 않습니다.

## 주요 기능

- **공식 모음(110개)** — 초등 30 / 중등 35 / 고등 45. 학교급·단원 필터 + 검색.
  카드에 공식명·학교급/학년·단원·공식·한 줄 설명·한 줄 암기팁·[자세히 보기][문제 풀기]
- **공식 상세** — 이럴 때 써요 / 쉽게 말하면 / 그림처럼 생각해 봐요 / 외우는 꿀팁 /
  대표 예제+단계별 풀이 / 헷갈리지 마! / 한 문제만 풀어볼까? / 관련 공식 / 학습 완료
- **연습 문제(216개)** — 초등 60 / 중등 70 / 고등 86, 전부 공식과 연결.
  힌트·해설·숫자 바꿔 다시 풀기 지원. 로그인은 선택
- **퀴즈** — 10문제, 학교급 선택, 칭찬/격려 문구, 점수 기록
- **학습지** — 문항 수 선택 후 인쇄용 학습지 생성 (정답은 화면에서만)
- **내 기록** — 배운 공식·퀴즈·연습 기록 (비로그인은 기기, 로그인은 계정)
- **통계** — 학교급별 학습 막대, 정답률, 최고 점수 (로그인 필요)
- **Google 로그인** — 공통 `cg-auth.js` 재사용

## 프로젝트 구조

```
math/
├── index.html · formulas.html · formula-view.html · practice.html
├── quiz.html · worksheet.html · progress.html · stats.html
├── login.html · admin.html
├── css/  style.css · cg-auth.css(복사본) · admin.css(복사본)
├── js/
│   ├── supabase-config.js      상수 (url/key/storageKey)
│   ├── cg-auth.js              공통 로그인 모듈 (복사본, 직접 수정 금지)
│   ├── math-data.js            학교급/학년/단원/난이도 + 칭찬·격려 문구
│   ├── formula-el/mi/hi-a/hi-b.js  공식 파트 (30/35/23/22)
│   ├── formula-data.js         공식 합본 + 조회 헬퍼
│   ├── problem-el/mi/hi-a/hi-b.js  문제 파트 (60/70/40/46)
│   ├── problem-data.js         문제 합본 + 샘플링/오늘의 5문제
│   ├── generator.js            숫자 바꾸기 생성기 (AI 없음)
│   ├── math-sync.js            학습 기록 계층
│   ├── nav.js · main.js · formulas.js · formula-view.js
│   ├── practice.js · quiz.js · worksheet.js
│   ├── progress.js · stats.js · login.js
│   ├── cg-ads.js · track.js
│   ├── supabase-admin-client.js · admin.js(공용) · admin-math.js
├── docs/  supabase-math-setup.md · google-login-setup.md
├── supabase/migrations/001_math_schema.sql  (= _shared/sql/09-math.sql 복사본)
└── vercel.json · robots.txt · sitemap.xml · ads.txt
```

## 실행 방법

정적 파일이라 빌드 과정이 없습니다.

```bash
cd math
python3 -m http.server 8080      # http://localhost:8080
```

> ⚠ `file://` 로 열지 마세요. Supabase/Google OAuth 리다이렉트가 동작하지 않습니다.

## Supabase 설정

같은 Supabase 프로젝트(`ybhiznlelnpwaicyoifa`)를 공유하고, 기록은 `public.math_*` 4개 테이블에 담습니다.

Supabase 대시보드 > SQL Editor 에서 **순서대로** 실행합니다.

1. `play_project/_shared/sql/` **01~06** (이미 실행됐다면 건너뜀)
2. `math/supabase/migrations/001_math_schema.sql` (원본 `_shared/sql/09-math.sql`)

### Google 로그인 Redirect URL

```
https://math.chatgpts.kr/**
https://math.chatgpts.kr/login.html
http://localhost:*/**          (로컬 테스트용)
```

Google Cloud OAuth 클라이언트의 승인된 리디렉션 URI는
`https://ybhiznlelnpwaicyoifa.supabase.co/auth/v1/callback` 하나입니다 (자세한 건 docs/google-login-setup.md).

## 데이터 모델 · RLS

| 테이블 | 용도 |
|---|---|
| `public.math_progress` | 공식 학습 완료 `(user_id, formula_id)` 유일 |
| `public.math_practice_logs` | 연습 기록 (정답 여부·점수) |
| `public.math_quiz_logs` | 퀴즈 기록 (유형·점수) |
| `public.math_worksheet_logs` | 학습지 생성 기록 |

RLS 요약: 4개 테이블 모두 **본인만 전권**(`auth.uid() = user_id`), 관리자는 조회.
삭제는 하지 않고 기록만 쌓습니다 (개인 학습 이력).

## 보안

- 데이터 보호는 **프론트가 아니라 Supabase RLS**가 담당합니다.
- 출력 시 모든 사용자 입력·URL 값을 **HTML escape** 합니다.
- 정답 판정은 문자열 정규화(공백 제거) 후 비교합니다.
- AI API 호출 코드가 전혀 없습니다.

## 배포 (math.chatgpts.kr)

- 정적 호스팅 루트 = `math/` 폴더 (Vercel 등)
- `vercel.json` 에 cleanUrls, `/admin` → `admin.html`, 보안 헤더, 정적 캐시가 정의돼 있습니다.
- 도메인 연결 후 Supabase Redirect URL 과 Google OAuth JS origin 에 `https://math.chatgpts.kr` 을 추가하세요.

## 관리자 (admin.html)

- 판정: `public.profiles.role = 'admin'` (폴백 `phiskim@gmail.com`)
- 탭: 화면 조회수 · **학습 현황**(건수+최근 퀴즈/연습) · 회원 · 화면별 통계 · 콘텐츠 · 시스템/SQL

## 공식·문제 확장

- 공식 추가: `js/formula-*.js` 파트에 객체를 추가하면 `formula-data.js` 가 자동 합산합니다.
  필수 필드: id, schoolLevel, gradeLevel, topic, emoji, unit, title, formula,
  shortDescription, easyExplanation, funExplanation, memoryTip, useWhen,
  commonMistakes, example{question,steps,answer}, quickCheck{question,answer}
- 문제 추가: `js/problem-*.js` 파트에 추가하면 `problem-data.js` 가 자동 합산합니다.
  반드시 `formulaId` 로 공식과 연결하세요.
- 현재: 공식 110개 · 문제 216개. README 추후 확장 가능.
