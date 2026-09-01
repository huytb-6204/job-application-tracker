import {useState, useEffect} from 'react';
import { getApplications, updateApplicationStatus, updateApplication ,deleteApplication } from '../services/applicationApi';
const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);


const handleStatusChange = async (id, status) => {
  try {
    const updatedApplication = await updateApplicationStatus(id, status);

    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.id === id ? updatedApplication : application
      )
    );
  } catch (error) {
    console.error('Error updating application status:', error);
    setError('Failed to update application status');
  }
};



  const handleDelete = async (id) => {
    try {
      await deleteApplication(id);
      setApplications(applications.filter((application) => application.id !== id));
    } catch (error) {
      console.error('Error deleting application:', error);
      setError('Failed to delete application');
    }
  };

  return (
    <div>
      <h2>Application List</h2>
      {loading && <p>Loading applications...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {applications.map((application) => (
          //Space between the list items for better readability

          <li key={application.id} style={{ marginBottom: '30px', textAlign: 'center' }}>
            {application.company} - {application.position} - {application.status}
            {application.applied_date && (
              <span> - Applied on: {new Date(application.applied_date).toLocaleDateString()}</span>
            )}
            {application.follow_up_date && (
              <span> - Follow-up on: {new Date(application.follow_up_date).toLocaleDateString()}</span>
            )}
            {application.location && <span> - Location: {application.location}</span>}
            {application.created_at && (
              <span> - Created at: {new Date(application.created_at).toLocaleString()}</span>
            )}
            <select
              value={application.status}
              onChange={(e) => handleStatusChange(application.id, e.target.value)}
              style={{ marginLeft: '10px' }}
            >
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEWING">Interviewing</option>
              <option value="OFFERED">Offered</option>
              <option value="REJECTED">Rejected</option> 
            </select>
            <button onClick={() => handleStatusChange(application.id, application.status)} style={{ margin: '5px' }}>
              Update Status
            </button>
            <button onClick={() => handleDelete(application.id)} style={{ margin: '5px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default ApplicationList; 
        