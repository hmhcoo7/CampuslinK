'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function MeetingsPage() {
  // 브래드크럼 상태
  const [selectedCategory, setSelectedCategory] = useState('전공')
  const [selectedLeftSubcategory, setSelectedLeftSubcategory] = useState('전자정보공과대학')
  const [selectedRightSubcategory, setSelectedRightSubcategory] = useState('전자공학과')

  // 드롭다운 상태
  const [isLeftDropdownOpen, setIsLeftDropdownOpen] = useState(false)
  const [isRightDropdownOpen, setIsRightDropdownOpen] = useState(false)

  // 필터 상태
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showDurationDropdown, setShowDurationDropdown] = useState(false)

  // 카테고리 데이터
  const categoryData: { [key: string]: { [key: string]: string[] } } = {
    '전공': {
      '전자정보공과대학': ['전자공학과', '전자통신공학과', '전자융합공학과', '전기공학과', '전자재료공학과', '반도체시스템공학부'],
      '인공지능융합대학': ['컴퓨터정보공학부', '소프트웨어학부', '정보융합학부', '로봇학부', '지능형로봇학과'],
      '공과대학': ['화학공학과', '환경공학과', '건축공학과', '건축학과'],
      '자연과학대학': ['수학과', '화학과', '전자바이오물리학과', '정보콘텐츠학과', '스포츠융합과학과'],
      '인문사회과학대학': ['국어국문학과', '영어산업학과', '산업심리학과', '미디어커뮤니케이션학부', '동북아문화산업학부'],
      '정책법학대학': ['행정학과', '법학부', '자산관리학과', '국제학부', '글로벌지속가능융합학과'],
      '경영대학': ['경영학부', '국제통상학부']
    },
    '공모전': {
      '디자인': ['UX/UI', '그래픽디자인', '제품디자인', '패션디자인'],
      '개발': ['웹개발', '앱개발', '게임개발', 'AI/머신러닝'],
      '기획': ['마케팅', '서비스기획', '비즈니스모델', '창업아이템'],
      '기타': ['영상제작', '사진', '글쓰기', '광고']
    },
    '자격증': {
      'IT': ['정보처리기사', '네트워크관리사', '리눅스마스터', '컴퓨터활용능력'],
      '어학': ['토익', '토플', 'OPIC', 'JPT'],
      '금융': ['재경관리사', '전산회계', '증권투자권유자문인력', 'CFA'],
      '기타': ['한국사능력검정', '운전면허', '무역영어', '사회조사분석사']
    },
    '동아리': {
      '공연예술분과': ['14Fret', '광운극예술연구회', '노을', '여섯소리', 'C-spot', 'Da.KAPO', 'K-ME', 'Pegasus', 'Phoebus', 'Trick'],
      '문화분과': ['만화동아리 CIA', '33&1/3 RPM', 'KAPA', 'PUB', '보해미안'],
      '종교봉사분과': ['IVF', 'RCY', '네비게이토선교회', '세상사람들', 'DO-WITH', 'CCC'],
      '체육1분과': ['KABA', 'KWTC', 'KATT', '아이스유니콘스', 'KAFA', '예인회', '아마야구반', 'KWWS'],
      '체육2분과': ['아마유도부', '블랙샤크', '검도부', '블레이드러너', '산악부', '스키부', '기우회', '천운'],
      '학술분과': ['문학동우회', '블랙썬', 'Blackcat', 'SELA', 'TIME', 'KITEL', 'K-NET', '제로비', 'ROLAB', "COM's", 'FOVU']
    },
    '기타': {
      '취미': ['운동', '음악', '미술', '요리'],
      '봉사': ['교육봉사', '환경봉사', '복지봉사', '재능기부'],
      '기타': ['자기개발', '교양활동', '취업스터디']
    }
  }

  // 예시 모임 데이터 (실제로는 API에서 가져올 데이터)
  const allMeetings = [
    // 전공 모임
    {
      id: 1,
      title: '물리 공부하실분 구합니다.',
      description: '제가 물리 공부를 하고 있는데 생각보다 문제가 잘 안풀리....',
      startDate: new Date(2025, 8, 30),
      endDate: new Date(2025, 8, 30),
      startTime: '17:00',
      endTime: '18:00',
      location: '비마관',
      locationType: '교내',
      currentParticipants: 3,
      maxParticipants: 6,
      duration: '단기',
      category: '전공',
      leftSubcategory: '전자정보공과대학',
      rightSubcategory: '전자공학과'
    },
    {
      id: 2,
      title: '회로에 대해 알려주실 분 구합니다.',
      description: '안녕하세요. 제가 9/16일 수업에 이해하지 못한 부분을 같이....',
      startDate: new Date(2025, 8, 19),
      endDate: new Date(2025, 8, 19),
      startTime: '18:00',
      endTime: '21:00',
      location: '카페 베르테',
      locationType: '교외',
      currentParticipants: 1,
      maxParticipants: 6,
      duration: '단기',
      category: '전공',
      leftSubcategory: '전자정보공과대학',
      rightSubcategory: '전자공학과'
    },
    {
      id: 3,
      title: '복수전공 하는 사람들끼리 공부 안할래요?',
      description: '저는 전기공학과 복수전공 중입니다. 커뮤니티도 부족하고 공....',
      startDate: new Date(2025, 8, 20),
      endDate: new Date(2025, 8, 20),
      startTime: '15:00',
      endTime: '17:00',
      location: '집현전',
      locationType: '교내',
      currentParticipants: 6,
      maxParticipants: 6,
      duration: '장기',
      category: '전공',
      leftSubcategory: '전자정보공과대학',
      rightSubcategory: '전자공학과'
    },
    {
      id: 4,
      title: '회로이론 기출문제 풀이 스터디',
      description: '안녕하세요, 전기공학부 22학번 이서연입니다. 다가오는 중간....',
      startDate: new Date(2025, 8, 12),
      endDate: new Date(2025, 8, 12),
      startTime: '20:00',
      endTime: '21:00',
      location: '월계 도서관',
      locationType: '교내',
      currentParticipants: 6,
      maxParticipants: 6,
      duration: '단기',
      category: '전공',
      leftSubcategory: '전자정보공과대학',
      rightSubcategory: '전자공학과'
    },
    // 공모전 모임
    {
      id: 5,
      title: 'UX/UI 디자인 공모전 팀원 모집',
      description: '삼성 주최 UX/UI 공모전에 참가할 디자이너 2명을 찾습니다....',
      startDate: new Date(2025, 8, 25),
      endDate: new Date(2025, 8, 25),
      startTime: '14:00',
      endTime: '16:00',
      location: '스타벅스 석계역점',
      locationType: '교외',
      currentParticipants: 2,
      maxParticipants: 4,
      duration: '장기',
      category: '공모전',
      leftSubcategory: '디자인',
      rightSubcategory: 'UX/UI'
    },
    {
      id: 6,
      title: '앱개발 공모전 같이 준비해요',
      description: '교육부 주최 앱개발 공모전 준비할 팀원 구합니다. 백엔드/프론트 모두 환영....',
      startDate: new Date(2025, 8, 28),
      endDate: new Date(2025, 8, 28),
      startTime: '19:00',
      endTime: '21:00',
      location: '복현관 스터디룸',
      locationType: '교내',
      currentParticipants: 5,
      maxParticipants: 5,
      duration: '장기',
      category: '공모전',
      leftSubcategory: '개발',
      rightSubcategory: '앱개발'
    },
    // 자격증 모임
    {
      id: 7,
      title: '정보처리기사 필기 스터디',
      description: '10월 정보처리기사 필기 시험 준비하실 분들 모집합니다....',
      startDate: new Date(2025, 8, 15),
      endDate: new Date(2025, 8, 15),
      startTime: '18:00',
      endTime: '20:00',
      location: '중앙도서관',
      locationType: '교내',
      currentParticipants: 4,
      maxParticipants: 6,
      duration: '장기',
      category: '자격증',
      leftSubcategory: 'IT',
      rightSubcategory: '정보처리기사'
    },
    {
      id: 8,
      title: '토익 900점 목표 스터디',
      description: '토익 900점 이상을 목표로 하는 스터디입니다. 현재 점수 무관....',
      startDate: new Date(2025, 8, 22),
      endDate: new Date(2025, 8, 22),
      startTime: '09:00',
      endTime: '12:00',
      location: '토즈 스터디센터',
      locationType: '교외',
      currentParticipants: 6,
      maxParticipants: 6,
      duration: '장기',
      category: '자격증',
      leftSubcategory: '어학',
      rightSubcategory: '토익'
    },
    // 동아리 모임
    {
      id: 9,
      title: 'Blackcat 정보보안 스터디',
      description: '정보보안 동아리 Blackcat에서 신입 회원을 모집합니다....',
      startDate: new Date(2025, 8, 23),
      endDate: new Date(2025, 8, 23),
      startTime: '18:00',
      endTime: '20:00',
      location: '비마관 509호',
      locationType: '교내',
      currentParticipants: 5,
      maxParticipants: 10,
      duration: '장기',
      category: '동아리',
      leftSubcategory: '학술분과',
      rightSubcategory: 'Blackcat'
    },
    {
      id: 10,
      title: 'K-ME 댄스 동아리 회원 모집',
      description: 'K-pop 댄스 커버 동아리에서 새 멤버를 찾습니다. 경험 무관....',
      startDate: new Date(2025, 8, 26),
      endDate: new Date(2025, 8, 26),
      startTime: '19:00',
      endTime: '21:00',
      location: '대운동장',
      locationType: '교내',
      currentParticipants: 8,
      maxParticipants: 8,
      duration: '장기',
      category: '동아리',
      leftSubcategory: '공연예술분과',
      rightSubcategory: 'K-ME'
    },
    // 기타 모임
    {
      id: 11,
      title: '주말 농구 같이 하실 분',
      description: '매주 토요일 아침 농구 하실 분 모집합니다. 초보도 환영....',
      startDate: new Date(2025, 8, 21),
      endDate: new Date(2025, 8, 21),
      startTime: '10:00',
      endTime: '12:00',
      location: '체육관',
      locationType: '교내',
      currentParticipants: 3,
      maxParticipants: 8,
      duration: '장기',
      category: '기타',
      leftSubcategory: '취미',
      rightSubcategory: '운동'
    },
    {
      id: 12,
      title: '취업 준비 스터디',
      description: '함께 취업 준비 공부하실 분 모집합니다. 자소서 첨삭, 면접 스터디....',
      startDate: new Date(2025, 8, 24),
      endDate: new Date(2025, 8, 24),
      startTime: '14:00',
      endTime: '17:00',
      location: '중앙도서관 스터디룸',
      locationType: '교내',
      currentParticipants: 4,
      maxParticipants: 6,
      duration: '장기',
      category: '기타',
      leftSubcategory: '기타',
      rightSubcategory: '취업스터디'
    }
  ]

  // 필터링된 모임 목록
  const filteredMeetings = allMeetings.filter(meeting => {
    // 카테고리 필터
    if (meeting.category !== selectedCategory) return false
    if (meeting.leftSubcategory !== selectedLeftSubcategory) return false
    if (meeting.rightSubcategory !== selectedRightSubcategory) return false

    // 날짜 필터
    if (selectedDate && meeting.startDate.toDateString() !== selectedDate.toDateString()) {
      return false
    }

    // 장소 필터
    if (selectedLocation && meeting.locationType !== selectedLocation) {
      return false
    }

    // 장기 필터
    if (selectedDuration && meeting.duration !== selectedDuration) {
      return false
    }

    return true
  })

  // 모임 상태 계산
  const getMeetingStatus = (meeting: typeof allMeetings[0]) => {
    return meeting.currentParticipants >= meeting.maxParticipants ? '마감' : '모집중'
  }

  // 날짜 포맷
  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}월 ${day}일`
  }

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
            <button
              onClick={() => {
                setSelectedCategory('전공')
                const firstLeft = Object.keys(categoryData['전공'])[0]
                setSelectedLeftSubcategory(firstLeft)
                setSelectedRightSubcategory(categoryData['전공'][firstLeft][0])
              }}
              className="hover:opacity-80 relative"
            >
              전공
              {selectedCategory === '전공' && (
                <div className="absolute -bottom-[16px] left-0 right-0 h-[3px] bg-white"></div>
              )}
            </button>
            <button
              onClick={() => {
                setSelectedCategory('공모전')
                const firstLeft = Object.keys(categoryData['공모전'])[0]
                setSelectedLeftSubcategory(firstLeft)
                setSelectedRightSubcategory(categoryData['공모전'][firstLeft][0])
              }}
              className="hover:opacity-80 relative"
            >
              공모전
              {selectedCategory === '공모전' && (
                <div className="absolute -bottom-[16px] left-0 right-0 h-[3px] bg-white"></div>
              )}
            </button>
            <button
              onClick={() => {
                setSelectedCategory('자격증')
                const firstLeft = Object.keys(categoryData['자격증'])[0]
                setSelectedLeftSubcategory(firstLeft)
                setSelectedRightSubcategory(categoryData['자격증'][firstLeft][0])
              }}
              className="hover:opacity-80 relative"
            >
              자격증
              {selectedCategory === '자격증' && (
                <div className="absolute -bottom-[16px] left-0 right-0 h-[3px] bg-white"></div>
              )}
            </button>
            <button
              onClick={() => {
                setSelectedCategory('동아리')
                const firstLeft = Object.keys(categoryData['동아리'])[0]
                setSelectedLeftSubcategory(firstLeft)
                setSelectedRightSubcategory(categoryData['동아리'][firstLeft][0])
              }}
              className="hover:opacity-80 relative"
            >
              동아리
              {selectedCategory === '동아리' && (
                <div className="absolute -bottom-[16px] left-0 right-0 h-[3px] bg-white"></div>
              )}
            </button>
            <button
              onClick={() => {
                setSelectedCategory('기타')
                const firstLeft = Object.keys(categoryData['기타'])[0]
                setSelectedLeftSubcategory(firstLeft)
                setSelectedRightSubcategory(categoryData['기타'][firstLeft][0])
              }}
              className="hover:opacity-80 relative"
            >
              기타
              {selectedCategory === '기타' && (
                <div className="absolute -bottom-[16px] left-0 right-0 h-[3px] bg-white"></div>
              )}
            </button>
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
          <Image
            src="/icons/Chevron right.svg"
            alt="chevron"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          <span className="font-semibold">{selectedCategory}</span>
          <Image
            src="/icons/Chevron right.svg"
            alt="chevron"
            width={20}
            height={20}
            className="w-5 h-5"
          />

          {/* Left Subcategory Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLeftDropdownOpen(!isLeftDropdownOpen)
                setIsRightDropdownOpen(false)
              }}
              className="font-semibold flex items-center gap-1"
            >
              {selectedLeftSubcategory}
              <Image
                src="/icons/arrow_drop_down.svg"
                alt="dropdown"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>
            {isLeftDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[200px]">
                {Object.keys(categoryData[selectedCategory] || {}).map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSelectedLeftSubcategory(item)
                      setSelectedRightSubcategory(categoryData[selectedCategory][item][0])
                      setIsLeftDropdownOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Image
            src="/icons/Chevron right.svg"
            alt="chevron"
            width={20}
            height={20}
            className="w-5 h-5"
          />

          {/* Right Subcategory Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsRightDropdownOpen(!isRightDropdownOpen)
                setIsLeftDropdownOpen(false)
              }}
              className="font-semibold flex items-center gap-1"
            >
              {selectedRightSubcategory}
              <Image
                src="/icons/arrow_drop_down.svg"
                alt="dropdown"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>
            {isRightDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[200px]">
                {(categoryData[selectedCategory]?.[selectedLeftSubcategory] || []).map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSelectedRightSubcategory(item)
                      setIsRightDropdownOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-12 pb-12">
        {/* Filter Buttons */}
        <div className="flex items-center gap-4 mb-8">
          {/* 날짜 필터 */}
          <div className="relative">
            <button
              onClick={() => {
                setShowDatePicker(!showDatePicker)
                setShowLocationDropdown(false)
                setShowDurationDropdown(false)
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-colors flex items-center gap-1 ${
                selectedDate
                  ? 'bg-[#595959] text-white'
                  : 'bg-[#D9D9D9] text-black'
              }`}
            >
              날짜
              <Image
                src="/icons/arrow_drop_down.svg"
                alt="dropdown"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>
            {showDatePicker && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4">
                <input
                  type="date"
                  onChange={(e) => {
                    setSelectedDate(e.target.value ? new Date(e.target.value) : null)
                    setShowDatePicker(false)
                  }}
                  className="border border-gray-300 rounded px-3 py-2 text-black"
                />
                <button
                  onClick={() => {
                    setSelectedDate(null)
                    setShowDatePicker(false)
                  }}
                  className="mt-2 w-full text-sm text-red-600 hover:text-red-800"
                >
                  필터 해제
                </button>
              </div>
            )}
          </div>

          {/* 장소 필터 */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLocationDropdown(!showLocationDropdown)
                setShowDatePicker(false)
                setShowDurationDropdown(false)
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-colors flex items-center gap-1 ${
                selectedLocation
                  ? 'bg-[#595959] text-white'
                  : 'bg-[#D9D9D9] text-black'
              }`}
            >
              장소
              <Image
                src="/icons/arrow_drop_down.svg"
                alt="dropdown"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>
            {showLocationDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[120px]">
                <button
                  onClick={() => {
                    setSelectedLocation('교내')
                    setShowLocationDropdown(false)
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                >
                  교내
                </button>
                <button
                  onClick={() => {
                    setSelectedLocation('교외')
                    setShowLocationDropdown(false)
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                >
                  교외
                </button>
                <button
                  onClick={() => {
                    setSelectedLocation(null)
                    setShowLocationDropdown(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  필터 해제
                </button>
              </div>
            )}
          </div>

          {/* 장기 필터 */}
          <div className="relative">
            <button
              onClick={() => {
                setShowDurationDropdown(!showDurationDropdown)
                setShowDatePicker(false)
                setShowLocationDropdown(false)
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-colors flex items-center gap-1 ${
                selectedDuration
                  ? 'bg-[#595959] text-white'
                  : 'bg-[#D9D9D9] text-black'
              }`}
            >
              장기
              <Image
                src="/icons/arrow_drop_down.svg"
                alt="dropdown"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>
            {showDurationDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[120px]">
                <button
                  onClick={() => {
                    setSelectedDuration('장기')
                    setShowDurationDropdown(false)
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                >
                  장기
                </button>
                <button
                  onClick={() => {
                    setSelectedDuration('단기')
                    setShowDurationDropdown(false)
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                >
                  단기
                </button>
                <button
                  onClick={() => {
                    setSelectedDuration(null)
                    setShowDurationDropdown(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  필터 해제
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Meetings List */}
        <div className="space-y-6">
          {filteredMeetings.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              조건에 맞는 모임이 없습니다.
            </div>
          ) : (
            filteredMeetings.map((meeting) => {
              const status = getMeetingStatus(meeting)
              return (
                <div
                  key={meeting.id}
                  className={`rounded-3xl p-8 ${
                    status === '모집중' ? 'bg-[#E9D3D3]' : 'bg-[#E0E0E0]'
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
                          className={`px-6 py-2 rounded-full font-semibold text-black ${
                            status === '모집중'
                              ? 'bg-[#AD7070]'
                              : 'bg-[#A4A4A4]'
                          }`}
                        >
                          {status}
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
                          <span className="font-semibold">
                            {formatDate(meeting.startDate)} {meeting.startTime} - {meeting.endTime}
                          </span>
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
                          <span className="font-semibold">
                            {meeting.currentParticipants}/{meeting.maxParticipants}명
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      className={`px-8 py-3 rounded-lg font-semibold text-white border transition-colors ${
                        status === '모집중'
                          ? 'bg-[#AD7070] border-[#7F2323] hover:bg-[#7F2323]'
                          : 'bg-[#B7B7B7] border-[#A4A4A4] hover:bg-[#A4A4A4]'
                      }`}
                    >
                      신청하기
                    </button>
                  </div>
                </div>
              )
            })
          )}
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
