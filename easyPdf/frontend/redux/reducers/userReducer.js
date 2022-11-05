const DEFAULT_STATE = {};

const userReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "plm":
            console.log(action.payload)
            return {
                ...state,
                tracks: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;