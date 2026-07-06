import api from './api';



export const connectGoogleTool = async (payload) => {
  try {
    const response = await api.post('/integration/google-tool-connection', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};