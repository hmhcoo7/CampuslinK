'use client';

import { useState } from 'react';

interface ApplicationApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId: string;
  applicantNickname: string;
  introduction: string;
  meetingTitle: string;
  onApprovalComplete: () => void;
}

export default function ApplicationApprovalModal({
  isOpen,
  onClose,
  applicationId,
  applicantNickname,
  introduction,
  meetingTitle,
  onApprovalComplete,
}: ApplicationApprovalModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleAction = async (action: 'accept' | 'reject') => {
    const confirmMessage =
      action === 'accept'
        ? `${applicantNickname}님의 신청을 수락하시겠습니까?`
        : `${applicantNickname}님의 신청을 거절하시겠습니까?`;

    if (!confirm(confirmMessage)) return;

    setIsProcessing(true);

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '처리에 실패했습니다.');
      }

      alert(
        action === 'accept'
          ? '신청을 수락했습니다.'
          : '신청을 거절했습니다.'
      );
      onApprovalComplete();
      onClose();
    } catch (error: any) {
      alert(error.message || '처리 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-[800px] bg-[#F5F5F5] rounded-lg shadow-[0_10px_4px_0_rgba(0,0,0,0.25)] p-8 mx-4">
        <h2 className="text-2xl font-bold mb-6">모임 신청 확인</h2>

        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">모임: {meetingTitle}</p>
          <p className="text-base mb-4">
            신청자: <span className="font-semibold">{applicantNickname}</span>님
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-base font-semibold mb-3">자기소개</h3>
          <div className="w-full p-4 bg-white border-2 border-black rounded-lg min-h-[150px] whitespace-pre-wrap">
            {introduction}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleAction('reject')}
            disabled={isProcessing}
            className="px-8 py-3 bg-white text-black border-2 border-[#7F2323] rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            거절
          </button>
          <button
            onClick={() => handleAction('accept')}
            disabled={isProcessing}
            className="px-12 py-3 bg-[#AD7070] text-white rounded-lg font-semibold hover:bg-[#7F2323] transition-colors disabled:opacity-50"
          >
            {isProcessing ? '처리 중...' : '수락'}
          </button>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-8 py-3 bg-[#595959] text-white rounded-lg font-semibold hover:bg-[#000000] transition-colors disabled:opacity-50"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
