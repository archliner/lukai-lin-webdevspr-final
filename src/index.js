import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose } from "redux";
import {Provider} from "react-redux";
import reducers from './reducers';
import Header from "./components/header.component";
import LoggedInComponent from './components/loggedin.component';
import LogoutContainer from "./containers/logout.container"
import thunkMiddleware from 'redux-thunk';
import {
    BrowserRouter, Switch,
    Route, Redirect
} from "react-router-dom";
import UserLogin from "./containers/login.container";
import Register from "./containers/register.container";
import Home from "./containers/home.container";
import Youtube from "./containers/youtube.container";
import AddPost from "./containers/addPost.containser";
import PostDetail from './containers/postDetail.container';
import Profile from "./containers/profile.container";
import Search from "./containers/search.container";
import EditReview from "./containers/editReview.container";

// const userStore = createStore(reducers, applyMiddleware(thunkMiddleware));

const userStore = createStore(
    reducers, 
    compose (
        applyMiddleware(thunkMiddleware)
    )
);

ReactDOM.render(
    <Provider store={userStore}>
        <BrowserRouter>
        {/* <Link to={'/login'}>Login</Link>&nbsp;
        <Link to={'/register'}>Register</Link> */}
            <Header />
            <Switch>
                <Route path="/search" component={Search}/>
                <Route exact path="/youtube" component={LoggedInComponent(Youtube)}/>
                <Route exact path="/youtube/addpost" component={LoggedInComponent(AddPost)}/>
                <Route exact path="/youtube/detail" component={LoggedInComponent(PostDetail)}/>
                <Route exact path="/youtube/detail/editcomment" component={LoggedInComponent(EditReview)}/>
                <Route path="/profile" component={LoggedInComponent(Profile)}/>
                <Route path="/login" component={UserLogin}/>
                <Route path="/register" component={Register}/>
                <Route path="/logout" component={LogoutContainer}/>
                <Route path="/home" component={LoggedInComponent(Home)}/>
                <Redirect exact from="/" to="home"/>
            </Switch>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);
