import React, {Component} from 'react';
import {Container} from "@material-ui/core";
import {connect} from "react-redux";
import {Button, Card, Collapse, Empty, Typography, Input, message, Tabs, Form, Result} from "antd";
import {getUsers} from "../actions/user.action";
import {cancelOrder, modifyOrder} from "../actions/order.action";

const {Search} = Input;
const {TabPane} = Tabs;
const {Panel} = Collapse;

class ModifyOrder extends Component{
    componentDidMount() {
        !this.props.users && this.props.getUsers();
    }

    state={
        tab: "1"
    }

    searchUser = (values) =>{
        let phone = values;
        console.log(values);
        let user = this.props.users.find(user => {
            if(user.userDetail !== null){
                return user.userDetail.phone === phone;
            }else{
                return false
            }
        });
        console.log(user);
        if(user!== undefined){
            this.setState({user});
        }
        else{
            message.error("User not found!");
        }
    }

    formatDate = date =>{
        let arrDate = date.split('-');
        arrDate.reverse();
        let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY',
            'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        let transMonth = '';

        switch(arrDate[1]){
            case '01':
                transMonth = months[0];
                break;
            case '02':
                transMonth = months[1];
                break;
            case '03':
                transMonth = months[2];
                break;
            case '04':
                transMonth = months[3];
                break;
            case '05':
                transMonth = months[4];
                break;
            case '06':
                transMonth = months[5];
                break;
            case '07':
                transMonth = months[6];
                break;
            case '08':
                transMonth = months[7];
                break;
            case '09':
                transMonth = months[8];
                break;
            case '10':
                transMonth = months[9];
                break;
            case '11':
                transMonth = months[10];
                break;
            case '12':
                transMonth = months[11];
                break;
            default:
                break;
        }

        arrDate[1] = transMonth;
        let formatted = arrDate.join('-');
        return formatted;
    }

    onModify = (values) =>{
        let order;
        if(values.start_Date === undefined){
            let newEndDate = this.formatDate(values.end_Date);
            order = {
                id: this.state.order.id,
                end_Date: newEndDate,
            }
        }else{
            let newEndDate = this.formatDate(values.end_Date);
            let newStartDate = this.formatDate(values.start_Date);
            order = {
                id: this.state.order.id,
                end_Date: newEndDate,
                start_Date: newStartDate,
            }
        }

        console.log('passing in ', order);
        this.props.modifyOrder(order);
        this.setState({
            tab:"3"
        })
    }

    cancelOrder = () =>{
        console.log('cancel ', this.state.order);
        let order = {
            id: this.state.order.id,
        }
        console.log('passing in ', order);
        this.props.cancelOrder(order);
        this.setState({
            tab:"3"
        })
    }

    render(){
        return(
            <Container style={{paddingTop: '100px'}}>
                <Tabs defaultActiveKey="1" activeKey={this.state.tab}>
                    <TabPane tab="Find order" key ="1">
                        <Typography>
                            Enter customer's phone to find customer.
                        </Typography>
                        <Search
                            placeholder="Phone"
                            enterButton
                            size="large"
                            onSearch={this.searchUser}
                            style={{width: '200px'}}
                        />
                        {
                            this.state.user && (
                                <Card key={this.state.user.userDetail.id}>
                                    <p>Name: {this.state.user.userDetail.name}</p>
                                    <p>username: {this.state.user.username}</p>
                                    <p>phone: {this.state.user.userDetail.phone}</p>
                                    <p>email: {this.state.user.userDetail.email}</p>
                                    <p>Address: {this.state.user.userDetail.address}</p>
                                    <p>City: {this.state.user.userDetail.city}</p>
                                    <p>State: {this.state.user.userDetail.state}</p>
                                    <p>Zip: {this.state.user.userDetail.zip}</p>
                                    {this.state.user.orderList?
                                        <Collapse accordion>
                                            <Panel header="Orders" key="orders">
                                                {this.state.user.orderList.map(order=>(
                                                    <Card key={order.id}>
                                                        <p>Status: {order.status}</p>
                                                        <p>Total: {order.total}</p>
                                                        <p>Order Date: {order.order_Date.slice(0,10)}</p>
                                                        <p>Start Date: {order.start_Date.slice(0,10)}</p>
                                                        <p>End Date: {order.end_Date.slice(0,10)}</p>
                                                        {(order.status === 'OPEN'|| order.status === 'PICKUP') && (
                                                            <Typography>
                                                                <Button onClick={()=> {
                                                                        this.setState({
                                                                            tab:"2",
                                                                            order
                                                                        })
                                                                    }
                                                                }>Modify</Button>
                                                            </Typography>
                                                        )}
                                                    </Card>
                                                ))}
                                            </Panel>
                                        </Collapse>:
                                        <Empty/>
                                    }
                                </Card>
                            )
                        }
                    </TabPane>
                    <TabPane tab="Modify" key="2">
                        {this.state.order && this.state.order.status === 'PICKUP' && (
                            <Card title="Edit your order" bordered={true} >
                                <Form  name="editForm" onFinish={this.onModify} initialValues={{
                                    end_Date: this.state.order.end_Date.slice(0,10)
                                }}>
                                    <p>Order Date: {this.state.order.order_Date.slice(0,10)}</p>
                                    <p>Pickup Date: {this.state.order.start_Date.slice(0,10)}</p>
                                    <Form.Item label="Return Date" name="end_Date">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item >
                                        <Button type="primary" htmlType="submit">
                                            Modify
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        )}
                        {this.state.order && this.state.order.status === 'OPEN' && (
                            <Card title="Edit your order" bordered={true} >
                                <Form  name="editForm" onFinish={this.onModify} initialValues={{
                                    end_Date: this.state.order.end_Date.slice(0,10),
                                    start_Date: this.state.order.start_Date.slice(0,10)
                                }}>
                                    <p>Order Date: {this.state.order.order_Date.slice(0,10)}</p>
                                    <Form.Item label="Pickup Date" name="start_Date">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Return Date" name="end_Date">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item >
                                        <Button type="primary" htmlType="submit">
                                            Modify
                                        </Button>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" onClick={this.cancelOrder}>
                                            Cancel Order
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        )}
                        <Button onClick={()=>this.setState({tab:"1"})}>Back</Button>
                    </TabPane>
                </Tabs>
                {this.state.tab === "3" && (
                    <Result
                        status="success"
                        title="Modification Succeed!"
                        extra={<Button type="primary" key="homePage" onClick={()=>{
                            this.props.history.push('/home')
                        }}>Home</Button>}
                    />
                )}

            </Container>
        );
    }
}

function mapStateToProps({users}){
    return {users};
}
export default connect(mapStateToProps,{getUsers, modifyOrder, cancelOrder})(ModifyOrder);
