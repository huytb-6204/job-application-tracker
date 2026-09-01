import {useState} from 'react'
import {createApplication} from '../services/applicationApi'
const ApplicationForm = () => {
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [status, setStatus] = useState('APPLIED')
  const [location, setLocation] = useState('')
  const [jobUrl, setJobUrl] = useState('')
  const [appliedDate, setAppliedDate] = useState('')
  const [followUpDate, setFollowUpDate] = useState('')
  const [notes, setNotes] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createApplication({company, position, status, location, job_url: jobUrl, applied_date: appliedDate || null, follow_up_date: followUpDate || null, note: notes})
      setCompany('')
      setPosition('')
      setStatus('APPLIED')
      setNotes('')
      setError('')
      setSuccessMessage('Application created successfully!')
    } catch (error) {
      console.error('Error creating application:', error)
      setSuccessMessage('')
      setError('Failed to create application')
    }
  }

  const handleDeleteNotes = () => {
    setNotes('')
  }

  return (
    <div>
      <h2>Add New Application</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company:</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEWING">Interviewing</option>
            <option value="OFFERED">Offered</option>
            <option value="REJECTED">Rejected</option>
          </select>
          
        </div>
        <div>
            <label>Applied Date:</label>
            <input
                type="date"
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
                required
            />
        </div>
        <div>
            <label>Follow Up Date:</label>
            <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                required
            />
        </div>
        <div>
            <label>Job URL:</label>
            <input
                type="url"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                required
            />
        </div>
        <div>
            <label>Location:</label>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
        </div>
        <div>
            <label>Notes:</label>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <button type="button" onClick={handleDeleteNotes}>Clear Notes</button>
        </div>
        <button type="submit" >Add Application</button>
        {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
        {error && <p style={{color: 'red'}}>{error}</p>}
      </form>
    </div>
  )
}

export default ApplicationForm