import { combineReducers } from "redux";
import {UserReducer} from "./signUserReducer";


const reducers = combineReducers({
    userState : UserReducer
});
export default reducers;