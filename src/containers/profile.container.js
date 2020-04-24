import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {checkLoggedIn, getUserByUsername, fetchFollowingPlaylists, updateProfile} from '../actions/user.action'
import {Button} from "reactstrap";

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.checkLoggedIn();
        const user = this.props.routeState.user;
        if (user)
            this.props.fetchFollowingPlaylists(user.username)
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    _handleUpdateProfile() {
        const user = this.props.routeState.user;
        if (user) {
            this.props.updateProfile(user.username, this.state);
        }
    }

    _updateProfile() {

        return (
            <div>
                <form>
                    {/* {error} */}
                    <label> New Bio:
                        <input type="text"
                            disabled={this.props.inFlight}
                            value={this.state.bio}
                            onChange={(e) => this.handleChange(e, 'bio')}/> </label>
                    {/* <label> New Password:
                        <input type="text"
                            disabled={this.props.inFlight}
                            value={this.state.password}
                            onChange={(e) => this.handleChange(e, 'password')}/> </label> */}
                    <input type="button" value="Update" onClick={() => this._handleUpdateProfile()} disabled={this.props.inFlight}/>
                </form>
            </div>
        );
    }

    render() {
        const status = this.props.routeState.state;
        const user = this.props.routeState.user;
        let followingPlaylists = this.props.playlists;
        let playlistHeader = ""
        if (followingPlaylists) {
            followingPlaylists = this.props.playlists.map((item, i) => {
                return <li key={i}>{item}</li>
            });
            playlistHeader = "Following playlists"
        }

        let profile = "";
        if (!user || status === "LOGGEDOUT") {
            profile = <h3>Please login to see your profile</h3>
        }
        else if (status === "LOGGEDIN") {
            profile = <div>
                <h3>Username: {user.username}</h3>
                {/* <h3>Password: {user.password}</h3> */}
                <h3>Bio Info: {user.bio || "This guy is lazy, nothing was provided here."}</h3>
                <h5>{playlistHeader}</h5>
                <ul>{followingPlaylists}</ul>
                <br />
                <h3>Update your profile here</h3>
            </div>
        }
        return (
            <div>
                <h1>Profile Page</h1>
                {profile}
                {this._updateProfile()}
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        checkLoggedIn: () => dispatch(checkLoggedIn()),
        fetchFollowingPlaylists: (username) => dispatch(fetchFollowingPlaylists(username)),
        getUserByUsername: (username) => dispatch(getUserByUsername(username)),
        updateProfile: (username, profile) => {
            dispatch(updateProfile(username, profile))
            dispatch(checkLoggedIn())
        },
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
