import axios from 'axios';

const viacep = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VIACEP_BASE_URL,
});

viacep.interceptors.response.use((response) => {
  if (response.data === 'erro') throw new Error('CEP não encontrado');

  return response;
});

export { viacep };
