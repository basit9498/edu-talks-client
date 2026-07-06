


import api from './api';


export const uploadDocument = async (data) => {
  try {
    const response = await api.post('/doc/upload', data,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getAllDocuments = async () => {
  try {
    const response = await api.get('/doc/all');
    return response.data;
  } catch (error) {
    throw error;
  }
};