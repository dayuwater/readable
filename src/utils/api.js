const api = "http://localhost:5001"
const error = "Check your network connection."


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

export const getAllCategories = _ => (
    fetch(`${api}/categories`, { headers })
    .then(res => res.json()).then(json => json.categories)
    .then(objs => objs.map(obj => obj.name))
    .catch(err => error)
)

export const getAllPosts = _ => (
    fetch(`${api}/posts`, { headers })
        .then(res => res.json()).catch(err => error)
)

export const getComments = (postId) => (
    fetch(`${api}/posts/${postId}/comments`, {headers})
        .then(res => res.json()).catch(err => error)
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