// call endpoints from the backend job controller file 
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getTechIdeas = async () => {
    const response = await fetch(`${API_URL}/tech-ideas`);
    if (!response.ok) {
        throw new Error('Failed to fetch tech ideas');
    }
    return response.json();
};

export const submitTechIdea = async (techIdea) => {
    const response = await fetch(`${API_URL}/tech-ideas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(techIdea),
    });
    if (!response.ok) {
        throw new Error('Failed to submit tech idea');
    }
    return response.json();
};

export const deleteTechIdea = async (id) => {
    const response = await fetch(`${API_URL}/tech-ideas/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete tech idea');
    }
}; 