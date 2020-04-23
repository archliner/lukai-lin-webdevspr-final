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

// import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import TubeListNav from "./components/TubeListNav";
// import Explore from "./components/pages/Explore";
// import Profile from "./components/pages/Profile";
// import Following from "./components/pages/Following";

// const userStore = createStore(reducers, applyMiddleware(thunkMiddleware));

const userStore = createStore(
    reducers, 
    compose (
        applyMiddleware(thunkMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

// ReactDOM.render(
//     <React.StrictMode>
//       <Router>
//         <TubeListNav />
//         <Route path="/explore" component={Explore} />
//         <Route path="/following" component={Following} />
//         <Route path="/profile" component={Profile} />
//       </Router>
//     </React.StrictMode>,
//     document.getElementById("root")
//   );

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