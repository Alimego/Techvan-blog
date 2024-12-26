import axios from 'axios'

export const API_URL = 'https://techvanapi.onrender.com'

export default function init() {
  axios.defaults.baseURL = API_URL
  axios.defaults.withCredentials = false
}
