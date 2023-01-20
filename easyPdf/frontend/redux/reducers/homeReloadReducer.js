import {Types} from "../../constants/Types";

const DEFAULT_STATE = {};

const homeReloadReducer = (state = DEFAULT_STATE, action) => {
    console.log("HomeReducer:")
    console.log(action.type)
    switch (action.type) {
        case Types.RELOAD_HOME:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default homeReloadReducer;