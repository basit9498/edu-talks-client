import api from './api';
import { buildQueryString } from '../utils/buildQueryString';

export const generatePlan = async (body) => {
    try {
        const response = await api.post('/ai-planner/create-plan', body);
        return response;
    } catch (error) {
        throw error;
    }
};

export  const resumePlan = async (payload) => {
    try {
        const response = await api.post(`/ai-planner/resume-plan`, payload);
        return response;
    } catch (error) {
        throw error;
    }
}


export const getPlan = async (params) => {
    try {
        const queryString = buildQueryString(params);
        const response = await api.get(`/ai-planner/list${queryString}`);
        return response;
    } catch (error) {
        throw error;
    }
}


export const getPlanById = async (id) => {
    try {
        const response = await api.get(`/ai-planner/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}
