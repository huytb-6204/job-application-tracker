import './App.css'
import {useState, useEffect} from 'react'
import ApplicationList from './components/ApplicationList'
import {getApplications} from './services/applicationApi'
import ApplicationForm from './components/ApplicationForm'
import Dashboard from './components/Dashboard'

function App() {

  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('ALL')


  const handleApplicationCreated = (newApplication) => {
    setApplications((prevApplications) => [...prevApplications, newApplication])
  }

  useEffect(()=> {
  const fetchApplications = async () => {
    try {
      const data = await getApplications()
      setApplications(data) 
    } catch {
      setError('Failed to fetch applications')
    } finally {
      setLoading(false)
    }
  }

  fetchApplications()
}, []) 

  const filteredData = selectedStatus === 'ALL' ? applications : applications.filter((application) => application.status === selectedStatus)

  return (
    <>

      <h1>Job Application Tracker</h1>

      <Dashboard applications={applications} /> 
      <ApplicationList applications={filteredData} selectedStatus={selectedStatus} loading={loading} error={error} setApplications={setApplications} setSelectedStatus={setSelectedStatus} setError={setError} />
      <ApplicationForm onApplicationCreated={handleApplicationCreated} />
      
    </>
  )
}   


export default App
