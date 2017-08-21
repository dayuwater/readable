export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const RESET = 'RESET'
export const FLIP_RELOAD_SWITCH = 'FLIP_RELOAD_SWITCH'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const VOTE_POST = "VOTE_POST"
export const VOTE_COMMENT = "VOTE_COMMENT"
export const DELETE_POST = "DELETE_POST"
export const DELETE_COMMENT = "DELETE_COMMENT"

export function addPost({post}){
    return{
        type: ADD_POST,
        post
    }
}

export function addComment({comment}){
    return{
        type: ADD_COMMENT,
        comment
    }
}

export function reset({}){
    return{
        type: RESET
    }
}

export function flip_load_switch({}){
    return {
        type: FLIP_RELOAD_SWITCH
    }
}

export function setCategories({categories}){
    return{
        type: SET_CATEGORIES,
        categories

    }
}

// Although the server returns the same thing as adding post
// It is better to treat this as a different problem without copy/pasting
// or use addPost for voting post
export function votePost({postId, voteScore}){
    return{
        type:VOTE_POST,
        postId,
        voteScore
        
    }
}

export function voteComment({commentId, voteScore}){
    return{
        type:VOTE_COMMENT,
        commentId,
        voteScore
    }
}

export function deletePost({postId}){
    return{
        type:DELETE_POST,
        postId
    }
}

export function deleteComment({commentId, parentId}){
    return{
        type:DELETE_COMMENT,
        commentId,
        parentId
    }
}