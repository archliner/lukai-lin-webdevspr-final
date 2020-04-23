import React from "react";
import {connect} from 'react-redux';
import {clear, logOut} from '../actions/user.action'
import {Redirect} from "react-router";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

class LogoutContainer extends React.Component {
    onClick(event) {
        event.preventDefault();
        this.props.logout(this.state);
    }

    componentDidMount() {
        this.props.clear();
    }

    render() {
        if (this.props.redirect) {
            return (<Redirect to={this.props.redirect}/>)
        }

        return (
            <div>
                {/* <input type={'button'} value={'Logout'} onClick={(e) => this.onClick(e)}/> */}
                <Jumbotron>
                    <Container>
                        <h2 className="text-center">Log out</h2>
                        <Form onSubmit={(e) => this.onClick(e)} className="justify-content-md-center">
                            <br/>
                            <Form.Group as={Row} className="justify-content-md-center">
                                <Col xs lg="4" >
                                    <Button block variant="primary" type="submit" disabled={this.props.inFlight}>
                                        Log out
                                    </Button>
                                </Col>
                            </Form.Group>
                            {/* <h3 className="text-center">{error}</h3> */}
                        </Form>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        logout: () => dispatch(logOut()),
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
)(LogoutContainer)