import React, {Component} from "react";
import {Card} from 'antd';

class Review extends Component{
    render(){
        return(
            <Card>
                <p>Review #{this.props.review.id}</p>
                <p>{this.props.review.comments}</p>
            </Card>
        );
    }

}
export  default Review;
