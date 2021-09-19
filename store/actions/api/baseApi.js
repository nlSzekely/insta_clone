import axios from 'axios';
import config from '../../../../config';

const baseApi = axios.create({
  baseURL: config.baseApiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default baseApi;
