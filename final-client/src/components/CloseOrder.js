import React, {Component} from 'react';
import {Container} from '@material-ui/core';
import {connect} from "react-redux";
import {closeOrder, getReservations} from "../actions/order.action";
import {Button, Card, Collapse, Typography, Tabs, Input, message, Row, Col, Divider, Result} from 'antd';
import Penalty from "./Penalty";
import {getUsers} from "../actions/user.action";

const {Panel} = Collapse;
const {TabPane} = Tabs;
const {Search} = Input;

class CloseOrder extends Component{

    componentDidMount() {
        !this.props.orders && this.props.getReservations();
        !this.props.users && this.props.getUsers();
    }

    state={
        tab: "1",
        user: '',
        closingOrder: '',
        penalties: [],
        sum : 0,
    }

    searchOrder = (values) =>{
        let id = +values;
        let order = this.props.returnOrders.find(o =>{
            return o.id === id;
        });
        //console.log(order);
        if(order !== undefined){
            this.setState({closingOrder:order});
        }else{
            message.error("Cannot find order!");
        }
    }

    searchUser = (id) =>{
        //console.log(id);
        let order = this.props.returnOrders.find(o => {
            return o.id === id ;
        })
       //console.log(order);
        this.props.users.forEach(u =>{
            u.orderList.forEach(o =>{
                //console.log(o.id)
                if(o.id === order.id){
                    this.setState({
                        user:u
                    })
                }
            })
        })
    }

    getPenalties = (penalties) =>{
        //console.log('in close',penalties);
        if(penalties === 'back'){
            this.setState({
                tab: "1",
            });
        }else{
            let sum = 0;
            penalties.penalties.forEach(p =>{
                sum += p.price;
            });
            this.setState({penalties:penalties.penalties,
                descriptions: penalties.descriptions,
                tab:"3",
                sum
            });
        }
    }

    updateOrder = () =>{
        let newTotal = this.state.sum;
        newTotal += this.state.closingOrder.total;
        let updateOrder = {
            id: this.state.closingOrder.id,
            penalties: this.state.penalties,
            total: newTotal,
            status: 'CLOSE'
        }
        console.log("update order pass this -->", updateOrder );
        this.props.closeOrder(updateOrder);
    }

