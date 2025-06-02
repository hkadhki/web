import axios from "axios";



export const baseUrlLamp = axios.create({
    baseURL: 'http://localhost:8082/api',    // Локальная разработка
    headers: {
        'accept': 'application/json',
    },
});

export const baseUrlOrder = axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        'accept': 'application/json',
    },
});

export const postUrl = axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export const postUrlAdmin = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    },
});