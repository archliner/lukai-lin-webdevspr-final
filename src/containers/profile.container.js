  
// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {
    checkLoggedIn,
    getUserByUsername,
    fetchFollowingPlaylists,
    displayProfile, editProfile, updateProfile
} from '../actions/user.action'
import {Button} from "reactstrap";

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.checkLoggedIn();
        // this.props.setDisplay();
        const user = this.props.routeState.user;
        if (user)
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

    _handleEdit() {
        this.props.handleEdit();
    }

    _handleUpdate(username, bio, pwd1, pwd2) {
        this.props.updateProfile(username, bio, pwd1, pwd2);
    }

    _renderProfile (status, user, editMode, followingPlaylists) {
        let playlistHeader = ""
        if (followingPlaylists) {
            followingPlaylists = this.props.playlists.map((item, i) => {
                return <li key = {i}>{item}</li>
            });
            playlistHeader = "Following playlists"
        }

        let profile = "";
        let editButton = "";
        let updateButton = "";
        if (!user || status === "LOGGEDOUT") {
            profile = <h3>Please login to see your profile</h3>
            return profile;
        } else if (status === "LOGGEDIN") {
            if (editMode === "DISPLAY") {
                profile = <div>
                    {/*<Button color={"warning"} onClick={this._handleEdit()}>Edit</Button>*/}
                    <h3>Username: {user.username}</h3>
                    <h3>Bio Info: {user.bio || "This guy is lazy, nothing was provided here."}</h3>
                    <h5>{playlistHeader}</h5>
                    <ul>{followingPlaylists}</ul>
                </div>
            } else if (editMode === "EDIT") {
                let newBio = user.bio;
                let newPwd1 = "";
                let newPwd2 = "";

                profile = <div>
                    <h3>Username: {user.username}</h3>
                    <label>Biography:</label>
                    <input onChange={event => (newBio = event.target.value)} type={"text"}/>
                    <label>Password:</label>
                    <input onChange={event => (newPwd1 = event.target.value)}/>
                    <label>Confirm password:</label>
                    <input onChange={event => (newPwd2 = event.target.value)}/>
                    {/*<Button color={"primary"} onClick={this._handleUpdate(user.username, newBio, newPwd1, newPwd2)}>Update</Button>*/}
                    {/*<Button color={"secondary"} onClick={this.props.setDisplay()}>Cancel</Button>*/}
                </div>
            }
            return profile;
        }
    }

    render() {
        const status = this.props.routeState.state;
        const user = this.props.routeState.user;
        const editMode = this.props.editMode || "DISPLAY";
        console.log(editMode)
        let followingPlaylists = this.props.playlists;

        return (
            <div>
                <h1>Profile Page</h1>
                {/*{editButton}*/}
                {/*{profile}*/}
                {/*{updateButton}*/}
                {this._renderProfile(status,user,editMode)}
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        checkLoggedIn: () => dispatch(checkLoggedIn()),
        setDisplay: () => dispatch(displayProfile()),
        fetchFollowingPlaylists: (username) => dispatch(fetchFollowingPlaylists(username)),
        getUserByUsername: (username) => dispatch(getUserByUsername(username)),
        updateProfile: (username, bio, pwd1, pwd2) => dispatch(updateProfile(username, bio, pwd1, pwd2)),
        handleEdit: () => dispatch(editProfile())
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
