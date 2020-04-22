import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {checkLoggedIn} from '../actions/user.action'

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
                <Link to={'/home'}>Home</Link>&nbsp;
                <Link to={'/profile'}>Profile</Link>&nbsp;
                <Link to={'/youtube'}>Youtube</Link>&nbsp;
                <Link to={'/search'}>Search</Link>&nbsp;
                <Link to={'/login'}>Login</Link>&nbsp;
                <Link to={'/register'}>Register</Link>&nbsp;
                <span>You are logged out now</span>
            </div>
        );
        const loggedInRoute = (
            <div>
                <Link to={'/home'}>Home</Link>&nbsp;
                <Link to={'/profile'}>Profile</Link>&nbsp;
                <Link to={'/youtube'}>Youtube</Link>&nbsp;
                <Link to={'/search'}>Search</Link>&nbsp;
                <Link to={'/logout'}>Logout</Link>&nbsp;
                <span>Signed in as <b>{username}</b></span>
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
