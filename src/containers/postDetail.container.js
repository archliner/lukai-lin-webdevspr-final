import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {Redirect} from "react-router";
import queryString from 'query-string';
import {checkLoggedIn, getUserByUsername} from '../actions/user.action';
import {postDetail, getReviewsByPlaylistId, addReview} from '../actions/youtube.action';

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
        console.log('post id: ' + post._id + ' username: ' + this.props.routeState.username)
        this.setState({playlist_Id: post._id, username: this.props.routeState.username})
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.addReview(this.state);
        // this.props.postDetail(this.props.youtubeRedirect.post._id)
        // event.preventDefault();
    }

    _handleAddComment() {
        this.props.addReview(this.state);
    }


    _addComment() {
        const user = this.props.routeState.user;
        if (!user) {
            return (<h5>You can login to add a comment</h5>)
        }

        return (
            <div>
                {/* <form onSubmit={(e) => this.handleSubmit(e)}> */}
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
                    <input type="button" value="Add" onClick={() => this._handleAddComment()} disabled={this.props.inFlight}/>
                </form>
            </div>
        );
    }

    _renderReviews() {
        const reviews = this.props.reviews;
        if (!reviews) {
            return (<div>Loading reviews....</div>)
        }
        const reviewRows = this.props.reviews.map(review => (
            <tr key={review._id}>
                <td>{review.comment}</td>
                <td>{review.rate}</td>
                <td>{review.username}</td>
                <td>{new Date(review.createTime).toTimeString()}</td>
                {/* <td><input type='button' value='Edit' onClick={() => this._editReview(review._id)}/> </td>
                <td><input type='button' value='Delete' onClick={() => this._deleteReview(review._id)}/> </td> */}
            </tr>));
        return (
            <div>
                <h2>Reviews</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Comment</th>
                        <th>Rate</th>
                        <th>Reviewer</th>
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {reviewRows}
                    </tbody>
                </table>
            </div>
        )
    }

    _renderDetail() {
        const post = this.props.youtubeRedirect.post;
        if (!post) {
            return <p>Loading...</p>
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
                {detail}
            </div>
        );
    }

    render() {
        if (this.props.youtubeRedirect.route) {
            return (<Redirect to={this.props.youtubeRedirect.route}/>)
        }

        return (
            <div>
                {this._renderDetail()}
                {this._addComment()}
                {this._renderReviews()}
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
        addReview: (review) => dispatch(addReview(review)),
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