import {appConstants} from "../constants/constant";

export const orderReducer = (state = null, action) =>{
    switch(action.type){
        case appConstants.POST_RESERVATION:
            console.log('asdasdsads',action.payload);
            return action.payload.success? [...state, action.payload.order] : state;
        case appConstants.POST_WALKINORDER:
            return state;
        case appConstants.PUT_ORDER:
            return state;
        case appConstants.PUT_MODIFYORDER:
            return state;
        case appConstants.PUT_CANCELORDER:
            return state;
        case appConstants.PUT_CLOSEORDER:
            return state;
        case appConstants.GET_RESERVATION:
            return action.payload.data?  action.payload.data:  null;
        default:
            return state;
    }
}
