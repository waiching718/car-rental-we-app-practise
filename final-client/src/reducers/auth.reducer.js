import {appConstants} from "../constants/constant";

export default function (state = null, action) {
    let res;
    switch (action.type) {
        case appConstants.LOGIN:
        case appConstants.CHECK_LOGIN:
            res = action.payload.data;
            console.log('res:', res);
            if (res === undefined) {
                return null;
            } else {
                return res.user;
            }
        case appConstants.LOGOUT:
            res = action.payload.data;
            if (res.success) {
                return null;
            } else {
                return state;
            }
        case appConstants.REGISTER:
            return state;
        default:
            // any action will be sent to all the reducers.
            // only reducer which can handle the action should update its state.
            // other reducers should keep its state UNCHANGED!!!
            return state;
    }
}
