'use client';

import { useState, useEffect } from 'react';
import NotificationDropdown from './NotificationDropdown';

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNewNotificationBanner, setShowNewNotificationBanner] = useState(false);

  useEffect(() => {
    fetchUnreadCount();

    // 30초마다 알림 개수 갱신
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch('/api/notifications');
      if (response.ok) {
        const data = await response.json();
        const newUnreadCount = data.unreadCount || 0;

        // 이전 개수보다 증가했으면 배너 표시
        if (newUnreadCount > unreadCount) {
          setShowNewNotificationBanner(true);
          setTimeout(() => setShowNewNotificationBanner(false), 5000);
        }

        setUnreadCount(newUnreadCount);
      }
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
    }
  };

  const handleBellClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    fetchUnreadCount(); // 닫을 때 개수 갱신
  };

  return (
    <>
      {/* 새로운 알림 배너 */}
      {showNewNotificationBanner && (
        <div className="fixed top-20 right-4 z-50 bg-[#7F2323] text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          <p className="font-semibold">새로운 알림이 있습니다!</p>
        </div>
      )}

      {/* 알림 벨 아이콘 */}
      <div className="relative">
        <button
          onClick={handleBellClick}
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="알림"
        >
          {/* 벨 아이콘 (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>

          {/* 빨간 배지 (읽지 않은 알림 개수) */}
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#7F2323] rounded-full">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>

        {/* 드롭다운 */}
        {isOpen && <NotificationDropdown onClose={handleClose} />}
      </div>
    </>
  );
}
