import axios from 'axios';
import {appConstants} from "../constants/constant";

export const postReservation = (reservation) =>{
    const postReservationPromise = axios.post(
        `${process.env.REACT_APP_API_URL}/orders`,
        reservation
    ).then(res =>{
        return {
            order: reservation,
        }
    });
    return{
        type: appConstants.POST_RESERVATION,
        payload: postReservationPromise
    }

}
export const getReservations = () =>{
    const getReservationsPromise = axios.get(
        `${process.env.REACT_APP_API_URL}/orders`
    );
    return{
        type: appConstants.GET_RESERVATION,
        payload: getReservationsPromise
    }
}

export const updateOrder = (order) =>{
    const promise = axios.put(
        `${process.env.REACT_APP_API_URL}/orders`,
        order
    );
    return {
        type: appConstants.PUT_ORDER,
        payload: promise
    }
}

export const postWalkinOrder = (order) =>{
    const promise = axios.post(
        `${process.env.REACT_APP_API_URL}/walkinOrder`,
        order
    )

    return {
        type: appConstants.POST_WALKINORDER,
        payload: promise
    }
}

export const closeOrder = (order) =>{
    const promise = axios.put(
        `${process.env.REACT_APP_API_URL}/closeOrder`,
        order
    );
    return {
        type: appConstants.PUT_CLOSEORDER,
        payload: promise
    }
}

export const modifyOrder = (order) =>{
    const promise = axios.put(
        `${process.env.REACT_APP_API_URL}/modifyOrder`,
        order
    );
    return{
        type: appConstants.PUT_MODIFYORDER,
        payload:promise
    }
}

export const cancelOrder = (order) =>{
    const promise = axios.put(
        `${process.env.REACT_APP_API_URL}/cancelOrder`,
        order
    );
    return{
        type: appConstants.PUT_CANCELORDER,
        payload:promise
    }
}
