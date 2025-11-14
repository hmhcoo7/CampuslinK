'use client';

import { useState, useEffect, useRef } from 'react';
import ApplicationApprovalModal from './ApplicationApprovalModal';

interface Notification {
  id: string;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
  모임?: { 모임제목: string };
  related_user?: { nick_name: string };
  application?: { 자기소개: string };
  application_id?: string;
}

interface NotificationDropdownProps {
  onClose: () => void;
}

export default function NotificationDropdown({
  onClose,
}: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvalModal, setApprovalModal] = useState<{
    isOpen: boolean;
    applicationId: string;
    applicantNickname: string;
    introduction: string;
    meetingTitle: string;
  }>({
    isOpen: false,
    applicationId: '',
    applicantNickname: '',
    introduction: '',
    meetingTitle: '',
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotifications();

    // 외부 클릭 시 드롭다운 닫기
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    // 읽지 않은 알림이면 읽음 처리
    if (!notification.is_read) {
      try {
        await fetch(`/api/notifications/${notification.id}/read`, {
          method: 'PATCH',
        });
        // 로컬 상태 업데이트
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notification.id ? { ...n, is_read: true } : n
          )
        );
      } catch (error) {
        console.error('Failed to mark as read:', error);
      }
    }

    // 신청 받은 알림이면 승인 팝업 열기
    if (notification.type === 'application_received' && notification.application_id) {
      setApprovalModal({
        isOpen: true,
        applicationId: notification.application_id,
        applicantNickname: notification.related_user?.nick_name || '사용자',
        introduction: notification.application?.자기소개 || '',
        meetingTitle: notification.모임?.모임제목 || '',
      });
    }
  };

  const handleApprovalComplete = () => {
    fetchNotifications(); // 알림 목록 갱신
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'application_received':
        return '📋';
      case 'application_accepted':
        return '✅';
      case 'application_rejected':
        return '❌';
      case 'new_member_joined':
        return '👋';
      default:
        return '🔔';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return '방금 전';
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <>
      <div
        ref={dropdownRef}
        className="absolute right-0 top-12 w-96 max-h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
      >
        {/* 헤더 */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold">알림</h3>
        </div>

        {/* 알림 목록 */}
        <div className="overflow-y-auto max-h-[440px]">
          {loading ? (
            <div className="p-8 text-center text-gray-500">로딩 중...</div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              알림이 없습니다.
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors ${
                  !notification.is_read
                    ? 'bg-[#FFF5F5] hover:bg-[#FFEBEB]'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm ${
                        !notification.is_read
                          ? 'font-semibold text-black'
                          : 'text-gray-700'
                      }`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTime(notification.created_at)}
                    </p>
                  </div>
                  {!notification.is_read && (
                    <span className="w-2 h-2 bg-[#7F2323] rounded-full flex-shrink-0 mt-1"></span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 승인 팝업 */}
      <ApplicationApprovalModal
        isOpen={approvalModal.isOpen}
        onClose={() =>
          setApprovalModal({ ...approvalModal, isOpen: false })
        }
        applicationId={approvalModal.applicationId}
        applicantNickname={approvalModal.applicantNickname}
        introduction={approvalModal.introduction}
        meetingTitle={approvalModal.meetingTitle}
        onApprovalComplete={handleApprovalComplete}
      />
    </>
  );
}
