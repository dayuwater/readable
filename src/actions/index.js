import * as API from '../utils/api'


export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const RESET = 'RESET'
export const FLIP_RELOAD_SWITCH = 'FLIP_RELOAD_SWITCH'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const VOTE_POST = "VOTE_POST"
export const VOTE_COMMENT = "VOTE_COMMENT"
export const DELETE_POST = "DELETE_POST"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const EDIT_POST = "EDIT_POST"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const SET_CURRENT_CATEGORY = "SET_CURRENT_CATEGORY"
export const SET_CURRENT_BLOG = "SET_CURRENT_BLOG"
export const SET_SORTING = "SET_SORTING"

export const BLOG_NOT_EXIST = "n/a"


export function addPost({post}){
    return{
        type: ADD_POST,
        post
    }
}

export const addingPost = ({post}) => dispatch => (
    API.addPost(post).then(_ => dispatch(addPost({post})))

)

export function addComment({comment}){
    return{
        type: ADD_COMMENT,
        comment
    }
}

export const addingComment = ({comment}) => dispatch => (
    API.addComment(comment).then(res => dispatch(addComment({comment:res})))
)

export const fetchComments = ({postId}) => dispatch => {
    API
    .getComments(postId)
    .then(comments => 
        comments.map(comment =>  dispatch(addComment({comment})))
    
    )
}

export const fetchOnePost = ({postId}) => dispatch => {
    API.getOnePost(postId)
    .then(post => {
        console.log(post)
        if(post.error || Object.keys(post).length === 0){
            console.log("error")
            return false
        }
        dispatch(addPost({post}))
        return true
        
    })
    .then(
        // res => dispatch(fetchComments({postId})) 
        res => {
            if(res){
                dispatch(fetchComments({postId}))
                dispatch(setCurrentBlog({postId}))
            }
            else{
                dispatch(setCurrentBlog({postId:BLOG_NOT_EXIST}))
            }
           
        }
    )
   
}

export const fetchPosts = ({category}) => dispatch => (
    (category === "index" ? API.getAllPosts() : API.getPostsForOneCategory(category))
    .then(posts => posts.map(post => {
        dispatch(addPost({post}))
        return post
    }))
    .then(
        (posts) => {
            posts.map((post) => {
                // Use dispatch on every action called from functions in action/*.js
                // EVEN IF IT IS AN ACTION THAT TRIGGERS OTHER ACTIONS!!!!!
                dispatch(fetchComments({postId:post.id}))
            })
        }
    )
)

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

export const fetchCategories = () => dispatch => (
    API
        .getAllCategories()
        .then(categories => dispatch(setCategories({categories})))
);


export function setCurrentCategory({category}){
    return{
        type:SET_CURRENT_CATEGORY,
        category
    }

}


  



export function setSorting({sorting}){
    return{
        type:SET_SORTING,
        sorting
    }
}

export function setCurrentBlog({postId}){
    return{
        type: SET_CURRENT_BLOG,
        postId
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

export const votingPost = ({postId, direction}) => dispatch => {
    API.votePost(postId, direction).then(res => {
        dispatch(votePost({postId:res.id, voteScore:res.voteScore}))
    })

}

export function voteComment({commentId, voteScore}){
    return{
        type:VOTE_COMMENT,
        commentId,
        voteScore
    }
}

export const votingComment = ({commentId, direction}) => dispatch => {
    API.voteComment(commentId, direction).then(res => {
        dispatch(voteComment({commentId:res.id, voteScore:res.voteScore}))
    })

}



export function deletePost({postId}){
    return{
        type:DELETE_POST,
        postId
    }
}

export const deletingPost = ({postId}) => dispatch => (
    API.deletePost(postId)
    .then( res => dispatch(deletePost({postId:postId})))
)

export function deleteComment({commentId, parentId}){
    return{
        type:DELETE_COMMENT,
        commentId,
        parentId
    }
}

export const deletingComment = ({commentId}) => dispatch => (
    API.deleteComment(commentId).then(res => {
        return res.parentId
    }).then(parentId => dispatch(deleteComment({commentId, parentId})))
)


export function editPost({postId, post}){
    return{
        type: EDIT_POST,
        postId, 
        post
    }

}

export const editingPost = ({postId, post}) => dispatch => (
    API.editPost(postId, post).then(_ => dispatch(editPost({postId, post})))
)

export function editComment({commentId, comment}){
    return{
        type:EDIT_COMMENT,
        commentId,
        comment
    }
}



export const editingComment = ({commentId, comment}) => dispatch => (
    API.editComment(commentId, comment).then(res => 
        dispatch(editComment({commentId, comment:res}))    
    )

)