import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // 현재 사용자 인증
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // 알림 읽음 처리
    const { error } = await supabase
      .from('알림')
      .update({ is_read: true })
      .eq('id', params.id)
      .eq('user_email', user.email);

    if (error) {
      console.error('Mark as read error:', error);
      return NextResponse.json(
        { error: '읽음 처리 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in PATCH /api/notifications/[id]/read:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
      );
  }
}
