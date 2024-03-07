import axios from "axios";
import md5 from 'md5';

const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const password = 'Valantis';

export const host = axios.create({
    baseURL: 'https://api.valantis.store:41000',
    headers: {
        "X-Auth": md5(`${password}_${stamp}`)
    },
});

host.interceptors.response.use(function (response) {
    return response;
}, async function (error) {

    if (error.response.status === 500) {

        console.log(`Код ошибки: ${error.code}, Сообщение: ${error.message}, Имя ошибки: ${error.name}`);

        const config = error.config;

        if (!config.retryCounter) {
            config.retryCounter = 1;
        } else {
            config.retryCounter++;
        }

        if (config.retryCounter > 3) {
            return Promise.reject(error);
        }
        return axios(config);
    }
    return Promise.reject(error);
});

export const getId = async (offset, limit) => {
    return host.post('/', {
        action: "get_ids",
        params: { "offset": offset, "limit": limit }
    });
}
export const getItems = async (productsId) => {
    return host.post('/', {
        "action": "get_items",
        "params": { "ids": productsId }
    });
}
export const filter = async (key, value) => {
    return host.post('/', {
        "action": "filter",
        "params": { [key]: value }
    });
}


