'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  currentNickname: string
  currentEmail: string
  currentInterests: string
  onUpdate: () => void
}

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

export default function EditProfileModal({
  isOpen,
  onClose,
  currentNickname,
  currentEmail,
  currentInterests,
  onUpdate
}: EditProfileModalProps) {
  const [nickname, setNickname] = useState(currentNickname)
  const [email, setEmail] = useState(currentEmail)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [interests, setInterests] = useState(currentInterests)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 비밀번호 변경 (입력된 경우만)
      if (password) {
        if (password !== confirmPassword) {
          setError('비밀번호가 일치하지 않습니다.')
          setLoading(false)
          return
        }

        if (password.length < 6) {
          setError('비밀번호는 최소 6자 이상이어야 합니다.')
          setLoading(false)
          return
        }

        const { error: passwordError } = await supabase.auth.updateUser({
          password: password
        })

        if (passwordError) throw passwordError
      }

      // 이메일 변경 (입력된 경우만)
      if (email !== currentEmail) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: email
        })

        if (emailError) throw emailError
      }

      // 회원 테이블 업데이트 (닉네임, 관심분야)
      const { error: updateError } = await supabase
        .from('회원')
        .update({
          nick_name: nickname,
          관심분야: INTERESTS_OPTIONS.indexOf(interests)
        })
        .eq('email', currentEmail)

      if (updateError) throw updateError

      alert('프로필이 성공적으로 업데이트되었습니다.')
      onUpdate()
      onClose()
    } catch (err: any) {
      setError(err.message || '프로필 업데이트 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6 font-[family-name:var(--font-crimson)]">
          개인정보 수정
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 닉네임 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              닉네임
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7F2323] focus:border-transparent"
              required
            />
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7F2323] focus:border-transparent"
              required
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              새 비밀번호 (변경하지 않으려면 비워두세요)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7F2323] focus:border-transparent"
              placeholder="6자 이상"
            />
          </div>

          {/* 비밀번호 확인 */}
          {password && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호 확인
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7F2323] focus:border-transparent"
                placeholder="비밀번호를 다시 입력하세요"
              />
            </div>
          )}

          {/* 관심분야 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              관심분야
            </label>
            <select
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7F2323] focus:border-transparent"
              required
            >
              {INTERESTS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          {/* 버튼 */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#7F2323] text-white rounded-lg hover:bg-[#6a1d1d] transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
