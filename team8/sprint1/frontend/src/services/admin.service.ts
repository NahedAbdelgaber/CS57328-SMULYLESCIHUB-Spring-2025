import axios from 'axios';
import authService from './auth.service';
import { AdminAnalyticsData } from '../types';

const API_URL = 'http://localhost:8080/api';

class AdminService {
  getAllUsers() {
    return axios.get(`${API_URL}/admin/users`, {
      headers: authService.getAuthHeader(),
    });
  }

  getAnalytics(): Promise<AdminAnalyticsData> {
    return axios
      .get(`${API_URL}/analysis/admin/analytics`, {
        headers: authService.getAuthHeader(),
      })
      .then((response) => response.data);
  }

  getDepartmentAnalytics() {
    return axios.get(`${API_URL}/admin/analytics/departments`, {
      headers: authService.getAuthHeader(),
    });
  }

  getTopicDistribution() {
    return axios.get(`${API_URL}/admin/analytics/topics`, {
      headers: authService.getAuthHeader(),
    });
  }
}

export default new AdminService();

// 👇 Makes sure it's treated as a module under --isolatedModules
export {};
