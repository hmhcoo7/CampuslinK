import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type')

  if (token_hash && type) {
    const supabase = createRouteHandlerClient({ cookies })

    // 토큰 해시를 사용하여 세션 검증
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as any,
    })

    if (error) {
      console.error('Token verification error:', error)
      // 에러가 있어도 reset-password 페이지로 리다이렉트 (에러는 거기서 처리)
      return NextResponse.redirect(
        new URL(`/reset-password?error=${encodeURIComponent(error.message)}`, requestUrl.origin)
      )
    }
  }

  // 비밀번호 재설정 페이지로 리다이렉트
  return NextResponse.redirect(new URL('/reset-password', requestUrl.origin))
}
