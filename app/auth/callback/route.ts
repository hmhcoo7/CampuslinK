import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })

    // 이메일 인증 코드를 교환하여 세션 생성
    await supabase.auth.exchangeCodeForSession(code)
  }

  // 인증 완료 후 로그인 페이지로 리디렉션
  return NextResponse.redirect(new URL('/login', requestUrl.origin))
}
