import {combineReducers} from 'redux'

function searchList(
    state = {
        playList: [],
        // request: {},
        inFlight: false,
    },
    action
) {
    switch (action.type) {
        case "REQUEST_PLAYLIST_TITLE":
            return Object.assign({}, state, {
                inFlight: true,
            });
        case "RECEIVE_PLAYLIST_TITLE":
            return Object.assign({}, state, {
                playList: action.playList,
                // request: {title: action.title},
                inFlight: false,
            });
        case "REQUEST_SEARCH_BOOK_AUTHOR":
            return Object.assign({}, state, {
                inFlight: true,
            });
        case "RECEIVE_SEARCH_BOOK_AUTHOR":
            return Object.assign({}, state, {
                playList: action.playList,
                // request: {authors: action.authors},
                inFlight: false,
            });
        default:
            return Object.assign({}, state, {
                inFlight: false,
            });
    }
}

function posts(state = [], action) {
    switch (action.type) {
        case 'RECEIVE_POSTS':
            return action.posts
        default:
            return state
    }
}

function reviews(state='', action) {
    switch (action.type) {
        case 'RECEIVE_REVIEW_SUCCESS':
            return action.review
        default:
            return state
    }
}

function loading(state = true, action) {
    switch (action.type) {
        case 'RECEIVE_POSTS':
        case 'REQUEST_POSTS':
            return false;
        default:
            return state;
    }
}

function youtubeError(state = '', action) {
    switch (action.type) {
        case 'ADD_POST_FAILURE':
            return action.error
        case 'ADD_POST_ATTEMPT':
            return '';
        default:
            return state;
    }
}



function youtubeRedirect(state = {
    route: '',
    post: {},
    reviewId: ''
}, action) {
    switch (action.type) {
        case "ADD_POST_SUCCESS":
            return Object.assign({}, state, {
                route: '/youtube',
            });
        case "ADD_REVIEW_SUCCESS":
            return Object.assign({}, state, {
                route: '/youtube',
            });
        case "RECEIVE_POST_DETAIL_SUCCESS":
            return Object.assign({}, state, {
                route: '/youtube/detail',
                post: action.post
            });
        case "DELETE_POST_SUCCESS":
            return Object.assign({}, state, {
                route: '/youtube',
            });
        case "EDIT_REVIEW_SUCCESS":
            return Object.assign({}, state, {
                route: '/youtube/detail',
            });
        case "REDIRECT_TO_EDIT":
            return Object.assign({}, state, {
                route: '/youtube/detail/editcomment',
                reviewId: action.reviewId
            }); 
        default:
            return Object.assign({}, state, {
                route: '',
            });
        }
}

export default combineReducers({
    searchList,
    posts,
    reviews,
    loading,
    youtubeRedirect,
    youtubeError,
});

