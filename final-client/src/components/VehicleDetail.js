import React, {Component} from "react";
import {connect} from "react-redux";
import {Card, Breadcrumb, Button} from "antd";
import '../css/VehicleDetail.scss'
import { Descriptions, Badge, Row, Col, Alert } from 'antd';
import {Container} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {appConstants} from "../constants/constant";
import {getVehicles} from "../actions/vehicles.action";

class VehicleDetail extends Component{

    componentDidMount() {
        !this.props.vehicles && this.props.getVehicles();
    }

    pushBack = () =>{
        this.props.history.goBack();
    }
    pushToVehicle= () =>{
        this.props.history.push('/exploreVehicles');
    }

    render(){
        return(
            <Container style={{paddingTop: '100px', paddingBottom: '100px'}} >
                <Breadcrumb>
                    <Breadcrumb.Item><span onClick={this.pushToVehicle}>VEHICLES</span></Breadcrumb.Item>
                    <Breadcrumb.Item><span onClick={this.pushBack}>{this.props.vehicle.type}</span></Breadcrumb.Item>
                    <Breadcrumb.Item>{this.props.vehicle.model}</Breadcrumb.Item>
                </Breadcrumb>
                {this.props.vehicle && (
                    <Row>
                        <Col xs={24} sm={12} md={8} lg={4} xl={8}>
                            <Card
                                  cover={<img alt={this.props.vehicle.model} src={this.props.vehicle.image} />}>

                            </Card>
                        </Col>
                        <Col span={1}></Col>
                        <Col xs={24} sm={12} md={14} lg={16} xl={14}>
                            <Descriptions title="Vehicle Info" bordered>
                                <Descriptions.Item label="Brand">{this.props.vehicle.brand}</Descriptions.Item>
                                <Descriptions.Item label="Model">{this.props.vehicle.model}</Descriptions.Item>
                                <Descriptions.Item label="Year">{this.props.vehicle.year}</Descriptions.Item>
                                <Descriptions.Item label="Color" span={2}>
                                    {this.props.vehicle.color}
                                </Descriptions.Item>
                                <Descriptions.Item label="Daily Price" span={2}>
                                    ${this.props.vehicle.price}
                                </Descriptions.Item>
                                <Descriptions.Item label="Status" span={3}>
                                    {
                                        this.props.vehicle.status === 'T'?
                                            <Badge status="success" text="Avaliable" /> :
                                            <Badge status="error" text="Unavaliable" />
                                    }

                                </Descriptions.Item>
                                <Descriptions.Item label="Location" span={6}>{this.props.vehicle.locationId}</Descriptions.Item>
                                <Descriptions.Item label="Config Info">
                                    Data disk type: MongoDB
                                    <br />
                                    Database version: 3.4
                                    <br />
                                    Package: dds.mongo.mid
                                    <br />
                                    Storage space: 10 GB
                                    <br />
                                    Replication factor: 3
                                    <br />
                                    Region: East China 1<br />
                                </Descriptions.Item>
                            </Descriptions>
                            <NavLink to={`${appConstants.reservationRoute}/vehicle-${this.props.vehicle.id}`}>
                                <Button style={{float:'right',margin:'20px'}}
                                    disabled={this.props.vehicle.status === 'F' || this.props.loggedIn === null}>Reserve
                                </Button>
                            </NavLink>
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col span={6} offset={18}>
                        {
                            this.props.loggedIn === null && (
                                <Alert message="Please login to reserve" type="warning" showIcon closable />
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }

}

function mapStateToProps(state, ownProps){
    const id = +ownProps.match.params.id;
    const vehicles = state.vehicles;
    const loggedIn = state.loggedIn;
    let vehicle = null;
    if(vehicles){
       vehicle = vehicles.find(p => p.id === id);
    }else{
        return {vehicle: null};
    }
    return {vehicle,loggedIn};
}
export default connect(mapStateToProps,{getVehicles})(VehicleDetail);
