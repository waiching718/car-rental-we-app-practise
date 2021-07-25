import React, {Component} from "react";
import {Container} from "@material-ui/core";

class ConfirmationPage extends Component{
    render(){
        return(
            <Container style={{padding: '20px'}}>

                <p>Name: {this.props.confirm.name}</p>
                <p>Contact number: {this.props.confirm.phone}</p>
                <p>Email: {this.props.confirm.email}</p>

                <p>Rent on: {this.props.confirm.startDate.slice(0,11)}</p>
                <p>Return on: {this.props.confirm.endDate.slice(0,11)}</p>
                <p>Total: {this.props.confirm.total}</p>
                <div>
                    <h4>Card information: </h4>
                    <p>Card number: {this.props.confirm.credit.num}</p>
                    <p>Card holder's name: {this.props.confirm.credit.name}</p>
                    <p>Expiration date: {this.props.confirm.credit.exp}</p>
                    <p>Security Code: {this.props.confirm.credit.code}</p>
                </div>

            </Container>
        );
    }

}
export default ConfirmationPage;
