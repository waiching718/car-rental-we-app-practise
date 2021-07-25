import axios from 'axios';
import qs from 'qs';
import {appConstants} from "../constants/constant";

const API_URL = process.env.REACT_APP_API_URL;

export function login(user, callback) {
    const promise = axios.post(`${API_URL}/login`, qs.stringify(user), {withCredentials: true})
        .then(res => {
            //console.log('.then()',res);
            callback(res);
            return res;
        })
        .catch(res =>{
            //console.log('.catch()',res);
            callback('error');
            return res;
        });
    return {
        type: appConstants.LOGIN,
        payload: promise
    }
}
export function register(user, callback){
    const promise = axios.post(`${API_URL}/users`, user)
        .then(res => {
            callback(res);
            return res;
        });
    return {
        type: appConstants.REGISTER,
        payload: promise
    }
}

export function logout(callback) {
    const promise = axios.post(`${API_URL}/logout`, null, {withCredentials: true})
        .then(res => {
            callback(res);
            return res;
        });
    return {
        type: appConstants.LOGOUT,
        payload: promise
    }
}

export function checkLogin() {
    const promise = axios.get(`${API_URL}/checklogin`, {withCredentials: true});
    return {
        type: appConstants.CHECK_LOGIN,
        payload: promise
    }
}
