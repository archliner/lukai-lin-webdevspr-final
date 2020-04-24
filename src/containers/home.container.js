// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {checkLoggedIn, getUserByUsername} from '../actions/user.action'
import Carousel from "react-bootstrap/Carousel";
import {Badge, Jumbotron} from "react-bootstrap";

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
            <div align={"center"}>
                <h1><b>Tube</b>List</h1>
                <br/>
                <Jumbotron>
                    <p>TubeList is where you can search for millions of playlists on youtube and share
                       your views with friends.
                    </p>
                    <p>
                        Follow some favorite playlists, watch them on youtube
                        and write your reviews.
                    </p>
                </Jumbotron>

                <p>Made by Lukai, Haoliang, Haowei with ❤️</p>

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