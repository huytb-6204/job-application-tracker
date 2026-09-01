const API_URL = import.meta.env.VITE_API_URL;


export const getApplications = async () => {
  try {
    const response = await fetch(`${API_URL}/applications`);
    if (!response.ok) {
      throw new Error('Failed to fetch applications');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createApplication = async (applicationData) => {
  try {
    const response = await fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });
    if (!response.ok) {
      throw new Error('Failed to create application');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateApplication = async (id, applicationData) => {
  try {
    const response = await fetch(`${API_URL}/applications/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });
    if (!response.ok) {
      throw new Error('Failed to update application');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateApplicationStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_URL}/applications/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Failed to update application status');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteApplication = async (id) => {
  try {
    const response = await fetch(`${API_URL}/applications/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete application');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};  