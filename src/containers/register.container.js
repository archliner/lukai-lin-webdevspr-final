import React from "react";
import {connect} from 'react-redux';
import {clear, register, validate} from '../actions/user.action'
import {Redirect} from "react-router";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', validatePassword: '', bio: ''};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.validate(this.state);
        event.preventDefault();
    }

    componentDidMount() {
        this.props.clear();
        this.setState({
            username: '',
            password: '',
            validatePassword: '',
            bio: ''
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.valid.success) {
            this.props.register(this.state.username, this.state.password, this.state.bio);
        }
    }

    render() {
        if (this.props.redirect) {
            return (<Redirect to={this.props.redirect}/>)
        }

        let error;
        if (this.props.error || this.props.valid.message) {
            error = (<h3>{this.props.error || this.props.valid.message}</h3>)
        }

        return (
            <Jumbotron>
                <Container>
                    <h2 className="text-center">Register</h2>
                    <Form onSubmit={(e) => this.handleSubmit(e)} className="justify-content-md-center">
                        <Form.Row className="justify-content-md-center">
                            <Form.Group as={Col} controlId="formGridUsername" xs lg="4">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" onChange={(e) => this.handleChange(e, 'username')}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="justify-content-md-center">
                            <Form.Group as={Col} controlId="formGridPassword" xs lg="4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => this.handleChange(e, 'password')}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="justify-content-md-center">
                            <Form.Group as={Col} controlId="formGridPassword" xs lg="4">
                                <Form.Label>Validate Password</Form.Label>
                                <Form.Control type="password" placeholder="Validate Password" onChange={(e) => this.handleChange(e, 'validatePassword')}/>
                            </Form.Group>
                        </Form.Row>
                        <br/>
                        <Form.Group as={Row} className="justify-content-md-center">
                            <Col xs lg="4" >
                                <Button block variant="primary" type="submit" disabled={this.props.inFlight}>
                                    Register
                                </Button>
                            </Col>
                        </Form.Group>
                        <h3 className="text-center">{error}</h3>
                    </Form>
                </Container>
            </Jumbotron>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        register: (username, password, bio) => dispatch(register(username, password, bio)),
        clear: () => dispatch(clear()),
        validate: (user) => dispatch(validate(user)),
    }
}


function mapStateToProps(state, props) {
    return {
        ...state.user,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)