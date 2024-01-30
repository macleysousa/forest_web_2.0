import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use((config) => {
  const values = document.cookie.split('; ');
  const entries = values.map((v) => v.split('=', 2) as [string, string]);
  const map = new Map(entries);
  const accessToken = map.get('forest_access_token');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export { api };
