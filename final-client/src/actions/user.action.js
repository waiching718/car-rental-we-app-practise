import axios from 'axios';
import {appConstants} from "../constants/constant";

export const getUsers = () =>{
    const getVehiclePromise = axios.get(
        `${process.env.REACT_APP_API_URL}/users`
    );
    return {
        type: appConstants.GET_USERS,
        payload: getVehiclePromise
    }
}

export const getUserbyUsername = (username) =>{
    const getVehiclePromise = axios.get(
        `${process.env.REACT_APP_API_URL}/users`, username
    );
    return {
        type: appConstants.GET_USERS,
        payload: getVehiclePromise
    }
}
