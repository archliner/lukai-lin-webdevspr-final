// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {Redirect} from "react-router";
import {Link} from 'react-router-dom';
import {checkLoggedIn, getUserByUsername} from '../actions/user.action';
import {fetchPosts, postDetail} from '../actions/youtube.action';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

class Youtube extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.checkLoggedIn();
        this.props.getPosts();
    }

    _postDetail(id) {
        this.props.postDetail(id);
    }

    _renderPostList() {
        const postRows = this.props.posts.map(post => (
            <tr key={post._id}>
                <td><a href={post.playlistId}>{post.playlistId}</a></td>
                <td>{post.name}</td>
                <td>{post.sharedUser}</td>
                <td>{new Date(post.shareTime).toTimeString()}</td>
                {/* <td><input type='button' value='Detail' onClick={() => this._postDetail(post._id)}/> </td> */}
                <td><Link to={`/youtube/detail/${post._id}`}>Detail</Link></td>
            </tr>));
        return (
            <div>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th style={{width: "30%"}}>Playlist</th>
                        <th style={{width: "15%"}}>ListName</th>
                        <th style={{width: "15%"}}>Poster</th>
                        <th style={{width: "25%"}}>Date</th>
                        <th>Go to detail</th>
                    </tr>
                    </thead>
                    <tbody>
                        {postRows}
                    </tbody>
                </Table>
            </div>
        )
    }

    render() {

        if (this.props.youtubeRedirect.route) {
            return (<Redirect to={this.props.youtubeRedirect.route}/>)
        }

        const status = this.props.routeState.state;
        var addButton = '';
        if (status === "LOGGEDIN") {
            // addButton = <a type='button' href="/youtube/addpost">Add Post</a>
            addButton = <Button block variant="primary" href="/youtube/addpost">New Post</Button>
        } else if (status === "LOGGEDOUT") {
            addButton = <h4>Plaease login to add a post</h4>
        }
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <h1 className="text-center">Explore Youtube Posts</h1>
                        <br/>
                        <h4>Here are the posts</h4>
                        {addButton}
                        {this._renderPostList()}
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        checkLoggedIn: () => dispatch(checkLoggedIn()),
        getUserByUsername: (username) => dispatch(getUserByUsername(username)),
        getPosts: () => dispatch(fetchPosts()),
        postDetail: (id) => dispatch(postDetail(id)),
    }
}


function mapStateToProps(state, props) {
    return { ...state.youtube,
        ...state.user,
    }
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Youtube))
