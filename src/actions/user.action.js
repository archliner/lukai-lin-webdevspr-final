import Axios from 'axios'

function loginAttempt() {
    return {
        type: "LOGIN_ATTEMPT"
    }
}

function loginSuccess(username) {
    return {
        type: "LOGIN_SUCCESS",
        username
    }
}

function loginFailure(error) {
    return {
        type: "LOGIN_FAILURE",
        error
    }
}

function registerAttempt() {
    return {
        type: "REGISTER_ATTEMPT"
    }
}

function registerSuccess(username) {
    return {
        type: "REGISTER_SUCCESS",
        username
    }
}

function registerFailure(error) {
    return {
        type: "REGISTER_FAILURE",
        error
    }
}

function logoutAttempt() {
    return {
        type: "LOGOUT_ATTEMPT"
    }
}

function logoutSuccess() {
    return {
        type: "LOGOUT_SUCCESS",
    }
}

function logoutFailure(error) {
    return {
        type: "LOGOUT_FAILURE",
        error
    }
}

function checkLoggedInAttempt() {
    return {
        type: "CHECK_LOGGEDIN_ATTEMPT",
    }
}

function checkLoggedInSuccess (user) {
    return {
        type: "CHECK_LOGGEDIN_SUCCESS",
        user
    }
}

function checkLoggedInFailure () {
    return {
        type: "CHECK_LOGGEDIN_FAILURE",
    }
}

function getUserAttempt() {
    return {
        type: "GET_USER_ATTEMPT",
    }
}

function getUserSuccess(user) {
    return {
        type: "GET_USER_SUCCESS",
        username: user.username,
        isMaster: user.isMaster
    }
}

export function selectUser(username) {
    return {
        type: "SELECT_USER",
        username
    }
}

export function validate(user) {
    return  {...user,
        type: 'VALIDATE_REGISTER_USER'}
}

export function clear() {
    return {
        type: "CLEAR"
    }
}

export function login(user) {
    return function (dispatch) {
        dispatch(loginAttempt());
        return Axios.post('/api/user/authenticate', user)
            .then(response => {
                dispatch(loginSuccess(response.data.username))
                dispatch(selectUser(response.data.username))
            },
                error => dispatch(loginFailure(error.response.data))
            );
    }
}

export function register(username, password, bio) {
    return function (dispatch) {
        dispatch(registerAttempt());
        return Axios.post('/api/user/', {username, password, bio})
            .then(response => {
                console.dir(response.data);
                dispatch(registerSuccess(response.data.username))
                dispatch(selectUser(response.data.username))
                },
                error => dispatch(registerFailure(error.response.data.message))
            );
    }
}

export function logOut() {
    return function (dispatch) {
        dispatch(logoutAttempt());
        return Axios.post('/api/user/logout')
            .then(response => {
                    dispatch(logoutSuccess())
                },
                error => dispatch(logoutFailure(error.response.data.message)));
    }
}

export function checkLoggedIn() {
    return function (dispatch) {
        dispatch(checkLoggedInAttempt());
        return Axios.get('/api/user/loggedin')
        .then((response) => dispatch(checkLoggedInSuccess(response.data)),
        error => dispatch(checkLoggedInFailure()))
    }
}

export function getUserByUsername(username) {
    return function(dispatch) {
        dispatch(getUserAttempt());
        return Axios.get("/api/user/" + username)
            .then(response => dispatch(getUserSuccess(response.data)),
                error => console.log('An error occurred.', error)
            );
    }
}