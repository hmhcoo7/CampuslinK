import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const token = requestUrl.searchParams.get('token')
  const type = requestUrl.searchParams.get('type')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })

    // 이메일 인증 코드를 교환하여 세션 생성
    await supabase.auth.exchangeCodeForSession(code)
  }

  // 비밀번호 재설정인 경우
  if (type === 'recovery' || token) {
    return NextResponse.redirect(new URL('/reset-password', requestUrl.origin))
  }

  // 일반 인증 완료 후 로그인 페이지로 리디렉션
  return NextResponse.redirect(new URL('/login', requestUrl.origin))
}
