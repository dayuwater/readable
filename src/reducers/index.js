import {
    ADD_POST,
    RESET,
    FLIP_RELOAD_SWITCH,
    SET_CATEGORIES,
    ADD_COMMENT

} from "../actions"
import { combineReducers } from 'redux'

const initialBlogsState = {
    category: [],
    blogs: [],
    refresh_switch: true
}


function blogs (state = initialBlogsState, action){
    const { post, categories } = action

    switch (action.type){
        case ADD_POST:
            return {
                ...state,
                blogs: [ ...state.blogs, post.id]
            }
        case RESET:
            return initialBlogsState
        case FLIP_RELOAD_SWITCH:
            return {
                ...state,
                refresh_switch: !state.refresh_switch
            }
        case SET_CATEGORIES:
            return{
                ...state,
                category: categories
            }
        default:
            return state

    }
}

function blog(state = {}, action){
    const { post, comment } = action
    switch(action.type){
        case ADD_POST:
            return {
                ...state,
                [post.id]:post
            }
        case RESET:
            return {}
        default:
            return state
            
    }
}

function comment(state={}, action){
    const {comment} = action
    switch(action.type){
        case ADD_COMMENT:
            return {
                ...state,
                [comment.id]:comment
            }
        case RESET:
            return {}
        default:
            return state
    }


}

export default combineReducers({
    blogs,
    blog,
    comment
})