// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {Redirect} from "react-router";
import {Link} from 'react-router-dom';
import {checkLoggedIn, getUserByUsername} from '../actions/user.action';
import {fetchPosts, postDetail} from '../actions/youtube.action';
import Table from "react-bootstrap/Table";
import {Button, Jumbotron} from "react-bootstrap";

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

    _jumpToAdd(url) {
        this.props.history.push(url);
    }

    _renderPostList() {
        const postRows = this.props.posts.map(post => (
            <tr key={post._id}>
                <td>{post.playlistId}</td>
                <td>{post.name}</td>
                <td>{post.sharedUser}</td>
                <td>{new Date(post.shareTime).toTimeString()}</td>
                {/* <td><input type='button' value='Detail' onClick={() => this._postDetail(post._id)}/> </td> */}
                <td><Link to={`/youtube/detail/${post._id}`}>Detail</Link></td>
            </tr>));
        return (
            <div>
                <h2 align={"center"}>Post Ground</h2>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>PlayList</th>
                        <th>ListName</th>
                        <th>Poster</th>
                        <th>Date</th>
                        <th>Detail</th>
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
            addButton = (<Button color= {"primary"} onClick={() => this._jumpToAdd("/youtube/addpost")}>Add Post</Button>)
        } else if (status === "LOGGEDOUT") {
            addButton = (<h4>Please login to add a post</h4>)
        }
        return (
            <div>
                <Jumbotron>
                {addButton}
                {this._renderPostList()}
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
