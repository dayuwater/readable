export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const RESET = 'RESET'
export const FLIP_RELOAD_SWITCH = 'FLIP_RELOAD_SWITCH'
export const SET_CATEGORIES = 'SET_CATEGORIES'

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