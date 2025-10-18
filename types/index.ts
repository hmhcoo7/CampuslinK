export interface User {
  id: string
  email: string
  fullName?: string
  university?: string
  major?: string
  studentId?: string
}

export interface Group {
  id: string
  title: string
  description: string
  category: string
  maxMembers: number
  currentMembers: number
  createdBy: string
  createdAt: string
}

export interface GroupMember {
  id: string
  groupId: string
  userId: string
  status: 'pending' | 'approved' | 'rejected'
  joinedAt: string
}

export type SignupFormData = {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  university: string
  major: string
  studentId: string
}

export type LoginFormData = {
  email: string
  password: string
}
