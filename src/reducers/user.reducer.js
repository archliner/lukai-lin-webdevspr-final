import {combineReducers} from 'redux'

function valid(state = {
    success: false,
    message: '',
}, action) {
    switch (action.type) {
        case 'VALIDATE_REGISTER_USER':
            if (!action.password || !action.validatePassword || !action.username) {
                return {...state, message: 'All fields are required.'};
            }
            if (action.password !== action.validatePassword) {
                return {...state, message: 'The passwords must match.'};
            }
            return { success: true, message: '', };
        default:
            return {success: false, message: ''};
    }
}

function error(state = '', action) {
    switch (action.type) {
        case 'LOGIN_FAILURE':
        case 'REGISTER_FAILURE':
            return action.error;
        case 'LOGIN_ATTEMPT':
        case 'REGISTER_ATTEMPT':
            return '';
        case 'LOGOUT_ATTEMPT':
            return '';
        case 'UPDATE_PROFILE_SUCCESS':
            return '';
        case 'UPDATE_PROFILE_ERROR':
            return action.error;
        default:
            return state;
    }
}

function routeState(state = {
    state: 'LOADING',
    user: ''
}, action) {
    switch (action.type) {
        case 'CHECK_LOGGEDIN_ATTEMPT':
        case 'CHECK_LOGGEDIN_SUCCESS':
            return {state: 'LOGGEDIN', user: action.user};
        case 'CHECK_LOGGEDIN_FAILURE':
            return {state: 'LOGGEDOUT'}
        default:
            return state;
    }
}

function editMode(state = "", action) {
    switch (action.type) {
        case 'SWITCH_TO_EDIT':
            return "EDIT";
        case 'SWITCH_TO_DISPLAY':
            return "DISPLAY";
        case 'UPDATE_PROFILE_SUCCESS':
            return "DISPLAY";
        default:
            return state;
    }
}

function username(state = '', action) {
    switch (action.type) {
        case 'SELECT_USER':
            return action.username;
        case 'CLEAR':
            return '';
        default:
            return state;
    }
}

function playlists(state="", action) {
    switch(action.type) {
        case "GET_PLAYLISTS_SUCCESS":
            return action.playlists;
        default:
            return state;
    }
}

function getUser(state = {
    username: '',
    isMaster: false,
}, action) {
    if (action.type === 'GET_USER_SUCCESS') {
        console.log('user reducer => success => master: ' + action.isMaster)
        return {username: action.username, isMaster: action.isMaster}
    }
    return state;
}

function inFlight(state = false, action) {
    return action.type === 'LOGIN_ATTEMPT';
}
function redirect(state = '', action) {
    if (action.type === 'LOGIN_SUCCESS' || action.type === 'REGISTER_SUCCESS') {
        return '/home';
    }
    if (action.type === 'LOGOUT_SUCCESS') {
        return '/home'
    }
    if (action.type === 'UPDATE_PROFILE_SUCCESS') {
        return '/profile'
    }
    return '';
}

export default combineReducers({
    error,
    inFlight,
    redirect,
    username,
    valid,
    routeState,
    getUser,
    playlists,
    editMode
});

