import {appConstants} from "../constants/constant";

export const reviewsReducer = (state = null, action) =>{
    switch(action.type){
        case appConstants.GET_REVIEWS:
            return action.payload.data ? action.payload.data : null;
        default:
            return state;
    }
}
