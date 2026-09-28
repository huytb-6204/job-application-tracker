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
  const [searchValue, setSearchValue] = useState('')

// Function to handle the creation of a new application
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

// Filter applications based on selected status and search value
  const filteredData = applications.filter((application) => {
    const matchesStatus = selectedStatus === 'ALL' || application.status === selectedStatus
    const normallizedSearchValue = searchValue.toLowerCase().trim()
    const matchesSearch = application.company.toLowerCase().includes(normallizedSearchValue) || application.position.toLowerCase().includes(normallizedSearchValue)

    return matchesStatus && matchesSearch
  })

  return (
    <>

      <h1>Job Application Tracker</h1>

      <Dashboard applications={applications} /> 
      <ApplicationList applications={filteredData} searchValue={searchValue} selectedStatus={selectedStatus} loading={loading} error={error} setApplications={setApplications} setSelectedStatus={setSelectedStatus} setSearchValue={setSearchValue} setError={setError} />
      <ApplicationForm onApplicationCreated={handleApplicationCreated} />
      
    </>
  )
}   


export default App
