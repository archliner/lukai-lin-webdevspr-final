import userReducer from "./user.reducer";
import youtubeReducers from "./youtube.reducer";
import {combineReducers} from 'redux';


export default combineReducers({
    user: userReducer,
    youtube: youtubeReducers
})