import {  updateApplicationStatus ,deleteApplication } from '../services/applicationApi';
const ApplicationList = ({ applications,  searchValue, selectedStatus, loading, error, setApplications, setSelectedApplication, setSelectedStatus, setSearchValue, setError }) => {



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
      setApplications((prevApplications) => prevApplications.filter((application) => application.id !== id));
    } catch (error) {
      console.error('Error deleting application:', error);
      setError('Failed to delete application');
    }
  };

  

  return (
    <div>
      
      <input
        id="search-bar"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <select id="status-filter" 
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)} >
        <option value="ALL">All</option>
        <option value="APPLIED">Applied</option>
        <option value="INTERVIEWING">Interviewing</option>
        <option value="OFFERED">Offered</option>
        <option value="REJECTED">Rejected</option>
      </select>
      <h2>Application List</h2>
      {loading && <p>Loading applications...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {applications.map((application) => (
          //Space between the list items for better readability

          <li key={application.id} style={{ marginBottom: '30px', textAlign: 'center' }} value={application.id} onClick={() => setSelectedApplication(application)}>
            <strong>Company:</strong> {application.company} <br />
            <button onClick={() => setSelectedApplication(application)} style={{ margin: '5px' }}>
              View Details
            </button>
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
        