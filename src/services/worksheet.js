
import api from './api';


 export const createWorksheet = async (payload) => {
  try {
    const response = await api.post('/worksheet', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

 export const getWorksheetList = async (id) => {
  try {
    const response = await api.get(`/worksheet`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWorksheetPaperList = async (id) => {
  try {
    const response = await api.get(`/worksheet/${id}/paper-list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


