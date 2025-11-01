'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)) // 2025년 9월

  // 캘린더 날짜 생성
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // 빈 칸 추가 (이전 달)
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

  // 예시: 모임이 있는 날짜 (나중에 데이터로 대체)
  const eventDates = [19, 21, 24]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#7F2323] text-white px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/로고.png"
              alt="CampusLinK Logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="font-bold text-lg font-[family-name:var(--font-crimson)]">
              Campus<br/>LinK
            </span>
          </div>

          <nav className="flex items-center gap-8">
            <Link href="/major" className="hover:opacity-80">전공</Link>
            <Link href="/contest" className="hover:opacity-80">공모전</Link>
            <Link href="/certificate" className="hover:opacity-80">자격증</Link>
            <Link href="/etc" className="hover:opacity-80">기타</Link>
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

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-12 py-8">
        <div className="flex gap-8">
          {/* 왼쪽 - 캘린더 */}
          <div className="w-[45%] bg-[#E1E1E1] rounded-3xl p-8">
            <div className="bg-white rounded-2xl p-6">
              {/* 캘린더 헤더 */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-black">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                    className="text-[#0088FF] text-2xl hover:opacity-70"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                    className="text-[#0088FF] text-2xl hover:opacity-70"
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* 요일 헤더 */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['SUN', 'MON', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, idx) => (
                  <div key={idx} className="text-center text-sm text-gray-400 font-medium">
                    {day}
                  </div>
                ))}
              </div>

              {/* 날짜 그리드 */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, idx) => (
                  <div
                    key={idx}
                    className="aspect-square flex items-center justify-center relative"
                  >
                    {day && (
                      <>
                        <span className={`text-lg ${
                          day === 21 ? 'text-[#0088FF] font-bold' : 'text-black'
                        }`}>
                          {day}
                        </span>
                        {/* 모임이 있는 날짜에 빨간 점 표시 */}
                        {eventDates.includes(day) && (
                          <div className="absolute bottom-2 w-1.5 h-1.5 bg-[#7F2323] rounded-full"></div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* 현재 시간 */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-sm text-gray-500">Time</span>
                <span className="text-sm text-black bg-gray-100 px-3 py-1 rounded">
                  {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>

          {/* 오른쪽 - 다가올 일정 & 과거 신청 내역 */}
          <div className="flex-1 flex flex-col gap-8">
            {/* 다가올 일정 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/icons/옆 화살표.png"
                  alt="SOON"
                  width={30}
                  height={30}
                  className="w-7 h-7"
                />
                <h2 className="text-[20px] font-[800] text-black">다가올 일정</h2>
              </div>

              {/* 예시 모임 카드 (나중에 데이터로 대체) */}
              <div className="space-y-4">
                <div className="bg-[#E1E1E1] rounded-2xl p-6 relative">
                  <h3 className="text-[20px] font-[800] text-black mb-3">자료구조 스터디</h3>
                  <div className="space-y-1 text-black">
                    <div className="flex items-center gap-2">
                      <Image src="/icons/알람시계.png" alt="시계" width={20} height={20} className="w-5 h-5" />
                      <span className="text-[16px] font-[500] leading-[30px]">날짜: 9월 21일 17:00 - 19:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/icons/깃발.png" alt="장소" width={20} height={20} className="w-5 h-5" />
                      <span className="text-[16px] font-[500] leading-[30px]">장소: 비마관</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/icons/책.png" alt="상태" width={20} height={20} className="w-5 h-5" />
                      <span className="text-[16px] font-[500] leading-[30px]">상태: 모집중</span>
                    </div>
                  </div>
                  <button className="absolute top-6 right-6 bg-[#B7B7B7] text-white px-6 py-2 rounded-lg hover:bg-[#7F2323] transition-colors">
                    신청하기
                  </button>
                </div>

                <div className="bg-[#E1E1E1] rounded-2xl p-6 relative">
                  <h3 className="text-[20px] font-[800] text-black mb-3">영어 회화</h3>
                  <div className="space-y-1 text-black">
                    <div className="flex items-center gap-2">
                      <Image src="/icons/알람시계.png" alt="시계" width={20} height={20} className="w-5 h-5" />
                      <span className="text-[16px] font-[500] leading-[30px]">날짜: 9월 24일 18:00 - 21:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/icons/깃발.png" alt="장소" width={20} height={20} className="w-5 h-5" />
                      <span className="text-[16px] font-[500] leading-[30px]">장소: 한울관</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/icons/책.png" alt="상태" width={20} height={20} className="w-5 h-5" />
                      <span className="text-[16px] font-[500] leading-[30px]">상태: 마감</span>
                    </div>
                  </div>
                  <button className="absolute top-6 right-6 bg-[#B7B7B7] text-white px-6 py-2 rounded-lg hover:bg-[#7F2323] transition-colors">
                    신청하기
                  </button>
                </div>
              </div>
            </div>

            {/* 과거 신청 내역 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/icons/체크.png"
                  alt="체크"
                  width={30}
                  height={30}
                  className="w-7 h-7"
                />
                <h2 className="text-[20px] font-[800] text-black">과거 신청 내역</h2>
              </div>

              {/* 예시 과거 모임 카드 */}
              <div className="bg-[#E1E1E1] rounded-2xl p-6 relative">
                <h3 className="text-[20px] font-[800] text-black mb-3">무역 영어 공부</h3>
                <div className="space-y-1 text-black">
                  <div className="flex items-center gap-2">
                    <Image src="/icons/알람시계.png" alt="시계" width={20} height={20} className="w-5 h-5" />
                    <span className="text-[16px] font-[500] leading-[30px]">날짜: 9월 19일 18:00 - 20:00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src="/icons/깃발.png" alt="장소" width={20} height={20} className="w-5 h-5" />
                    <span className="text-[16px] font-[500] leading-[30px]">장소: 누리관</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src="/icons/책.png" alt="상태" width={20} height={20} className="w-5 h-5" />
                    <span className="text-[16px] font-[500] leading-[30px]">상태: 마감</span>
                  </div>
                </div>
                <button className="absolute top-6 right-6 bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors">
                  ❤️
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 px-12 py-8">
        <div className="max-w-[1440px] mx-auto flex items-center gap-4">
          <Image
            src="/icons/뉴 로고.png"
            alt="Kwangwoon University"
            width={60}
            height={60}
            className="w-15 h-15"
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
