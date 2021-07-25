import {appConstants} from "../constants/constant";

export const InsuranceReducer = (state= null, action) =>{
    switch(action.type){
        case appConstants.GET_INSURANCES:
            return action.payload.data? action.payload.data: state;
        default:
            return state;
    }
}
