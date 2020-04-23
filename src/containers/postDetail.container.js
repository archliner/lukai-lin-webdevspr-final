import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {Redirect} from "react-router";
import {checkLoggedIn, getUserByUsername} from '../actions/user.action';
import {postDetail, getReviewsByPlaylistId, addReview, 
    rediectToEdit, deleteReview, deletePost, followingPlaylist, unfollowPlaylist} from '../actions/youtube.action';

class PostDetail extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.checkLoggedIn();
        
        const post = this.props.youtubeRedirect.post;
        if (post) {
            this.props.getReviewsByPlaylistId(post._id)
        }
        this.setState({playlist_Id: post._id, username: this.props.routeState.username})
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    _handleAddComment(post) {
        this.props.addReview(this.state, post._id);
    }

    _editReview(reviewId) {
        this.props.rediectToEdit(reviewId);
    }

    _deleteReview(reviewId, post) {
        this.props.deleteReview(reviewId, post._id);
    }

    _deletePost(postId) {
        this.props.deletePost(postId)
    }

    _followingPlaylist(username, playlistId) {
        this.props.followingPlaylist(username, playlistId);
    }

    _unfollowingPlaylist(username, playlistId) {
        this.props.unfollowPlaylist(username, playlistId)
    }

    _addComment(user, post) {
        if (!user) {
            return (<h5>You can login to add a comment</h5>)
        }

        return (
            <div>
                <form>
                    {/* {error} */}
                    <label> Rate:
                        <input type="text"
                            disabled={this.props.inFlight}
                            value={this.state.rate}
                            onChange={(e) => this.handleChange(e, 'rate')}/> </label>
                    <label> Comment:
                        <input type="text"
                            disabled={this.props.inFlight}
                            value={this.state.comment}
                            onChange={(e) => this.handleChange(e, 'comment')}/> </label>
                    <input type="button" value="Add" onClick={() => this._handleAddComment(post)} disabled={this.props.inFlight}/>
                </form>
            </div>
        );
    }

    _renderReviews(user, post, reviews) {
        var reviewRows = '';
        if (!reviews) {
            return (<div>Loading reviews....</div>)
        }
        var editDeleteButton = () => {};
        editDeleteButton = (review) => {
            if (user) {
                if (review.username === user.username || user.username === post.sharedUser || user.isAdmin) {
                    return (<div>
                        <input type='button' value='Edit' onClick={() => this._editReview(review._id)}/>
                        <input type='button' value='Delete' onClick={() => this._deleteReview(review._id, post)}/>
                    </div>);
                }
            }
        }

        reviewRows = this.props.reviews.map(review => (
            <tr key={review._id}>
                <td>{review.comment}</td>
                <td>{review.rate}</td>
                <td>{review.username}</td>
                <td>{new Date(review.createTime).toTimeString()}</td>
                <td>{new Date(review.editTime).toTimeString()}</td>
                {editDeleteButton(review)}
            </tr>));

        return (
            <div>
                <h2>Reviews</h2>
                {this._addComment(user, post)}
                <table>
                    <thead>
                    <tr>
                        <th>Comment</th>
                        <th>Rate</th>
                        <th>Reviewer</th>
                        <th>CreateTime</th>
                        <th>EditTime</th>
                    </tr>
                    </thead>
                    <tbody>
                        {reviewRows}
                    </tbody>
                </table>
            </div>
        )
    }

    _renderDetail(post, user) {
        if (!post) {
            return <p>Loading...</p>
        }
        var deleteButton = '';
        if (user) {
            if (user.username === post.sharedUser || user.isAdmin) {
                deleteButton = (
                    <input type='button' value='Delete Post' onClick={() => this._deletePost(post._id)}/>
                )
            }
        }

        var followButton = '';
        var unfollowButton = '';
        if (user) {

            followButton = (<input type='button' value='Follow Playlist' onClick={() => this._followingPlaylist(user.username, post.playlistId)}/>);
            unfollowButton = (<input type='button' value='Unfollow Playlist' onClick={() => this._unfollowingPlaylist(user.username, post.playlistId)}/>);
        }
        
        const detail = (
            <ul>
                <li>playlist: {post.playlistId}</li>
                <li>name: {post.name}</li>
                <li>description: {post.description}</li>
                <li>shared user: {post.sharedUser}</li>
                <li>share time: {post.shareTime}</li>
            </ul>
        );
        return (
            <div>
                <h1>Post Detail</h1>
                {followButton}{unfollowButton}
                {deleteButton}
                {detail}
            </div>
        );
    }

    render() {
        if (this.props.youtubeRedirect.route) {
            return (<Redirect to={this.props.youtubeRedirect.route}/>)
        }
        const user = this.props.routeState.user;
        const reviews = this.props.reviews;
        const post = this.props.youtubeRedirect.post;
        return (
            <div>
                {this._renderDetail(post, user)}
                {this._renderReviews(user, post, reviews)}
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        checkLoggedIn: () => dispatch(checkLoggedIn()),
        getUserByUsername: (username) => dispatch(getUserByUsername(username)),
        postDetail: (id) => dispatch(postDetail(id)),
        getReviewsByPlaylistId: (id) => dispatch(getReviewsByPlaylistId(id)),
        addReview: (review, playlistId) => dispatch(addReview(review, playlistId)),
        rediectToEdit: (reviewId) => dispatch(rediectToEdit(reviewId)),
        deleteReview: (reviewId, playlistId) => dispatch(deleteReview(reviewId, playlistId)),
        deletePost: (postId) => dispatch(deletePost(postId)),
        followingPlaylist: (username, playlistId) => dispatch(followingPlaylist(username, playlistId)),
        unfollowPlaylist: (username, playlistId) => dispatch(unfollowPlaylist(username, playlistId))
    }
}


function mapStateToProps(state, props) {
    return { 
        ...state.user,
        ...state.youtube,
    }
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail))