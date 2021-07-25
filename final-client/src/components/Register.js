import React, {Component} from 'react';
import {Button, Form, Input, message } from "antd";
import {connect} from "react-redux";
import {register} from "../actions/auth.action";
import {Container} from "@material-ui/core";

//const { Option } = Select;


class Register extends Component{

    constructor(props) {
        super(props);
        this.state = {
            newUser : {
                username: '',
                password: ''
            }
        }
    }

    onFinish = values =>{
        console.log('Received values of form: ', values);
        this.setState({
                newUser:{
                    username: values.username,
                    password: values.password,
                    userDetail:{
                        email: values.email,
                        phone: values.phone,
                        name:values.name,
                        address: values.address,
                        city: values.city,
                        state: values.state,
                        zip: values.zip,
                    }
                }
            }
        )
        let newUser = {
            username: values.username,
            password: values.password,
            userDetail:{
                email: values.email,
                phone: values.phone,
                name:values.name,
                address: values.address,
                city: values.city,
                state: values.state,
                zip: values.zip,
            }
        }
        this.props.register(newUser, (res) => {
            console.log(res.data);
            if(res.data.success === false){
                message.error('Registration failed, user already exist');
            }else{
                message.success('Successfully register, please check your email and login');
                setTimeout(() => {
                    this.props.history.push('/login');
                },1000);
            }
        });
    }

    onChange = (values) =>{
        console.log(values.target.value);
    }

    render(){
        return(
            <Container style={{paddingTop: '100px'}} >
                <Form name="complex-form" onFinish={this.onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onChange={this.onChange}>
                    <Form.Item label="Username" name="username"  rules={[{ required: true, message: 'Username is required'}, ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || (getFieldValue('username').length > 5 &&  getFieldValue('username').length < 15) ){
                                return Promise.resolve();
                            }
                            return Promise.reject('Username has to be longer than 6 and shorter than 15 characters');
                        },
                    })]}>
                        <Input style={{ width: 320}} />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Password is required'}]}>
                        <Input.Password style={{ width: 320 }} />
                    </Form.Item>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required'}]}>
                        <Input style={{ width: 320 }} />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email is required'},{
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },]}>
                        <Input style={{ width: 320 }} />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Phone is required'},{len: 10, message:'phone number needs to be 10 digit'},
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || !isNaN(getFieldValue('phone')) ){
                                    return Promise.resolve();
                                }
                                return Promise.reject('Phone number has to be digit only');
                            },
                    })]}>
                        <Input style={{ width: 320 }} />
                    </Form.Item>
                    <Form.Item label="Address" name="address">
                        <Input style={{ width: 320 }} />
                    </Form.Item>
                    <Form.Item label="City" name="city">
                        <Input style={{ width: 320 }} />
                    </Form.Item>
                    <Form.Item label="State" name="state">
                        <Input style={{ width: 320 }} />
                    </Form.Item>
                    <Form.Item label="Zip" name="zip">
                        <Input style={{ width: 320 }} />
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 16, span: 4}} >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Container>
        );
    }
}
export default connect(null,{register})(Register);
