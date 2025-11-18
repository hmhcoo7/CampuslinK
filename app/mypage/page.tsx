'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NotificationBell from '@/components/NotificationBell'

export default function MyPage() {
  const [isLiked1, setIsLiked1] = useState(false)
  const [isLiked2, setIsLiked2] = useState(false)

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Header */}
      <header className="bg-[#7F2323] text-white px-4 md:px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <img
              src="/icons/Seal_3D-type.png"
              alt="CampusLinK Logo"
              className="w-8 h-8 md:w-[40px] md:h-[40px] flex-shrink-0"
            />
            <div className="flex flex-col font-[family-name:var(--font-crimson)]">
              <span className="text-sm md:text-[16px] font-semibold leading-[15px]">Campus</span>
              <span className="text-base md:text-[20px] font-semibold leading-[20px]">LinK</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-4 lg:gap-8">
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
      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-12 py-8 md:py-12">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8 md:mb-12">
          <div className="relative mb-4 md:mb-6">
            <img
              src="/icons/Generic-avatar-large.svg"
              alt="Profile"
              className="w-[120px] h-[120px] md:w-[177px] md:h-[177px] flex-shrink-0"
              style={{ aspectRatio: '1/1' }}
            />
            <button className="absolute bottom-0 right-0 left-0 mx-auto w-8 h-8 md:w-12 md:h-12" style={{ bottom: '-16px' }}>
              <img
                src="/icons/Edit-icon.svg"
                alt="Edit"
                className="w-full h-full flex-shrink-0"
              />
            </button>
          </div>
          <h1
            className="text-2xl md:text-[40px] font-semibold text-black text-center font-[family-name:var(--font-crimson)] md:leading-5"
            style={{ width: '100%', maxWidth: '520px' }}
          >
            잉지 학우님, 반갑습니다.
          </h1>
        </div>

        {/* 기본정보 */}
        <div className="w-full max-w-[1037px] mx-auto mb-6 md:mb-8 p-4 md:p-8 border border-black rounded-[10px]">
          <h2 className="text-2xl md:text-[32px] font-semibold text-black font-[family-name:var(--font-crimson)] md:leading-5 mb-4 md:mb-8">
            기본정보
          </h2>
          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <span className="text-lg md:text-[24px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] md:w-[140px]">
                닉네임
              </span>
              <span className="text-base md:text-[20px] font-medium text-black font-['Inter']">
                잉지
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <span className="text-lg md:text-[24px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] md:w-[140px]">
                이메일
              </span>
              <span className="text-base md:text-[20px] font-medium text-black font-['Inter']">
                zldmz029800@kw.ac.kr
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <span className="text-lg md:text-[24px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] md:w-[140px]">
                관심분야
              </span>
              <span className="text-base md:text-[20px] font-medium text-black font-['Inter']">
                독서
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <span className="text-lg md:text-[24px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] md:w-[140px]">
                내 ❤️
              </span>
              <span className="text-base md:text-[20px] font-medium text-black font-['Inter']">
                38
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-6 text-right">
            <button className="text-base md:text-[20px] font-medium text-[#595959] font-['Inter'] hover:underline">
              개인정보 수정
            </button>
          </div>
        </div>

        {/* 모임 신청 내역 */}
        <div className="w-full max-w-[1037px] mx-auto mb-6 md:mb-8 p-4 md:p-8 border border-black rounded-[10px]">
          <h2 className="text-2xl md:text-[32px] font-semibold text-black font-[family-name:var(--font-crimson)] md:leading-5 mb-4 md:mb-6">
            모임 신청 내역
          </h2>
          <div className="space-y-3 md:space-y-4">
            {/* 모임 카드 1 */}
            <div className="bg-[#E1E1E1] rounded-[20px] md:rounded-[30px] p-4 md:p-6 relative">
              <h3 className="text-lg md:text-[20px] font-bold text-black mb-2 md:mb-3 pr-20 md:pr-0">
                자료구조 스터디
              </h3>
              <div className="space-y-1 text-black font-['Inter']">
                <div className="flex items-center gap-2">
                  <img src="/icons/clock.png" alt="날짜" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                    날짜: 9월 21일 17:00 - 19:00
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/icons/flag.png" alt="장소" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                    장소: 비마관
                  </span>
                </div>
              </div>
              <button
                className="absolute top-1/2 -translate-y-1/2 right-3 md:right-6 flex justify-center items-center w-[80px] md:w-[105px] h-[40px] md:h-[51px] bg-[#7F2323] text-white text-sm md:text-base rounded-lg border border-[#7F2323] hover:bg-[#6B1E1E] transition-colors"
                style={{ aspectRatio: '35/17' }}
              >
                취소하기
              </button>
            </div>

            {/* 모임 카드 2 */}
            <div className="bg-[#E1E1E1] rounded-[20px] md:rounded-[30px] p-4 md:p-6 relative">
              <h3 className="text-lg md:text-[20px] font-bold text-black mb-2 md:mb-3 pr-20 md:pr-0">
                영어 회화 연습--
              </h3>
              <div className="space-y-1 text-black font-['Inter']">
                <div className="flex items-center gap-2">
                  <img src="/icons/clock.png" alt="날짜" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                    날짜: 9월 24일 18:00 - 21:00
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/icons/flag.png" alt="장소" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                    장소: 한울관
                  </span>
                </div>
              </div>
              <button
                className="absolute top-1/2 -translate-y-1/2 right-3 md:right-6 flex justify-center items-center w-[80px] md:w-[105px] h-[40px] md:h-[51px] bg-[#7F2323] text-white text-sm md:text-base rounded-lg border border-[#7F2323] hover:bg-[#6B1E1E] transition-colors"
                style={{ aspectRatio: '35/17' }}
              >
                취소하기
              </button>
            </div>

            {/* 모임 카드 3 */}
            <div className="bg-[#E1E1E1] rounded-[20px] md:rounded-[30px] p-4 md:p-6 relative">
              <h3 className="text-lg md:text-[20px] font-bold text-black mb-2 md:mb-3 pr-20 md:pr-0">
                회로에 대해 알려주실 분 구합니다.
              </h3>
              <div className="space-y-1 text-black font-['Inter']">
                <div className="flex items-center gap-2">
                  <img src="/icons/clock.png" alt="날짜" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                    날짜: 9월 19일 18:00 - 21:00
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/icons/flag.png" alt="장소" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                    장소: 카페 베르테
                  </span>
                </div>
              </div>
              <button
                className="absolute top-1/2 -translate-y-1/2 right-3 md:right-6 flex justify-center items-center w-[80px] md:w-[105px] h-[40px] md:h-[51px] bg-[#7F2323] text-white text-sm md:text-base rounded-lg border border-[#7F2323] hover:bg-[#6B1E1E] transition-colors"
                style={{ aspectRatio: '35/17' }}
              >
                취소하기
              </button>
            </div>
          </div>
        </div>

        {/* 지난 신청 내역 */}
        <div className="w-full max-w-[1037px] mx-auto mb-6 md:mb-8 p-4 md:p-8 border border-black rounded-[10px]">
          <h2 className="text-2xl md:text-[32px] font-semibold text-black font-[family-name:var(--font-crimson)] md:leading-5 mb-4 md:mb-6">
            지난 신청 내역
          </h2>
          <div className="space-y-3 md:space-y-4">
            {/* 과거 모임 카드 1 */}
            <div className="bg-[#E1E1E1] rounded-[20px] md:rounded-[30px] p-4 md:p-6 relative">
              <h3 className="text-lg md:text-[20px] font-bold text-black mb-2 md:mb-3 pr-20 md:pr-0">
                무역영어 공부
              </h3>
              <div className="space-y-1 text-black font-['Inter']">
                <div className="flex items-center gap-2">
                  <img src="/icons/clock.png" alt="날짜" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                    날짜: 9월 19일 18:00 - 20:00
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/icons/flag.png" alt="장소" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                    장소: 누리관
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsLiked1(!isLiked1)}
                className={`absolute top-1/2 -translate-y-1/2 right-3 md:right-6 flex justify-center items-center w-[80px] md:w-[105px] h-[40px] md:h-[51px] rounded-lg border border-[#7F2323] transition-all ${
                  isLiked1 ? 'bg-[#2C2C2C]' : 'bg-white'
                }`}
                style={{ aspectRatio: '35/17' }}
              >
                <span className={`text-lg md:text-xl ${isLiked1 ? 'text-white' : 'text-black'}`}>
                  ♥
                </span>
              </button>
            </div>

            {/* 과거 모임 카드 2 */}
            <div className="bg-[#E1E1E1] rounded-[20px] md:rounded-[30px] p-4 md:p-6 relative">
              <h3 className="text-lg md:text-[20px] font-bold text-black mb-2 md:mb-3 pr-20 md:pr-0">
                복수전공 하는 사람들끼리 공부 안할래요?
              </h3>
              <div className="space-y-1 text-black font-['Inter']">
                <div className="flex items-center gap-2">
                  <img src="/icons/clock.png" alt="날짜" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                    날짜: 9월 15일 16:00 - 17:00
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/icons/flag.png" alt="장소" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                    장소: 집현전
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsLiked2(!isLiked2)}
                className={`absolute top-1/2 -translate-y-1/2 right-3 md:right-6 flex justify-center items-center w-[80px] md:w-[105px] h-[40px] md:h-[51px] rounded-lg border border-[#7F2323] transition-all ${
                  isLiked2 ? 'bg-[#2C2C2C]' : 'bg-white'
                }`}
                style={{ aspectRatio: '35/17' }}
              >
                <span className={`text-lg md:text-xl ${isLiked2 ? 'text-white' : 'text-black'}`}>
                  ♥
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 내 모임 생성 내역 */}
        <div className="w-full max-w-[1037px] mx-auto mb-6 md:mb-8 p-4 md:p-8 border border-black rounded-[10px]">
          <h2 className="text-2xl md:text-[32px] font-semibold text-black font-[family-name:var(--font-crimson)] md:leading-5 mb-4 md:mb-6">
            내 모임 생성 내역
          </h2>
          <div className="bg-[#E1E1E1] rounded-[20px] md:rounded-[30px] p-4 md:p-6 relative">
            <h3 className="text-lg md:text-[20px] font-bold text-black mb-2 md:mb-3 pr-20 md:pr-0">
              물리 공부하실분 구합니다.
            </h3>
            <div className="space-y-1 text-black font-['Inter']">
              <div className="flex items-center gap-2">
                <Image src="/icons/today.svg" alt="날짜" width={20} height={20} className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                  날짜: 9월 30일 17:00 - 18:00
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/location_on.svg" alt="장소" width={20} height={20} className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                  장소: 비마관
                </span>
              </div>
            </div>
            <button
              className="absolute top-1/2 -translate-y-1/2 right-3 md:right-6 flex justify-center items-center w-[80px] md:w-[105px] h-[40px] md:h-[51px] bg-[#7F2323] text-white text-sm md:text-base rounded-lg border border-[#7F2323] hover:bg-[#6B1E1E] transition-colors"
              style={{ aspectRatio: '35/17' }}
            >
              수정하기
            </button>
          </div>
        </div>

        {/* 지난 내 모임 */}
        <div className="w-full max-w-[1037px] mx-auto mb-6 md:mb-8 p-4 md:p-8 border border-[#070707] rounded-[10px]">
          <h2 className="text-2xl md:text-[32px] font-semibold text-black font-[family-name:var(--font-crimson)] md:leading-5 mb-4 md:mb-6">
            지난 내 모임
          </h2>
          <div className="space-y-3 md:space-y-4">
            {/* 지난 모임 카드 1 */}
            <div className="bg-[#E1E1E1] rounded-[20px] md:rounded-[30px] p-4 md:p-6 relative">
              <h3 className="text-lg md:text-[20px] font-bold text-black mb-2 md:mb-3 pr-24 md:pr-32">
                독서토론 - 칼을 든 칸트 구합니다
              </h3>
              <div className="space-y-1 text-black font-['Inter']">
                <div className="flex items-center gap-2">
                  <img src="/icons/clock.png" alt="날짜" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                    날짜: 9월 20일 18:00 - 19:00
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/icons/flag.png" alt="장소" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                    장소: 세븐일레븐
                  </span>
                </div>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-3 md:right-6 text-black font-['Inter'] text-xs md:text-[16px] font-medium leading-[30px] text-right max-w-[100px] md:max-w-[268px]">
                인증 미완료
              </div>
            </div>

            {/* 지난 모임 카드 2 */}
            <div className="bg-[#E1E1E1] rounded-[20px] md:rounded-[30px] p-4 md:p-6 relative">
              <h3 className="text-lg md:text-[20px] font-bold text-black mb-2 md:mb-3 pr-24 md:pr-32">
                독서토론 - 어쩌면
              </h3>
              <div className="space-y-1 text-black font-['Inter']">
                <div className="flex items-center gap-2">
                  <img src="/icons/clock.png" alt="날짜" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                    날짜: 9월 13일 18:00 - 19:00
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/icons/flag.png" alt="장소" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                    장소: 세븐일레븐
                  </span>
                </div>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-3 md:right-6 text-black font-['Inter'] text-xs md:text-[16px] font-medium leading-[30px] text-right max-w-[100px] md:max-w-[268px]">
                인증 완료
              </div>
            </div>
          </div>
        </div>

        {/* 회원 탈퇴 */}
        <div className="w-full max-w-[1037px] mx-auto mb-3 md:mb-4">
          <button className="text-lg md:text-[24px] font-semibold text-black font-['Inter'] leading-[30px] hover:underline">
            &gt; 회원 탈퇴
          </button>
        </div>

        {/* 문의하기 */}
        <div className="w-full max-w-[1037px] mx-auto">
          <p className="text-lg md:text-[24px] font-medium text-black font-['Inter'] leading-[30px] inline">
            문제가 발생하셨나요?{' '}
          </p>
          <a
            href="mailto:support@campuslink.com"
            className="text-lg md:text-[24px] font-semibold text-black font-['Inter'] leading-[30px] underline hover:opacity-80 inline"
          >
            신고 메일 작성하러 가기
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 md:mt-12 px-4 md:px-12 py-6 md:py-8">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center gap-4">
          <img
            src="/icons/kwangwoon-logo.png"
            alt="Kwangwoon University"
            className="w-[140px] md:w-[164px] h-[40px] md:h-[48px] object-cover"
            style={{ aspectRatio: '41/12' }}
          />
          <div className="text-xs md:text-sm text-black text-center md:text-left">
            <p className="font-bold text-[#7F2323]">광운대학교</p>
            <p>서울특별시 노원구 광운로 20</p>
            <p>대표전화: 02.940.5114</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
