import axios from 'axios'
import getEnvVars from '../environment'

const { apiUrl } = getEnvVars();

const httpClient = axios.create({
  baseURL: apiUrl
})

/** Adding the response interceptors */
httpClient.interceptors.response.use(
  response => {
    if (response.data.error) return Promise.reject(response)
    return response;
  },
  error => {
    /** Do something with response error */
    // console.log('error reject', error.message)
    let msg = error.message
    if (error.message === 'Network Error') msg = 'chameLEONにアクセスできません。インターネット接続を確認してください。'
    return Promise.reject({ data: { error: [msg] } });
  }
);

export default httpClient
