'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NotificationBell from '@/components/NotificationBell';

interface Notice {
  id: number;
  번호: number | null;
  제목: string;
  작성자: string;
  작성일: string;
  조회수: number;
  is_pinned: boolean;
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch('/api/notices');
      if (response.ok) {
        const data = await response.json();
        setNotices(data.notices || []);
      } else {
        console.error('Failed to fetch notices');
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\. /g, '.').replace(/\.$/, '');
  };

  const handleNoticeClick = (id: number) => {
    router.push(`/notices/${id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="bg-[#7F2323] text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img src="/icons/로고.png" alt="로고" className="h-8" />
            <span className="text-xl font-bold">CampusLinK</span>
          </div>
          <nav className="flex gap-6 text-base">
            <a href="/" className="hover:underline">홈</a>
            <a href="/meetings" className="hover:underline">공모전</a>
            <a href="/notices" className="font-bold underline">자격증</a>
            <a href="#" className="hover:underline">동아리</a>
            <a href="#" className="hover:underline">기타</a>
            <a href="#" className="hover:underline">공지사항</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <button className="w-10 h-10 bg-white rounded-full"></button>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">공지사항</h1>

        {loading ? (
          <div className="text-center py-12 text-gray-500">로딩 중...</div>
        ) : (
          <div className="border-t-2 border-black">
            {/* 테이블 헤더 */}
            <div className="grid grid-cols-[80px_1fr_120px_140px_100px] gap-4 py-4 px-6 bg-gray-50 border-b border-gray-300 font-semibold text-center">
              <div>번호</div>
              <div>제목</div>
              <div>작성자</div>
              <div>작성일</div>
              <div>조회수</div>
            </div>

            {/* 공지사항 목록 */}
            {notices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => handleNoticeClick(notice.id)}
                className={`grid grid-cols-[80px_1fr_120px_140px_100px] gap-4 py-4 px-6 border-b border-gray-200 cursor-pointer transition-colors text-center items-center ${
                  notice.is_pinned
                    ? 'bg-[#F5F5F5] hover:bg-[#EBEBEB]'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="text-sm text-gray-700">
                  {notice.is_pinned ? '공지사항' : notice.번호}
                </div>
                <div className="text-left text-sm font-medium text-gray-900">
                  {notice.제목}
                </div>
                <div className="text-sm text-gray-700">{notice.작성자}</div>
                <div className="text-sm text-gray-700">
                  {formatDate(notice.작성일)}
                </div>
                <div className="text-sm text-gray-700">{notice.조회수}</div>
              </div>
            ))}

            {notices.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                등록된 공지사항이 없습니다.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
