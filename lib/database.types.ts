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
          nick_name: string | null
          좋아요: number | null
          우수멤버: boolean | null
          관심분야: number | null
          created_at: string | null
          updated_at: string | null
          id: string
        }
        Insert: {
          email: string
          nick_name?: string | null
          좋아요?: number | null
          우수멤버?: boolean | null
          관심분야?: number | null
          created_at?: string | null
          updated_at?: string | null
          id?: string
        }
        Update: {
          email?: string
          nick_name?: string | null
          좋아요?: number | null
          우수멤버?: boolean | null
          관심분야?: number | null
          created_at?: string | null
          updated_at?: string | null
          id?: string
        }
      }
      모임: {
        Row: {
          모임_id: string
          name: string | null
          major: string | null
          Like: number | null
          context: string | null
          goal: string | null
          chat: string | null
          자격증_id: number | null
          공모전_id: number | null
          email: string | null
          duration_type: string | null
          학과_id: number | null
          동아리_id: number | null
          기타세부활동_id: number | null
          category_type: string | null
          meeting_date: string | null
          start_time: string | null
          end_time: string | null
          status: string | null
          current_members: number | null
          created_at: string | null
        }
        Insert: {
          모임_id?: string
          name?: string | null
          major?: string | null
          Like?: number | null
          context?: string | null
          goal?: string | null
          chat?: string | null
          자격증_id?: number | null
          공모전_id?: number | null
          email?: string | null
          duration_type?: string | null
          학과_id?: number | null
          동아리_id?: number | null
          기타세부활동_id?: number | null
          category_type?: string | null
          meeting_date?: string | null
          start_time?: string | null
          end_time?: string | null
          status?: string | null
          current_members?: number | null
          created_at?: string | null
        }
        Update: {
          모임_id?: string
          name?: string | null
          major?: string | null
          Like?: number | null
          context?: string | null
          goal?: string | null
          chat?: string | null
          자격증_id?: number | null
          공모전_id?: number | null
          email?: string | null
          duration_type?: string | null
          학과_id?: number | null
          동아리_id?: number | null
          기타세부활동_id?: number | null
          category_type?: string | null
          meeting_date?: string | null
          start_time?: string | null
          end_time?: string | null
          status?: string | null
          current_members?: number | null
          created_at?: string | null
        }
      }
      모임_신청자: {
        Row: {
          id: string
          모임_id: string | null
          신청자_email: string | null
          자기소개: string | null
          status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          모임_id?: string | null
          신청자_email?: string | null
          자기소개?: string | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          모임_id?: string | null
          신청자_email?: string | null
          자기소개?: string | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
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
