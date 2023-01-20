import { combineReducers} from "redux";

import userReducer from "./userReducer";
import homeReloadReducer from "./homeReloadReducer";

const rootReducer = () => combineReducers({
    userReducer: userReducer,
    homeReloadReducer: homeReloadReducer,
});
export default rootReducer;