import axios from 'axios'

//'http://localhost:5000'
//http://localhost:5000/images/ 

const API = axios.create({ baseURL: 'https://kingdomaa.onrender.com' });

export const createChat = (data) => API.post('/chat/', data);

export const userChats = (id) => API.get(`/chat/${id}`);

export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);