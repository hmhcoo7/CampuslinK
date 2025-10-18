import type { Metadata } from 'next'
import { Inter, Crimson_Text } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-crimson'
})

export const metadata: Metadata = {
  title: 'CampuslinK - 대학생 학습 모임 매칭',
  description: '대학생들을 위한 학습 모임 매칭 플랫폼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} ${crimsonText.variable}`}>{children}</body>
    </html>
  )
}
