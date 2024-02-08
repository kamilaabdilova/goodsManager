// заменить на свою
import axios from 'axios';

import $api from '@/http'


const API_URL = "http://localhost:8080";

async function registerUser(username, email, password, confirmPassword) {
    console.log('we are in service');
    const params = {
        email: email,
        password: password,
        username: username,
        confirmPassword: confirmPassword
    };
    console.log('params is: ', params);
    const response = await axios.post(API_URL + '/auth/registration', params);
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
