'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NotificationBell from '@/components/NotificationBell'

export default function MyPage() {
  const [isLiked1, setIsLiked1] = useState(false)
  const [isLiked2, setIsLiked2] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#7F2323] text-white px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/icons/Seal_3D-type.png"
              alt="CampusLinK Logo"
              className="w-[40px] h-[40px] flex-shrink-0"
            />
            <div className="flex flex-col font-[family-name:var(--font-crimson)]">
              <span className="text-[16px] font-semibold leading-[15px]">Campus</span>
              <span className="text-[20px] font-semibold leading-[20px]">LinK</span>
            </div>
          </Link>

          <nav className="flex items-center gap-8">
            <Link href="/" className="hover:opacity-80">전공</Link>
            <Link href="/" className="hover:opacity-80">공모전</Link>
            <Link href="/" className="hover:opacity-80">자격증</Link>
            <Link href="/" className="hover:opacity-80">동아리</Link>
            <Link href="/" className="hover:opacity-80">기타</Link>
            <Link href="/notices" className="hover:opacity-80">공지사항</Link>
            <NotificationBell />
            <Link href="/mypage">
              <Image
                src="/icons/Generic avatar.svg"
                alt="Profile"
                width={32}
                height={32}
                className="w-8 h-8 cursor-pointer"
              />
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-12 py-12">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-6">
            <Image
              src="/icons/Generic avatar.svg"
              alt="Profile"
              width={177}
              height={177}
              className="w-[177px] h-[177px] flex-shrink-0"
              style={{ fill: '#D9D9D9', aspectRatio: '1/1' }}
            />
            <button className="absolute bottom-0 right-0">
              <Image
                src="/icons/Edit.svg"
                alt="Edit"
                width={48}
                height={48}
                className="w-12 h-12 flex-shrink-0"
              />
            </button>
          </div>
          <h1 className="text-[40px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] leading-5">
            잉지 학우님, 반갑습니다.
          </h1>
        </div>

        {/* 기본정보 */}
        <div className="w-[1037px] mx-auto mb-8 p-8 border border-black rounded-[10px]">
          <h2 className="text-[32px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] leading-5 mb-8">
            기본정보
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[24px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] w-[140px]">닉네임</span>
              <span className="text-[20px] font-medium text-black font-['Inter'] flex-1 ml-8">잉지</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[24px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] w-[140px]">이메일</span>
              <span className="text-[20px] font-medium text-black font-['Inter'] flex-1 ml-8">zldmz029800@kw.ac.kr</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[24px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] w-[140px]">관심분야</span>
              <span className="text-[20px] font-medium text-black font-['Inter'] flex-1 ml-8">독서</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[24px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] w-[140px]">내 ❤️</span>
              <span className="text-[20px] font-medium text-black font-['Inter'] flex-1 ml-8">38</span>
            </div>
          </div>
          <div className="mt-6 text-right">
            <button className="text-[20px] font-medium text-[#595959] font-['Inter'] hover:underline">
              개인정보 수정
            </button>
          </div>
        </div>

        {/* 모임 신청 내역 */}
        <div className="w-[1037px] mx-auto mb-8 p-8 border border-black rounded-[10px]">
          <h2 className="text-[32px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] leading-5 mb-6">
            모임 신청 내역
          </h2>
          <div className="space-y-4">
            {/* 모임 카드 1 */}
            <div className="bg-[#E1E1E1] rounded-[30px] p-6 relative">
              <h3 className="text-[20px] font-bold text-black mb-3">자료구조 스터디</h3>
              <div className="space-y-1 text-black font-['Inter']">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium">📅 날짜: 9월 21일 17:00 - 19:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium">📍 장소: 비마관</span>
                </div>
              </div>
              <button className="absolute top-1/2 -translate-y-1/2 right-6 flex justify-center items-center w-[105px] h-[51px] bg-[#7F2323] text-white rounded-lg border border-[#7F2323] hover:bg-[#6B1E1E] transition-colors">
                취소하기
              </button>
            </div>

            {/* 모임 카드 2 */}
            <div className="bg-[#E1E1E1] rounded-[30px] p-6 relative">
              <h3 className="text-[20px] font-bold text-black mb-3">영어 회화 연습--</h3>
              <div className="space-y-1 text-black font-['Inter']">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium">📅 날짜: 9월 24일 18:00 - 21:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium">📍 장소: 한울관</span>
                </div>
              </div>
              <button className="absolute top-1/2 -translate-y-1/2 right-6 flex justify-center items-center w-[105px] h-[51px] bg-[#7F2323] text-white rounded-lg border border-[#7F2323] hover:bg-[#6B1E1E] transition-colors">
                취소하기
              </button>
            </div>

            {/* 모임 카드 3 */}
            <div className="bg-[#E1E1E1] rounded-[30px] p-6 relative">
              <h3 className="text-[20px] font-bold text-black mb-3">회로에 대해 알려주실 분 구합니다.</h3>
              <div className="space-y-1 text-black font-['Inter']">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium">📅 날짜: 9월 19일 18:00 - 21:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium">📍 장소: 카페 베르테</span>
                </div>
              </div>
              <button className="absolute top-1/2 -translate-y-1/2 right-6 flex justify-center items-center w-[105px] h-[51px] bg-[#7F2323] text-white rounded-lg border border-[#7F2323] hover:bg-[#6B1E1E] transition-colors">
                취소하기
              </button>
            </div>
          </div>
        </div>

        {/* 지난 신청 내역 */}
        <div className="w-[1037px] mx-auto mb-8 p-8 border border-black rounded-[10px]">
          <h2 className="text-[32px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] leading-5 mb-6">
            지난 신청 내역
          </h2>
          <div className="space-y-4">
            {/* 과거 모임 카드 1 */}
            <div className="bg-[#E1E1E1] rounded-[30px] p-6 relative">
              <h3 className="text-[20px] font-bold text-black mb-3">무역영어 공부</h3>
              <div className="space-y-1 text-black font-['Inter']">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium">📅 날짜: 9월 19일 18:00 - 20:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium">📍 장소: 누리관</span>
                </div>
              </div>
              <button
                onClick={() => setIsLiked1(!isLiked1)}
                className={`absolute top-1/2 -translate-y-1/2 right-6 flex justify-center items-center w-[105px] h-[51px] rounded-lg border border-[#7F2323] transition-all ${
                  isLiked1 ? 'bg-[#2C2C2C]' : 'bg-white'
                }`}
              >
                <span className={`text-xl ${isLiked1 ? 'text-white' : 'text-black'}`}>
                  ♥
                </span>
              </button>
            </div>

            {/* 과거 모임 카드 2 */}
            <div className="bg-[#E1E1E1] rounded-[30px] p-6 relative">
              <h3 className="text-[20px] font-bold text-black mb-3">복수전공 하는 사람들끼리 공부 안할래요?</h3>
              <div className="space-y-1 text-black font-['Inter']">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium">📅 날짜: 9월 15일 16:00 - 17:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium">📍 장소: 집현전</span>
                </div>
              </div>
              <button
                onClick={() => setIsLiked2(!isLiked2)}
                className={`absolute top-1/2 -translate-y-1/2 right-6 flex justify-center items-center w-[105px] h-[51px] rounded-lg border border-[#7F2323] transition-all ${
                  isLiked2 ? 'bg-[#2C2C2C]' : 'bg-white'
                }`}
              >
                <span className={`text-xl ${isLiked2 ? 'text-white' : 'text-black'}`}>
                  ♥
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 내 모임 생성 내역 */}
        <div className="w-[1037px] mx-auto mb-8 p-8 border border-black rounded-[10px]">
          <h2 className="text-[32px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] leading-5 mb-6">
            내 모임 생성 내역
          </h2>
          <div className="bg-[#E1E1E1] rounded-[30px] p-6 relative">
            <h3 className="text-[20px] font-bold text-black mb-3">물리 공부하실분 구합니다.</h3>
            <div className="space-y-1 text-black font-['Inter']">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-medium">📅 날짜: 9월 30일 17:00 - 18:00</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-medium">📍 장소: 비마관</span>
              </div>
            </div>
            <button className="absolute top-1/2 -translate-y-1/2 right-6 flex justify-center items-center w-[105px] h-[51px] bg-[#7F2323] text-white rounded-lg border border-[#7F2323] hover:bg-[#6B1E1E] transition-colors">
              취소하기
            </button>
          </div>
        </div>

        {/* 지난 내 모임 */}
        <div className="w-[1037px] mx-auto mb-8 p-8 border border-[#070707] rounded-[10px]">
          <h2 className="text-[32px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] leading-5 mb-6">
            지난 내 모임
          </h2>
          <div className="space-y-4">
            {/* 지난 모임 카드 1 */}
            <div className="bg-[#E1E1E1] rounded-[30px] p-6 relative">
              <h3 className="text-[20px] font-bold text-black mb-3">독서토론 - 칼을 든 칸트 구합니다</h3>
              <div className="space-y-1 text-black font-['Inter']">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium">📅 날짜: 9월 20일 18:00 - 19:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium">📍 장소: 세븐일레븐</span>
                </div>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-6 text-black font-['Inter'] text-[16px] font-medium leading-[30px]">
                인증 미완료
              </div>
            </div>

            {/* 지난 모임 카드 2 */}
            <div className="bg-[#E1E1E1] rounded-[30px] p-6 relative">
              <h3 className="text-[20px] font-bold text-black mb-3">독서토론 - 어쩌면</h3>
              <div className="space-y-1 text-black font-['Inter']">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium">📅 날짜: 9월 13일 18:00 - 19:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium">📍 장소: 세븐일레븐</span>
                </div>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-6 text-black font-['Inter'] text-[16px] font-medium leading-[30px]">
                인증 완료
              </div>
            </div>
          </div>
        </div>

        {/* 회원 탈퇴 */}
        <div className="w-[1037px] mx-auto mb-4">
          <button className="text-[24px] font-semibold text-black font-['Inter'] leading-[30px] hover:underline">
            &gt; 회원 탈퇴
          </button>
        </div>

        {/* 문의하기 */}
        <div className="w-[1037px] mx-auto">
          <p className="text-[24px] font-medium text-black font-['Inter'] leading-[30px] mb-2">
            문제가 발생하셨나요?
          </p>
          <a
            href="mailto:support@campuslink.com"
            className="text-[24px] font-semibold text-black font-['Inter'] leading-[30px] underline hover:opacity-80"
          >
            신고 메일 작성하러 가기
          </a>
        </div>
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
  )
}