    render(){
        return(
            <Container style={{paddingTop: '100px'}}>
                <Tabs defaultActiveKey="1" activeKey={this.state.tab}>
                    <TabPane tab="Find order" key="1">
                        <Typography>
                            Input order number
                            <br/>
                            <Search
                                placeholder="id"
                                enterButton
                                size="large"
                                onSearch={this.searchOrder}
                                style={{width: '200px'}}
                            />
                            <br/>
                        </Typography>
                        {this.state.closingOrder && (
                            <Card key={this.state.closingOrder.id}>
                                <p>Order #{this.state.closingOrder.id} </p>
                                <p>Status: {this.state.closingOrder.status}</p>
                                <p>Total: {this.state.closingOrder.total}</p>
                                <p>Order Date: {this.state.closingOrder.order_Date.slice(0,10)}</p>
                                <p>Start Date: {this.state.closingOrder.start_Date.slice(0,10)}</p>
                                <p>End Date: {this.state.closingOrder.end_Date.slice(0,10)}</p>
                                {this.state.closingOrder.status === 'RETURN' && (
                                    <Typography>
                                        <Button onClick={()=>{
                                            this.setState({tab:"2", closingOrder: this.state.closingOrder});
                                            this.searchUser(this.state.closingOrder.id);
                                        }
                                        }>Close Order</Button>
                                    </Typography>
                                )}
                            </Card>
                        )}

                        {this.props.returnOrders && (
                            <Collapse accordion>
                                <Panel header="Orders" key="orders">
                                    {this.props.returnOrders.map(order=>(
                                        <Card key={order.id}>
                                            <p>Order # {order.id}</p>
                                            <p>Status: {order.status}</p>
                                            <p>Total: {order.total}</p>
                                            <p>Order Date: {order.order_Date.slice(0,10)}</p>
                                            <p>Start Date: {order.start_Date.slice(0,10)}</p>
                                            <p>End Date: {order.end_Date.slice(0,10)}</p>
                                            <Typography>
                                                <Button onClick={()=>{
                                                    this.setState({tab:"2", closingOrder: order});
                                                    this.searchUser(order.id);
                                                }
                                                }>Close Order</Button>
                                            </Typography>
                                        </Card>
                                    ))}
                                </Panel>
                            </Collapse>
                        )}
                    </TabPane>
                    <TabPane tab="Extra fee" key="2">
                        <Penalty callback={this.getPenalties}/>
                    </TabPane>
                    <TabPane tab="Confirm" key="3">
                        {this.state.closingOrder && (
                            <Card title={`closingOrder confirmation`} key={this.state.closingOrder.id}>
                                <Row>
                                    <Col span={4}>
                                        <img src={this.state.closingOrder.vehicle.image} alt="carImage" style={{height: '200px',width:'370px'}}/>
                                    </Col>
                                    <Col offset={6} span={14}>
                                        <p>Vehicle: {`${this.state.closingOrder.vehicle.year} ${this.state.closingOrder.vehicle.brand} ${this.state.closingOrder.vehicle.model}`}</p>
                                        <p>Color: {this.state.closingOrder.vehicle.color}</p>
                                    </Col>
                                </Row>
                                <Divider/>
                                <Row>
                                    <Col span={6}>
                                        <h2>Renter's information:</h2>
                                        {this.state.user && (
                                            <>
                                            <p>Name: {this.state.user.userDetail.name}</p>
                                            <p>Phone: {this.state.user.userDetail.phone}</p>
                                            <p>Email: {this.state.user.userDetail.email}</p>
                                            </>
                                        )}

                                    </Col>
                                    <Col offset={6} span={6}>
                                        <h2>Order:</h2>
                                        <p>Reserved date: {this.state.closingOrder.order_Date.slice(0,10)}</p>
                                        <p>Picked date: {this.state.closingOrder.start_Date.slice(0,10)}</p>
                                        <p>Return date: {this.state.closingOrder.end_Date.slice(0,10)}</p></Col>
                                </Row>
                                <Divider/>
                                <Row>
                                    <Col span={8}>
                                        <h4>Add-on service:</h4>
                                        {this.state.closingOrder.services !== '' && this.state.closingOrder.services.map(s=>(
                                            <div key={s.id}>
                                                <p>{s.name}</p>
                                            </div>
                                        ))}
                                        <h4>Insurance:</h4>
                                        {this.state.closingOrder.insurance && this.state.closingOrder.insurance !== ''?
                                            (
                                                <div>
                                                    <p>{this.state.closingOrder.insurances[0].type}</p>
                                                </div>
                                            ):
                                            <p>None</p>
                                        }
                                    </Col>
                                    <Col offset={4} span={8}>
                                        <h4>Fines:</h4>
                                        {this.state.penalties.length === 0 ?  null:
                                            this.state.penalties.map(p => (
                                                <p>${p.name} : ${p.price} {p.name === 'Damages' && (<p> Description: {this.state.descriptions}</p>)}</p>
                                            ))
                                        }
                                        <p>Total: {this.state.penalties.length === 0? 0: this.state.sum}</p>
                                    </Col>
                                </Row>
                            </Card>
                        )}
                        <Button onClick={()=>this.setState({tab:"2"})}>Back</Button>
                        <Button onClick={()=>{this.setState({tab:"4"});this.updateOrder()}}>Next</Button>
                    </TabPane>
                </Tabs>
                {this.state.tab === "4" && (
                    <Result
                        status="success"
                        title="Successfully Close Order!"
                        extra={<Button type="primary" key="homePage" onClick={()=>this.props.history.push('/home')}>Home</Button>}
                    />
                )}
            </Container>
        );
    }
}

function mapStateToProps({orders,users}){
    let returnOrders = orders && orders.filter(o => {
        return o.status === 'RETURN'
    });
    return {returnOrders,users};
}

export default connect(mapStateToProps,{getReservations,getUsers, closeOrder})(CloseOrder);
