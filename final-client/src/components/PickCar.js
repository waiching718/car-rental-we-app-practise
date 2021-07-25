import React, {Component} from "react";
import {connect} from "react-redux";
import {getVehicles} from "../actions/vehicles.action";
import { Card, Button, Table,Space, DatePicker} from "antd";
import moment from "moment";

const {Column} = Table;

const colorFilter = [{text: 'Red', value: 'RED'}, {text: 'Blue', value: 'BLUE'}, {text: 'White', value: 'WHITE'}, {text: 'Black', value: 'BLACK'}, {text: 'Gray', value: 'GRAY'}];
const typeFilter = [{text: 'Luxury', value: 'LUXURY'}, {text: 'Sedan', value: 'SEDAN'}, {text: 'Suv', value: 'SUV'}, {text: 'Van', value: 'VAN'}, {text: 'Pickup Truck', value: 'PU-Truck'}]
const {RangePicker} = DatePicker;

class PickCar extends Component{

    state = {
        order: {
            vehicle: ''
        },
    };

    componentDidMount() {
        !this.props.vehicles && this.props.getVehicles();
    }

    formatDate = date =>{
        let arrDate = date.split('-');
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

    onDateChange = (value) =>{
        console.log(value);
        if (value !== null) {
            let a = moment(value[0]);
            let b = moment(value[1]);
            let days = b.diff(a,'days') + 1;
            let total = days * this.state.order.vehicle.price;
            let status = 'OPEN';
            let start_Date = moment(value[0]).format('DD-MM-YYYY');
            let end_Date = moment(value[1]).format('DD-MM-YYYY');
            let order_Date = moment().format('DD-MM-YYYY');
            start_Date.split('');
            start_Date = this.formatDate(start_Date);
            end_Date = this.formatDate(end_Date);
            order_Date = this.formatDate(order_Date);

            this.setState({
                days,
                order: {
                    start_Date,end_Date,order_Date, total, status,
                    vehicle: this.state.order.vehicle
                }
            });
        }
    }

    reCalculate(price, days){
        let total;
        total = price * days;
        console.log(total, price, days);
        document.getElementById("total").innerHTML = `Total: $${total}`;
    }

    render(){
        const GoodVehicles = this.props.vehicles && this.props.vehicles.filter(v=>{
            return v.status === 'T';
        })
        return(
            <div>
                <Table dataSource={GoodVehicles} size="small">
                        <Column title="Model" dataIndex="model" key="model" sorter={ (a,b) => (a.model).localeCompare(b.model)} sortDirections={['descend','ascend']} />
                        <Column title="Year" dataIndex="year" key="year" sorter={ (a,b) => a.year - b.year} sortDirections={['descend','ascend']} />
                        <Column title="Color" dataIndex="color" key="color" filters={colorFilter} onFilter={(value, record) => record.color === value}/>
                        <Column title="Price" dataIndex="price" key="price" sorter={(a, b) => a.price - b.price} sortDirections={['descend','ascend']} />
                        <Column title="Type" dataIndex="type" key="type" filters={typeFilter} onFilter={(value, record) => record.type === value} />
                        <Column title="Action" key="action" render={(vehicle) =>(
                            <Space size="middle">
                                <Button onClick={()=> {
                                    if(Number.isInteger(this.state.order.total)) this.reCalculate(vehicle.price, this.state.days);
                                    this.setState({
                                        order: {...this.state.order,
                                            vehicle: vehicle
                                        }
                                    });
                                }}>Select</Button>
                            </Space>
                        )} />
                </Table>
                <div style={{margin:'20px'}}>
                    <RangePicker onChange={this.onDateChange}/>
                </div>

                <Card>
                    <p>Order on: {this.state.order.order_Date}</p>
                    <p>Start: {this.state.order.start_Date}</p>
                    <p>End: {this.state.order.end_Date}</p>
                    <p>Vehicle: {this.state.order.vehicle && `${this.state.order.vehicle.year} ${this.state.order.vehicle.brand} ${this.state.order.vehicle.model}`}</p>
                    <p id="total">Total: ${this.state.order.total}</p>
                    <Button onClick={()=> this.props.callback(this.state.order)}>Confirm</Button>
                </Card>
            </div>
        );
    }
}

function mapStateToProps({vehicles}){
    return {vehicles};
}
export default connect(mapStateToProps,{getVehicles})(PickCar);
