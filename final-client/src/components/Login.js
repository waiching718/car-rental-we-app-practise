import React, {Component} from "react";
import { Form, Input, Button, message} from "antd";
import {login} from '../actions/auth.action';
import {connect} from 'react-redux';
import {reduxForm} from "redux-form";
import {NavLink} from "react-router-dom";
import {appConstants} from "../constants/constant";
import Container from "@material-ui/core/Container";
import '../css/Login.scss';

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 16,
    },
};

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = { isLoginSuccess: '' };
    }

    error = () => {
        message.error('login failed');
    };

    success = () => {
        message.success('Successfully logged in, redirecting to home page...');
    };

    onSubmit = user => {
        console.log('login with:', user);
        this.props.login(user, (res)=>{
            console.log(res);
            if(res === 'error'){
                console.log('login failed');
                this.error();
                this.setState({isLoginSuccess: false});
            }else{
                this.success();
                setTimeout(() => {
                    this.props.history.push(appConstants.homeRoute);
                },1000);
            }
        });
    };

    onSubmitFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render(){
        return (
            <Container  style={{paddingTop: '100px'}}>
                    <Form {...layout} className="loginForm" name="basic" initialValues={{ remember: true }}
                          onFinish={this.onSubmit}
                          onFinishFailed={this.onSubmitFailed}>
                        <Form.Item label="Username" name="username"
                                   rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Password" name="password"
                                   rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <NavLink to={appConstants.registerRoute} style={{float: 'right'}}>
                                <Button type="primary">
                                    Register
                                </Button>
                            </NavLink>
                        </Form.Item>
                        {this.props.initialValues? this.props.initialValues.username : 'None'}
                    </Form>
            </Container>

        );
    }

}

function mapStateToProps(state) {
    return {
        initialValues: {
            username: '',
            password: ''
        }
    }
}
export default connect(mapStateToProps, {login})(
    reduxForm({
        form: 'LoginForm'
    })
    (Login)
);
