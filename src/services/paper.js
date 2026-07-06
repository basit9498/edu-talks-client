

import api from './api';


export const createPaperAi = async (data) => {
  try {
    const response = await api.post('/paper/ai-create', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getPaperQuestions = async (id) => {
  try {
    const response = await api.get(`/paper/${id}/question-list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
