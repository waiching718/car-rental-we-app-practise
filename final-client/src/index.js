import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from "react-router-dom";
import {Switch} from "react-router";
import {appConstants} from "./constants/constant";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import 'antd/dist/antd.css';
import auth from './components/auth.hoc';
import {Provider} from "react-redux";
import rootReducer from "./reducers/root.reducer";
import {applyMiddleware, createStore} from 'redux';
import ReduxPromise from 'redux-promise';
import Logout from "./components/Logout";
import Vehicles from "./components/Vehicles";
import VehicleDetail from "./components/VehicleDetail";
import MyAccount from "./components/MyAccount";
import EditUser from "./components/EditUser";
import Reservation from "./components/Reservation";
import ReviewPage from "./components/ReviewPage";
import CheckIn from "./components/CheckIn";
import Manage from "./components/Manage";
import CheckOut from "./components/CheckOut";
import VehicleList from "./components/VehicleList";
import CloseOrder from "./components/CloseOrder";
import ModifyOrder from "./components/ModifyOrder";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route path={appConstants.homeRoute} component={Home}/>
                    <Route path={appConstants.loginRoute} component={Login}/>
                    <Route path={appConstants.logoutRoute} component={Logout}/>
                    <Route path={appConstants.registerRoute} component={Register}/>
                    <Route path={appConstants.exploreVehicleRoute} component={Vehicles}/>
                    <Route path={`${appConstants.vehicleListRoute}/:type`} component={VehicleList}/>
                    <Route path={`${appConstants.vehicleDetailRoute}/:id`} component={VehicleDetail}/>
                    <Route path={appConstants.reviewsRoute} component={ReviewPage}/>
                    <Route path={appConstants.manageRoute} component={auth(Manage)}/>
                    <Route path={appConstants.checkInRoute} component={auth(CheckIn)}/>
                    <Route path={appConstants.checkOutRoute} component={auth(CheckOut)}/>
                    <Route path={appConstants.closeOrderRoute} component={auth(CloseOrder)}/>
                    <Route path={appConstants.modifyOrderRoute} component={auth(ModifyOrder)}/>

                    <Route path={`${appConstants.reservationRoute}/vehicle-:id`} component={Reservation}/>
                    <Route path={appConstants.myaccountRoute} component={auth(MyAccount)}/>
                    <Route path={`${appConstants.editUserRoute}/:username`} component={auth(EditUser)}/>

                    <Route path="**" component={Home}/>
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
