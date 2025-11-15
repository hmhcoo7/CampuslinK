'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetingId: string;
  meetingTitle: string;
}

export default function ApplicationModal({
  isOpen,
  onClose,
  meetingId,
  meetingTitle,
}: ApplicationModalProps) {
  const [introduction, setIntroduction] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClientComponentClient();

  console.log('ApplicationModal render:', { isOpen, meetingId, meetingTitle });

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!introduction.trim()) {
      alert('자기소개를 작성해주세요.');
      return;
    }

    if (introduction.length > 100) {
      alert('자기소개는 100자 이내로 작성해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 현재 사용자 정보 가져오기
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert('로그인이 필요합니다.');
        return;
      }

      // 모임 신청하기 API 호출
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meetingId,
          introduction: introduction.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '신청에 실패했습니다.');
      }

      alert('모임 신청이 완료되었습니다! 모임장의 승인을 기다려주세요.');
      setIntroduction('');
      onClose();
    } catch (error: any) {
      alert(error.message || '신청 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-[1058px] max-h-[751px] bg-[#F5F5F5] rounded-lg shadow-[0_10px_4px_0_rgba(0,0,0,0.25)] p-8 mx-4">
        {/* 신청하기 제목과 하트 아이콘 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[32px] font-semibold leading-[30px] text-black">
            신청하기
          </h2>
          <Image
            src="/icons/favorite.svg"
            alt="favorite"
            width={30}
            height={30}
            className="flex-shrink-0"
          />
        </div>

        <p className="text-[24px] font-semibold leading-[30px] text-black mb-6">
          신청 시, <span className="text-[#7F2323]">간단한 자기소개</span>와{' '}
          <span className="text-[#7F2323]">스터디에 참여하고 싶은 이유</span>를 함께 적어주세요.
        </p>

        <textarea
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          placeholder="꾸준히 참여하면서 서로에게 동기부여가 되는 멤버가 되고 싶습니다."
          maxLength={100}
          className="w-full h-[300px] p-4 border-2 border-black rounded-lg resize-none focus:outline-none focus:border-[#7F2323] bg-white text-[20px] font-semibold leading-[30px] text-[#595959] text-right"
        />

        <div className="text-right text-[#595959] text-[20px] font-semibold leading-[30px] mt-2 mb-8">
          {introduction.length}/100
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-8 py-3 bg-[#FFFFFF] text-black border-2 border-black rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-12 py-3 bg-[#AD7070] text-white rounded-lg font-semibold hover:bg-[#7F2323] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? '신청 중...' : '신청하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
