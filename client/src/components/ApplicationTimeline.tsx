import {
  APPLICATION_STATUS_LABELS,
  type Application,
  type ApplicationStatus,
} from '../types'

interface ApplicationTimelineProps {
  application: Application | null
}

interface TimelineItem {
  label: string
  date?: string
  value?: ApplicationStatus
  isStatus?: boolean
}

function ApplicationTimeline({ application }: ApplicationTimelineProps) {
  if (!application) {
    return null
  }

  const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })

  const formatDate = (date: string) => {
    const parsedDate = new Date(date)

    return Number.isNaN(parsedDate.getTime())
      ? date
      : dateFormatter.format(parsedDate)
  }

  const timelineItems: TimelineItem[] = [
    ...(application.created_at ? [{
      label: 'Đã thêm vào danh sách',
      date: application.created_at,
    }] : []),
    ...(application.applied_date ? [{
      label: 'Đã ứng tuyển',
      date: application.applied_date,
    }] : []),
    {
      label: 'Trạng thái hiện tại',
      value: application.status,
      isStatus: true,
    },
    ...(application.follow_up_date ? [{
      label: 'Theo dõi lại',
      date: application.follow_up_date,
    }] : []),
  ]

  return (
    <section className="w-full min-w-0">
      <h3 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4 md:hidden">
        Tiến trình ứng tuyển
      </h3>

      {/* Trục timeline dọc */}
      <ol className="relative ml-2 min-w-0 list-none space-y-6 border-l-2 border-gray-200 p-0">
        {timelineItems.map((item) => (
          <li key={`${item.label}-${item.date ?? item.value}`} className="relative w-full min-w-0 pl-6 text-sm">
            {/* Nốt tròn định vị tuyệt đối chuẩn tâm line */}
            <span aria-hidden="true" className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-black ring-4 ring-white" />

            {/* Grid giữ cột ngày ổn định, không co giãn và nhảy chữ như flex. */}
            <div className="grid w-full min-w-0 grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-[minmax(0,1fr)_max-content] sm:items-start">
              <div className="min-w-0 break-words text-gray-600">
                <span className="font-medium text-gray-900">{item.label}:</span>{' '}
                {item.isStatus && (
                  <span className="inline-flex max-w-full items-center rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 capitalize break-words">
                    {item.value ? APPLICATION_STATUS_LABELS[item.value] : ''}
                  </span>
                )}
              </div>

              {item.date && (
                <time
                  dateTime={item.date}
                  className="text-xs font-normal whitespace-nowrap text-gray-400 sm:text-right"
                >
                  {formatDate(item.date)}
                </time>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default ApplicationTimeline
