import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {Redirect} from "react-router";
import StarRatings from "react-star-ratings";
import {checkLoggedIn, getUserByUsername, fetchFollowingPlaylists} from '../actions/user.action';
import {postDetail, getReviewsByPlaylistId, addReview, 
    rediectToEdit, deleteReview, deletePost, followingPlaylist, unfollowPlaylist} from '../actions/youtube.action';
import Table from "react-bootstrap/Table";
import {Button, Jumbotron} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

class PostDetail extends React.Component {
    constructor() {
        super();
        this.state = {rate:5};
    }

    componentDidMount() {
        this.props.checkLoggedIn();
        const id = this.props.match.params.id;
        this.props.postDetail(id);
        // const post = this.props.youtubeRedirect.post;
        this.props.getReviewsByPlaylistId(id)
        this.setState({playlist_Id: id, username: this.props.routeState.username})
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    _handleAddComment(post) {
        this.props.addReview(this.state, post._id);
    }

    _editReview(postId, reviewId) {
        this.props.rediectToEdit(postId, reviewId);
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
                <Form className="justify-content-md-center">
                    <Form.Row className="justify-content-md-center">
                        <Form.Group as={Col} controlId="formGridUsername" xs lg="4">
                        <Form.Label></Form.Label>
                        <Form.Control value={this.state.rate} type="text" placeholder="Enter Rate" onChange={(e) => this.handleChange(e, 'rate')}/>
                        </Form.Group>

                        <StarRatings
                            rating={this.state.rate}
                            starRatedColor="red"
                            changeRating={(newRating)=>this.setState({rate: newRating})}
                            starDimension="20px"
                            name="rating"
                        />
                        <Form.Group as={Col} controlId="formGridPassword" xs lg="4">
                            <Form.Label></Form.Label>
                            <Form.Control type="text" placeholder="Enter Comment" onChange={(e) => this.handleChange(e, 'comment')}/>
                        </Form.Group>

                        <Form.Group as={Row} className="justify-content-md-center">
                        <Col xs lg="4" >
                            <Button onClick={() => this._handleAddComment(post)} variant="primary" disabled={this.props.inFlight}>
                                Add
                            </Button>
                        </Col>
                    </Form.Group>
                    </Form.Row>
                    <br/>

                </Form>

                {/* <form>
                    <label> Rate:
                        <input type="text"
                            disabled={this.props.inFlight}
                            value={this.state.rate}
                            onChange={(e) => this.handleChange(e, 'rate')}/> </label>
                    <StarRatings
                        rating={this.state.rate}
                        starRatedColor="red"
                        changeRating={(newRating)=>this.setState({rate: newRating})}
                        starDimension="20px"
                        name="rating"
                    />
                    <label> Comment:
                        <input type="text"
                            disabled={this.props.inFlight}
                            value={this.state.comment}
                            onChange={(e) => this.handleChange(e, 'comment')}/> </label>
                    <input type="button" value="Add" onClick={() => this._handleAddComment(post)} disabled={this.props.inFlight}/>
                </form> */}
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
                        <Button onClick={() => this._editReview(post._id, review._id)} variant="primary">
                            Edit
                        </Button>{'  '}
                        <Button onClick={() => this._deleteReview(review._id, post)} variant="primary">
                            Delete
                        </Button>
                        {/* <input type='button' value='Edit' onClick={() => this._editReview(post._id, review._id)}/>
                        <input type='button' value='Delete' onClick={() => this._deleteReview(review._id, post)}/> */}
                    </div>);
                }
            }
        }

        reviewRows = this.props.reviews.map(review => (
            <tr key={review._id} align={"center"}>
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
                <Table striped bordered hover responsive>
                    <thead>
                    <tr align={"center"}>
                        <th>Comment</th>
                        <th>Rate</th>
                        <th>Reviewer</th>
                        <th>Create Time</th>
                        <th>Edit Time</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                        {reviewRows}
                    </tbody>
                </Table>
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
                    // <input type='button' value='Delete Post' onClick={() => this._deletePost(post._id)}/>
                    <Button onClick={() => this._deletePost(post._id)} variant="primary">
                        Delete Post
                    </Button>
                )
            }
        }

        // var followButton = '';
        // var unfollowButton = '';
        var followingSwitchButton = '';
        if (user) {
            if (this.props.playlists.includes(post.playlistId)) {
                // followingSwitchButton = (<input type='button' value='Unfollow Playlist' onClick={() => this._unfollowingPlaylist(user.username, post.playlistId)}/>);
                followingSwitchButton = (<Button onClick={() => this._unfollowingPlaylist(user.username, post.playlistId)} variant="primary">
                    Unfollow Playlist
                </Button>)
            } else {
                // followingSwitchButton = (<input type='button' value='Follow Playlist' onClick={() => this._followingPlaylist(user.username, post.playlistId)}/>);
                followingSwitchButton = (<Button onClick={() => this._followingPlaylist(user.username, post.playlistId)} variant="primary">
                    Follow Playlist
                </Button>)
            }
        }
        
        const detail = (
            <div>
                <br/>
                <ul>
                    <li>playlist: <a href={post.playlistId}>{post.playlistId}</a></li>
                    <li>name: {post.name}</li>
                    <li>description: {post.description}</li>
                    <li>shared user: {post.sharedUser}</li>
                    <li>shared time: {post.shareTime}</li>
                </ul>
                <br/>
            </div>

        );
        return (
            <div>
                <h1>Post Detail</h1>
                <br/>
                {followingSwitchButton}
                {' '}{deleteButton}
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
                <Jumbotron>
                {this._renderDetail(post, user)}
                <hr/>
                {this._renderReviews(user, post, reviews)}
                </Jumbotron>
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
        rediectToEdit: (postId, reviewId) => dispatch(rediectToEdit(postId, reviewId)),
        deleteReview: (reviewId, playlistId) => dispatch(deleteReview(reviewId, playlistId)),
        deletePost: (postId) => dispatch(deletePost(postId)),
        followingPlaylist: (username, playlistId) => {
            dispatch(followingPlaylist(username, playlistId))
            dispatch(fetchFollowingPlaylists(username))
        },
        unfollowPlaylist: (username, playlistId) => {
            dispatch(unfollowPlaylist(username, playlistId))
            dispatch(fetchFollowingPlaylists(username))
        },
        // checkFollowingList: (playListId) => dispatch(checkFollowings(playListId)),
        // followingPlaylist: (username, playlistId) => dispatch(followingPlaylist(username, playlistId)),
        // unfollowPlaylist: (username, playlistId) => dispatch(unfollowPlaylist(username, playlistId))
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
