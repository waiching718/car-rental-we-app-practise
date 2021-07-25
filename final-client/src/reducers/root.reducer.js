import {combineReducers} from 'redux';
import AuthReducer from './auth.reducer';
import {usStatesReducer} from './us.states.reducer';
import {vehiclesReducer} from "./vehicle.reducer";
import {usersReducer} from "./user.reducer";
import {orderReducer} from "./order.reducer";
import {reviewsReducer} from "./review.reducer";
import {carTypesReducer} from "./carType.reducer";
import {extraServiceReducer} from "./extraService.reducer";
import {InsuranceReducer} from "./insurance.reducer";
import {penaltiesReducer} from "./penalties.reducer";

const rootReducer = combineReducers({
    loggedIn: AuthReducer,
    usStates: usStatesReducer,
    vehicles: vehiclesReducer,
    users: usersReducer,
    orders: orderReducer,
    reviews: reviewsReducer,
    carTypes: carTypesReducer,
    services: extraServiceReducer,
    insurances: InsuranceReducer,
    penalties: penaltiesReducer,
});
export default rootReducer;
