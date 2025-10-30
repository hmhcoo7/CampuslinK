# Supabase 설정 가이드

## 1. Authentication 설정

### Email Provider 활성화
1. Supabase Dashboard → **Authentication** → **Providers**
2. **Email** 토글을 **Enabled**로 설정
3. "Confirm email" 옵션 활성화 (이메일 인증 필수)

### URL Configuration
1. Supabase Dashboard → **Authentication** → **URL Configuration**
2. 다음 URL들을 설정:

**Site URL:**
```
http://localhost:3000
```

**Redirect URLs (Add URL 버튼으로 추가):**
```
http://localhost:3000/login
http://localhost:3000/auth/callback
```

### Email Templates (선택사항)
1. Supabase Dashboard → **Authentication** → **Email Templates**
2. **Confirm signup** 템플릿을 한국어로 커스터마이징 가능

예시:
```
안녕하세요,

CampuslinK 회원가입을 완료하려면 아래 링크를 클릭해주세요:

{{ .ConfirmationURL }}

광운대학교 학생 여러분을 환영합니다!

CampuslinK 팀
```

## 2. 환경 변수 설정

`.env.local` 파일에 다음 변수들이 설정되어 있는지 확인:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. 데이터베이스 스키마 (선택사항)

Supabase Auth는 기본적으로 `auth.users` 테이블에 사용자 정보를 저장합니다.
추가 사용자 정보가 필요한 경우, 다음과 같은 테이블을 생성할 수 있습니다:

```sql
-- profiles 테이블 생성 (선택사항)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  nickname TEXT,
  university TEXT DEFAULT '광운대학교',
  major TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 정책: 사용자는 자신의 프로필만 조회 가능
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- 정책: 사용자는 자신의 프로필만 수정 가능
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);
```

## 4. 프로덕션 배포 시 주의사항

### SMTP 설정 (필수)
프로덕션 환경에서는 Supabase의 built-in email service 대신 **커스텀 SMTP**를 설정해야 합니다:

1. Supabase Dashboard → **Authentication** → **Email Settings** → **SMTP Settings**
2. Gmail, SendGrid, AWS SES 등의 SMTP 서버 정보 입력

### URL 업데이트
프로덕션 도메인으로 URL Configuration 업데이트:
- Site URL: `https://yourdomain.com`
- Redirect URLs: `https://yourdomain.com/login`, `https://yourdomain.com/auth/callback`

## 5. 회원가입 플로우

1. 사용자가 `@kw.ac.kr` 이메일로 회원가입
2. Supabase가 인증 이메일 발송
3. 사용자가 이메일의 인증 링크 클릭
4. `/auth/callback`으로 리디렉션되어 세션 생성
5. `/login` 페이지로 이동
6. 사용자가 로그인

## 6. 보안 고려사항

- ✅ 비밀번호는 Supabase Auth에 의해 안전하게 해시되어 저장됨
- ✅ 이메일 인증을 통해 광운대 학생임을 확인
- ✅ Row Level Security(RLS)를 통한 데이터 접근 제어
- ✅ JWT 토큰 기반 세션 관리

## 7. 기존 '회원' 테이블 처리

기존의 평문 비밀번호를 저장하던 '회원' 테이블은 더 이상 사용되지 않습니다.
Supabase Auth의 `auth.users` 테이블이 사용자 인증을 관리합니다.

필요시 기존 테이블을 삭제하거나 백업 후 제거할 수 있습니다.
