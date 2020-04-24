import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {checkLoggedIn, getUserByUsername, fetchFollowingPlaylists, updateProfile} from '../actions/user.action'
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

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

                {/* <Form className="justify-content-md-center">
                    <Form.Row className="justify-content-md-center">
                        <Form.Group as={Col} controlId="formGridPassword" xs lg="4">
                            <Form.Label></Form.Label>
                            <Form.Control as="textarea" placeholder="New Bio here..." rows="3" onChange={(e) => this.handleChange(e, 'bio')} />
                        </Form.Group>
                    </Form.Row>
                    <br/>
                    <Form.Group as={Row} className="justify-content-md-center">
                        <Col xs lg="4" >
                            <Button onClick={() => this._handleUpdateProfile()} block variant="primary" type="button" disabled={this.props.inFlight}>
                                Edit
                            </Button>
                        </Col>
                    </Form.Group>
                </Form> */}
                <form>
                    {/* {error} */}
                    <label> New Bio:
                        <input type="text"
                            disabled={this.props.inFlight}
                            value={this.state.bio}
                            onChange={(e) => this.handleChange(e, 'bio')}/> </label>
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
                return <ListGroupItem key={i}>{item}</ListGroupItem>
            });
            playlistHeader = "Following playlists"
        }

        let profile = "";
        if (!user || status === "LOGGEDOUT") {
            profile = <h3>Please login to see your profile</h3>
        }
        else if (status === "LOGGEDIN") {
            profile = <div>
                <Card style={{ width: '25rem'}}>
                <Card.Img variant="top" src="https://cdn2.iconfinder.com/data/icons/social-media-2173/95/Network_Social_Instagram_Internet_Twitter_Facebook_30-512.png" />
                <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                    <Card.Text>
                    <b>Bio Info:</b> {user.bio || "This guy is lazy, nothing was provided here."}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem><b>Following Playlists</b></ListGroupItem>
                    {followingPlaylists}
                </ListGroup>
                </Card>
                {/* <h3>Username: {user.username}</h3>
                <h3>Bio Info: {user.bio || "This guy is lazy, nothing was provided here."}</h3>
                <h5>{playlistHeader}</h5>
                <ul>{followingPlaylists}</ul>
                <br /> */}
            </div>
        }

        return (
            <div>
                <Jumbotron>
                    <Container>
                        <h1 className="text-center">My Profile</h1>
                        {this._updateProfile()}
                        {profile}
                    </Container>
                </Jumbotron>
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
