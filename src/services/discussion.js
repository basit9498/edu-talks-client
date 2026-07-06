
import { buildQueryString } from '../utils/buildQueryString';
import api from './api';


/**
 * Discussion API endpoints
 */
const DISCUSSION_ENDPOINTS = {
  CREATE: '/discussion',
  GET_ALL: '/discussion',
  GET_BY_ID: '/discussion',
  DISCUSSION_MESSAGES_CREATE: '/discussion/message',


};


export const createDiscussion = async (payload) => {
  try {
    const response = await api.post(DISCUSSION_ENDPOINTS.CREATE, payload);
return response.data; 
    
  } catch (error) {
   
    throw error;
  }
};


export const getAllDiscussions = async (params) => {
  try {
    const queryString = buildQueryString(params);
    const response = await api.get(`/discussion/${queryString}`);
    return response.result; 
    
  } catch (error) {
    throw error;
  }
};

export const getDiscussionById = async (id) => {
  try {
    const response = await api.get(`${DISCUSSION_ENDPOINTS.GET_BY_ID}/${id}`);
return response.data; 
    
  } catch (error) {
    throw error;
  }
};

export const createDiscussionMessage = async (payload) => {
  try {
    const response = await api.post(DISCUSSION_ENDPOINTS.DISCUSSION_MESSAGES_CREATE, payload);
return response.data; 
    
  } catch (error) {
    throw error;
  }
};


export const makeDiscussionMessagesSummary = async (id) => {
  try {
    const response = await api.get(`/discussion/${id}/message/single/summary/`);
    return response; 
    
  } catch (error) {
    throw error;
  }
};


export const discussionSummaryList = async (id) => {
  try {
    const response = await api.get(`/discussion/${id}/summary-list`);
    return response; 
  } catch (error) {
    throw error;
  }
};

export const deleteDiscussion = async (id) => {
  try {
    const response = await api.delete(`/discussion/${id}`);
    return response; 
  } catch (error) {
    throw error;
  }
};


export const transcribeAudio = async (payload) => {
  try {
    const response = await api.post('/discussion/transcribe', payload,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response; 
  } catch (error) {
    throw error;
  }
};


// ------------------------------------------------------------Stream API endpoints ------------------------------------------------------------

export const streamDiscussionMessage = async (
  payload,
  onChunk
) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'}/discussion/stream/message`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.body) {
    throw new Error("Streaming not supported");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    onChunk(chunk);
  }
};






// Export all discussion methods as a service object
const discussionService = {
  createDiscussion,
  getAllDiscussions,
  getDiscussionById,
  createDiscussionMessage,
  makeDiscussionMessagesSummary
};  

export default discussionService;

