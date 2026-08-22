import axios, { type InternalAxiosRequestConfig } from 'axios';
import type { User, Trip, Activity, Post } from './types';

// This connects React to your Express server!
const API = axios.create({ baseURL: 'http://localhost:3001/api' });

// Automatically attach the user's token to every request if they are logged in
API.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && req.headers) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginUser = (formData: Partial<User>) => API.post('/auth/login', formData);
export const registerUser = (formData: Partial<User>) => API.post('/auth/register', formData);
export const fetchMe = () => API.get('/auth/me');
export const updateProfile = (formData: Partial<User>) => API.put('/auth/me', formData);

// Dashboard (Trips)
export const fetchTrips = () => API.get('/trips');
export const createTrip = (newTrip: Partial<Trip>) => API.post('/trips', newTrip);

// Community (Posts)
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost: Partial<Post>) => API.post('/posts', newPost);

// Itinerary (Activities)
export const fetchTripDetails = (id: string) => API.get(`/trips/${id}`);
export const addActivityToTrip = (id: string, activityData: Partial<Activity>) => API.post(`/trips/${id}/activities`, activityData);
export const deleteTrip = (id: string) => API.delete(`/trips/${id}`);

export const fetchDestinations = () => API.get('/destinations');
export const fetchAdminStats = () => API.get('/admin/stats');

export default API;