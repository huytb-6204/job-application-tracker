export const APPLICATION_STATUSES = [
  'APPLIED',
  'INTERVIEWING',
  'OFFERED',
  'REJECTED',
] as const

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]
export type ApplicationStatusFilter = ApplicationStatus | 'ALL'

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  APPLIED: 'Đã ứng tuyển',
  INTERVIEWING: 'Đang phỏng vấn',
  OFFERED: 'Đã nhận đề nghị',
  REJECTED: 'Đã bị từ chối',
}

export interface Application {
  id: number
  company: string
  position: string
  status: ApplicationStatus
  location: string | null
  job_url: string | null
  applied_date: string | null
  follow_up_date: string | null
  note: string | null
  created_at: string
}

export type CreateApplicationInput = Pick<
  Application,
  'company' | 'position' | 'status'
> &
  Partial<
    Pick<
      Application,
      'location' | 'job_url' | 'applied_date' | 'follow_up_date' | 'note'
    >
  >

export type UpdateApplicationInput = Partial<
  Omit<Application, 'id' | 'created_at'>
>

export interface Interview {
  id: number
  application_id: number
  interview_title: string
  interview_type: string
  interview_date: string
  notes: string | null
}

export type CreateInterviewInput = Omit<Interview, 'id'>
export type UpdateInterviewInput = Partial<
  Pick<Interview, 'interview_title' | 'interview_type' | 'interview_date' | 'notes'>
>

export interface DeleteApplicationResponse {
  message: string
}
