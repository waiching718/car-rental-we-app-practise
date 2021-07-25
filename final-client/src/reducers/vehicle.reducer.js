import {appConstants} from "../constants/constant";

export const vehiclesReducer = (state = null, action) =>{
    switch(action.type){
        case appConstants.GET_VEHICLES:
            return action.payload.data ? action.payload.data : null;
        default:
            return state;
    }
}
