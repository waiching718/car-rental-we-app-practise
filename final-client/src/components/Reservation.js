import React, {Component} from "react";
import {Container} from "@material-ui/core";
import  {Typography,Button, Card, Form, Input, Steps, Row, Col, DatePicker, Tabs, Popconfirm, Result} from "antd";
import {connect} from "react-redux";
import moment from "moment";
import ConfirmationPage from "./ConfirmationPage";
import {NavLink} from "react-router-dom";
import {appConstants} from "../constants/constant";
import {postReservation} from "../actions/order.action";

const { Step } = Steps;
const {RangePicker} = DatePicker;
const {TabPane} = Tabs;

class Reservation extends Component{


    static getDerivedStateFromProps(newProps, oldState){
        console.log('getderived');
        return{
            username: newProps.loggedIn.username,
            name: newProps.loggedIn.userDetail.name,
            phone: newProps.loggedIn.userDetail.phone,
            email: newProps.loggedIn.userDetail.email,
        }
    }

    constructor(props) {
        console.log('constr');
        super(props);
        this.state={
            username: '',
            name: '',
            phone: '',
            email: '',
            startDate: '',
            endDate: '',
            step: 0,
            currTab: "1",
            credit: {
                num: '',
                exp: '',
                name: '',
                code: '',
            },
            days: 0,
            total: '',

        }
        ;
    }

    onFinish = () =>{
        console.log('onFinish');
        let newStep = this.state.step;
        let newTab = +this.state.currTab;
        newStep++;
        newTab++;
        this.setState({
            step: newStep,
            currTab: newTab.toString()
        });
    }

    onRollback = () =>{
        console.log('onRollback');
        let newStep = this.state.step;
        let newTab = +this.state.currTab;
        newStep--;
        newTab--;
        this.setState({
            step: newStep,
            currTab: newTab.toString()
        });
    }

    onDateChange = (value) =>{
        console.log(value);

        let a = moment(value[0]);
        let b = moment(value[1]);
        let days = b.diff(a,'days') + 1;
        let total = days * this.props.vehicle.price;

        let startDate = moment(value[0]).format('DD-MM-YYYY');
        let endDate = moment(value[1]).format('DD-MM-YYYY');
        startDate.split('');
        startDate = this.formatDate(startDate);
        endDate = this.formatDate(endDate);

        this.setState({
            startDate,endDate,days, total
        });
    }
    onConfirmation = (value) =>{
        let today = moment().format('DD-MM-YYYY');
        today = this.formatDate(today);
        let reservation = {
            order_Date: today,
            start_Date: this.state.startDate,
            end_Date: this.state.endDate,
            status:'OPEN',
            user:{
                id: this.props.loggedIn.userDetail.id
            },
            vehicle:{
                id: this.props.vehicle.id
            },
            total: this.state.total,
        };
        console.log('post this order --->',reservation);
        this.props.postReservation(reservation);
        this.onFinish();

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
    onFinishForm = (values) =>{
        console.log(values);
        this.setState({
            credit: {
                num: values.cardNumber,
                exp: values.expDate,
                name:values.cardHolderName,
                code: values.code,
            }
        });
        console.log('onfinshed');
        this.onFinish();
    }

    render() {
        return(
            <Container style={{paddingTop:'100px'}}>
                <Steps size="small" current={this.state.step} style={{paddingBottom: '30px'}}>
                    <Step title="Pick up/Return date" />
                    <Step title="Payment" />
                    <Step title="Confirmation"  />
                </Steps>
                <Row>
                    <Col span={4}>
                        <Card
                            style={{height: '200px',width:'200px'}}
                            cover={<img alt={this.props.vehicle.model} src={this.props.vehicle.image} />}>
                        </Card>
                    </Col>
                    <Col offset={4} span={16}>
                        <Tabs tabPosition="right" activeKey={this.state.currTab}>
                            <TabPane tab="date" key="1">
                                <RangePicker onChange={this.onDateChange}/>
                                <Typography>
                                    <p>Days range is: {this.state.days}</p>
                                    <p>Your total is: ${this.state.days * this.props.vehicle.price}</p>
                                </Typography>
                                <Button onClick={this.onFinish}>Next</Button>
                            </TabPane>

                            <TabPane tab="payment" key="2">
                                <Typography>
                                    Please enter payment information
                                </Typography>
                                <Form title="Payment" onFinish={this.onFinishForm}>
                                    <Form.Item label="Card Number" name="cardNumber">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Expiration Date" name="expDate">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Card Holder's Name" name="cardHolderName">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Code" name="code">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item >
                                        <Button htmlType="submit">Next</Button>
                                    </Form.Item>
                                </Form>
                                <Button onClick={this.onRollback}>Back</Button>
                            </TabPane>

                            <TabPane tab="confirmation" key="3">
                                <Typography>
                                    Please make sure all the information is correct!!!
                                </Typography>
                                    <ConfirmationPage confirm={this.state}/>
                                <Button onClick={this.onRollback}>Back</Button>
                                <Popconfirm title="Is all the information Correct?"
                                            onConfirm={this.onConfirmation}
                                            okText="Yes"
                                            cancelText="No"
                                >
                                    <Button>Confirm</Button>
                                </Popconfirm>
                            </TabPane>
                            <TabPane name="congratulation" key="4">
                                <Result
                                    status="success"
                                    title="Reservation Succeed!"
                                    subTitle={"Confirmation email will be sent to " + this.state.email}
                                    extra={[
                                        <NavLink to={appConstants.homeRoute} key="navlink4">
                                            <Button type="primary" key="index">
                                                Home page
                                            </Button>
                                        </NavLink>
                                    ]}
                                />
                            </TabPane>
                        </Tabs>
                    </Col>

                </Row>
            </Container>
        );
    }
}

function mapStateToProps(state, ownProps){
   console.log(ownProps);
    const id = + ownProps.match.params.id;
    const vehicles = state.vehicles;
    let vehicle = null;
    if(vehicles){
        vehicle = vehicles.find( v => v.id === id );
    }
    const loggedIn = state.loggedIn;
    return {loggedIn, vehicle};
}
export default connect(mapStateToProps,{postReservation})(Reservation) ;
