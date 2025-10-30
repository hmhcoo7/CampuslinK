# 데이터베이스 설정 가이드

## '회원' 테이블 스키마 업데이트

기존 '회원' 테이블의 스키마를 다음과 같이 수정해야 합니다:

### SQL 명령어

Supabase Dashboard → **SQL Editor**에서 다음 SQL을 실행하세요:

```sql
-- 기존 '회원' 테이블이 있다면 삭제 (주의: 기존 데이터 백업 권장)
DROP TABLE IF EXISTS "회원";

-- 새로운 '회원' 테이블 생성
CREATE TABLE "회원" (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  nick_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (검색 성능 향상)
CREATE INDEX idx_회원_email ON "회원"(email);

-- Row Level Security (RLS) 활성화
ALTER TABLE "회원" ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 모든 사용자는 회원 정보를 조회할 수 있음
CREATE POLICY "Anyone can view profiles"
  ON "회원"
  FOR SELECT
  USING (true);

-- RLS 정책: 회원가입 시 누구나 회원 정보를 생성할 수 있음
CREATE POLICY "Anyone can insert profiles during signup"
  ON "회원"
  FOR INSERT
  WITH CHECK (true);

-- RLS 정책: 사용자는 자신의 프로필만 수정 가능
CREATE POLICY "Users can update own profile"
  ON "회원"
  FOR UPDATE
  USING (auth.uid() = id);

-- RLS 정책: 사용자는 자신의 프로필만 삭제 가능
CREATE POLICY "Users can delete own profile"
  ON "회원"
  FOR DELETE
  USING (auth.uid() = id);
```

## 주요 변경사항

### 1. `id` 필드
- **변경 전**: 자동 증가 숫자 또는 별도 ID
- **변경 후**: `UUID` 타입, `auth.users` 테이블의 `id`와 연결 (Foreign Key)
- **이유**: Supabase Auth의 사용자 ID와 동기화하여 일관성 유지

### 2. `password` 필드
- **변경 전**: 평문 비밀번호 저장 (보안 취약)
- **변경 후**: 필드 삭제
- **이유**: Supabase Auth가 안전하게 비밀번호 관리 (bcrypt 해싱)

### 3. 새로운 필드
- `created_at`: 회원 가입 시각
- `updated_at`: 마지막 수정 시각

## Row Level Security (RLS) 정책 설명

1. **조회 정책**: 모든 사용자가 다른 회원의 닉네임/이메일을 볼 수 있음 (모임 매칭에 필요)
2. **생성 정책**: 회원가입 시 누구나 생성 가능 (Auth 인증 후 자동 생성)
3. **수정 정책**: 본인의 프로필만 수정 가능
4. **삭제 정책**: 본인의 프로필만 삭제 가능

## 테이블 관계도

```
auth.users (Supabase Auth 관리)
    ↓ (1:1 관계)
회원 테이블 (추가 사용자 정보)
```

## 기존 데이터 마이그레이션 (옵션)

기존 '회원' 테이블에 데이터가 있다면, 먼저 백업 후 삭제하세요:

```sql
-- 기존 데이터 백업
CREATE TABLE "회원_backup" AS SELECT * FROM "회원";

-- 확인 후 기존 테이블 삭제
DROP TABLE "회원";

-- 새 테이블 생성 (위의 SQL 실행)
```

**중요**: 기존 사용자들은 새로운 시스템으로 재가입해야 합니다.
