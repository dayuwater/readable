import {
    LOAD_POST,
    RESET,
    FLIP_RELOAD_SWITCH

} from "../actions"
import { combineReducers } from 'redux'

const initialBlogsState = {
    category: [],
    blogs: [],
    refresh_switch: true
}


function blogs (state = initialBlogsState, action){
    const { post } = action

    switch (action.type){
        case LOAD_POST:
            return {
                ...state,
                blogs: [ ...blogs, post]
            }
        case RESET:
            return initialBlogsState
        case FLIP_RELOAD_SWITCH:
            return {
                ...state,
                // refresh_switch: !state[refresh_switch]
            }
        default:
            return state

    }
}

export default combineReducers({
    blogs
})