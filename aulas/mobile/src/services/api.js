import axios from 'axios';

const api = axios.create({
    baseURL: 'http:192.168.0.107:3333' //ip da máquina

});

export default api;