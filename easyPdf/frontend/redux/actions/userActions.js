import {Types} from "../../constants/Types";

export const loginUser = (loginUser) => {
    console.log(`loginUserACTION ${loginUser}`)
    return{
        type: Types.LOGIN,
        payload: loginUser
    }
}