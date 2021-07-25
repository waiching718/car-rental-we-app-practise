import {Container} from "@material-ui/core";
import React,{Component} from "react";
import {
    Input,
    Button,
    Typography,
    Card,
    message,
    Tabs,
    Collapse,
    Empty,
    List,
    Form,
    Row,
    Col,
    Radio,
    Divider,
    Result
} from "antd";
import {connect} from "react-redux";
import {getUsers} from "../actions/user.action";
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';
import {register} from '../actions/auth.action'
import reqwest from "reqwest";
import {getInsurances} from "../actions/insurance.action";
import PickCar from "./PickCar";
import {postWalkinOrder, updateOrder} from "../actions/order.action";
import {appConstants} from "../constants/constant";
import {NavLink} from "react-router-dom";

const {Search} = Input;
const {TabPane} = Tabs;
const { Panel } = Collapse;

class CheckIn extends Component{

    state={
        user:{
            username: '',
            name: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            orders: '',
        },
        hasUser: false,
        tab:"1",
        order: '',
        services: [],
        addedServices: [],
        insurance: '',
        sum : 0,
    }

    componentDidMount() {
        !this.props.users && this.props.getUsers();
        !this.props.insurances && this.props.getInsurances();
        this.setState({
            services: this.props.services
        })
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
            this.setState({
                user:{
                    username: user.username,
                    name: user.userDetail.name,
                    phone: user.userDetail.phone,
                    email: user.userDetail.email,
                    address: user.userDetail.address,
                    city: user.userDetail.city,
                    state: user.userDetail.state,
                    zip: user.userDetail.zip,
                    orders: user.orderList,
                },
                hasUser: true,
            });
        }
        else{
            message.error("User not found!");
        }

    }

    createOrder = (order) =>{
        console.log("-----------order: ", order);
        this.setState({order})
    }

    onChange(value) {
        console.log(++value);
    }

    onRegister = (values) =>{
        console.log('Received values of form: ', values);
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
        console.log(newUser);

        this.props.register(newUser, (res) => {
            console.log(res.data);
            if(res.data.success === false){
                message.error('Registration failed, user already exist');
            }else{
                this.props.getUsers();
                reqwest({
                    url: `${process.env.REACT_APP_API_URL}/userByUsername?username=${values.username}`,
                    type: 'json',
                    method: 'get',
                    contentType: 'application/json',
                    success: res => {
                        let detail = {
                            id: res.id,
                            name: values.name,
                            phone: values.phone,
                            email: values.email,
                        }
                        reqwest({
                            url: `${process.env.REACT_APP_API_URL}/user-details`,
                            type: 'json',
                            method: 'put',
                            contentType: 'application/json',
                            data: JSON.stringify(detail),
                            success: res => {
                                message.success("registration succeed");
                                this.setState({
                                    user:{
                                        username: values.username,
                                        name: values.name,
                                        phone: values.phone,
                                        email: values.email,
                                        address: "N/A",
                                        city: "N/A",
                                        state: "N/A",
                                        zip: "N/A",
                                    }
                                });
                                //document.getElementById('registerNext-btn').removeAttribute("disabled");
                            },
                        });
                    },
                });
            }
        });
    }

    handleInsurance = (event) =>{
        console.log(event.target.value);
        let insurance;
        if(event.target.value === 1){
            insurance = this.props.insurances[0];
        }else if(event.target.value === 2){
            insurance = this.props.insurances[1];
        }else{
            insurance = this.props.insurances[2];
        }
        this.setState({
            insurance: insurance
        })
    }

    getTotal = () =>{
        console.log('hihihihihi');
        let total = 0;
        this.state.addedServices !== null && this.state.addedServices.forEach(s=>{
            total += s.price;
            console.log('in for each', total);
        });
        console.log('Out for each', total);

        if(this.state.insurance.type!== 'waive' ){
            total += this.state.insurance.price;
        }
        console.log('After insurance', total);
        if(this.state.hasUser === false){
            total += this.state.order.total;
        }
        console.log('After has user check', total);
        this.setState({
            balance: total,
        })
        console.log('final total', total);
        return total;
    }

    orderUpdate = ()=>{
        console.log('update order to PICKUP', this.state.order);
        if(this.state.hasUser === true){
            let newTotal = +this.getTotal();
            newTotal += this.state.order.total;
            console.log('first newtotal',newTotal);
            let order = {
                id: this.state.order.id,
                services: this.state.addedServices,
                insurances: [this.state.insurance],
                status: 'PICKUP',
                total: newTotal
            }
            console.log('final order: ', order)
            this.props.updateOrder(order);
        }else{
            // customer walkin
            let newTotal = +this.getTotal();
            console.log(newTotal);
            let order = {
                ...this.state.order,
                user: this.state.user,
                services: this.state.addedServices,
                insurances: [this.state.insurance],
                status: 'PICKUP',
                total: newTotal,
            }
            console.log('post an order and set user here  ', order);
            this.props.postWalkinOrder(order);
        }

    }

    getSum = () =>{

        let newSum = 0;
        this.state.addedServices !== null && this.state.addedServices.forEach(s=>{
            newSum += s.price;
            console.log('in for each', newSum);
        });
        console.log('Out for each', newSum);

        if(this.state.insurance.type!== 'waive' ){
            newSum += this.state.insurance.price;
        }
        console.log('After insurance', newSum);
        if(this.state.hasUser === false){
            newSum += this.state.order.total;
        }
        console.log('After has user check', newSum);

        this.setState({
            sum : newSum
        })
    }

    render(){
        return(
            <Container style={{paddingTop:'100px'}}>
                <Tabs defaultActiveKey="1" activeKey={this.state.tab} >
                    <TabPane tab="Find user" key="1">
                        <Typography>
                            Does customer have an account with us?
                        </Typography>
                        <Typography>
                            If yes, please provide phone number to find user
                            <br/>
                            <Search
                                placeholder="Phone"
                                enterButton
                                size="large"
                                onSearch={this.searchUser}
                                style={{width: '200px'}}
                            />
                            <br/>
                        </Typography>
                        {
                            this.state.hasUser && (
                                <Card>
                                    <p>Name: {this.state.user.name}</p>
                                    <p>username: {this.state.user.username}</p>
                                    <p>phone: {this.state.user.phone}</p>
                                    <p>email: {this.state.user.email}</p>
                                    <p>Address: {this.state.user.address}</p>
                                    <p>City: {this.state.user.city}</p>
                                    <p>State: {this.state.user.state}</p>
                                    <p>Zip: {this.state.user.zip}</p>
                                    {this.state.user.orders?
                                        <Collapse accordion>
                                            <Panel header="Orders" key="orders">
                                                {this.state.user.orders.map(order=>(
                                                    <Card key={order.id}>
                                                        <p>Status: {order.status}</p>
                                                        <p>Total: {order.total}</p>
                                                        <p>Order Date: {order.order_Date.slice(0,10)}</p>
                                                        <p>Start Date: {order.start_Date.slice(0,10)}</p>
                                                        <p>End Date: {order.end_Date.slice(0,10)}</p>
                                                        {order.status === 'OPEN' && (
                                                            <Typography>
                                                                <Button onClick={()=>{
                                                                    this.setState({tab:"4", order: order})
                                                                }
                                                                }>Check in</Button>
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
                        <Typography>
                            If not a user, click here to
                            <Button onClick={()=>{this.setState({tab:"2"})}}>register</Button>
                        </Typography>

                    </TabPane>
                    <TabPane tab="Create Account" key="2">
                        <Form name="complex-form" onFinish={this.onRegister} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                            <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Username is required' },({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || (getFieldValue('username').length > 5 &&  getFieldValue('username').length < 15) ){
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Username has to be longer than 6 and shorter than 15 characters');
                                },
                            })]}>
                                <Input style={{ width: 320}} />
                            </Form.Item>
                            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Password is required' }]}>
                                <Input.Password style={{ width: 320 }} />
                            </Form.Item>
                            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'name is required' }]}>
                                <Input style={{ width: 320}} />
                            </Form.Item>
                            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Phone is required' },{len: 10, message:'phone number needs to be 10 digit'},
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || !isNaN(getFieldValue('phone')) ){
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('Phone number has to be digit only');
                                    },
                                })]}>
                                <Input style={{ width: 320}} />
                            </Form.Item>
                            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email is required' }, {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            }]}>
                                <Input style={{ width: 320}} />
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 16, span: 4}} >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                        <Button onClick={()=>this.setState({tab:"1"})}>Back</Button>
                        <Button id="registerNext-btn" onClick={()=>{console.log('clicked');this.setState({tab:"3"});}}>Next</Button>
                    </TabPane>
                    <TabPane tab="Create Order" key="3">
                        <PickCar callback={this.createOrder}/>
                        <Button onClick={()=>this.setState({tab:"2"})}>Back</Button>
                        <Button onClick={()=>this.setState({tab:"4"})}>Next</Button>
                    </TabPane>
                    <TabPane tab="Add services" key="4">
                        <h2>Services to add:</h2>
                        {
                            this.state.services && (
                                <List
                                    itemLayout="horizontal"
                                    dataSource={this.state.services}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={item.service}
                                                description={`Price: $${item.price}`}
                                            />
                                            <Button id={item.id} icon={<PlusOutlined />} onClick={() =>{
                                                let added = this.state.services.find(s => s.id === item.id);
                                                let index = this.state.services.indexOf(added);
                                                if (index > -1) {
                                                    this.state.services.splice(index, 1);
                                                }
                                              this.setState({
                                                      addedServices: [...this.state.addedServices, added]
                                                  }
                                              )
                                            }}
                                            />
                                        </List.Item>
                                    )}
                                />
                            )
                        }
                        <br/>
                        <br/>
                        <h2>Services added</h2>
                        <List itemLayout="horizontal" dataSource={this.state.addedServices}
                            renderItem={item =>(
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.service}
                                        description={`Price: $${item.price}`}
                                    />
                                    <Button icon={<MinusOutlined />} onClick={() =>{
                                        let removed = this.state.addedServices.find(s => s.id === item.id);
                                        let index = this.state.addedServices.indexOf(removed);
                                        if (index > -1) {
                                            this.state.addedServices.splice(index, 1);
                                        }
                                        this.setState({
                                                services: [...this.state.services, removed]
                                            }
                                        )
                                    }}/>
                                </List.Item>
                            )}
                        />
                        <Button onClick={()=>this.setState({tab:"3"})}>Back</Button>
                        <Button onClick={()=>this.setState({tab:"5"})}>Next</Button>

                    </TabPane>
                    <TabPane tab="Insurance" key="5">
                        <Row>
                            <Col>
                                <Radio.Group onChange={this.handleInsurance}>
                                    <Radio value={1}>Half Coverage</Radio>
                                    <Radio value={2}>Full Coverage</Radio>
                                    <Radio value={3}> Waive </Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button onClick={()=>this.setState({tab:"4"})}>Back</Button>
                                <Button onClick={()=>{this.setState({tab:"6"}); this.getSum()}}>Next</Button>
                            </Col>
                        </Row>

                    </TabPane>
                    <TabPane tab="Confirm" key="6">
                        {this.state.order && (
                            <Card title={`Order confirmation`}>
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
                                        <p>Name: {this.state.user.name}</p>
                                        <p>Phone: {this.state.user.phone}</p>
                                        <p>Email: {this.state.user.email}</p>
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
                                        <h2>Fees:</h2>
                                        <h4>Rental fee:</h4>
                                        {this.state.hasUser === false? <p>Total: {this.state.order.total}</p> : <p>Total: {this.state.order.total} *Paid</p> }
                                        <h4>Add-on service:</h4>
                                        {this.state.addedServices !== '' && this.state.addedServices.map(s=>(
                                            <div>
                                                <p>{s.service} ${s.price}</p>
                                            </div>
                                        ))}
                                        <h4>Insurance:</h4>
                                        {this.state.insurance === ''? <p>None</p>:
                                            <div>
                                                <p>{this.state.insurance.type} ${this.state.insurance.price}</p>
                                            </div>
                                        }
                                        <h2>Total: {this.state.sum}</h2>

                                    </Col>
                                </Row>
                            </Card>
                        )}

                        <Button onClick={()=>this.setState({tab:"5"})}>Back</Button>
                        <Button onClick={()=>{
                            this.setState({tab:"7"});
                            this.orderUpdate();
                        }}>Next</Button>
                    </TabPane>
                </Tabs>
                {this.state.tab === "7" && (
                    <Result
                        status="success"
                        title="Successfully Check In"
                        subTitle="You can now pick up your car"
                        extra={
                            <NavLink to={appConstants.homeRoute} key="navlink4">
                                <Button type="primary" key="index">
                                    Home page
                                </Button>
                            </NavLink>
                        }
                    />
                )}
            </Container>
        );
    }
}

function mapStateToProps({users,services,insurances}){
    return {users, services,insurances};
}
export default connect(mapStateToProps, {getUsers,register,getInsurances, updateOrder, postWalkinOrder})(CheckIn);
