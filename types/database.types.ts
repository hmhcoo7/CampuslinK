// 이 파일은 Supabase CLI로 자동 생성할 수 있습니다
// npx supabase gen types typescript --project-id <project-id> > types/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      회원: {
        Row: {
          email: string
          password: string
          nick_name: string
          created_at: string
        }
        Insert: {
          email: string
          password: string
          nick_name: string
          created_at?: string
        }
        Update: {
          email?: string
          password?: string
          nick_name?: string
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          university: string | null
          major: string | null
          student_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          university?: string | null
          major?: string | null
          student_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          university?: string | null
          major?: string | null
          student_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      groups: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          max_members: number
          current_members: number
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          max_members: number
          current_members?: number
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          max_members?: number
          current_members?: number
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      group_members: {
        Row: {
          id: string
          group_id: string
          user_id: string
          status: 'pending' | 'approved' | 'rejected'
          joined_at: string
        }
        Insert: {
          id?: string
          group_id: string
          user_id: string
          status?: 'pending' | 'approved' | 'rejected'
          joined_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          user_id?: string
          status?: 'pending' | 'approved' | 'rejected'
          joined_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
