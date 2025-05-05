import axios from 'axios';
import { AuthResponse } from '../types';

const API_URL = 'http://localhost:8080/';

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(`${API_URL}/auth/signin`, { username, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username: string, email: string, password: string, role: string = 'researcher') {
    return axios.post(`${API_URL}/auth/signup`, { username, email, password, role });
  }

  getCurrentUser(): AuthResponse | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  getAuthHeader() {
    const user = this.getCurrentUser();
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    } else {
      return {};
    }
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.role === role;
  }
}

export default new AuthService();

// 👇 Ensure this file is treated as a module (important for --isolatedModules)
export {};
