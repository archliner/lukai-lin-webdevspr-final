// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {checkLoggedIn, getUserByUsername} from '../actions/user.action'
import Carousel from "react-bootstrap/Carousel";

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
                <p>Together. Share. Play.</p>

                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn.arstechnica.net/wp-content/uploads/2017/09/youtubemp3story-800x534.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Search for millions of playlists on youtube</h3>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://images.unsplash.com/photo-1543185377-99cd16011803?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Watch them on youtube</h3>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://images.unsplash.com/photo-1541877944-ac82a091518a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Share with your friends</h3>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
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
