import React, {Component} from 'react'
import * as API from '../utils/api'


const testComment = "894tuq4ut84ut8v4t8wun89g"

const testPost = "8xf0y6ziyjabvozdd253nd"

const testBlog = {
  "id": "teststetstt",
  "timestamp": 123897182739817,
  "title":"Test",
  "body": "Test",
  "author":"SelfAuthor",
  "category":"redux"
}

const testCommentBody = {
  "id": "testcomment",
  "timestamp": 128737834739817,
  "body": "Test",
  "author":"SelfAuthor",
  "parentId": testPost
}

const editedPost = {
    "title":"EditedTestfromProg",
    "body": "EeditYestfomPogama"
}

const editedComment = {
    "body": "EditedComment from programama",
    "timestamp" : Date.now()
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

    postComment = (comment) => {
        API.addComment(comment).then(res => console.log(res))
    }

    deleteBlog = (postId) => {
        API.deletePost(postId).then(res => console.log(res))
    }

    deleteComment = (commentId) => {
        API.deleteComment(commentId).then(res => console.log(res))
    }

    editBlog = (postId, editedPost) => {
        API.editPost(postId, editedPost).then(res => console.log(res))
    }

    editComment = (commentId, editedComment) => {
        API.editComment(commentId, editedComment).then(res => console.log(res))
    }


    render(){
        return(
            <div>
                <h1> API tests </h1>
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
                <button onClick={ _ => this.postComment(testCommentBody)}> Post A comment </button>

                <p> Deletes </p>
                <button onClick ={ _ => this.deleteBlog(testPost)}> Delete A Post </button>
                <button onClick ={ _ => this.deleteComment(testComment)}> Delete A Comment </button>

                <p> Edits</p>
                <button onClick={ _ => this.editBlog(testPost, editedPost)}> Edit A blog </button>
                <button onClick={ _ => this.editComment(testComment,editedComment)}> Edit A comment </button> 
            </div>
        )
    }

}

export default Debug