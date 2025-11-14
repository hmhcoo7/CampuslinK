import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
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

    // 알림 조회 (최신순)
    const { data: notifications, error } = await supabase
      .from('알림')
      .select(`
        *,
        모임:모임_id(모임제목),
        related_user:related_user_email(nick_name),
        application:application_id(자기소개)
      `)
      .eq('user_email', user.email)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Notifications fetch error:', error);
      return NextResponse.json(
        { error: '알림 조회 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 읽지 않은 알림 개수
    const unreadCount = notifications?.filter((n) => !n.is_read).length || 0;

    return NextResponse.json({
      notifications: notifications || [],
      unreadCount,
    });
  } catch (error) {
    console.error('Error in GET /api/notifications:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
