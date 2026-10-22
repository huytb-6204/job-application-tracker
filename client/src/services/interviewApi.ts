const API_URL = import.meta.env.VITE_API_URL;
import type {
  CreateInterviewInput,
  Interview,
  UpdateInterviewInput,
} from '../types';

const parseJsonResponse = async <T>(response: Response, message: string): Promise<T> => {
  if (!response.ok) {
    throw new Error(message);
  }

  return response.json() as Promise<T>;
};

export const getInterviews = async (): Promise<Interview[]> => {
  try {
    const response = await fetch(`${API_URL}/interviews`);
    return await parseJsonResponse<Interview[]>(response, 'Không thể tải danh sách phỏng vấn');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createInterview = async (interviewData: CreateInterviewInput): Promise<Interview> => {
  try {
    const response = await fetch(`${API_URL}/interviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(interviewData),
    });
    return await parseJsonResponse<Interview>(response, 'Không thể tạo lịch phỏng vấn');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateInterview = async (id: number, interviewData: UpdateInterviewInput): Promise<Interview> => {
  try {
    const response = await fetch(`${API_URL}/interviews/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(interviewData),
    });
    return await parseJsonResponse<Interview>(response, 'Không thể cập nhật lịch phỏng vấn');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

