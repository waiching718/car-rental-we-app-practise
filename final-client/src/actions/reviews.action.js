import axios from 'axios';
import {appConstants} from "../constants/constant";

export const getReviews = () =>{
    const getReviewsPromise = axios.get(
        `${process.env.REACT_APP_API_URL}/reviews`
    );
    return {
        type: appConstants.GET_REVIEWS,
        payload: getReviewsPromise
    }
}
