import React, {Component} from "react";
import {Container} from "@material-ui/core";
import {connect} from "react-redux";
import {Button, Form, Input, Tabs, Card, Select, Drawer, message, Row, Col} from 'antd';
import {getUsers} from "../actions/user.action";
import {getReservations} from "../actions/order.action";
import CardOrder from "./CardOrder";
import {registerIns,registerRep} from "../actions/register.action";

const {TabPane} = Tabs;
const {Option} = Select;
const {Search} = Input;

class Manage extends Component{

    state={
        visible: false,
        order: '',
        user: null,
    }

    static getDerivedStateFromProps = (newProps, oldState) =>{
        console.log('get derived');
        return {
            orders: newProps.orders,
            users: newProps.users,

        }
    }

    openDrawer = ()=>{
        this.setState({
            visible: true
        })
    }

    closeDrawer = ()=>{
        this.setState({
            visible: false
        })
    }

    componentDidMount() {
        !this.props.users && this.props.getUsers();
        !this.props.orders && this.props.getReservations();
    }

    onFinish = (values) =>{
        let user = {
            username: values.username,
            password: values.password,
        }
        if(values.role === 'ROLE_REP'){
            console.log('representative');
            this.props.registerRep(user, (res) => {
                console.log(res.data);
                if(res.data.success === false){
                    message.error('Registration failed, user already exist');
                }else{
                    message.success('Successfully register, please login');
                }
            });
        }else{
            console.log('inspector');
            this.props.registerIns(user, (res) => {
                console.log(res.data);
                if(res.data.success === false){
                    message.error('Registration failed, user already exist');
                }else{
                    message.success('Successfully register, please login');
                }
            });
        }
    }

    onConfirmDelete = (user) =>{
        console.log('Delete: ', user);
    }

    onConfirmEdit = (user) =>{
        this.openDrawer();
        console.log('Edit: ', user);
    }
    searchOrderById = (values) =>{
        if(values !== ''){
            let id = +values;
            console.log(id, typeof id);

            let order = this.props.orders.find(o => o.id === id);
            console.log(order);
            if(order !== undefined){
                this.setState({
                    order: order
                });
            }else{
                message.warn("order not found")
            }

            console.log('after setstate', this.state.order)
        }else{
            this.setState({
                order: ''
            });
        }

    }
    searchOrderByStatus = (values) =>{
        if(values === 'OPEN' || values === 'PICKUP' || values ==='RETURN' || values === 'CLOSE'){
            let status = values;
            console.log(status, typeof status);

            let order = [];
            this.props.orders.forEach(o => {
                o.status === status && order.push(o)
            } );
            console.log(order);
            if(order !== undefined){
                this.setState({
                    order: order
                });
            }else{
                message.warn("order not found")
            }

            console.log('after setstate', this.state.order)
        }else{
            this.setState({
                order: ''
            });
        }

    }

    render(){
        return(
            <Container style={{paddingTop:'100px'}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Add employee" key="1">
                        <Form name="complex-form" onFinish={this.onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                            <Form.Item label="Role" name="role" required>
                                <Select placeholder="Please select a role" style={{width:'200px'}} onChange={this.onSelectRole}>
                                    <Option value="ROLE_REP">Representative</Option>
                                    <Option value="ROLE_INSPECT">Inspector</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Username is required' }]}>
                                <Input style={{ width: 320}} />
                            </Form.Item>
                            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Password is required' }]}>
                                <Input.Password style={{ width: 320 }} />
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 4, span: 16}} >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="Users" key="2">
                        Existing users:
                        {
                            this.props.users && this.props.users.map(user => (
                                user.authorities[0].authority !== 'ROLE_ADMIN' && (
                                    <Card key={user.id}>
                                        <p>Role: {user.authorities[0].authority}</p>
                                        <p>{user.username}</p>
                                        <p>{user.userDetail !== null  && user.userDetail.email}</p>
                                        {/*<Button onClick={()=>this.onConfirmEdit(user)}>Edit</Button>*/}
                                        {/*<Button onClick={()=>this.onConfirmDelete(user)}>Delete</Button>*/}
                                    </Card>
                                ))
                            )
                        }
                    </TabPane>
                    <TabPane tab="Orders" key="3">
                        <Row>
                            <Col span={8}>
                                <Search
                                    placeholder="OrderNumber"
                                    enterButton
                                    size="small"
                                    onSearch={this.searchOrderById}
                                    style={{width: '200px'}}
                                />
                            </Col>
                        </Row>
                        Orders:

                        {
                            this.state.order === '' && this.state.orders? this.state.orders.map(order => (
                                <CardOrder order={order} key={order.id}/>
                            )):
                                <CardOrder order={this.state.order} key={this.state.order.id}/>
                        }
                    </TabPane>
                </Tabs>
                <Drawer
                    title="Edit User"
                    placement="right"
                    closable={false}
                    onClose={this.closeDrawer}
                    visible={this.state.visible}
                    getContainer={false}
                    style={{ position: 'absolute' }}
                >
                    <p>Some contents...</p>
                </Drawer>
            </Container>
        );
    }
}

function mapStateToProps(state){
    return {
        loggedIn: state.loggedIn,
        users: state.users,
        orders: state.orders,
    };
}
export default connect(mapStateToProps,{getUsers,getReservations,registerRep,registerIns})(Manage);
