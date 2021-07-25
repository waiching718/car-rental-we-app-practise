import React, {Component} from "react";
import  {Row, Col, Card, Descriptions, Divider, List, Spin} from 'antd';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {appConstants} from "../constants/constant";
import Container from "@material-ui/core/Container";
import InfiniteScroll from "react-infinite-scroller";
import '../css/Vehicle.scss';

class Vehicles extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            hasMore: true,
            size: 3,
            index: 0,
            endIndex: 3,
        };

    }

    componentDidMount() {
        this.fetchData(res => {
            this.setState({
                data: res,
            });
        });
    }
    //
    fetchData = callback => {
        const {carTypes} = this.props;
        let newData, newIndex,newEndIndex;
        console.log('fetch');
        newData = carTypes.slice(this.state.index, this.state.endIndex);
        console.log(newData);
        newIndex = this.state.endIndex;
        newEndIndex = this.state.endIndex + this.state.size;
        callback(newData);
        this.setState({
            index: newIndex,
            endIndex: newEndIndex,
        });
    };

    handleInfiniteOnLoad = () => {
        let { data } = this.state;
        this.setState({
            loading: true,
        });
        if (data.length > 6 ) {
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        setTimeout(() => {
            this.fetchData(res => {
                data = data.concat(res);
                this.setState({
                    data,
                    loading: false,
                });
            });
        },1000)

    };

    render(){
        return(
            <Container style={{paddingTop: '100px'}}>
                <div className="demo-infinite-container">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                    >
                        <List
                            dataSource={this.state.data}
                            renderItem={type => (
                                <Row gutter={32} style={{paddingBottom:'30px'}} >
                                    <Col xs={24} sm={12} md={8} lg={4} xl={6} >
                                        <Link to={`${appConstants.vehicleListRoute}/${type.type}`} key={type.id}>
                                            <Card className="TypeList" hoverable
                                                  cover={<img alt={type.image} src={type.image} />}
                                            >
                                            </Card>
                                        </Link>
                                    </Col>
                                    <Col xs={24} sm={12} md={14} lg={16} xl={18}>
                                        <Descriptions title={type.type}>
                                            <Descriptions.Item label="Passenger">{type.passenger}</Descriptions.Item>
                                            <Descriptions.Item label="Load Capacity">{type.load}</Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                    <Divider/>
                                </Row>
                            )}
                        >
                            {this.state.loading && this.state.hasMore && (
                                <div className="demo-loading-container">
                                    <Spin />
                                </div>
                            )}
                            {!this.state.hasMore && (
                                <Divider> No more result </Divider>
                            )}
                        </List>
                    </InfiniteScroll>
                </div>
            </Container>

        );
    }

}

function matStateToProps({carTypes}){
    return {carTypes};
}
export default connect(matStateToProps)(Vehicles);
