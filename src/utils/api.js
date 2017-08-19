const api = "http://localhost:5001"
export const error = "Check your network connection."


const headers =  {
  'Accept': 'application/json',
  'Authorization': '2.0.0'
}

const postOptions = {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    }
}

const deleteOptions = {
    method: 'DELETE',
    headers: {
        ...headers
    }
}

export const getAllCategories = _ => (
    fetch(`${api}/categories`, { headers })
    .then(res => res.json()).then(json => json.categories)
    .then(objs => objs.map(obj => obj.name))
    .catch(err => error)
)

export const getAllPosts = _ => (
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())
        .then(arr => arr.filter(obj => obj.deleted == false))
        .catch(err => error)
)

export const getComments = (postId) => (
    fetch(`${api}/posts/${postId}/comments`, {headers})
        .then(res => res.json())
        .catch(err => error)
)

export const votePost = (postId, option) => (
    fetch(`${api}/posts/${postId}`,{ 
        ...postOptions,
        body: JSON.stringify({
            option: option
        })
    }).then(res => res.json()).catch(err => error)
)

export const voteComment = (commentId, option) => (
    fetch(`${api}/comments/${commentId}`,{ 
        ...postOptions,
        body: JSON.stringify({
            option: option
        })
    }).then(res => res.json()).catch(err => error)
)

export const addPost = (post) => (
    fetch(`${api}/posts`, {
        ...postOptions,
        body: JSON.stringify({
            ...post
        })
    
    }).then(res => res.json()).catch(err => error)

)

// PUT /posts/:id
export const editPost = (post) => {}

// DELETE /posts/:id
export const deletePost = (postId) => (
    fetch(`${api}/posts/${postId}`, deleteOptions)
    .then(res => res.text()).catch(err => error)
)

// POST /comments
export const addComment = (comment) => (
    fetch(`${api}/comments`, {
        ...postOptions,
        body: JSON.stringify({
            ...comment
        })
    
    }).then(res => res.json()).catch(err => error)
)

// PUT /comments/:id
export const editComment = (commentId) => {}

// DELETE /comments/:id
export const deleteComment = (commentId) => (
    fetch(`${api}/comments/${commentId}`, deleteOptions)
    .then(res => res.json()).catch(err => error)
)


