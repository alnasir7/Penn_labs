import { combineReducers } from "redux";
import cartReducer from "./cart";
import courseReducer from "./courses";
import toolboxReducer from "./toolbox"

export default combineReducers({
courseReducer, cartReducer, toolboxReducer
});