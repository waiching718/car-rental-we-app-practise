import React, {Component} from "react";
import {Container} from "@material-ui/core";
import {Card, Button, Drawer, Row, Col, Divider} from "antd";



class ShowOrder extends Component{

    state={
        showDetail: false
    }

    showDetail = (order) =>{
        this.setState({
            showDetail: true,
            order
        })
    }
    onClose = () => {
        this.setState({
            showDetail: false
        })
    };

    render(){
        return(
            <Container style={{paddingTop: '100px'}}>
                Your orders:
                {
                    this.props.orders && this.props.orders.map(order => (
                        <Card title="Order" bordered={false} style={{ width: 300 }} key={order.id}>
                            <p>Order Status: {order.status}</p>
                            <p>End Date: {order.end_Date.slice(0,10)}</p>
                            <p>Start Date: {order.start_Date.slice(0,10)}</p>
                            <p>Order Date: {order.order_Date.slice(0,10)}</p>
                            <p>Total: {order.total}</p>
                            <Button onClick={this.showDetail}>Show details</Button>
                            <Drawer
                                title="Order Detail"
                                placement="right"
                                closable={false}
                                onClose={this.onClose}
                                visible={this.state.showDetail}
                                width ={512}
                            >
                                <Card key={order.id}>
                                    <Row>

                                            <img src={order.vehicle.image} alt="carImage" style={{height: '200px',width:'370px'}}/>
                                    </Row>
                                    <Row>
                                            <p>{`${order.vehicle.year} ${order.vehicle.brand} ${order.vehicle.model} ${order.vehicle.color}`}</p>
                                    </Row>
                                    <Divider/>
                                    <Row>
                                            <h4>Add-on service:</h4>
                                            {order.services !== '' && order.services.map(s=>(
                                                <div key={s.id}>
                                                    <p>{s.name}</p>
                                                </div>
                                            ))}
                                    </Row>
                                    <Divider/>
                                    <Row>
                                            <h4>Insurance:</h4>
                                            {order.insurances.length !== 0 ?
                                                (
                                                    <div>
                                                        <p>{order.insurances[0].type}</p>
                                                    </div>
                                                ):
                                                <p>None</p>
                                            }
                                    </Row>
                                    <Divider/>
                                    <Row>
                                            <h4>Fines:</h4>
                                            {order.penalties.length === 0 ?  null:
                                                order.penalties.map(p => (
                                                    <div id={p.id}><p>{p.name} : ${p.price}<br/></p></div>
                                                ))
                                            }
                                    </Row>
                                </Card>
                            </Drawer>
                        </Card>
                    ))
                }
            </Container>
        );
    }
}
export default ShowOrder;

