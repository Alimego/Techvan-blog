import axios from 'axios'

export const API_URL = 'http://localhost:5001/api/v1'

export default function init() {
  axios.defaults.baseURL = API_URL
  axios.defaults.withCredentials = false
}
