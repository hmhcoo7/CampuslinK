'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import NotificationBell from '@/components/NotificationBell'
import EditProfileModal from '@/components/EditProfileModal'
import DeleteAccountModal from '@/components/DeleteAccountModal'
import { createClient } from '@/lib/supabase/client'

const INTERESTS_OPTIONS = [
  '학습',
  '운동',
  '음악',
  '미술',
  '프로그래밍',
  '외국어',
  '독서',
  '영화',
  '게임',
  '요리',
  '여행',
  '사진',
  '봉사',
  '기타'
]

interface Meeting {
  모임_id: string
  name: string
  meeting_date: string
  start_time: string
  end_time: string
  context: string
  email: string
}

interface MeetingApplication {
  id: string
  모임_id: string
  meeting: Meeting
}

export default function MyPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // 모임 데이터
  const [upcomingApplications, setUpcomingApplications] = useState<any[]>([])
  const [pastApplications, setPastApplications] = useState<any[]>([])
  const [myUpcomingMeetings, setMyUpcomingMeetings] = useState<any[]>([])
  const [myPastMeetings, setMyPastMeetings] = useState<any[]>([])
  const [likedMeetings, setLikedMeetings] = useState<Set<string>>(new Set())

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user || !user.email) {
        router.push('/login')
        return
      }

      setUser(user)

      // 회원 정보 가져오기
      const { data: profile, error } = await (supabase as any)
        .from('회원')
        .select('*')
        .eq('email', user.email)
        .single()

      if (error) throw error

      setUserProfile(profile)
      fetchMeetings(user.email)
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMeetings = async (email: string) => {
    try {
      const now = new Date()

      // 1. 신청한 모임 (미래)
      const { data: upcomingApps, error: upcomingAppsError } = await supabase
        .from('모임_신청자')
        .select(`
          id,
          모임_id,
          모임 (
            모임_id,
            name,
            meeting_date,
            start_time,
            end_time,
            context,
            email
          )
        `)
        .eq('신청자_email', email)

      if (upcomingAppsError) throw upcomingAppsError

      // 미래/과거 분리
      const upcoming = upcomingApps?.filter((app: any) => {
        const meetingDateTime = new Date(`${app.모임.meeting_date}T${app.모임.start_time}`)
        return meetingDateTime > now
      }).sort((a: any, b: any) => {
        const dateA = new Date(`${a.모임.meeting_date}T${a.모임.start_time}`)
        const dateB = new Date(`${b.모임.meeting_date}T${b.모임.start_time}`)
        return dateA.getTime() - dateB.getTime()
      }) || []

      const past = upcomingApps?.filter((app: any) => {
        const meetingDateTime = new Date(`${app.모임.meeting_date}T${app.모임.start_time}`)
        return meetingDateTime <= now
      }).sort((a: any, b: any) => {
        const dateA = new Date(`${a.모임.meeting_date}T${a.모임.start_time}`)
        const dateB = new Date(`${b.모임.meeting_date}T${b.모임.start_time}`)
        return dateB.getTime() - dateA.getTime()
      }) || []

      setUpcomingApplications(upcoming)
      setPastApplications(past)

      // 2. 내가 생성한 모임
      const { data: myMeetings, error: myMeetingsError } = await supabase
        .from('모임')
        .select('*')
        .eq('email', email)

      if (myMeetingsError) throw myMeetingsError

      const myUpcoming = myMeetings?.filter((meeting: any) => {
        const meetingDateTime = new Date(`${meeting.meeting_date}T${meeting.start_time}`)
        return meetingDateTime > now
      }).sort((a: any, b: any) => {
        const dateA = new Date(`${a.meeting_date}T${a.start_time}`)
        const dateB = new Date(`${b.meeting_date}T${b.start_time}`)
        return dateA.getTime() - dateB.getTime()
      }) || []

      const myPast = myMeetings?.filter((meeting: any) => {
        const meetingDateTime = new Date(`${meeting.meeting_date}T${meeting.start_time}`)
        return meetingDateTime <= now
      }).sort((a: any, b: any) => {
        const dateA = new Date(`${a.meeting_date}T${a.start_time}`)
        const dateB = new Date(`${b.meeting_date}T${b.start_time}`)
        return dateB.getTime() - dateA.getTime()
      }) || []

      setMyUpcomingMeetings(myUpcoming)
      setMyPastMeetings(myPast)
    } catch (error) {
      console.error('Error fetching meetings:', error)
    }
  }

  const handleCancelMeeting = async (applicationId: string, meeting: any) => {
    try {
      const meetingDateTime = new Date(`${meeting.meeting_date}T${meeting.start_time}`)
      const now = new Date()
      const threeHoursBeforeMeeting = new Date(meetingDateTime.getTime() - 3 * 60 * 60 * 1000)

      if (now > threeHoursBeforeMeeting) {
        alert('모임 시작 3시간 전까지만 취소할 수 있습니다.')
        return
      }

      if (!confirm('정말 이 모임을 취소하시겠습니까?')) {
        return
      }

      const { error } = await supabase
        .from('모임_신청자')
        .delete()
        .eq('id', applicationId)

      if (error) throw error

      alert('모임 신청이 취소되었습니다.')
      if (user?.email) {
        fetchMeetings(user.email)
      }
    } catch (error) {
      console.error('Error cancelling meeting:', error)
      alert('모임 취소 중 오류가 발생했습니다.')
    }
  }

  const handleLikeMeeting = async (meetingId: string) => {
    try {
      // 이미 좋아요를 눌렀는지 확인
      if (likedMeetings.has(meetingId)) {
        alert('이미 이 모임에 좋아요를 눌렀습니다.')
        return
      }

      // 모임의 모든 참여자 가져오기
      const { data: participants, error: participantsError } = await supabase
        .from('모임_신청자')
        .select('신청자_email')
        .eq('모임_id', meetingId)

      if (participantsError) throw participantsError

      // 모임 생성자 이메일 가져오기
      const { data: meetingData, error: meetingError } = await supabase
        .from('모임')
        .select('email')
        .eq('모임_id', meetingId)
        .single()

      if (meetingError || !meetingData) {
        alert('모임 정보를 찾을 수 없습니다.')
        return
      }

      const creatorEmail = (meetingData as any).email

      // 모든 참여자 + 생성자의 이메일 목록
      const allEmails = [...(participants || []).map((p: any) => p.신청자_email), creatorEmail]
      const uniqueEmails = Array.from(new Set(allEmails))

      // 각 사용자의 좋아요 증가
      for (const email of uniqueEmails) {
        const { data: currentUser, error: getUserError } = await supabase
          .from('회원')
          .select('좋아요')
          .eq('email', email)
          .single()

        if (getUserError) continue

        const currentHearts = (currentUser as any)?.좋아요 || 0
        const { error: updateError } = await (supabase as any)
          .from('회원')
          .update({ 좋아요: currentHearts + 1 })
          .eq('email', email)

        if (updateError) console.error('Error updating hearts:', updateError)
      }

      // 좋아요 누른 모임 기록
      setLikedMeetings(prev => new Set(Array.from(prev).concat([meetingId])))

      alert('모임 구성원 모두에게 하트를 전달했습니다!')

      // 프로필 새로고침
      checkUser()
    } catch (error) {
      console.error('Error liking meeting:', error)
      alert('하트 전달 중 오류가 발생했습니다.')
    }
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    return `${d.getMonth() + 1}월 ${d.getDate()}일`
  }

  const formatTime = (time: string) => {
    return time.substring(0, 5)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-lg text-gray-600">로딩 중...</p>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-lg text-gray-600">사용자 정보를 불러올 수 없습니다.</p>
      </div>
    )
  }

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
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute bottom-0 right-0 left-0 mx-auto w-8 h-8 md:w-12 md:h-12"
              style={{ bottom: '-16px' }}
            >
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
            {userProfile.nick_name || '사용자'} 학우님, 반갑습니다.
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
                {userProfile.nick_name || '-'}
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <span className="text-lg md:text-[24px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] md:w-[140px]">
                이메일
              </span>
              <span className="text-base md:text-[20px] font-medium text-black font-['Inter']">
                {userProfile.email}
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <span className="text-lg md:text-[24px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] md:w-[140px]">
                관심분야
              </span>
              <span className="text-base md:text-[20px] font-medium text-black font-['Inter']">
                {userProfile.관심분야 !== null ? INTERESTS_OPTIONS[userProfile.관심분야] : '-'}
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <span className="text-lg md:text-[24px] font-semibold text-black text-right font-[family-name:var(--font-crimson)] md:w-[140px]">
                내 ❤️
              </span>
              <span className="text-base md:text-[20px] font-medium text-black font-['Inter']">
                {userProfile.좋아요 || 0}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-6 text-right">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-base md:text-[20px] font-medium text-[#595959] font-['Inter'] hover:underline"
            >
              개인정보 수정
            </button>
          </div>
        </div>

        {/* 모임 신청 내역 */}
        <div className="w-full max-w-[1037px] mx-auto mb-6 md:mb-8 p-4 md:p-8 border border-black rounded-[10px]">
          <h2 className="text-2xl md:text-[32px] font-semibold text-black font-[family-name:var(--font-crimson)] md:leading-5 mb-4 md:mb-6">
            모임 신청 내역
          </h2>
          {upcomingApplications.length === 0 ? (
            <p className="text-gray-500 text-center py-8">신청한 모임이 없습니다.</p>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {upcomingApplications.map((app: any) => (
                <div key={app.id} className="bg-[#E1E1E1] rounded-[20px] md:rounded-[30px] p-4 md:p-6 relative">
                  <h3 className="text-lg md:text-[20px] font-bold text-black mb-2 md:mb-3 pr-20 md:pr-0">
                    {app.모임.name}
                  </h3>
                  <div className="space-y-1 text-black font-['Inter']">
                    <div className="flex items-center gap-2">
                      <img src="/icons/clock.png" alt="날짜" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                        날짜: {formatDate(app.모임.meeting_date)} {formatTime(app.모임.start_time)} - {formatTime(app.모임.end_time)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="/icons/flag.png" alt="장소" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                        장소: {app.모임.context || '-'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCancelMeeting(app.id, app.모임)}
                    className="absolute top-1/2 -translate-y-1/2 right-3 md:right-6 flex justify-center items-center w-[80px] md:w-[105px] h-[40px] md:h-[51px] bg-[#7F2323] text-white text-sm md:text-base rounded-lg border border-[#7F2323] hover:bg-[#6B1E1E] transition-colors"
                    style={{ aspectRatio: '35/17' }}
                  >
                    취소하기
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 지난 신청 내역 */}
        <div className="w-full max-w-[1037px] mx-auto mb-6 md:mb-8 p-4 md:p-8 border border-black rounded-[10px]">
          <h2 className="text-2xl md:text-[32px] font-semibold text-black font-[family-name:var(--font-crimson)] md:leading-5 mb-4 md:mb-6">
            지난 신청 내역
          </h2>
          {pastApplications.length === 0 ? (
            <p className="text-gray-500 text-center py-8">지난 신청 내역이 없습니다.</p>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {pastApplications.map((app: any) => (
                <div key={app.id} className="bg-[#E1E1E1] rounded-[20px] md:rounded-[30px] p-4 md:p-6 relative">
                  <h3 className="text-lg md:text-[20px] font-bold text-black mb-2 md:mb-3 pr-20 md:pr-0">
                    {app.모임.name}
                  </h3>
                  <div className="space-y-1 text-black font-['Inter']">
                    <div className="flex items-center gap-2">
                      <img src="/icons/clock.png" alt="날짜" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                        날짜: {formatDate(app.모임.meeting_date)} {formatTime(app.모임.start_time)} - {formatTime(app.모임.end_time)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="/icons/flag.png" alt="장소" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                        장소: {app.모임.context || '-'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleLikeMeeting(app.모임.모임_id)}
                    disabled={likedMeetings.has(app.모임.모임_id)}
                    className={`absolute top-1/2 -translate-y-1/2 right-3 md:right-6 flex justify-center items-center w-[80px] md:w-[105px] h-[40px] md:h-[51px] rounded-lg border border-[#7F2323] transition-all ${
                      likedMeetings.has(app.모임.모임_id) ? 'bg-[#2C2C2C]' : 'bg-white'
                    }`}
                    style={{ aspectRatio: '35/17' }}
                  >
                    <span className={`text-lg md:text-xl ${likedMeetings.has(app.모임.모임_id) ? 'text-white' : 'text-black'}`}>
                      ♥
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 내 모임 생성 내역 */}
        <div className="w-full max-w-[1037px] mx-auto mb-6 md:mb-8 p-4 md:p-8 border border-black rounded-[10px]">
          <h2 className="text-2xl md:text-[32px] font-semibold text-black font-[family-name:var(--font-crimson)] md:leading-5 mb-4 md:mb-6">
            내 모임 생성 내역
          </h2>
          {myUpcomingMeetings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">생성한 모임이 없습니다.</p>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {myUpcomingMeetings.map((meeting: any) => (
                <div key={meeting.모임_id} className="bg-[#E1E1E1] rounded-[20px] md:rounded-[30px] p-4 md:p-6 relative">
                  <h3 className="text-lg md:text-[20px] font-bold text-black mb-2 md:mb-3 pr-20 md:pr-0">
                    {meeting.name}
                  </h3>
                  <div className="space-y-1 text-black font-['Inter']">
                    <div className="flex items-center gap-2">
                      <img src="/icons/clock.png" alt="날짜" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                        날짜: {formatDate(meeting.meeting_date)} {formatTime(meeting.start_time)} - {formatTime(meeting.end_time)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="/icons/flag.png" alt="장소" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                        장소: {meeting.context || '-'}
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
              ))}
            </div>
          )}
        </div>

        {/* 지난 내 모임 */}
        <div className="w-full max-w-[1037px] mx-auto mb-6 md:mb-8 p-4 md:p-8 border border-[#070707] rounded-[10px]">
          <h2 className="text-2xl md:text-[32px] font-semibold text-black font-[family-name:var(--font-crimson)] md:leading-5 mb-4 md:mb-6">
            지난 내 모임
          </h2>
          {myPastMeetings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">지난 모임이 없습니다.</p>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {myPastMeetings.map((meeting: any) => (
                <div key={meeting.모임_id} className="bg-[#E1E1E1] rounded-[20px] md:rounded-[30px] p-4 md:p-6 relative">
                  <h3 className="text-lg md:text-[20px] font-bold text-black mb-2 md:mb-3 pr-24 md:pr-32">
                    {meeting.name}
                  </h3>
                  <div className="space-y-1 text-black font-['Inter']">
                    <div className="flex items-center gap-2">
                      <img src="/icons/clock.png" alt="날짜" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                        날짜: {formatDate(meeting.meeting_date)} {formatTime(meeting.start_time)} - {formatTime(meeting.end_time)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="/icons/flag.png" alt="장소" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-sm md:text-[16px] font-medium leading-[30px]">
                        장소: {meeting.context || '-'}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-3 md:right-6 text-black font-['Inter'] text-xs md:text-[16px] font-medium leading-[30px] text-right max-w-[100px] md:max-w-[268px]">
                    인증 미완료
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 회원 탈퇴 */}
        <div className="w-full max-w-[1037px] mx-auto mb-3 md:mb-4">
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="text-lg md:text-[24px] font-semibold text-black font-['Inter'] leading-[30px] hover:underline"
          >
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

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentNickname={userProfile.nick_name || ''}
        currentEmail={userProfile.email}
        currentInterests={userProfile.관심분야 !== null ? INTERESTS_OPTIONS[userProfile.관심분야] : '학습'}
        onUpdate={() => checkUser()}
      />

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        userEmail={userProfile.email}
      />
    </div>
  )
}
