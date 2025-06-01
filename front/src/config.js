import axios from "axios";

const isDocker = process.env.REACT_APP_DOCKER === 'true';

export const baseUrlLamp = axios.create({
    baseURL: isDocker
        ? 'http://web-product:8082/api'  // Имя сервиса в Docker
        : 'http://localhost:8082/api',    // Локальная разработка
    headers: {
        'accept': 'application/json',
    },
});

export const baseUrlOrder = axios.create({
    baseURL: isDocker
        ? 'http://web-order:8081/api'
        : 'http://localhost:8081/api',
    headers: {
        'accept': 'application/json',
    },
});

export const postUrl = axios.create({
    baseURL: isDocker
        ? 'http://web-order:8081/api'
        : 'http://localhost:8081/api',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    },
});