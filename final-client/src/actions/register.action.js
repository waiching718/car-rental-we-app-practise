import axios from "axios";
import {appConstants} from "../constants/constant";

export function register(user){
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/users`, user)
    return {
        type: appConstants.REGISTER,
        payload: promise
    }
}

export function registerRep(user, callback){
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/usersRep`, user).then(res => {
        callback(res);
        return res;
    });
    return{
        type:appConstants.REGISTER,
        payload: promise
    }
}

export function registerIns(user, callback){
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/usersIns`, user).then(res => {
        callback(res);
        return res;
    });
    return{
        type:appConstants.REGISTER,
        payload: promise
    }
}
