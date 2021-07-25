import React, {Component} from "react";
import {Container} from "@material-ui/core";
import {Button, Form, Input, Card, message} from "antd";
import {connect} from "react-redux";
import reqwest from "reqwest";
import {logout} from "../actions/auth.action";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

class EditUser extends Component{
    static getDerivedStateFromProps (newProps, oldState) {
        console.log(newProps);
        return{
            username: newProps.loggedIn.username,
            name: newProps.loggedIn.userDetail.name,
            phone: newProps.loggedIn.userDetail.phone,
            email: newProps.loggedIn.userDetail.email,
            address: newProps.loggedIn.userDetail.address,
            city: newProps.loggedIn.userDetail.city,
            state: newProps.loggedIn.userDetail.state,
            zip: newProps.loggedIn.userDetail.zip,
        }
    }

    constructor(props) {
        super(props);
        this.state={
                username: '',
                name: '',
                phone: '',
                email: '',
                address: '',
                city: '',
                state: '',
                zip: '',
            }
        ;
    }

    onFinish = values => {

        let id = this.props.loggedIn.userDetail.id;
        const formData = {...values, id: id};
        console.log('Values:', values);
        console.log('formData:', formData);

        reqwest({
            url: `${process.env.REACT_APP_API_URL}/user-details`,
            type: 'json',
            method: 'put',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: res => {
               console.log(res);
            },
        });
        setTimeout( () =>{
            message.success("Successfully updated information!! Please login again");
        },500);
        setTimeout( () =>{
            this.props.logout((res) => {
                if (res.data && res.data.success) {
                    this.props.history.push('/home');
                }
            });
        },1000);
        //this.props.history.goBack();

    };

    render() {
        return(
            <Container style={{paddingTop:'100px'}}>
                <Card title="Edit your information" bordered={true} >
                    <Form  {...layout} name="editForm" onFinish={this.onFinish} initialValues={{
                        name: this.state.name,
                        phone: this.state.phone,
                        email: this.state.email,
                        address: this.state.address,
                        city: this.state.city,
                        state: this.state.state,
                        zip: this.state.zip
                    }}>
                        <Form.Item label="Name" name="name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Phone" name="phone">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Address" name="address">
                            <Input />
                        </Form.Item>
                        <Form.Item label="City" name="city">
                            <Input />
                        </Form.Item>
                        <Form.Item label="State" name="state">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Zip" name="zip">
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Container>
        );
    }
}

function mapStateToProps({loggedIn}){
    return {loggedIn};
}
export default connect(mapStateToProps, {logout})(EditUser);
