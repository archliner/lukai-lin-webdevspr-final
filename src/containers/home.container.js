// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {checkLoggedIn, getUserByUsername} from '../actions/user.action'

class Home extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.checkLoggedIn();
    }

    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <Link to={'/profile'}>Profile</Link>&nbsp;
                <Link to={'/youtube'}>Youtube</Link>

            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        checkLoggedIn: () => dispatch(checkLoggedIn()),
        getUserByUsername: (username) => dispatch(getUserByUsername(username))
    }
}


function mapStateToProps(state, props) {
    return { ...state.pokemon,
        username: state.user.username,
        user: state.user.getUser
    }
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home))