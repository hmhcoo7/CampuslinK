import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // 공지사항 조회 (고정 공지사항 먼저, 그 다음 번호 내림차순)
    const { data: notices, error } = await supabase
      .from('공지사항')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('번호', { ascending: false, nullsFirst: true });

    if (error) {
      console.error('Notices fetch error:', error);
      return NextResponse.json(
        { error: '공지사항 조회 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      notices: notices || [],
    });
  } catch (error) {
    console.error('Error in GET /api/notices:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
