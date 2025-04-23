import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://itx-frontend-test.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
