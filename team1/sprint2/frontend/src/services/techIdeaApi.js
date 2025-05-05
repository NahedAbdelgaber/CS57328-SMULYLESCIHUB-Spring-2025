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

export const getTechTypes = async () => {
    try {
        const response = await fetch(`${API_URL}/tech-ideas/tech-types`);
        console.log('Tech types response:', response);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`Failed to fetch tech types: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Tech types data:', data);
        return data;
    } catch (error) {
        console.error('getTechTypes error:', error);
        throw error;
    }
};

export const getFilteredTechIdeas = async (filters) => {
    const { techType, startDate, endDate, minBudget, maxBudget } = filters;
    const params = new URLSearchParams();
    
    if (techType) params.append('techType', techType);
    if (startDate) params.append('startDate', startDate.toISOString());
    if (endDate) params.append('endDate', endDate.toISOString());
    if (minBudget) params.append('minBudget', minBudget);
    if (maxBudget) params.append('maxBudget', maxBudget);

    const response = await fetch(`${API_URL}/tech-ideas/filter?${params}`);
    if (!response.ok) {
        throw new Error('Failed to fetch filtered tech ideas');
    }
    return response.json();
};

export const submitTechIdea = async (techIdea) => {
    try {
        console.log('Submitting tech idea:', techIdea);
        const response = await fetch(`${API_URL}/tech-ideas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(techIdea),
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`Failed to submit tech idea: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Submit response:', data);
        return data;
    } catch (error) {
        console.error('submitTechIdea error:', error);
        throw error;
    }
};

export const deleteTechIdea = async (id) => {
    const response = await fetch(`${API_URL}/tech-ideas/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete tech idea');
    }
}; 