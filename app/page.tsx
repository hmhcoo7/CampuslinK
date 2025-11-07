'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)) // 2025년 9월
  const [isLiked, setIsLiked] = useState(false) // 하트 버튼 상태
  const [isMajorDropdownOpen, setIsMajorDropdownOpen] = useState(false) // 전공 드롭다운 상태
  const [isContestDropdownOpen, setIsContestDropdownOpen] = useState(false) // 공모전 드롭다운 상태
  const [isCertificateDropdownOpen, setIsCertificateDropdownOpen] = useState(false) // 자격증 드롭다운 상태
  const [isEtcDropdownOpen, setIsEtcDropdownOpen] = useState(false) // 기타 드롭다운 상태
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null) // 선택된 단과대
  const [selectedContest, setSelectedContest] = useState<string | null>(null) // 선택된 공모전
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null) // 선택된 자격증
  const [selectedEtc, setSelectedEtc] = useState<string | null>(null) // 선택된 기타
  const [selectedClubDivision, setSelectedClubDivision] = useState<string | null>(null) // 선택된 중앙동아리 소속

  // 단과대-학과 데이터
  const collegeData: { [key: string]: string[] } = {
    '전자정보공과대학': ['전자공학과', '전자통신공학과', '전자융합공학과', '전기공학과', '전자재료공학과', '반도체시스템공학부'],
    '인공지능융합대학': ['컴퓨터정보공학부', '소프트웨어학부', '정보융합학부', '로봇학부', '지능형로봇학과'],
    '공과대학': ['화학공학과', '환경공학과', '건축공학과', '건축학과'],
    '자연과학대학': ['수학과', '화학과', '전자바이오물리학과', '정보콘텐츠학과', '스포츠융합과학과'],
    '인문사회과학대학': ['국어국문학과', '영어산업학과', '산업심리학과', '미디어커뮤니케이션학부', '동북아문화산업학부'],
    '정책법학대학': ['행정학과', '법학부', '자산관리학과', '국제학부', '글로벌지속가능융합학과'],
    '경영대학': ['경영학부', '국제통상학부']
  }

  // 공모전 카테고리 데이터
  const contestData: string[] = [
    '디자인/예술',
    '기획/마케팅',
    '경영/경제/회계',
    'IT/개발/데이터',
    '사회/환경/공공',
    '과학/공학/기술',
    '문학/글쓰기'
  ]

  // 자격증 카테고리 데이터
  const certificateData: string[] = [
    '경영/경제/회계',
    'IT/컴퓨터',
    '교육/심리/상담',
    '과학/기술/공학',
    '디자인/예술',
    '서비스/관광/조리',
    '산업/안전/기능',
    '언어/국제'
  ]

  // 기타 카테고리 데이터 (중앙동아리)
  const clubData: { [key: string]: Array<{ name: string; field: string }> } = {
    '공연예술분과': [
      { name: '14Fret', field: '밴드' },
      { name: '광운극예술연구회', field: '연극' },
      { name: '노을', field: '밴드' },
      { name: '여섯소리', field: '어쿠스틱' },
      { name: 'C-spot', field: '힙합' },
      { name: 'Da.KAPO', field: '오케스트라' },
      { name: 'K-ME', field: 'K-pop 댄스' },
      { name: 'Pegasus', field: '락밴드' },
      { name: 'Phoebus', field: '종합밴드' },
      { name: 'Trick', field: '마술' }
    ],
    '문화분과': [
      { name: '만화동아리 CIA', field: '만화' },
      { name: '33&1/3 RPM', field: '음악감상' },
      { name: 'KAPA', field: '사진' },
      { name: 'PUB', field: '게임' },
      { name: '보해미안', field: '보드게임' }
    ],
    '종교봉사분과': [
      { name: 'IVF', field: '기독교' },
      { name: 'RCY', field: '봉사' },
      { name: '네비게이토선교회', field: '종교' },
      { name: '세상사람들', field: '봉사' },
      { name: 'DO-WITH', field: '봉사' },
      { name: 'CCC', field: '종교' }
    ],
    '체육1분과': [
      { name: 'KABA', field: '농구' },
      { name: 'KWTC', field: '테니스' },
      { name: 'KATT', field: '탁구' },
      { name: '아이스유니콘스', field: '아이스하키' },
      { name: 'KAFA', field: '축구' },
      { name: '예인회', field: '볼링' },
      { name: '아마야구반', field: '야구' },
      { name: 'KWWS', field: '여자축구' }
    ],
    '체육2분과': [
      { name: '아마유도부', field: '유도' },
      { name: '블랙샤크', field: '스킨스쿠버' },
      { name: '검도부', field: '검도' },
      { name: '블레이드러너', field: '인라인' },
      { name: '산악부', field: '산악' },
      { name: '스키부', field: '스키' },
      { name: '기우회', field: '바둑' },
      { name: '천운', field: '국궁' }
    ],
    '학술분과': [
      { name: '문학동우회', field: '문학' },
      { name: '블랙썬', field: '조명' },
      { name: 'Blackcat', field: '정보보안' },
      { name: 'SELA', field: '반도체' },
      { name: 'TIME', field: '영어시사' },
      { name: 'KITEL', field: '전자' },
      { name: 'K-NET', field: '네트워크' },
      { name: '제로비', field: '무선통신' },
      { name: 'ROLAB', field: '로봇' },
      { name: "COM's", field: '컴퓨터' },
      { name: 'FOVU', field: '사진영상' }
    ]
  }

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
          </div>

          <nav className="flex items-center gap-8">
            <div className="relative">
              <button
                onClick={() => {
                  setIsMajorDropdownOpen(!isMajorDropdownOpen)
                  setIsContestDropdownOpen(false)
                  setIsCertificateDropdownOpen(false)
                  setIsEtcDropdownOpen(false)
                  setSelectedCollege(null)
                }}
                className="hover:opacity-80"
              >
                전공
              </button>
              {isMajorDropdownOpen && (
                <div className="absolute -bottom-[16px] left-0 right-0 h-[3px] bg-white"></div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => {
                  setIsContestDropdownOpen(!isContestDropdownOpen)
                  setIsMajorDropdownOpen(false)
                  setIsCertificateDropdownOpen(false)
                  setIsEtcDropdownOpen(false)
                  setSelectedContest(null)
                }}
                className="hover:opacity-80"
              >
                공모전
              </button>
              {isContestDropdownOpen && (
                <div className="absolute -bottom-[16px] left-0 right-0 h-[3px] bg-white"></div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => {
                  setIsCertificateDropdownOpen(!isCertificateDropdownOpen)
                  setIsMajorDropdownOpen(false)
                  setIsContestDropdownOpen(false)
                  setIsEtcDropdownOpen(false)
                  setSelectedCertificate(null)
                }}
                className="hover:opacity-80"
              >
                자격증
              </button>
              {isCertificateDropdownOpen && (
                <div className="absolute -bottom-[16px] left-0 right-0 h-[3px] bg-white"></div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => {
                  setIsEtcDropdownOpen(!isEtcDropdownOpen)
                  setIsMajorDropdownOpen(false)
                  setIsContestDropdownOpen(false)
                  setIsCertificateDropdownOpen(false)
                  setSelectedClubDivision(null)
                }}
                className="hover:opacity-80"
              >
                기타
              </button>
              {isEtcDropdownOpen && (
                <div className="absolute -bottom-[16px] left-0 right-0 h-[3px] bg-white"></div>
              )}
            </div>
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

      {/* 전공 카테고리 드롭다운 */}
      {isMajorDropdownOpen && (
        <div className="bg-[#C5C5C5] transition-all duration-300 ease-in-out">
          <div className="max-w-[1440px] mx-auto px-12 py-8">
            <div className="w-[382px] h-[444px] mx-auto flex-shrink-0">
              <div className="flex gap-0 items-start">
                {/* 왼쪽 - 단과대 목록 */}
                <div className="flex-1">
                  <h3 className="text-black font-['Crimson_Text'] font-semibold text-[16px] leading-normal mb-4 ml-2">
                    단과대 &gt;
                  </h3>
                  <div className="space-y-0 ml-8">
                    {Object.keys(collegeData).map((college) => (
                      <button
                        key={college}
                        onClick={() => setSelectedCollege(college)}
                        className={`block text-left font-semibold text-[16px] leading-[30px] transition-colors ${
                          selectedCollege === college
                            ? 'text-black'
                            : 'text-[#595959]'
                        }`}
                        style={{ fontFamily: 'Inter' }}
                      >
                        {college}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 세로 구분선 */}
                <div className="h-[444px] flex-shrink-0 mx-4 border-l border-[#7F2323]"></div>

                {/* 오른쪽 - 학과 목록 */}
                <div className="flex-1">
                  <h3 className="text-black font-['Crimson_Text'] font-semibold text-[16px] leading-normal mb-4 ml-2">
                    학과 &gt;
                  </h3>
                  {selectedCollege ? (
                    <div className="space-y-0 ml-8">
                      {collegeData[selectedCollege].map((department) => (
                        <button
                          key={department}
                          onClick={() => {
                            router.push('/meetings')
                          }}
                          className="block text-left text-[#595959] hover:text-black font-semibold text-[16px] leading-[30px] transition-colors whitespace-nowrap"
                          style={{ fontFamily: 'Inter' }}
                        >
                          {department}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 공모전 카테고리 드롭다운 */}
      {isContestDropdownOpen && (
        <div className="bg-[#C5C5C5] transition-all duration-300 ease-in-out">
          <div className="max-w-[1440px] mx-auto px-12 py-8">
            <div className="w-[382px] h-[444px] mx-auto flex-shrink-0 flex items-center justify-center">
              <div className="space-y-0 flex flex-col items-center">
                {contestData.map((contest) => (
                  <button
                    key={contest}
                    onClick={() => {
                      router.push('/meetings')
                    }}
                    className={`block text-center font-semibold text-[16px] leading-[30px] transition-colors hover:text-black ${
                      selectedContest === contest
                        ? 'text-black'
                        : 'text-[#595959]'
                    }`}
                    style={{ fontFamily: 'Inter' }}
                  >
                    {contest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 자격증 카테고리 드롭다운 */}
      {isCertificateDropdownOpen && (
        <div className="bg-[#C5C5C5] transition-all duration-300 ease-in-out">
          <div className="max-w-[1440px] mx-auto px-12 py-8">
            <div className="w-[382px] h-[444px] mx-auto flex-shrink-0 flex items-center justify-center">
              <div className="space-y-0 flex flex-col items-center">
                {certificateData.map((certificate) => (
                  <button
                    key={certificate}
                    onClick={() => {
                      router.push('/meetings')
                    }}
                    className={`block text-center font-semibold text-[16px] leading-[30px] transition-colors hover:text-black ${
                      selectedCertificate === certificate
                        ? 'text-black'
                        : 'text-[#595959]'
                    }`}
                    style={{ fontFamily: 'Inter' }}
                  >
                    {certificate}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 기타 카테고리 드롭다운 (중앙동아리) */}
      {isEtcDropdownOpen && (
        <div className="bg-[#C5C5C5] transition-all duration-300 ease-in-out">
          <div className="max-w-[1440px] mx-auto px-12 py-8">
            <div className="w-[382px] h-[444px] mx-auto flex-shrink-0">
              <div className="flex gap-0 items-start">
                {/* 왼쪽 - 중앙동아리 소속 목록 */}
                <div className="flex-1">
                  <h3 className="text-black font-['Crimson_Text'] font-semibold text-[16px] leading-normal mb-4 ml-2 whitespace-nowrap">
                    중앙동아리소속 &gt;
                  </h3>
                  <div className="space-y-0 ml-8">
                    {Object.keys(clubData).map((division) => (
                      <button
                        key={division}
                        onClick={() => setSelectedClubDivision(division)}
                        className={`block text-left font-semibold text-[16px] leading-[30px] transition-colors ${
                          selectedClubDivision === division
                            ? 'text-black'
                            : 'text-[#595959]'
                        }`}
                        style={{ fontFamily: 'Inter' }}
                      >
                        {division}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 세로 구분선 */}
                <div className="h-[444px] flex-shrink-0 mx-4 border-l border-[#7F2323]"></div>

                {/* 오른쪽 - 중앙동아리명 목록 */}
                <div className="flex-1">
                  <h3 className="text-black font-['Crimson_Text'] font-semibold text-[16px] leading-normal mb-4 ml-2 whitespace-nowrap">
                    중앙동아리명 &gt;
                  </h3>
                  {selectedClubDivision ? (
                    <div className="space-y-0 ml-8">
                      {clubData[selectedClubDivision].map((club) => (
                        <button
                          key={club.name}
                          onClick={() => {
                            router.push('/meetings')
                          }}
                          className="block text-left text-[#595959] hover:text-black font-semibold text-[16px] leading-[30px] transition-colors whitespace-nowrap"
                          style={{ fontFamily: 'Inter' }}
                        >
                          {club.name} ({club.field})
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <img
                  src="/icons/arrow-right.png"
                  alt="SOON"
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
                      <img src="/icons/clock.png" alt="시계" className="w-5 h-5" />
                      <span className="text-[16px] font-[500] leading-[30px]">날짜: 9월 21일 17:00 - 19:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="/icons/flag.png" alt="장소" className="w-5 h-5" />
                      <span className="text-[16px] font-[500] leading-[30px]">장소: 비마관</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="/icons/book.png" alt="상태" className="w-5 h-5" />
                      <span className="text-[16px] font-[500] leading-[30px]">상태: 모집중</span>
                    </div>
                  </div>
                  <button
                    className="absolute top-1/2 -translate-y-1/2 right-6 flex justify-center items-center w-[105px] h-[51px] bg-[#B7B7B7] text-white rounded-lg border border-[#7F2323] hover:bg-[#7F2323] transition-colors"
                    style={{ aspectRatio: '35/17' }}
                  >
                    신청하기
                  </button>
                </div>

                <div className="bg-[#E1E1E1] rounded-2xl p-6 relative">
                  <h3 className="text-[20px] font-[800] text-black mb-3">영어 회화</h3>
                  <div className="space-y-1 text-black">
                    <div className="flex items-center gap-2">
                      <img src="/icons/clock.png" alt="시계" className="w-5 h-5" />
                      <span className="text-[16px] font-[500] leading-[30px]">날짜: 9월 24일 18:00 - 21:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="/icons/flag.png" alt="장소" className="w-5 h-5" />
                      <span className="text-[16px] font-[500] leading-[30px]">장소: 한울관</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="/icons/book.png" alt="상태" className="w-5 h-5" />
                      <span className="text-[16px] font-[500] leading-[30px]">상태: 마감</span>
                    </div>
                  </div>
                  <button
                    className="absolute top-1/2 -translate-y-1/2 right-6 flex justify-center items-center w-[105px] h-[51px] bg-[#B7B7B7] text-white rounded-lg border border-[#7F2323] hover:bg-[#7F2323] transition-colors"
                    style={{ aspectRatio: '35/17' }}
                  >
                    신청하기
                  </button>
                </div>
              </div>
            </div>

            {/* 과거 신청 내역 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/icons/check.png"
                  alt="체크"
                  className="w-7 h-7"
                />
                <h2 className="text-[20px] font-[800] text-black">과거 신청 내역</h2>
              </div>

              {/* 예시 과거 모임 카드 */}
              <div className="bg-[#E1E1E1] rounded-2xl p-6 relative">
                <h3 className="text-[20px] font-[800] text-black mb-3">무역 영어 공부</h3>
                <div className="space-y-1 text-black">
                  <div className="flex items-center gap-2">
                    <img src="/icons/clock.png" alt="시계" className="w-5 h-5" />
                    <span className="text-[16px] font-[500] leading-[30px]">날짜: 9월 19일 18:00 - 20:00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/icons/flag.png" alt="장소" className="w-5 h-5" />
                    <span className="text-[16px] font-[500] leading-[30px]">장소: 누리관</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/icons/book.png" alt="상태" className="w-5 h-5" />
                    <span className="text-[16px] font-[500] leading-[30px]">상태: 마감</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`absolute top-1/2 -translate-y-1/2 right-6 flex justify-center items-center w-[105px] h-[51px] rounded-lg border border-[#7F2323] transition-all ${
                    isLiked
                      ? 'bg-[#2C2C2C]'
                      : 'bg-white'
                  }`}
                  style={{ aspectRatio: '35/17' }}
                >
                  <span className={`text-xl ${isLiked ? 'text-white' : 'text-black'}`}>
                    ♥
                  </span>
                </button>
              </div>
            </div>
          </div>
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
