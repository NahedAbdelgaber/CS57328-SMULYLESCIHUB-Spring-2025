import axios from 'axios';
import authService from './auth.service';
import {
  ResearcherProfile,
  Document,
  WordCloudData,
  TopicPieChartData,
  KeywordBarChartData,
  TopicTrendData
} from '../types';

const API_URL = 'http://localhost:8080/api';

class ResearcherService {
  // Researcher Profile Methods
  getResearcherProfile() {
    return axios.get(`${API_URL}/researchers/me`, {
      headers: authService.getAuthHeader()
    });
  }

  getResearcherById(id: number) {
    return axios.get(`${API_URL}/researchers/${id}`, {
      headers: authService.getAuthHeader()
    });
  }

  getPublicResearcherProfile(id: number) {
    return axios.get(`${API_URL}/researchers/${id}/public`);
  }

  updateResearcherProfile(id: number, profile: ResearcherProfile) {
    return axios.put(`${API_URL}/researchers/${id}`, profile, {
      headers: authService.getAuthHeader()
    });
  }

  createResearcherProfile(profile: ResearcherProfile) {
    return axios.post(`${API_URL}/researchers`, profile, {
      headers: authService.getAuthHeader()
    });
  }

  // Document Methods
  getAllDocuments() {
    return axios.get(`${API_URL}/documents`, {
      headers: authService.getAuthHeader()
    });
  }

  getDocumentById(id: number) {
    return axios.get(`${API_URL}/documents/${id}`, {
      headers: authService.getAuthHeader()
    });
  }

  uploadDocument(file: File, title: string, documentType: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('documentType', documentType);

    return axios.post(`${API_URL}/documents/upload`, formData, {
      headers: {
        ...authService.getAuthHeader(),
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  deleteDocument(id: number) {
    return axios.delete(`${API_URL}/documents/${id}`, {
      headers: authService.getAuthHeader()
    });
  }

  // Analysis Methods
  getWordCloudData(researcherId: number): Promise<WordCloudData> {
    return axios.get(`${API_URL}/analysis/keywords/${researcherId}`, {
      headers: authService.getAuthHeader()
    }).then(response => response.data);
  }

  getTopicPieChartData(researcherId: number): Promise<TopicPieChartData> {
    return axios.get(`${API_URL}/analysis/topics/${researcherId}`, {
      headers: authService.getAuthHeader()
    }).then(response => response.data);
  }

  getTopicTrendData(researcherId: number): Promise<TopicTrendData> {
    return axios.get(`${API_URL}/analysis/trends/${researcherId}`, {
      headers: authService.getAuthHeader()
    }).then(response => response.data);
  }

  getKeywordBarChartData(researcherId: number, limit: number = 20): Promise<KeywordBarChartData> {
    return axios.get(`${API_URL}/analysis/keyword-frequency/${researcherId}?limit=${limit}`, {
      headers: authService.getAuthHeader()
    }).then(response => response.data);
  }

  getDashboardData(researcherId: number) {
    return axios.get(`${API_URL}/analysis/dashboard`, {
      headers: authService.getAuthHeader()
    }).then(response => response.data);
  }
}

export default new ResearcherService();

// 👇 Ensure valid TypeScript module
export {};
