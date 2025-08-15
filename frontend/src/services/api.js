import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export async function getLogs(params = {}) {
  const res = await axios.get(`${API_BASE}/logs`, { params });
  return res.data;
}
