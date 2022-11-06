import {configureStore, createStore} from '@reduxjs/toolkit'
import rootReducer from "./reducers/rootReducer";

const configStore = createStore(
    rootReducer()
)

export default configStore;