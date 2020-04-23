import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {checkLoggedIn} from '../actions/user.action';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const LOGGEDIN = 'LOGGEDIN';
const LOGGEDOUT = 'LOGGEDOUT';
const LOADING = 'LOADING';

class Header extends React.Component {

    componentDidMount() {
        this.props.checkLoggedIn();
    }

    render() {
        const status = this.props.routeState.state;
        const user = this.props.routeState.user;
        var username = '';
        if (user) {
            username = user.username
        }
        const loggedoutRoute = (
            <div>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="/home">TubeList</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/youtube">Explore</Nav.Link>
                        <Nav.Link href="/search">Search</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                You are logged out
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Nav>
                </Navbar>
            </div>
        );
        const loggedInRoute = (
            <div>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="/home">TubeList</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/youtube">Explore</Nav.Link>
                        <Nav.Link href="/search">Search</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/logout">Logout</Nav.Link>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Logged in as <a href="/profile">{username}</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Nav>
                </Navbar>
            </div>
        );
        switch (status) {
            case LOADING:
                return (<div><p>Loading...</p></div>);
            case LOGGEDIN:
                return loggedInRoute;
            case LOGGEDOUT:
                return loggedoutRoute;
            default:
                return (<div><p>Loading</p></div>);
        }
    }

}

function mapDispatchToProps(dispatch, props) {
    return { 
        checkLoggedIn: () => dispatch(checkLoggedIn()),
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
)(Header)
