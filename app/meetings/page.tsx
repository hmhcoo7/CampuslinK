'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function MeetingsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

  // 예시 모임 데이터
  const meetings = [
    {
      id: 1,
      title: '물리 공부하실분 구합니다.',
      description: '제가 물리 공부를 하고 있는데 생각보다 문제가 잘 안풀리....',
      status: '모집중',
      date: '9월 30일 17:00 - 18:00',
      location: '비마관',
      participants: '3/6명',
      category: '전공',
      college: '전자정보공과대학',
      department: '전자공학과'
    },
    {
      id: 2,
      title: '회로에 대해 알려주실 분 구합니다.',
      description: '안녕하세요. 제가 9/16일 수업에 이해하지 못한 부분을 같이....',
      status: '모집중',
      date: '9월 19일 18:00 - 21:00',
      location: '카페 베르테',
      participants: '1/6명',
      category: '전공',
      college: '전자정보공과대학',
      department: '전자공학과'
    },
    {
      id: 3,
      title: '복수전공 하는 사람들끼리 공부 안할래요?',
      description: '저는 전기공학과 복수전공 중입니다. 커뮤니티도 부족하고 공....',
      status: '마감',
      date: '9월 20일 15:00 - 17:00',
      location: '집현전',
      participants: '6/6명',
      category: '전공',
      college: '전자정보공과대학',
      department: '전자공학과'
    },
    {
      id: 4,
      title: '회로이론 기출문제 풀이 스터디',
      description: '안녕하세요, 전기공학부 22학번 이서연입니다. 다가오는 중간....',
      status: '마감',
      date: '9월 12일 20:00 - 21:00',
      location: '월계 도서관',
      participants: '3/6명',
      category: '전공',
      college: '전자정보공과대학',
      department: '전자공학과'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#7F2323] text-white px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons/nlogo.png"
              alt="CampusLinK Logo"
              width={24}
              height={24}
              className="w-6 h-6"
              priority
            />
            <span className="font-bold text-lg font-[family-name:var(--font-crimson)]">
              Campus<br/>LinK
            </span>
          </Link>

          <nav className="flex items-center gap-8">
            <Link href="/" className="hover:opacity-80 relative">
              전공
              <div className="absolute -bottom-[16px] left-0 right-0 h-[3px] bg-white"></div>
            </Link>
            <Link href="/" className="hover:opacity-80">공모전</Link>
            <Link href="/" className="hover:opacity-80">자격증</Link>
            <Link href="/" className="hover:opacity-80">기타</Link>
            <Link href="/notices" className="hover:opacity-80">공지사항</Link>
            <Image
              src="/icons/notifications.svg"
              alt="Notifications"
              width={24}
              height={24}
              className="w-6 h-6 cursor-pointer"
            />
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

      {/* Breadcrumb Navigation */}
      <div className="max-w-[1440px] mx-auto px-12 py-6">
        <div className="flex items-center gap-3 text-[#595959]">
          <Link href="/">
            <Image
              src="/icons/Home.svg"
              alt="Home"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </Link>
          <span className="text-xl">&gt;</span>
          <span className="font-semibold">전공</span>
          <span className="text-xl">&gt;</span>
          <button className="font-semibold flex items-center gap-1">
            전자정보공과대학
            <Image
              src="/icons/keyboard_arrow_down.svg"
              alt="dropdown"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </button>
          <span className="text-xl">&gt;</span>
          <button className="font-semibold flex items-center gap-1">
            전자공학과
            <Image
              src="/icons/keyboard_arrow_down.svg"
              alt="dropdown"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-12 pb-12">
        {/* Filter Buttons */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setSelectedFilter(selectedFilter === '날짜' ? null : '날짜')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              selectedFilter === '날짜'
                ? 'bg-[#595959] text-white'
                : 'bg-[#D9D9D9] text-black'
            }`}
          >
            날짜 ▼
          </button>
          <button
            onClick={() => setSelectedFilter(selectedFilter === '장소' ? null : '장소')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              selectedFilter === '장소'
                ? 'bg-[#595959] text-white'
                : 'bg-[#D9D9D9] text-black'
            }`}
          >
            장소 ▼
          </button>
          <button
            onClick={() => setSelectedFilter(selectedFilter === '장기' ? null : '장기')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              selectedFilter === '장기'
                ? 'bg-[#595959] text-white'
                : 'bg-[#D9D9D9] text-black'
            }`}
          >
            장기 ▼
          </button>
        </div>

        {/* Meetings List */}
        <div className="space-y-6">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className={`rounded-3xl p-8 ${
                meeting.status === '모집중' ? 'bg-[#E9D3D3]' : 'bg-[#E0E0E0]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-[24px] font-bold text-black mb-3">
                    {meeting.title}
                  </h3>
                  <p className="text-[16px] text-black mb-6 leading-relaxed">
                    {meeting.description}
                  </p>

                  <div className="flex items-center gap-6">
                    {/* Status Badge */}
                    <div
                      className={`px-6 py-2 rounded-full font-semibold ${
                        meeting.status === '모집중'
                          ? 'bg-[#AD7070] text-white'
                          : 'bg-[#A4A4A4] text-white'
                      }`}
                    >
                      {meeting.status}
                    </div>

                    {/* Meeting Info */}
                    <div className="flex items-center gap-2 text-[#595959]">
                      <Image
                        src="/icons/today.svg"
                        alt="시간"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="font-semibold">{meeting.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#595959]">
                      <Image
                        src="/icons/location_on.svg"
                        alt="장소"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="font-semibold">{meeting.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#595959]">
                      <Image
                        src="/icons/gmail_groups.svg"
                        alt="인원"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="font-semibold">{meeting.participants}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className={`px-8 py-3 rounded-lg font-semibold text-white border transition-colors ${
                    meeting.status === '모집중'
                      ? 'bg-[#AD7070] border-[#7F2323] hover:bg-[#7F2323]'
                      : 'bg-[#B7B7B7] border-[#A4A4A4] hover:bg-[#A4A4A4]'
                  }`}
                >
                  신청하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-12 right-12 w-[120px] h-[120px] bg-[#7F2323] rounded-full flex flex-col items-center justify-center text-white shadow-2xl hover:bg-[#6B1E1E] transition-colors">
        <Image
          src="/icons/add_circle.svg"
          alt="추가"
          width={48}
          height={48}
          className="w-12 h-12 mb-1"
        />
        <div className="text-sm font-semibold">모임 생성하기</div>
      </button>

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
  )
}
