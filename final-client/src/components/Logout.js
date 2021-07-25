import React, {Component} from 'react';
import {logout} from '../actions/auth.action';
import {connect} from 'react-redux';
import {message, Card, Button} from "antd";
import {Container} from "@material-ui/core";
import '../css/Logout.scss';

class Logout extends Component {

    handleLogout = () => {
        this.props.logout((res) => {
            if (res.data && res.data.success) {
                this.props.history.push('/home');
                message.info('You are logged out!');
            }
        });
    }

    render() {
        return (
            <Container style={{paddingTop: '100px'}} >
                <Card className="logoutCard" title="Logout" style={{ width: 240 }}>
                    <Button className="btn btn-danger" onClick={this.handleLogout}>Click to Logout</Button>
                </Card>

            </Container>

        );
    }

}
export default connect(null, {logout})(Logout);
