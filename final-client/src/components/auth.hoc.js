import React, {Component} from 'react';
import {connect} from 'react-redux';
import {appConstants} from "../constants/constant";

export default function (ExistingComponent) {

    class WrapperHOCComponent extends Component {

        constructor(props) {
            super(props);
            this.state = {};
        }

        static getDerivedStateFromProps(props, state) {
            if (props.loggedIn) {
                return state;
            } else {
                props.history.push(appConstants.loginRoute); // redirect user to login page.
                return state;
            }
        }

        render() {
            return (
                <ExistingComponent {...this.props} />
            );
        }
    }

    function mapStateToProps({loggedIn}) {
        return {loggedIn};
    }

    return connect(mapStateToProps)(WrapperHOCComponent);
}
