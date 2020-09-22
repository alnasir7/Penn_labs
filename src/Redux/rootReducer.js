import { combineReducers } from "redux";
import cartReducer from "./cart";
import courseReducer from "./courses";
import toolboxReducer from "./toolbox"

//the root reducer combines the reducer for the cart, filter data (toolbox), and courses
export default combineReducers({
courseReducer, cartReducer, toolboxReducer
});