import axios from 'axios';
import {appConstants} from "../constants/constant";

export const getInsurances = () =>{
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/insurances`);
    return {
        type: appConstants.GET_INSURANCES,
        payload: promise,
    }
}
