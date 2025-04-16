import axios from 'axios';
import authHeader from './auth-header';

// Factory function to create Axios instance with dynamic customField
const createCustomAPI = (customField) => {
  const API = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  // Add request interceptor to include customField in headers
  API.interceptors.request.use(
    (config) => {
      config.headers['Origin-Referrer'] = customField;
      config.headers['zz-Made-by'] = customField;

      // Include authentication headers if available
      const authHeaders = authHeader();
      if (Object.keys(authHeaders).length) {
        config.headers = { ...config.headers, ...authHeaders };
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  return API;
};

export default createCustomAPI;
