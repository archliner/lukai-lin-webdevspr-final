// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {Redirect} from "react-router";
import {checkLoggedIn, getUserByUsername} from '../actions/user.action';
import {fetchPosts, postDetail} from '../actions/youtube.action';

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
                <td><input type='button' value='Detail' onClick={() => this._postDetail(post._id)}/> </td>
            </tr>));
        return (
            <div>
                <h2>Welcome To Post Ground!</h2>
                <table>
                    <thead>
                    <tr>
                        <th>PlayList</th>
                        <th>ListName</th>
                        <th>Poster</th>
                        <th>Date</th>
                        {/* <th></th> */}
                    </tr>
                    </thead>
                    <tbody>
                        {postRows}
                    </tbody>
                </table>
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
            addButton = <a type='button' href="/youtube/addpost">Add Post</a>
        } else if (status === "LOGGEDOUT") {
            addButton = <h4>Plaease login to add a post</h4>
        }
        return (
            <div>
                <h1>Youtube Page</h1>
                {addButton}
                {this._renderPostList()}

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
