import React, {Component} from 'react'
import * as API from '../utils/api'


const testComment = "894tuq4ut84ut8v4t8wun89g"

const testBlog = {
  "id": "teststetstt",
  "timestamp": 123897182739817,
  "title":"Test",
  "body": "Test",
  "author":"SelfAuthor",
  "category":"redux"
}


class Debug extends Component{

    getAllCategories = () => {
        console.log("Get All Category Test Start")
        API.getAllCategories().then(res => console.log(res))
    }

    getAllPosts = () => {
        API.getAllPosts().then(res => console.log(res))
    }

    getComments = (postId) => {
        API.getComments(postId).then(res => console.log(res))
    }

    votePost = (postId, option) => {
        API.votePost(postId, option).then(res => console.log(res))

    }

    voteComment = (commentId, option) => {
        API.voteComment(commentId, option).then(res => console.log(res))

    }

    postBlog = (blog) => {
        API.addPost(blog).then(res => console.log(res))
    }

    render(){
        return(
            <div>
                <p> Gets </p>
                <button onClick={_ => this.getAllCategories()}> Get All Categories </button>
                <button onClick={_ => this.getAllPosts()}> Get All Posts </button>
                <button onClick={_ => this.getComments("8xf0y6ziyjabvozdd253nd")}> Get Comments </button>

                <p> Votes </p>
                <button onClick={_ => this.votePost("8xf0y6ziyjabvozdd253nd", "upVote")}> Vote Up A Post </button>
                <button onClick={_ => this.votePost("8xf0y6ziyjabvozdd253nd", "downVote")}> Vote Down A Post </button>
                <button onClick={_ => this.voteComment(testComment, "upVote")}> Vote Up A Comment </button>
                <button onClick={_ => this.voteComment(testComment, "downVote")}> Vote Down A Comment </button>
                
                <p> Post new </p>
                <button onClick={ _ => this.postBlog(testBlog)}> Post A blog </button>
            </div>
        )
    }

}

export default Debug