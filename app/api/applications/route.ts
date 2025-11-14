import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { meetingId, introduction } = await request.json();

    if (!meetingId || !introduction) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });

    // 현재 사용자 정보 가져오기
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // 회원 정보 조회 (email로)
    const { data: memberData, error: memberError } = await supabase
      .from('회원')
      .select('email, nick_name')
      .eq('email', user.email)
      .single();

    if (memberError || !memberData) {
      return NextResponse.json(
        { error: '회원 정보를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 모임 정보 조회
    const { data: meetingData, error: meetingError } = await supabase
      .from('모임')
      .select('*')
      .eq('모임_id', meetingId)
      .single();

    if (meetingError || !meetingData) {
      return NextResponse.json(
        { error: '모임 정보를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const meeting = meetingData as any;

    // 이미 신청했는지 확인
    const { data: existingApplication } = await supabase
      .from('모임_신청자')
      .select('id')
      .eq('모임_id', meetingId)
      .eq('신청자_email', memberData.email)
      .single();

    if (existingApplication) {
      return NextResponse.json(
        { error: '이미 신청한 모임입니다.' },
        { status: 400 }
      );
    }

    // 모임 신청 생성
    const { data: applicationData, error: applicationError } = await supabase
      .from('모임_신청자')
      .insert({
        모임_id: meetingId,
        신청자_email: memberData.email,
        자기소개: introduction,
        status: 'pending',
      })
      .select()
      .single();

    if (applicationError) {
      console.error('Application creation error:', applicationError);
      return NextResponse.json(
        { error: '신청 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 모임장에게 알림 생성
    const { error: notificationError } = await supabase.from('알림').insert({
      user_email: meeting.생성자_email,
      모임_id: meetingId,
      type: 'application_received',
      message: `${memberData.nick_name}님이 "${meeting.모임제목}" 모임에 신청했습니다.`,
      related_user_email: memberData.email,
      application_id: applicationData.id,
      is_read: false,
    });

    if (notificationError) {
      console.error('Notification creation error:', notificationError);
    }

    return NextResponse.json({
      success: true,
      data: applicationData,
    });
  } catch (error) {
    console.error('Error in POST /api/applications:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
