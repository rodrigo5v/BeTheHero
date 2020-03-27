//essa paste serve para realizar toda comunicação entre backend-frontend
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export default api;