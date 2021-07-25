import React, {Component} from "react";
import Container from "@material-ui/core/Container";
import Review from "./Review";
import {connect} from "react-redux";
import {getReviews} from "../actions/reviews.action";

class ReviewPage extends Component{
    render(){
        return(
            <Container style={{paddingTop: '100px'}}>
                Reviews:
                {
                    this.props.reviews && this.props.reviews.map(review =>(
                        <Review review={review} key={review.id}/>
                    ))
                }
            </Container>
        );
    }

    componentDidMount() {
        !this.props.reviews && this.props.getReviews();
    }
}

function mapStateToProps({reviews}){
    return {reviews};
}
export default connect(mapStateToProps,{getReviews})(ReviewPage);
