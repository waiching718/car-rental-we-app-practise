import {appConstants} from "../constants/constant";

export const usersReducer = (state = null, action) =>{
    switch(action.type){
        case appConstants.GET_USERS:
            return action.payload.data ? action.payload.data : null;
        default:
            return state;
    }
}
