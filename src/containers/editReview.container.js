import React from "react";
import {connect} from 'react-redux';
import {checkLoggedIn} from '../actions/user.action';
import {editReview} from '../actions/youtube.action';
import {Redirect} from "react-router";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

class EditReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rate: '', comment: ''};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.editReview(this.state);
        event.preventDefault();
    }

    componentDidMount() {
        this.props.checkLoggedIn();
        const reviewId = this.props.youtubeRedirect.reviewId;
        const username = this.props.routeState.user.username;
        const isAdmin = this.props.routeState.user.isAdmin;
        this.setState({rate: '', comment: '', _id: reviewId, username: username, isAdmin: isAdmin});
    }

    render() {
        if (this.props.youtubeRedirect.route) {
            return (<Redirect to={this.props.youtubeRedirect.route}/>)
        }
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <h2 className="text-center">Edit Rating</h2>
                        <Form onSubmit={(e) => this.handleSubmit(e)} className="justify-content-md-center">
                            <Form.Row className="justify-content-md-center">
                                <Form.Group as={Col} controlId="formGridUsername" xs lg="4">
                                <Form.Label>Rate</Form.Label>
                                <Form.Control type="text" placeholder="Enter Rate" onChange={(e) => this.handleChange(e, 'rate')}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className="justify-content-md-center">
                                <Form.Group as={Col} controlId="formGridPassword" xs lg="4">
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control as="textarea" placeholder="Comment here..." rows="3" onChange={(e) => this.handleChange(e, 'comment')} />
                                    {/* <Form.Control type="text" placeholder="Comment" onChange={(e) => this.handleChange(e, 'comment')}/> */}
                                </Form.Group>
                            </Form.Row>
                            <br/>
                            <Form.Group as={Row} className="justify-content-md-center">
                                <Col xs lg="4" >
                                    <Button block variant="primary" type="submit" disabled={this.props.inFlight}>
                                        Edit
                                    </Button>
                                </Col>
                            </Form.Group>
                            {/* {error} */}
                        </Form>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        checkLoggedIn: () => dispatch(checkLoggedIn()),
        editReview: (review) => dispatch(editReview(review)),
    }
};


function mapStateToProps(state, props) {
    return {
        ...state.user,
        ...state.youtube
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditReview)