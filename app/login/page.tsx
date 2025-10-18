'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 필수 입력 항목 검사
    if (!formData.email) {
      alert('이메일을 입력해주세요')
      return
    }
    if (!formData.password) {
      alert('비밀번호를 입력해주세요')
      return
    }

    // 로그인 처리
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('회원')
        .select('*')
        .eq('email', formData.email)
        .eq('password', formData.password)
        .single()

      if (error || !data) {
        alert('이메일 또는 비밀번호가 일치하지 않습니다')
        setIsLoading(false)
        return
      }

      // 로그인 성공
      alert(`환영합니다, ${data.nick_name}님!`)
      // 세션 정보 저장 (localStorage 사용)
      localStorage.setItem('user', JSON.stringify({
        email: data.email,
        nick_name: data.nick_name,
      }))
      router.push('/')
    } catch (error) {
      console.error('로그인 오류:', error)
      alert('로그인 중 오류가 발생했습니다')
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
      <main className="max-w-[500px] mx-auto px-8 py-24">
        <h1 className="text-4xl font-bold text-center mb-12 text-black">로그인</h1>

        {/* Form Container */}
        <div className="border border-[#D9D9D9] rounded-lg p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이메일 */}
            <div>
              <label className="block text-black mb-2">
                <span className="text-[#7F2323]">*</span> 이메일
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@kw.ac.kr"
                className="w-full border border-[#595959] rounded-lg px-4 py-3 text-black focus:outline-none focus:border-[#7F2323] placeholder:text-[#D9D9D9]"
              />
            </div>

            {/* 비밀번호 */}
            <div>
              <label className="block text-black mb-2">
                <span className="text-[#7F2323]">*</span> 비밀번호
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border border-[#595959] rounded-lg px-4 py-3 text-black focus:outline-none focus:border-[#7F2323]"
              />
            </div>

            {/* 로그인 버튼 */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#AD7070] hover:bg-[#7F2323] text-white font-bold py-3 px-20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </button>
            </div>

            {/* 회원가입 링크 */}
            <div className="text-center mt-6">
              <p className="text-black text-sm">
                계정이 없으신가요?{' '}
                <Link href="/signup" className="text-[#7F2323] font-bold hover:underline">
                  회원가입
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
