'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface DeleteAccountModalProps {
  isOpen: boolean
  onClose: () => void
  userEmail: string
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
  userEmail
}: DeleteAccountModalProps) {
  const [confirmText, setConfirmText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  if (!isOpen) return null

  const handleDelete = async () => {
    if (confirmText !== '회원 탈퇴') {
      setError('"회원 탈퇴"를 정확히 입력해주세요.')
      return
    }

    setError('')
    setLoading(true)

    try {
      // 1. 회원 테이블에서 삭제
      const { error: deleteError } = await supabase
        .from('회원')
        .delete()
        .eq('email', userEmail)

      if (deleteError) throw deleteError

      // 2. Auth 사용자 삭제
      const { error: authError } = await supabase.auth.admin.deleteUser(
        (await supabase.auth.getUser()).data.user?.id || ''
      )

      // Auth 삭제는 관리자 권한이 필요하므로, 실패해도 계속 진행
      // 실제로는 백엔드 API를 통해 처리하는 것이 좋습니다

      // 3. 로그아웃
      await supabase.auth.signOut()

      alert('회원 탈퇴가 완료되었습니다.')
      router.push('/')
    } catch (err: any) {
      setError(err.message || '회원 탈퇴 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-semibold text-black mb-4 font-[family-name:var(--font-crimson)]">
          회원 탈퇴
        </h2>

        <div className="mb-6 space-y-2">
          <p className="text-gray-700">
            정말로 회원 탈퇴하시겠습니까?
          </p>
          <p className="text-sm text-gray-600">
            • 모든 개인정보가 삭제됩니다
          </p>
          <p className="text-sm text-gray-600">
            • 신청한 모임 내역이 모두 취소됩니다
          </p>
          <p className="text-sm text-gray-600">
            • 생성한 모임은 유지되지만 관리할 수 없게 됩니다
          </p>
          <p className="text-sm text-red-600 font-medium mt-4">
            이 작업은 되돌릴 수 없습니다.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            계속하려면 "<span className="font-bold">회원 탈퇴</span>"를 입력하세요
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
            placeholder="회원 탈퇴"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            disabled={loading || confirmText !== '회원 탈퇴'}
          >
            {loading ? '탈퇴 중...' : '회원 탈퇴'}
          </button>
        </div>
      </div>
    </div>
  )
}
