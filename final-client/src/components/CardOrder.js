import React, {Component} from "react";
import {Card} from 'antd';

class CardOrder extends Component{
    render(){
        return(
            <Card>
                <p>Id: {this.props.order.id}</p>
                <p>Total: {this.props.order.total}</p>
                <p>Status: {this.props.order.status}</p>
                <p>Order on: {this.props.order.order_Date.slice(0,10)}</p>
                <p>Start: {this.props.order.start_Date.slice(0,10)}</p>
                <p>End: {this.props.order.end_Date.slice(0,10)}</p>
            </Card>
        );
    }
}
export default CardOrder;
