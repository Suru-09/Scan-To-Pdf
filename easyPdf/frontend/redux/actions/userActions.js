import {Types} from "../constants/Types";

export const loginUser = (loginUser) => {
    console.log("pLM")
    return{
        type: Types.LOGIN,
        payload: loginUser
    }
}