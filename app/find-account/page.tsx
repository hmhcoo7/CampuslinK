'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function FindAccountPage() {
  const [activeTab, setActiveTab] = useState<'email' | 'password'>('email')
  const [email, setEmail] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleFindEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setLoading(true)

    try {
      // 회원 테이블에서 이메일 조회 (여기서는 간단히 메시지만 표시)
      // 실제로는 다른 정보(이름, 학번 등)로 이메일을 찾아야 합니다
      setMessage('이메일 찾기 기능은 관리자에게 문의해주세요.')
    } catch (err: any) {
      setError('오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setLoading(true)

    try {
      // Supabase Auth를 사용한 비밀번호 재설정 이메일 발송
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      setMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다. 이메일을 확인해주세요.')
      setResetEmail('')
    } catch (err: any) {
      setError(err.message || '비밀번호 재설정 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
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
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[600px] mx-auto px-4 md:px-8 py-12 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-black font-[family-name:var(--font-crimson)]">
          계정 찾기
        </h1>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-300 mb-8">
          <button
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-3 text-center font-semibold transition-colors ${
              activeTab === 'email'
                ? 'text-[#7F2323] border-b-2 border-[#7F2323]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            아이디 찾기
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`flex-1 py-3 text-center font-semibold transition-colors ${
              activeTab === 'password'
                ? 'text-[#7F2323] border-b-2 border-[#7F2323]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            비밀번호 찾기
          </button>
        </div>

        {/* Form Container */}
        <div className="border border-[#D9D9D9] rounded-lg p-6 md:p-12">
          {activeTab === 'email' ? (
            <form onSubmit={handleFindEmail} className="space-y-6">
              <div className="text-gray-600 text-sm mb-6">
                <p>아이디(이메일) 찾기는 현재 지원하지 않습니다.</p>
                <p className="mt-2">계정을 찾으시려면 관리자에게 문의해주세요.</p>
              </div>

              <div className="text-center">
                <Link
                  href="mailto:support@campuslink.com"
                  className="text-[#7F2323] font-semibold hover:underline"
                >
                  관리자에게 문의하기
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label className="block text-black mb-2 font-medium">
                  이메일 주소
                </label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="example@kw.ac.kr"
                  className="w-full border border-[#595959] rounded-lg px-4 py-3 text-black focus:outline-none focus:border-[#7F2323] placeholder:text-[#D9D9D9]"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  가입하신 이메일 주소를 입력하면 비밀번호 재설정 링크를 보내드립니다.
                </p>
              </div>

              {message && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                  {message}
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#7F2323] hover:bg-[#6a1d1d] text-white font-bold py-3 px-12 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '전송 중...' : '재설정 링크 보내기'}
                </button>
              </div>
            </form>
          )}

          {/* 로그인으로 돌아가기 */}
          <div className="text-center mt-8">
            <Link href="/login" className="text-[#595959] text-sm hover:underline">
              로그인 페이지로 돌아가기
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 px-4 md:px-12 py-6 md:py-8">
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
