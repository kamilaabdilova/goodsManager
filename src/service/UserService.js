// заменить на свою
import axios from 'axios';

import $api from '@/http'


const API_URL = "http://localhost:8081";

async function registerUser(surname, name, patronymic, typeOfClient, discount) {
    console.log('we are in service');
    const params = {
        surname: surname,
        name: name,
        patronymic: patronymic,
        typeOfClient: typeOfClient,
        discount: discount
    };
    console.log('params is: ', params);
    const response = await $api.post( '/clients', params);
    console.log(response);
    return response;
}

async function authUser(payload) {
    try {

        const response = await $api.post('/authenticate', {
            password: payload.password,
            pin: payload.pin,
            filCode: payload.filCode
        })

        return {
            user: response.data,
            status: response.status }
    } catch (e) {
        // return { error: e.response.data, status: e.response.status }
    }
}


export default {
    registerUser,
    authUser
};
