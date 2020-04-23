import React from "react";
import {connect} from 'react-redux';
import {clear, login, checkLoggedIn} from '../actions/user.action'
import {Redirect} from "react-router";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.login(this.state);
        event.preventDefault();
    }

    componentDidMount() {
        this.props.clear();
        this.props.checkLoggedIn();
        this.setState({username: '', password: ''});
    }

    render() {
        if (this.props.redirect) {
            return (<Redirect to={this.props.redirect}/>)
        }

        let error;
        if (this.props.error) {
            error = (<h3>{this.props.error}</h3>)
        }

        return (
            <div>
                <Jumbotron>
                    <Container>
                        <h2 className="text-center">Login</h2>
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
                            <br/>
                            <Form.Group as={Row} className="justify-content-md-center">
                                <Col xs lg="4" >
                                    <Button block variant="primary" type="submit" disabled={this.props.inFlight}>
                                        Log In
                                    </Button>
                                </Col>
                            </Form.Group>
                            {error}
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
        login: (user) => dispatch(login(user)),
        clear: () => dispatch(clear()),
    }
};


function mapStateToProps(state, props) {
    return {
        ...state.user,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLogin)