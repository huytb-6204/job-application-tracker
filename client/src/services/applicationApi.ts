const API_URL = import.meta.env.VITE_API_URL;
import type {
  Application,
  ApplicationStatus,
  CreateApplicationInput,
  DeleteApplicationResponse,
  UpdateApplicationInput,
} from '../types';

const parseJsonResponse = async <T>(response: Response, message: string): Promise<T> => {
  if (!response.ok) {
    throw new Error(message);
  }

  return response.json() as Promise<T>;
};

export const getApplications = async (): Promise<Application[]> => {
  try {
    const response = await fetch(`${API_URL}/applications`);
    return await parseJsonResponse<Application[]>(response, 'Không thể tải danh sách hồ sơ ứng tuyển');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createApplication = async (applicationData: CreateApplicationInput): Promise<Application> => {
  try {
    const response = await fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });
    return await parseJsonResponse<Application>(response, 'Không thể tạo hồ sơ ứng tuyển');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateApplication = async (id: number, applicationData: UpdateApplicationInput): Promise<Application> => {
  try {
    const response = await fetch(`${API_URL}/applications/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });
    return await parseJsonResponse<Application>(response, 'Không thể cập nhật hồ sơ ứng tuyển');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateApplicationStatus = async (id: number, status: ApplicationStatus): Promise<Application> => {
  try {
    const response = await fetch(`${API_URL}/applications/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    return await parseJsonResponse<Application>(response, 'Không thể cập nhật trạng thái hồ sơ');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteApplication = async (id: number): Promise<DeleteApplicationResponse> => {
  try {
    const response = await fetch(`${API_URL}/applications/${id}`, {
      method: 'DELETE',
    });
    return await parseJsonResponse<DeleteApplicationResponse>(response, 'Không thể xóa hồ sơ ứng tuyển');
  } catch (error) {
    console.error(error);
    throw error;
  }
};  
