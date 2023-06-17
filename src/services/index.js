import axios from 'axios'

const API = axios.create({
  baseURL: 'https://challenge-speedio.onrender.com',
  headers: {
    'Content-type': 'application/json'
  },
  timeout: 10000
})

export default API
