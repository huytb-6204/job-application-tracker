import { useState, type FormEvent } from 'react'
import { createApplication } from '../services/applicationApi'
import {
  APPLICATION_STATUS_LABELS,
  type Application,
  type ApplicationStatus,
} from '../types'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface ApplicationFormProps {
  onApplicationCreated: (application: Application) => void
}

type RequiredField =
  | 'company'
  | 'position'
  | 'appliedDate'
  | 'followUpDate'
  | 'jobUrl'

const ApplicationForm = ({ onApplicationCreated }: ApplicationFormProps) => {
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [status, setStatus] = useState<ApplicationStatus>(APPLICATION_STATUS_LABELS.APPLIED as ApplicationStatus)
  const [location, setLocation] = useState('')
  const [jobUrl, setJobUrl] = useState('')
  const [appliedDate, setAppliedDate] = useState('')
  const [followUpDate, setFollowUpDate] = useState('')
  const [notes, setNotes] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')
  const [invalidFields, setInvalidFields] = useState<Set<RequiredField>>(new Set())

  const markInvalid = (field: RequiredField) => {
    setInvalidFields((current) => new Set(current).add(field))
  }

  const clearInvalid = (field: RequiredField) => {
    setInvalidFields((current) => {
      const next = new Set(current)
      next.delete(field)
      return next
    })
  }

  const updateValidity = (field: RequiredField, input: HTMLInputElement) => {
    if (input.validity.valid) clearInvalid(field)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const newApplication = await createApplication({
        company,
        position,
        status: status || APPLICATION_STATUS_LABELS.APPLIED as ApplicationStatus,
        location,
        job_url: jobUrl,
        applied_date: appliedDate || null,
        follow_up_date: followUpDate || null,
        note: notes,
      })

      setCompany('')
      setPosition('')
      setStatus(APPLICATION_STATUS_LABELS.APPLIED as ApplicationStatus)
      setLocation('')
      setJobUrl('')
      setAppliedDate('')
      setFollowUpDate('')
      setNotes('')
      setInvalidFields(new Set())
      setError('')
      setSuccessMessage('Đã thêm hồ sơ ứng tuyển thành công!')
      onApplicationCreated(newApplication)
    } catch (error) {
      console.error('Lỗi khi tạo hồ sơ ứng tuyển:', error)
      setSuccessMessage('')
      setError('Không thể tạo hồ sơ ứng tuyển')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FieldGroup>
        <Field data-invalid={invalidFields.has('company') || undefined}>
          <FieldLabel htmlFor="company">Công ty</FieldLabel>
          <Input
            id="company"
            name="company"
            type="text"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value)
              updateValidity('company', e.currentTarget)
            }}
            onInvalid={() => markInvalid('company')}
            aria-invalid={invalidFields.has('company') || undefined}
            aria-describedby={invalidFields.has('company') ? 'company-error' : undefined}
            required
          />
          {invalidFields.has('company') && (
            <FieldError id="company-error">Vui lòng nhập tên công ty.</FieldError>
          )}
        </Field>

        <Field data-invalid={invalidFields.has('position') || undefined}>
          <FieldLabel htmlFor="position">Vị trí ứng tuyển</FieldLabel>
          <Input
            id="position"
            name="position"
            type="text"
            value={position}
            onChange={(e) => {
              setPosition(e.target.value)
              updateValidity('position', e.currentTarget)
            }}
            onInvalid={() => markInvalid('position')}
            aria-invalid={invalidFields.has('position') || undefined}
            aria-describedby={invalidFields.has('position') ? 'position-error' : undefined}
            required
          />
          {invalidFields.has('position') && (
            <FieldError id="position-error">Vui lòng nhập vị trí ứng tuyển.</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="status">Trạng thái</FieldLabel>
          <Select
            value={APPLICATION_STATUS_LABELS[status] || undefined}
            onValueChange={(value) => {
              if (value) setStatus(value as ApplicationStatus)
            }}
          >
            <SelectTrigger id="status" className="w-full" aria-required="true">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="APPLIED">{APPLICATION_STATUS_LABELS.APPLIED}</SelectItem>
              <SelectItem value="INTERVIEWING">{APPLICATION_STATUS_LABELS.INTERVIEWING}</SelectItem>
              <SelectItem value="OFFERED">{APPLICATION_STATUS_LABELS.OFFERED}</SelectItem>
              <SelectItem value="REJECTED">{APPLICATION_STATUS_LABELS.REJECTED}</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <FieldGroup className="grid gap-6 sm:grid-cols-2">
          <Field data-invalid={invalidFields.has('appliedDate') || undefined}>
            <FieldLabel htmlFor="applied-date">Ngày ứng tuyển</FieldLabel>
            <Input
              id="applied-date"
              name="appliedDate"
              type="date"
              value={appliedDate}
              onChange={(e) => {
                setAppliedDate(e.target.value)
                updateValidity('appliedDate', e.currentTarget)
              }}
              onInvalid={() => markInvalid('appliedDate')}
              aria-invalid={invalidFields.has('appliedDate') || undefined}
              aria-describedby={invalidFields.has('appliedDate') ? 'applied-date-error' : undefined}
              required
            />
            {invalidFields.has('appliedDate') && (
              <FieldError id="applied-date-error">Vui lòng chọn ngày ứng tuyển.</FieldError>
            )}
          </Field>

          <Field data-invalid={invalidFields.has('followUpDate') || undefined}>
            <FieldLabel htmlFor="follow-up-date">Ngày theo dõi lại</FieldLabel>
            <Input
              id="follow-up-date"
              name="followUpDate"
              type="date"
              value={followUpDate}
              onChange={(e) => {
                setFollowUpDate(e.target.value)
                updateValidity('followUpDate', e.currentTarget)
              }}
              onInvalid={() => markInvalid('followUpDate')}
              aria-invalid={invalidFields.has('followUpDate') || undefined}
              aria-describedby={invalidFields.has('followUpDate') ? 'follow-up-date-error' : undefined}
              required
            />
            {invalidFields.has('followUpDate') && (
              <FieldError id="follow-up-date-error">Vui lòng chọn ngày theo dõi lại.</FieldError>
            )}
          </Field>
        </FieldGroup>

        <Field data-invalid={invalidFields.has('jobUrl') || undefined}>
          <FieldLabel htmlFor="job-url">Đường dẫn tuyển dụng</FieldLabel>
          <Input
            id="job-url"
            name="jobUrl"
            type="url"
            placeholder="https://example.com/jobs/..."
            value={jobUrl}
            onChange={(e) => {
              setJobUrl(e.target.value)
              updateValidity('jobUrl', e.currentTarget)
            }}
            onInvalid={() => markInvalid('jobUrl')}
            aria-invalid={invalidFields.has('jobUrl') || undefined}
            aria-describedby={
              invalidFields.has('jobUrl')
                ? 'job-url-description job-url-error'
                : 'job-url-description'
            }
            required
          />
          <FieldDescription id="job-url-description">
            Dán đường dẫn gốc của bài đăng tuyển dụng.
          </FieldDescription>
          {invalidFields.has('jobUrl') && (
            <FieldError id="job-url-error">Vui lòng nhập đường dẫn tuyển dụng hợp lệ.</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="location">Địa điểm</FieldLabel>
          <Input
            id="location"
            name="location"
            type="text"
            placeholder="TP. Hồ Chí Minh hoặc làm việc từ xa"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="notes">Ghi chú</FieldLabel>
          <Textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            className="w-fit"
            onClick={() => setNotes('')}
            disabled={!notes}
          >
            Xóa ghi chú
          </Button>
        </Field>
      </FieldGroup>

      <Button type="submit">Thêm hồ sơ</Button>

      {successMessage && (
        <p role="status" className="text-sm font-medium text-green-700">
          {successMessage}
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </form>
  )
}

export default ApplicationForm
