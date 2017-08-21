import {
    ADD_POST,
    RESET,
    FLIP_RELOAD_SWITCH,
    SET_CATEGORIES,
    ADD_COMMENT,
    VOTE_POST,
    VOTE_COMMENT,
    DELETE_POST,
    DELETE_COMMENT

} from "../actions"
import { combineReducers } from 'redux'

const initialBlogsState = {
    category: [],
    blogs: [],
    refresh_switch: true
}

function blogs (state = initialBlogsState, action){
    const { post, categories, postId } = action

    switch (action.type){
        case ADD_POST:
            return {
                ...state,
                blogs: [ ...state.blogs, post.id]
            }
        case DELETE_POST:
            return{
                ...state,
                blogs: state.blogs.filter(post => post !== postId)
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
    const { post, postId, comment, voteScore, commentId, parentId} = action
    switch(action.type){
        case ADD_POST:
            return {
                ...state,
                [post.id]:{
                    ...state[post.id],
                    blog: post,
                    comments : []
                }
            }
        case DELETE_POST:
            delete state[postId]
            return state
        case VOTE_POST:
            return{
                ...state,
                [postId]:{
                    ...state[postId],
                    blog:{
                        ...state[postId].blog,
                        voteScore
                    }
                }
            }
        case ADD_COMMENT:
            return {
                ...state,
                [comment.parentId]:{
                    ...state[comment.parentId],
                    comments: [...state[comment.parentId].comments, comment.id]
                }
            }
        case DELETE_COMMENT:
            return{
                ...state,
                [parentId]:{
                    ...state[parentId],
                    comments: state[parentId].comments.filter(comment => comment !== commentId)
                }
            }
        case RESET:
            return {}
        default:
            return state
            
    }
}

function comment(state={}, action){
    const {comment, commentId, voteScore, postId} = action
    switch(action.type){
        case ADD_COMMENT:
            return {
                ...state,
                [comment.id]:comment
            }
        case DELETE_COMMENT:
            delete state[commentId]
            return state
        case RESET:
            return {}
        case VOTE_COMMENT:
            return{
                ...state,
                [commentId]:{
                    ...state[commentId],
                    voteScore
                }
            }
        default:
            return state
    }


}

export default combineReducers({
    blogs,
    blog,
    comment
})