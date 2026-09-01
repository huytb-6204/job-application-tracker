const API_URL = import.meta.env.VITE_API_URL;

export const getInterviews = async () => {
  try {
    const response = await fetch(`${API_URL}/interviews`);
    if (!response.ok) {
      throw new Error('Failed to fetch interviews');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createInterview = async (interviewData) => {
  try {
    const response = await fetch(`${API_URL}/interviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(interviewData),
    });
    if (!response.ok) {
      throw new Error('Failed to create interview');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateInterview = async (id, interviewData) => {
  try {
    const response = await fetch(`${API_URL}/interviews/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(interviewData),
    });
    if (!response.ok) {
      throw new Error('Failed to update interview');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


