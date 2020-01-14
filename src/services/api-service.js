import {  config } from '../config/config';
import axios from 'axios';

const connectionURL = config.ip+':'+config.port;

const userEndpoint = '/users';
const authEndPoint= '/authenticate';
const addUserEndPoint = '/addUser';
const logoutEndpoint = '/logout';

export const api = {
    authenticate: (user) => {
        return axios.post(connectionURL+userEndpoint+authEndPoint, user);
    },
    addUser: (user) => {
        return axios.post(connectionURL+userEndpoint+addUserEndPoint, user);
    },
    logout: (token) => {
        return axios.delete(connectionURL+userEndpoint+logoutEndpoint, {token: token});
    }
};