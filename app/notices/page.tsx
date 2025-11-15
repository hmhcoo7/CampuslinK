'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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
      {/* Header */}
      <header className="bg-[#7F2323] text-white px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] flex-shrink-0 rounded-full bg-white flex items-center justify-center">
              <img
                src="/icons/kwangwoon-logo.png"
                alt="CampusLinK Logo"
                className="w-[30px] h-[30px] object-contain"
              />
            </div>
            <div className="flex flex-col font-[family-name:var(--font-crimson)]">
              <span className="text-[16px] font-semibold leading-[15px]">Campus</span>
              <span className="text-[20px] font-semibold leading-[20px]">LinK</span>
            </div>
          </Link>

          <nav className="flex items-center gap-8">
            <Link href="/meetings?category=전공" className="hover:opacity-80">
              전공
            </Link>
            <Link href="/meetings?category=공모전" className="hover:opacity-80">
              공모전
            </Link>
            <Link href="/meetings?category=자격증" className="hover:opacity-80">
              자격증
            </Link>
            <Link href="/meetings?category=동아리" className="hover:opacity-80">
              동아리
            </Link>
            <Link href="/meetings?category=기타" className="hover:opacity-80">
              기타
            </Link>
            <Link href="/notices" className="hover:opacity-80 relative">
              공지사항
              <div className="absolute -bottom-[16px] left-0 right-0 h-[3px] bg-white"></div>
            </Link>
            <NotificationBell />
            <Image
              src="/icons/Generic avatar.svg"
              alt="Profile"
              width={32}
              height={32}
              className="w-8 h-8 cursor-pointer"
            />
          </nav>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-[1440px] mx-auto px-12 py-8">
        <h1 className="text-3xl font-bold mb-8 text-black">공지사항</h1>

        {loading ? (
          <div className="text-center py-12 text-gray-500">로딩 중...</div>
        ) : (
          <div className="border-t-2 border-black">
            {/* 테이블 헤더 */}
            <div className="grid grid-cols-[80px_1fr_120px_140px_100px] gap-4 py-4 px-6 bg-gray-50 border-b border-gray-300 font-semibold text-center">
              <div className="text-black">번호</div>
              <div className="text-black">제목</div>
              <div className="text-black">작성자</div>
              <div className="text-black">작성일</div>
              <div className="text-black">조회수</div>
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
                <div className="text-sm text-black">
                  {notice.is_pinned ? '공지사항' : notice.번호}
                </div>
                <div className="text-left text-sm font-medium text-black">
                  {notice.제목}
                </div>
                <div className="text-sm text-black">{notice.작성자}</div>
                <div className="text-sm text-black">
                  {formatDate(notice.작성일)}
                </div>
                <div className="text-sm text-black">{notice.조회수}</div>
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

      {/* Footer */}
      <footer className="mt-12 px-12 py-8">
        <div className="max-w-[1440px] mx-auto flex items-center gap-4">
          <img
            src="/icons/kwangwoon-logo.png"
            alt="Kwangwoon University"
            className="w-[164px] h-[48px] object-cover"
            style={{ aspectRatio: '41/12' }}
          />
          <div className="text-sm text-black">
            <p className="font-bold text-[#7F2323]">광운대학교</p>
            <p>서울특별시 노원구 광운로 20</p>
            <p>대표전화: 02.940.5114</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
