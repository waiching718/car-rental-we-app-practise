import {Container} from "@material-ui/core";
import React,{Component} from "react";
import {Tabs, Button, Typography, Card, Collapse, Empty, Input, message, Row, Col, Divider, Result} from 'antd';
import {connect} from "react-redux";
import {getUsers} from "../actions/user.action";
import {getReservations, updateOrder} from "../actions/order.action";

const {TabPane} = Tabs;
const {Search} = Input;
const { Panel } = Collapse;

class CheckOut extends Component{

    state={
        tab: "1"
    }

    componentDidMount() {
        !this.props.users && this.props.getUsers();
        !this.props.orders && this.props.getReservations();
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

    finishCheckOut = () =>{
        this.props.history.push("/home");
    }

    updateOrder = () =>{
        console.log(this.state.order);
        let updateOrder = {
            id: this.state.order.id,
            status: 'RETURN',
            total: this.state.order.total
        }
        console.log(updateOrder);
        this.props.updateOrder(updateOrder);
    }

    render(){
        return(
            <Container style={{paddingTop:'100px'}}>
                    <Tabs defaultActiveKey="1" activeKey={this.state.tab}>
                        <TabPane tab="Find Order" key="1">
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
                                                            {order.status === 'PICKUP' && (
                                                                <Typography>
                                                                    <Button onClick={()=>{
                                                                        this.setState({tab:"2", order: order})
                                                                    }
                                                                    }>Check Out</Button>
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
                        <TabPane tab="Show Order" key="2">
                            {this.state.order && (
                                <Card title={`Order confirmation`} key={this.state.order.id}>
                                    <Row>
                                        <Col span={4}>
                                            <img src={this.state.order.vehicle.image} alt="carImage" style={{height: '200px',width:'370px'}}/>
                                        </Col>
                                        <Col offset={6} span={14}>
                                            <p>Vehicle: {`${this.state.order.vehicle.year} ${this.state.order.vehicle.brand} ${this.state.order.vehicle.model}`}</p>
                                            <p>Color: {this.state.order.vehicle.color}</p>
                                        </Col>
                                    </Row>
                                    <Divider/>
                                    <Row>
                                        <Col span={6}>
                                            <h2>Renter's information:</h2>
                                            <p>Name: {this.state.user.userDetail.name}</p>
                                            <p>Phone: {this.state.user.userDetail.phone}</p>
                                            <p>Email: {this.state.user.userDetail.email}</p>
                                        </Col>
                                        <Col offset={6} span={6}>
                                            <h2>Order:</h2>
                                            <p>Reserved date: {this.state.order.order_Date.slice(0,10)}</p>
                                            <p>Picked date: {this.state.order.start_Date.slice(0,10)}</p>
                                            <p>Return date: {this.state.order.end_Date.slice(0,10)}</p></Col>
                                    </Row>
                                    <Divider/>
                                    <Row>
                                        <Col>
                                            <h4>Add-on service:</h4>
                                            {this.state.order.services !== '' && this.state.order.services.map(s=>(
                                                <div key={s.id}>
                                                    <p>{s.name}</p>
                                                </div>
                                            ))}
                                            <h4>Insurance:</h4>
                                            {this.state.order.insurances.length === 0? <p>None</p>:
                                                <div>
                                                    <p>{this.state.order.insurances[0].type}</p>
                                                </div>
                                            }
                                        </Col>
                                    </Row>
                                </Card>
                            )}
                            <Button onClick={()=>this.setState({tab:"1"})}>Back</Button>
                            <Button onClick={()=>{this.setState({tab:"3"}); this.updateOrder()}}>Next</Button>
                        </TabPane>
                        <TabPane tab="Confirm Checkout" key="3">
                            <Result
                                status="success"
                                title="Successfully Check Out!"
                                extra={<Button type="primary" key="homePage" onClick={this.finishCheckOut}>Home</Button>}
                            />
                        </TabPane>
                    </Tabs>
            </Container>
        );
    }
}

function mapStateToProps({users,orders}){
    return{
        users,
        orders
    }
}
export default connect(mapStateToProps,{getUsers,getReservations, updateOrder})(CheckOut);
