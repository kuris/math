# 구글 로그인 연동 설정 가이드 (수학아 놀자)

수학아 놀자(math)는 **Google 로그인 하나만** 사용합니다. 코드는 이미 준비되어 있어
아래 설정만 마치면 헤더에 Google 로그인 버튼이 자동으로 나타납니다.

- 로그인 기능: 공통 모듈 `js/cg-auth.js` (원본 `_shared/cg-auth.js`, **직접 수정 금지**)
- 버튼 위치: 각 HTML 의 `.header-right` (`data-mount=".header-right"`)

> ⚠ `math.chatgpts.kr` 도메인을 Supabase 허용 리디렉션 주소에 **추가**해야 합니다.

## 준비물

| 항목 | 값 |
|---|---|
| Supabase 프로젝트 URL | `https://ybhiznlelnpwaicyoifa.supabase.co` |
| Supabase 콜백 URL | `https://ybhiznlelnpwaicyoifa.supabase.co/auth/v1/callback` |
| 서비스 주소(운영) | `https://math.chatgpts.kr` |
| 서비스 주소(로컬 테스트) | `http://localhost:8080` |

---

## 1단계. 구글 클라우드 콘솔에서 OAuth 클라이언트 만들기

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. **OAuth 동의 화면** — 외부(External), 앱 이름 `수학아 놀자!`, 승인된 도메인 `chatgpts.kr`, `supabase.co`
3. **OAuth 클라이언트 ID** (웹 애플리케이션)
   - 승인된 JavaScript 원본:
     ```
     https://math.chatgpts.kr
     http://localhost:8080
     ```
   - 승인된 리디렉션 URI — ⭐ 가장 중요:
     ```
     https://ybhiznlelnpwaicyoifa.supabase.co/auth/v1/callback
     ```
4. Client ID / Secret 복사 → **코드·저장소에 넣지 마세요.**

---

## 2단계. Supabase 에 Google provider 등록

1. Supabase → `ybhiznlelnpwaicyoifa` → **Authentication → Providers → Google → Enable**
2. Client ID / Secret 입력 후 저장

### Redirect URL 등록

**Authentication → URL Configuration**

| 항목 | 값 |
|---|---|
| Site URL | `https://math.chatgpts.kr` |
| Redirect URLs | `https://math.chatgpts.kr/**`<br>`https://math.chatgpts.kr/login.html`<br>`http://localhost:*/**` |

---

## 3단계. 동작 확인

1. `https://math.chatgpts.kr/` 접속 → 헤더 **Google로 로그인** 버튼 확인
2. 클릭 → 계정 선택 → 같은 페이지로 복귀 + 닉네임 표시
3. 공식 상세에서 **학습 완료**를 누르면 계정에 저장되는지 확인

```bash
curl -s https://ybhiznlelnpwaicyoifa.supabase.co/auth/v1/settings \
  -H "apikey: sb_publishable_H4gFRiLEjE8h8s_EX4tKzg__ZKpsBR1" \
  | python3 -c "import json,sys; print('google:', json.load(sys.stdin)['external']['google'])"
```

---

## 자주 만나는 오류

| 증상 | 원인 | 해결 |
|---|---|---|
| `redirect_uri_mismatch` | 구글 등록 URI 오타 | 끝에 `/auth/v1/callback` 확인 |
| 로그인 후 복귀 실패 | Redirect URLs 에 `math.chatgpts.kr/**` 미등록 | 2단계 확인 |
| `403 access_denied` | 앱 테스트 모드 + 미등록 계정 | 테스트 사용자 추가 또는 게시 |
| 닉네임이 이메일 앞부분 | 메타데이터 키 차이 | `public.profiles.nickname` 수정 가능 |

세션 키는 `sb-math-auth-token` 로 분리되어 형제 서비스와 충돌하지 않습니다.
