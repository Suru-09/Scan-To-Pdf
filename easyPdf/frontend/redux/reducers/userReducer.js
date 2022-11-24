import {Types} from "../../constants/Types";


const DEFAULT_STATE = {};

const userReducer = (state = DEFAULT_STATE, action) => {
    console.log("UserReducer:")
    console.log(action.type)
    switch (action.type) {
        case Types.CREATE_USER:
            return {
                ...state,
                user: action.payload
            }
        case Types.LOGIN:
            console.log(action.payload)
            return {
                ...state,
                loginUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;