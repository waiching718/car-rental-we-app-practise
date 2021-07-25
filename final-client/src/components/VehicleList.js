import React, {Component} from "react";
import {Container} from "@material-ui/core";
import {connect} from "react-redux";
import {getVehicles} from "../actions/vehicles.action";
import {Card, Col, Descriptions, Divider, Row, Empty, Breadcrumb} from "antd";
import {Link} from "react-router-dom";
import {appConstants} from "../constants/constant";

class VehicleList extends Component{


    componentDidMount() {
        !this.props.vehicles && this.props.getVehicles();
    }

    pushBack = () =>{
        this.props.history.goBack();
    }

    render(){
        return (
            <Container style={{paddingTop: '100px'}}>
                <Breadcrumb>
                    <Breadcrumb.Item><span onClick={this.pushBack}>VEHICLES</span></Breadcrumb.Item>
                    <Breadcrumb.Item>{this.props.match.params.type}</Breadcrumb.Item>
                </Breadcrumb>
                <h2 style={{textAlign: 'center'}}>{`List of ${this.props.match.params.type.toLowerCase()} car`}</h2>
                {this.props.vList.length !== 0 ? this.props.vList.map( vehicle =>(
                    <Row gutter={32} style={{paddingBottom:'30px'}} >
                        <Col xs={24} sm={12} md={8} lg={4} xl={6} >
                            <Link to={`${appConstants.vehicleDetailRoute}/${vehicle.id}`} key={vehicle.id}>
                                <Card className="VehicleList" hoverable
                                      cover={<img alt={vehicle.model} src={vehicle.image} />}
                                >
                                </Card>
                            </Link>
                        </Col>
                        <Col xs={24} sm={12} md={14} lg={16} xl={18}>
                            <Descriptions title={vehicle.id}>
                                <Descriptions.Item label="Year">{vehicle.year}</Descriptions.Item>
                                <Descriptions.Item label="Brand">{vehicle.brand}</Descriptions.Item>
                                <Descriptions.Item label="Model">{vehicle.model}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Divider/>
                    </Row>
                )):
                    <Row gutter={32} style={{paddingBottom:'30px'}} key={0}>
                        <Col offset={8} span={8}>
                            <Empty/>
                        </Col>
                    </Row>
                }
            </Container>
        );
    }
}

function mapStateToProps(state, ownProps){
    console.log('mapstate', state)
    let type = ownProps.match.params.type;
    let vList = [];
    console.log(state.vehicles);
    state.vehicles !== null && state.vehicles.forEach(vehicle =>{
        vehicle.type === type && vList.push(vehicle);
    });
    console.log(vList);
    return {vList}
}
export default connect(mapStateToProps,{getVehicles})(VehicleList);
