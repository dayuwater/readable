export const LOAD_POST = 'LOAD_POST'
export const RESET = 'RESET'
export const FLIP_RELOAD_SWITCH = 'FLIP_RELOAD_SWITCH'

export function loadPost({post}){
    return{
        type: LOAD_POST,
        post
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