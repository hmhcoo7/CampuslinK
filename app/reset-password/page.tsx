'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isValidToken, setIsValidToken] = useState(false)

  useEffect(() => {
    // URL에서 토큰 확인
    const checkToken = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setIsValidToken(true)
      } else {
        setError('유효하지 않은 링크입니다. 비밀번호 재설정을 다시 시도해주세요.')
      }
    }
    checkToken()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.')
      return
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) throw error

      alert('비밀번호가 성공적으로 변경되었습니다.')
      router.push('/login')
    } catch (err: any) {
      setError(err.message || '비밀번호 변경 중 오류가 발생했습니다.')
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
      <main className="max-w-[500px] mx-auto px-4 md:px-8 py-12 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-black font-[family-name:var(--font-crimson)]">
          비밀번호 재설정
        </h1>

        {/* Form Container */}
        <div className="border border-[#D9D9D9] rounded-lg p-6 md:p-12">
          {!isValidToken ? (
            <div className="text-center">
              <p className="text-red-600 mb-6">{error}</p>
              <Link
                href="/find-account"
                className="text-[#7F2323] font-semibold hover:underline"
              >
                비밀번호 찾기로 돌아가기
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-black mb-2 font-medium">
                  <span className="text-[#7F2323]">*</span> 새 비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6자 이상"
                  className="w-full border border-[#595959] rounded-lg px-4 py-3 text-black focus:outline-none focus:border-[#7F2323] placeholder:text-[#D9D9D9]"
                  required
                />
              </div>

              <div>
                <label className="block text-black mb-2 font-medium">
                  <span className="text-[#7F2323]">*</span> 비밀번호 확인
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="비밀번호를 다시 입력하세요"
                  className="w-full border border-[#595959] rounded-lg px-4 py-3 text-black focus:outline-none focus:border-[#7F2323] placeholder:text-[#D9D9D9]"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#7F2323] hover:bg-[#6a1d1d] text-white font-bold py-3 px-12 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '변경 중...' : '비밀번호 변경'}
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
