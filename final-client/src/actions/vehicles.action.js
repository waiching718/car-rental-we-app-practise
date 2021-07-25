import axios from 'axios';
import {appConstants} from "../constants/constant";

export const getVehicles = () =>{
    const getVehiclePromise = axios.get(
        `${process.env.REACT_APP_API_URL}/vehicles`
    );
    return {
        type: appConstants.GET_VEHICLES,
        payload: getVehiclePromise
    }
}
