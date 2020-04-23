// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {checkLoggedIn, getUserByUsername, fetchFollowingPlaylists} from '../actions/user.action'
import {Button} from "reactstrap";

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.checkLoggedIn();
        const user = this.props.routeState.user;
        this.props.fetchFollowingPlaylists(user.username)
        // let playlists = this.props.playlists.map((item) => {
        //     return <p>{item}</p>
        // })

        // let profile = "";
        // if (status === "LOGGEDIN") {
        //     profile = <div>
        //         <h3>Username: {user.username}</h3>
        //         <h3>Bio Info: {user.bio || "This guy is lazy, nothing was provided here."}</h3>
        //         <ul>{followingPlaylists.length}</ul>
        //         <Button color={"submit"}>Update</Button>
        //     </div>
        // } else if (status === "LOGGEDOUT") {
        //     profile = <h3>Please login to see your profile</h3>
        // }

        // this.setState({
        //     profile
        // })
    }

    render() {
        const status = this.props.routeState.state;
        const user = this.props.routeState.user;
        let followingPlaylists = this.props.playlists;

        let profile = "";
        if (!user || !followingPlaylists) {
            return profile
        }

        followingPlaylists = this.props.playlists.map((item, i) => {
            return <li key = {i}>{item}</li>
        });
        if (status === "LOGGEDIN") {
            profile = <div>
                <h3>Username: {user.username}</h3>
                <h3>Bio Info: {user.bio || "This guy is lazy, nothing was provided here."}</h3>
                <ul>{followingPlaylists}</ul>
                <Button color={"submit"}>Update</Button>
            </div>
        } else if (status === "LOGGEDOUT") {
            profile = <h3>Please login to see your profile</h3>
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
        fetchFollowingPlaylists: (username) => dispatch(fetchFollowingPlaylists(username)),
        getUserByUsername: (username) => dispatch(getUserByUsername(username))
    }
}


function mapStateToProps(state, props) {
    return { 
        ...state.user,
    }
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile))