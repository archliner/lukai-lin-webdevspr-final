import Axios from 'axios'

function requestBookListByTitle() {
    return {
        type: "REQUEST_PLAYLIST_TITLE"
    }
}

function receiveBookListByTitle(playList) {
    return {
        type: "RECEIVE_PLAYLIST_TITLE",
        playList
        // title
    }
}

function requestBookListByAuthor() {
    return {
        type: "REQUEST_SEARCH_BOOK_AUTHOR"
    }
}

function receiveBookListByAuthor(bookList, authors) {
    return {
        type: "RECEIVE_SEARCH_BOOK_AUTHOR",
        bookList,
        authors
    }
}

function loadingPosts() {
    return {
        type: "REQUEST_POSTS"
    }
}

function receivePostsList(posts) {
    return {
        type: "RECEIVE_POSTS",
        posts
    }
}

function addPostAttempt() {
    return {
        type: "ADD_POST_ATTEMPT"
    }
}

function addPostSuccess() {
    return {
        type: "ADD_POST_SUCCESS",
    }
}

function addPostFailure(error) {
    return {
        type: "ADD_POST_FAILURE",
        error
    }
}

function receivePostDetail(post) {
    return {
        type: "RECEIVE_POST_DETAIL_SUCCESS",
        post
    }
}

function deletePostSuccess() {
    return {
        type: "DELETE_POST_SUCCESS",
    }
}

function receiveReview(review) {
    return {
        type: "RECEIVE_REVIEW_SUCCESS",
        review
    }
}

function addReviewSuccess() {
    console.log('dispatch!')
    return {
        type: "ADD_REVIEW_SUCCESS",
    }
}

function redirectToEdit(reviewId) {
    return {
        type: "REDIRECT_TO_EDIT",
        reviewId
    }
}

function editReviewSuccess() {
    return {
        type: "EDIT_REVIEW_SUCCESS",
    }
}

function followPlaylistSuccess() {
    return {
        type: "FOLLOW_PLAYLIST_SUCCESS",
    }
}

function unfollowPlaylistSuccess() {
    return {
        type: "UNFOLLOW_PLAYLIST_SUCCESS",
    }
}

export function searchByTitle(request) {
    return function(dispatch) {
        dispatch(requestBookListByTitle());
        return Axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&maxResults=25&q=${request.keyword}&key=AIzaSyCACcXftmROEAKdGIyTOxUunFO0_2wlkxU`)
            .then(response => {
                return response.data.items;
            })
            .then(info => dispatch(receiveBookListByTitle(info)),
                error => console.log('An error occurred.', error)
                );
    }
}

export function fetchPosts() {
    return function(dispatch) {
        dispatch(loadingPosts());
        return Axios.get(`/api/playlist`)
            .then(response => dispatch(receivePostsList(response.data)),
                error => console.log('An error occurred.', error)
            );
    }
}

export function addPost(post) {
    return function (dispatch) {
        dispatch(addPostAttempt());
        return Axios.post('/api/playlist/', post)
            .then(response => {
                dispatch(addPostSuccess(response.data))
            },
                error => dispatch(addPostFailure(error.response.data))
            );
    }
}

export function postDetail(id) {
    return function(dispatch) {
        return Axios.get(`/api/playlist/${id}`)
            .then(response => dispatch(receivePostDetail(response.data[0])),
            error => console.log('An error occurred.', error)
            );
    }
}

export function getReviewsByPlaylistId(id) {
    return function(dispatch) {
        return Axios.get(`/api/review/${id}`)
        .then(response => dispatch(receiveReview(response.data)),
        error => console.log('An error occurred.', error)
        );
    }
}

export function addReview(review, playlistId) {
    return function (dispatch) {
        return Axios.post('/api/review/', review)
            .then(() => Axios.get(`/api/review/${playlistId}`),
                error => console.log('An error occurred.', error))
            .then(response => dispatch(receiveReview(response.data)),
                error => console.log('An error occurred.', error)
        )
    }
}

export function rediectToEdit(reviewId) {
    return function(dispatch) {
        dispatch(redirectToEdit(reviewId));
    }
}

export function editReview(review) {
    return function(dispatch) {
        return Axios.put(`/api/review/${review._id}`, review)
            .then(response => dispatch(editReviewSuccess(response.data)),
            error => console.log('An error occurred.', error)
        );
    }
}

export function deleteReview(reviewId, playlistId) {
    return function(dispatch) {
        return Axios.delete(`/api/review/${reviewId}`)
            .then(() => Axios.get(`/api/review/${playlistId}`),
                error => console.log('An error occurred.', error))
            .then(response => dispatch(receiveReview(response.data)),
                error => console.log('An error occurred.', error)
        )
    }
}

export function deletePost(postId) {
    return function(dispatch) {
        return Axios.delete(`/api/playlist/${postId}`)
            .then(response => dispatch(deletePostSuccess()),
            error => console.log('An error occurred.', error)
        )
    }
}

export function followingPlaylist(username, playlistId) {
    return function(dispatch) {
        return Axios.put(`/api/user/${username}`, {following: playlistId})
            .then(response => dispatch(followPlaylistSuccess()),
            error => console.log('An error occurred.', error)
        )
    }
}

export function unfollowPlaylist(username, playlistId) {
    return function(dispatch) {
        return Axios.put(`/api/user/${username}`, {unfollowing: playlistId})
            .then(response => dispatch(unfollowPlaylistSuccess()),
            error => console.log('An error occurred.', error)
        )
    }
}