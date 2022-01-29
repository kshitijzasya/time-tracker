import axios from 'axios';
import { API } from '../config/api';

const API_URL = API.url;

var defaultOptions = {
    headers: {
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Headers": "*"
      }
}

export default {
    GET: (url) => {
        return axios.get(`${API_URL}${url}`, {...defaultOptions})
            .then(response => response)
            .catch(error => ({'status': 'error', 'message': error}));
    },
    POST: (url, data) => {
        return axios.post(`${API_URL}${url}`, data, {...defaultOptions})
            .then(response => response)
            .catch(error => ({'status': 'error', 'message': error}))
    }
};