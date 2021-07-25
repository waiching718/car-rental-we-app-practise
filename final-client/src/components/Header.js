import React, {Component} from "react";
import { Menu } from 'antd';
import {CarOutlined, HomeOutlined, LoginOutlined, UserOutlined, CommentOutlined, FormOutlined, FileDoneOutlined, FileSearchOutlined, DesktopOutlined} from '@ant-design/icons';
import {NavLink} from "react-router-dom";
import {appConstants} from "../constants/constant";
import {connect} from "react-redux";
import '../css/Header.scss';



class Header extends Component{

    constructor(props) {
        super(props);
        this.state={
            current: 'home'
        }
    }

    handleClick = e => {
       this.setState({
           current: e.key
       });
    };
    render(){
        return(
            <Menu className="StickyNavbar" onClick={this.handleClick} selectedKeys={this.state.current} mode="horizontal" theme="dark">
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <NavLink to={appConstants.homeRoute}>
                        MSI Car Rental

                    </NavLink>
                </Menu.Item>

                <Menu.Item key="vehicles" icon={<CarOutlined />}>
                    <NavLink to={appConstants.exploreVehicleRoute}>
                        Vehicles
                    </NavLink>
                </Menu.Item>
                {this.props.loggedIn && this.props.loggedIn.authorities[0].authority === 'ROLE_USER' ?
                    <Menu.Item key="myaccount" icon={<UserOutlined />} >
                        <NavLink to={appConstants.myaccountRoute}>
                            MyAccount
                        </NavLink>
                    </Menu.Item> :
                    null
                }

                {this.props.loggedIn && this.props.loggedIn.authorities[0].authority === 'ROLE_ADMIN' ?
                    <Menu.Item key="manage" icon={<DesktopOutlined />} >
                        <NavLink to={appConstants.manageRoute}>
                            Manage
                        </NavLink>
                    </Menu.Item> :
                    null
                }
                {this.props.loggedIn && this.props.loggedIn.authorities[0].authority === 'ROLE_REP' ?
                    <Menu.Item key="checkIn" icon={<FileDoneOutlined />} >
                        <NavLink to={appConstants.checkInRoute}>
                            Check in
                        </NavLink>
                    </Menu.Item> :
                    null
                }
                {this.props.loggedIn && (this.props.loggedIn.authorities[0].authority === 'ROLE_REP' || this.props.loggedIn.authorities[0].authority === 'ROLE_ADMIN') ?
                    <Menu.Item key="modify" icon={<FormOutlined />} >
                        <NavLink to={appConstants.modifyOrderRoute}>
                            Modify Order
                        </NavLink>
                    </Menu.Item> :
                    null
                }
                {this.props.loggedIn && this.props.loggedIn.authorities[0].authority === 'ROLE_INSPECT' ?
                    <Menu.Item key="checkOut" icon={<FileDoneOutlined />} >
                        <NavLink to={appConstants.checkOutRoute}>
                            Check out
                        </NavLink>
                    </Menu.Item> :
                    null
                }
                {this.props.loggedIn && this.props.loggedIn.authorities[0].authority === 'ROLE_INSPECT' ?
                    <Menu.Item key="inspect" icon={<FileSearchOutlined />} >
                        <NavLink to={appConstants.closeOrderRoute}>
                            Inspect
                        </NavLink>
                    </Menu.Item> :
                    null
                }

                {
                    this.props.loggedIn?
                        <Menu.Item  key="logout" style={{float: 'right'}}>
                            <NavLink to={appConstants.logoutRoute}>
                                Logout
                            </NavLink>
                        </Menu.Item>
                        :
                        <Menu.Item  key="login" icon={<LoginOutlined />} style={{float: 'right'}}>
                            <NavLink to={appConstants.loginRoute}>
                                Login
                            </NavLink>
                        </Menu.Item>

                }
            </Menu>
        );
    }


}

function mapStateToProps({loggedIn}){
    return {loggedIn};
}

export default connect(mapStateToProps)(Header);
