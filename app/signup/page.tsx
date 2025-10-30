'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [agreeService, setAgreeService] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({ ...formData, password: value })

    if (formData.passwordConfirm && value !== formData.passwordConfirm) {
      setPasswordError('비밀번호를 다시 확인해주세요')
    } else {
      setPasswordError('')
    }
  }

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({ ...formData, passwordConfirm: value })

    if (formData.password && value !== formData.password) {
      setPasswordError('비밀번호를 다시 확인해주세요')
    } else {
      setPasswordError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 필수 입력 항목 검사
    if (!formData.nickname) {
      alert('닉네임을 입력해주세요')
      return
    }
    if (!formData.email) {
      alert('이메일을 입력해주세요')
      return
    }

    // 광운대 이메일 도메인 확인
    if (!formData.email.endsWith('@kw.ac.kr')) {
      alert('광운대학교 이메일(@kw.ac.kr)만 가입 가능합니다')
      return
    }

    if (!formData.password) {
      alert('비밀번호를 입력해주세요')
      return
    }
    if (!formData.passwordConfirm) {
      alert('비밀번호 확인을 입력해주세요')
      return
    }

    // 비밀번호 일치 검사
    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호를 다시 확인해주세요')
      return
    }

    // 비밀번호 길이 검사
    if (formData.password.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다')
      return
    }

    // 약관 동의 검사
    if (!agreePrivacy) {
      alert('개인정보 약관에 동의해주세요')
      return
    }
    if (!agreeService) {
      alert('서비스 약관에 동의해주세요')
      return
    }

    // 회원가입 처리
    setIsLoading(true)
    try {
      // Supabase Auth를 사용한 회원가입
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            nickname: formData.nickname,
          },
        },
      })

      if (error) {
        console.error('회원가입 오류:', error)
        if (error.message.includes('already registered')) {
          alert('이미 가입된 이메일입니다')
        } else {
          alert('회원가입 중 오류가 발생했습니다: ' + error.message)
        }
        setIsLoading(false)
        return
      }

      // Auth 회원가입 성공 후 '회원' 테이블에도 저장
      if (data.user) {
        const { error: dbError } = await supabase
          .from('회원')
          .insert({
            id: data.user.id, // Auth user ID 저장
            email: formData.email,
            nick_name: formData.nickname,
          })

        if (dbError) {
          console.error('회원 테이블 저장 오류:', dbError)
          // Auth에는 생성되었지만 회원 테이블 저장 실패
          // 계속 진행 (이메일 인증 후 재시도 가능)
        }
      }

      // 회원가입 성공 - 이메일 인증 안내
      alert('회원가입 요청이 완료되었습니다!\n입력하신 광운대 이메일로 인증 링크가 발송되었습니다.\n이메일을 확인하여 인증을 완료해주세요.')
      router.push('/login')
    } catch (error) {
      console.error('회원가입 오류:', error)
      alert('회원가입 중 오류가 발생했습니다')
      setIsLoading(false)
    }
  }

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
            <span className="font-bold text-lg font-[family-name:var(--font-crimson)]">Campus<br/>LinK</span>
          </div>

          <nav className="flex items-center gap-8">
            <Link href="/" className="hover:opacity-80">전공</Link>
            <Link href="/" className="hover:opacity-80">공모전</Link>
            <Link href="/" className="hover:opacity-80">자격증</Link>
            <Link href="/" className="hover:opacity-80">기타</Link>
            <Link href="/" className="hover:opacity-80">공지사항</Link>
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
      <main className="max-w-[800px] mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-black">회원가입</h1>

        {/* Form Container */}
        <div className="border border-[#D9D9D9] rounded-lg p-12">
          <h2 className="text-xl font-bold mb-8 text-black">회원 정보 입력</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 닉네임 */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-black">
                <span className="text-[#7F2323]">*</span> 닉네임
              </label>
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                className="flex-1 border border-[#595959] rounded-lg px-4 py-3 text-black focus:outline-none focus:border-[#7F2323]"
              />
            </div>

            {/* 이메일 */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-black">
                <span className="text-[#7F2323]">*</span> 이메일
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@kw.ac.kr"
                className="flex-1 border border-[#595959] rounded-lg px-4 py-3 text-black focus:outline-none focus:border-[#7F2323] placeholder:text-[#D9D9D9]"
              />
            </div>

            {/* 비밀번호 */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-black">
                <span className="text-[#7F2323]">*</span> 비밀번호
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={handlePasswordChange}
                className="flex-1 border border-[#595959] rounded-lg px-4 py-3 text-black focus:outline-none focus:border-[#7F2323]"
              />
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <div className="flex items-center gap-4">
                <label className="w-32 text-black">
                  <span className="text-[#7F2323]">*</span> 비밀번호 확인
                </label>
                <input
                  type="password"
                  value={formData.passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  className="flex-1 border border-[#595959] rounded-lg px-4 py-3 text-black focus:outline-none focus:border-[#7F2323]"
                />
              </div>
              {passwordError && (
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-32"></div>
                  <p className="text-[#FF0000] text-sm">{passwordError}</p>
                </div>
              )}
            </div>

            {/* 방문경로 */}
            <div className="flex items-start gap-4">
              <label className="w-32 text-black pt-2">방문경로</label>
              <div className="flex-1 flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-black">SNS</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-black">지인추천</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-black">에브리타임</span>
                </label>
              </div>
            </div>

            {/* 개인정보 약관 */}
            <div className="mt-8">
              <h3 className="text-black font-bold mb-4">
                <span className="text-[#7F2323]">*</span> 개인정보 약관
              </h3>
              <div className="border border-[#595959] rounded-lg p-6 h-64 overflow-y-auto bg-white text-sm text-black leading-relaxed">
                <p className="font-bold mb-3">CampusLinK는 「개인정보 보호법」 등 관련 법령을 준수하며, 개인정보를 안전하게 보호하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.</p>

                <p className="font-bold mb-2">제1조 (수집하는 개인정보 항목)</p>
                <p className="mb-3">플랫폼은 회원가입, 모임 운영, 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>

                <p className="mb-2">1. 회원가입 시</p>
                <ul className="list-disc ml-6 mb-3 space-y-1">
                  <li>필수항목: 이름, 학번, 학과/학부, 이메일, 휴대전화번호, 비밀번호</li>
                  <li>선택항목: 관심 분야, 프로필 사진</li>
                </ul>

                <p className="mb-2">2. 모임 활동 시</p>
                <ul className="list-disc ml-6 mb-3 space-y-1">
                  <li>모임 신청/생성 기록, 출석 정보, 피드백, 게시글 및 댓글 등 이용자가 작성·입력한 정보</li>
                </ul>

                <p className="mb-2">3. 자동으로 수집되는 정보</p>
                <ul className="list-disc ml-6 mb-3 space-y-1">
                  <li>접속 IP 주소, 쿠키, 서비스 이용 로그(접속 시간, 이용 기록 등), 기기 정보</li>
                </ul>

                <p className="mb-2">4. 결제 시 (유료 모임의 경우)</p>
                <ul className="list-disc ml-6 mb-3 space-y-1">
                  <li>결제 기록, 카드사·PG사에서 발급한 최소한의 결제 정보</li>
                </ul>

                <p className="font-bold mb-2">제2조 (개인정보의 수집 및 이용 목적)</p>
                <p className="mb-3">플랫폼은 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>

                <ul className="list-decimal ml-6 mb-3 space-y-1">
                  <li>회원 관리: 본인 확인, 회원 식별, 불량 회원 이용 제한, 문의 응대</li>
                  <li>모임 운영: 모임 개설·관리, 공지 전달, 출석 확인</li>
                </ul>

                <p className="font-bold mb-2 mt-4">제1조 (목적)</p>
                <p className="mb-3">본 약관은 CampusLinK가 제공하는 서비스 이용과 관련하여, 플랫폼과 회원 간의 권리·의무 및 책임사항을 규정함으로 합니다.</p>

                <p className="font-bold mb-2">제1조 (목적)</p>
                <p className="mb-3">이 약관은 플랫폼이 제공하는 모든 매칭 및 관련 서비스의 이용 조건과 절차, 회원과 플랫폼의 권리·의무 및 책임 사항 등을 규정합니다.</p>

                <p className="font-bold mb-2">제2조 (용어의 정의)</p>
                <ul className="list-decimal ml-6 space-y-1">
                  <li>"회원"이란 합의 본 약관에 따라 플랫폼에 가입하여 서비스를 이용하는 자를 말합니다.</li>
                  <li>"모임장"은 플랫폼을 통해 모임을 개설하고 운영하는 회원을 말합니다.</li>
                  <li>"참여자"는 모임에 신청하여 참여하는 회원을 말합니다.</li>
                  <li>"서비스"란 합의 플랫폼이 제공하는 모임 매칭, 신청, 예약, 사용 관련 등 모든 기능을 의미합니다.</li>
                </ul>

                <p className="font-bold mb-2 mt-4">제3조 (약관의 효력 및 변경)</p>
                <ul className="list-decimal ml-6 space-y-1">
                  <li>본 약관은 회원의 기입 시 동의 후에 효력이 발생합니다.</li>
                  <li>플랫폼은 관련 법령을 위반 없는 범위에서 본 약관을 개정할 수 있습니다.</li>
                  <li>약관이 변경되는 경우, 플랫폼은 개정 내용을 시행일 7일 전까지 회원이 확인할 수 있도록 공지합니다.</li>
                </ul>

                <p className="font-bold mb-2 mt-4">제4조 (회원 가입 및 관리)</p>
                <ul className="list-decimal ml-6 space-y-1">
                  <li>회원 가입은 실제 이름, 학번, 학과 등 정확한 정보를 기입해야 합니다.</li>
                  <li>타인의 명의나 허위 정보를 기재한 경우, 회원 자격이 박탈될 수 있습니다.</li>
                </ul>
              </div>
            </div>

            {/* 개인정보 약관 동의 체크박스 */}
            <div className="flex items-start gap-2 mt-4">
              <input
                type="checkbox"
                checked={agreePrivacy}
                onChange={(e) => setAgreePrivacy(e.target.checked)}
                className="w-4 h-4 mt-1"
              />
              <label className="text-black text-sm">
                위의 개인정보 수집·이용에 관한 안내를 충분히 읽고 이해하였으며, 이에 동의합니다.
              </label>
            </div>

            {/* 서비스 약관 */}
            <div className="mt-8">
              <h3 className="text-black font-bold mb-4">
                <span className="text-[#7F2323]">*</span> 서비스 약관
              </h3>
              <div className="border border-[#595959] rounded-lg p-6 h-64 overflow-y-auto bg-white text-sm text-black leading-relaxed">
                <p className="mb-3">본 약관은 CampusLinK가 제공하는 서비스 이용과 관련하여, 플랫폼과 회원 간의 권리·의무 및 책임사항을 규정함으로 합니다.</p>

                <p className="font-bold mb-2">제1조 (목적)</p>
                <p className="mb-3">이 약관은 플랫폼이 제공하는 모든 매칭 및 관련 서비스의 이용 조건과 절차, 회원과 플랫폼의 권리·의무 및 책임 사항 등을 규정합니다.</p>

                <p className="font-bold mb-2">제2조 (용어의 정의)</p>
                <ul className="list-decimal ml-6 mb-3 space-y-1">
                  <li>"회원"이란 합의 본 약관에 따라 플랫폼에 가입하여 서비스를 이용하는 자를 말합니다.</li>
                  <li>"모임장"은 플랫폼을 통해 모임을 개설하고 운영하는 회원을 말합니다.</li>
                  <li>"참여자"는 모임에 신청하여 참여하는 회원을 말합니다.</li>
                  <li>"서비스"란 합의 플랫폼이 제공하는 모임 매칭, 신청, 예약, 사용 관련 등 모든 기능을 의미합니다.</li>
                </ul>

                <p className="font-bold mb-2">제3조 (약관의 효력 및 변경)</p>
                <ul className="list-decimal ml-6 mb-3 space-y-1">
                  <li>본 약관은 회원의 기입 시 동의 후에 효력이 발생합니다.</li>
                  <li>플랫폼은 관련 법령을 위반 없는 범위에서 본 약관을 개정할 수 있습니다.</li>
                  <li>약관이 변경되는 경우, 플랫폼은 개정 내용을 시행일 7일 전까지 회원이 확인할 수 있도록 공지합니다.</li>
                </ul>

                <p className="font-bold mb-2">제4조 (회원 가입 및 관리)</p>
                <ul className="list-decimal ml-6 mb-3 space-y-1">
                  <li>본 약관은 회원의 기입 시 동의의 동의 후에 효력이 발생합니다.</li>
                  <li>플랫폼은 관련 법령 위반이 기입 정보를 없는 범위에서 본 약관을 개정할 수 있습니다.</li>
                </ul>
              </div>
            </div>

            {/* 서비스 약관 동의 체크박스 */}
            <div className="flex items-start gap-2 mt-4">
              <input
                type="checkbox"
                checked={agreeService}
                onChange={(e) => setAgreeService(e.target.checked)}
                className="w-4 h-4 mt-1"
              />
              <label className="text-black text-sm">
                「서비스 이용약관」 및 「개인정보 처리방침」을 확인하였으며, 모두 동의합니다.
              </label>
            </div>

            {/* 회원가입 버튼 */}
            <div className="flex justify-center mt-12">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#AD7070] hover:bg-[#7F2323] text-white font-bold py-4 px-24 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '처리 중...' : '회원가입'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
