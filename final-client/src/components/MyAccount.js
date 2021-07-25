import React, {Component} from "react";
import Container from "@material-ui/core/Container";
import {connect} from "react-redux";
import { Card, Tabs, Button, Empty} from "antd";
import {appConstants} from "../constants/constant";
import {NavLink} from "react-router-dom";
import '../css/MyAccount.scss'
import {getUsers} from "../actions/user.action";
import ShowOrder from "./ShowOrder";

const { TabPane } = Tabs;
class MyAccount extends Component{

    constructor(props) {
        super(props);
        console.log('constructor');
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
    }

    static getDerivedStateFromProps = (newProps, oldState) =>{
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
        };
    }

    handleEdit = () =>{
        // this.setState({
        //     zip: "123"
        // });
    }

    render(){
        return(
            <Container style={{paddingTop: '100px'}} >
                Welcome
                { this.props.loggedIn &&(
                    <Tabs defaultActiveKey="1" onChange={this.change} centered>
                        <TabPane tab="My Profile" key="1">
                            <Card title="Basic Information" bordered={false} style={{ width: 300 }}>
                                <p>Username: {this.state.username}</p>
                                <p>Name: {this.state.name}</p>
                                <p>Phone: {this.state.phone}</p>
                                <p>Email: {this.state.email}</p>
                                <p>Address: {this.state.address}</p>
                                <p>City: {this.state.city}</p>
                                <p>State: {this.state.state}</p>
                                <p>Zip: {this.state.zip}</p>
                            </Card>
                            <NavLink to={`${appConstants.editUserRoute}/${this.state.username}`}>
                                <Button onClick={this.handleEdit}>Edit</Button>
                            </NavLink>
                        </TabPane>
                        <TabPane tab="Oder History" key="2">
                            {this.props.loggedIn.orderList.length === 0 ?
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
                                <ShowOrder orders={this.props.loggedIn.orderList}/>
                            }
                        </TabPane>
                    </Tabs>
                    )
                }
            </Container>

        );
    }
}

function mapStateToProps({loggedIn}){
    return {loggedIn};
}
export default connect(mapStateToProps,{getUsers})(MyAccount);
