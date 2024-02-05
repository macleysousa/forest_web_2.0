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

// Infelizmente a API da Forest nos retorna erro com o status 200
api.interceptors.response.use((response) => {
  if (response.data?.status !== 'success')
    throw new Error(response.data.message);

  return response;
});

export { api };
