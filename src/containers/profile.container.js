// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {checkLoggedIn, getUserByUsername} from '../actions/user.action'

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.checkLoggedIn();
    }

    render() {
        const status = this.props.routeState.state;
        const user = this.props.routeState.user;
        var username = '';
        if (user) {
            username = user.username;
        }
        var profile = "";
        if (status === "LOGGEDIN") {
            profile = <h3>This is profile of {username}</h3>
        } else if (status === "LOGGEDOUT") {
            profile = <h3>Plaease login to see your profile</h3>
        }
        return (
            <div>
                <h1>Profile Page</h1>
                {profile}
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
        ...state.user,
    }
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile))