// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {checkLoggedIn, getUserByUsername} from '../actions/user.action'
import {Button} from "reactstrap";

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.checkLoggedIn();
        const status = this.props.routeState.state;
        const user = this.props.routeState.user;

        let profile = "";
        if (status === "LOGGEDIN") {
            profile = <div>
                <h3>Username: {user.username}</h3>
                <h3>Bio Info: {user.bio || "This guy is lazy, nothing was provided here."}</h3>
                <Button color={"submit"}>Update</Button>
            </div>
        } else if (status === "LOGGEDOUT") {
            profile = <h3>Please login to see your profile</h3>
        }

        this.setState({
            profile
        })
    }

    render() {
        // const status = this.props.routeState.state;
        // const user = this.props.routeState.user;
        // var username = '';
        // if (user) {
        //     username = user.username;
        // }
        // var profile = "";
        // if (status === "LOGGEDIN") {
        //     profile = <h3>This is profile of {username}</h3>
        // } else if (status === "LOGGEDOUT") {
        //     profile = <h3>Please login to see your profile</h3>
        // }
        return (
            <div>
                <h1>Profile Page</h1>
                {this.state.profile}
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