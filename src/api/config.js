import axios from 'axios'

export const API_URL = 'https://techvanapi.onrender.com/api/v1'

export default function init() {
  axios.defaults.baseURL = API_URL
  axios.defaults.withCredentials = false
}
