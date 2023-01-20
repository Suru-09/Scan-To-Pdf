import {Types} from "../../constants/Types";

export const reloadHome = (reload) => {
    console.log(`reloadHomeAction ${reload}`)
    return{
        type: Types.RELOAD_HOME,
        payload: reload
    }
}