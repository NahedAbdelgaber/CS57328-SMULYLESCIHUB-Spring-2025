// call endpoints from the backend job controller file 
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/jobs';

export const getJobs = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

export const submitJob = async (jobData) => {
    try {
        const response = await axios.post(API_URL, jobData);
        return response.data;
    } catch (error) {
        console.error('Error submitting job:', error);
        throw error;
    }
};

export const deleteJob = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting job:', error);
        throw error;
    }
}; 