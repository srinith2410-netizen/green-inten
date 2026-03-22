import axios from 'axios';
import API_URL from '../config';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Auth
export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);

// Public OTP + Aadhaar
export const sendOtp = (data) => api.post('/auth/public/send-otp', data);
export const verifyOtp = (data) => api.post('/auth/public/verify-otp', data);

// Collector
export const getCollectorDashboard = () => api.get('/collector/dashboard');
export const getCollectorLocation = (requestId) => api.get(`/collector/location/${requestId}`);

// Public requests
export const sendWasteRequest = (data) => api.post('/public/request', data);

export default api;
