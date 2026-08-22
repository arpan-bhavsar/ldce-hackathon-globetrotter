import axios from 'axios';

// This connects React to your Express server!
const API = axios.create({ baseURL: 'http://localhost:3001/api' });

// Automatically attach the user's token to every request if they are logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginUser = (formData) => API.post('/auth/login', formData);
export const registerUser = (formData) => API.post('/auth/register', formData);
export const fetchTrips = () => API.get('/trips');
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const fetchTripDetails = (id) => API.get(/trips/${id});
export const addActivityToTrip = (id, activityData) => API.post(/trips/${id}/activities, activityData);