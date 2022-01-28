import axios from 'axios';
import { API } from '../config/api';

const API_URL = API.url;

export default {
    GET: (url) => {
        return axios.get(`${API_URL}${url}`)
            .then(response => response.json())
            .then(response => response.data)
            .catch(error => console.log('error in get', { url: `${API_URL}${url}`, error }));
    },
    POST: (url, data) => {
        return axios.post(`${API_URL}${url}`, data)
            .then(response => response.json())
            .then(res => res)
            .catch(err => console.log('error on post', { url: `${API_URL}${url}`, err }))
    }
};