import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchUser = (id) => API.get(`/users/${id}`);
export const signIn = (formData) => API.post('/users/signIn', formData);
export const signUp = (formData) => API.post('/users/signUp', formData);
export const saveCode = (id, code) => API.post(`/users/${id}/code`, code);
export const startSharing = (sharingData) => API.post('/sharing', sharingData);
export const isSharingActive = (sharingId) => API.get(`/sharing/${sharingId}/isActive`);
export const getSharing = (sharingId) => API.get(`/sharing/${sharingId}`);
export const stopSharing = (sharindId) => API.post(`/sharing/${sharindId}`);
export const joinSharing = (sharingId, user) => API.post(`/sharing/${sharingId}/join`, user);
export const getJoinedUsers = (sharingId) => API.get(`/sharing/${sharingId}/users`);
