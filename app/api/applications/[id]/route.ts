import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { action } = await request.json(); // 'accept' or 'reject'
    const applicationId = params.id;

    if (!action || !['accept', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: '유효하지 않은 액션입니다.' },
        { status: 400 }
      );
    }

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

    // 신청 정보 조회
    const { data: applicationData, error: appError } = await supabase
      .from('모임_신청자')
      .select('*, 모임:모임_id(모임_id, 모임제목, 생성자_email, current_members, max_capacity)')
      .eq('id', applicationId)
      .single();

    if (appError || !applicationData) {
      return NextResponse.json(
        { error: '신청 정보를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const meeting = applicationData.모임 as any;

    // 모임장인지 확인
    if (meeting.생성자_email !== user.email) {
      return NextResponse.json(
        { error: '권한이 없습니다.' },
        { status: 403 }
      );
    }

    const newStatus = action === 'accept' ? 'accepted' : 'rejected';

    // 신청 상태 업데이트
    const { error: updateError } = await supabase
      .from('모임_신청자')
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', applicationId);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json(
        { error: '상태 업데이트 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 신청자 닉네임 조회
    const { data: applicantData } = await supabase
      .from('회원')
      .select('nick_name')
      .eq('email', applicationData.신청자_email)
      .single();

    const applicantNickname = applicantData?.nick_name || '사용자';

    if (action === 'accept') {
      // 수락 시: 인원 증가
      const newMemberCount = (meeting.current_members || 0) + 1;
      const shouldClose = newMemberCount >= meeting.max_capacity;

      const { error: meetingUpdateError } = await supabase
        .from('모임')
        .update({
          current_members: newMemberCount,
          ...(shouldClose && { status: '마감' }),
        })
        .eq('모임_id', meeting.모임_id);

      if (meetingUpdateError) {
        console.error('Meeting update error:', meetingUpdateError);
      }

      // 신청자에게 수락 알림
      await supabase.from('알림').insert({
        user_email: applicationData.신청자_email,
        모임_id: meeting.모임_id,
        type: 'application_accepted',
        message: `"${meeting.모임제목}" 모임에 참여하였습니다!`,
        is_read: false,
      });

      // 다른 참여자들에게 새 멤버 알림 (모임장 제외)
      const { data: otherParticipants } = await supabase
        .from('모임_신청자')
        .select('신청자_email')
        .eq('모임_id', meeting.모임_id)
        .eq('status', 'accepted')
        .neq('신청자_email', applicationData.신청자_email)
        .neq('신청자_email', meeting.생성자_email);

      if (otherParticipants && otherParticipants.length > 0) {
        const notifications = otherParticipants.map((p) => ({
          user_email: p.신청자_email,
          모임_id: meeting.모임_id,
          type: 'new_member_joined',
          message: `${applicantNickname}님이 "${meeting.모임제목}" 모임에 참여하셨습니다!`,
          related_user_email: applicationData.신청자_email,
          is_read: false,
        }));

        await supabase.from('알림').insert(notifications);
      }
    } else {
      // 거절 알림
      await supabase.from('알림').insert({
        user_email: applicationData.신청자_email,
        모임_id: meeting.모임_id,
        type: 'application_rejected',
        message: `"${meeting.모임제목}" 모임에 거절되었습니다.`,
        is_read: false,
      });
    }

    return NextResponse.json({
      success: true,
      action,
    });
  } catch (error) {
    console.error('Error in PATCH /api/applications/[id]:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
