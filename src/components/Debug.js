import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as API from '../utils/api'
import { setCategories, addPost, reset, addComment,
        votePost, voteComment, deletePost, deleteComment,
        editPost, editComment } from '../actions'



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
        API.getAllCategories().then(res => 
            this.props.setCategories({categories:res})
        )
    }

    getAllPosts = () => {
        API.getAllPosts().then(res => {
            console.log(res)
            return res
        }).then(posts => posts.map(post => this.props.addPost({post})))
    }

    getComments = (postId) => {
        API.getComments(postId).then(res => {
            console.log(res)
            return res
        }).then(comments => comments.map(comment => this.props.addComment({comment})))
    }

    votePost = (postId, option) => {
        API.votePost(postId, option).then(res => {
            console.log(res.voteScore)
            return res.voteScore
        }).then(res => this.props.votePost({postId, voteScore:res}))

    }

    voteComment = (commentId, option) => {
        API.voteComment(commentId, option).then(res => {
            console.log(res.voteScore)
            return res.voteScore
        }).then(res => this.props.voteComment({commentId, voteScore:res}))

    }

    postBlog = (blog) => {
        API.addPost(blog).then(res => {
            console.log(res)
            return res
        }).then(post => this.props.addPost({post}))
    }

    postComment = (comment) => {
        API.addComment(comment).then(res => {
            console.log(res)
            return res
        }).then(comment => this.props.addComment({comment}))
    }

    deleteBlog = (postId) => {
        API.deletePost(postId).then(res => {
            console.log(res)
            return res
        }).then(_ => this.props.deletePost({postId}))
    }

    deleteComment = (commentId) => {
        API.deleteComment(commentId).then(res => {
            console.log(res)
            return res.parentId
        }).then(parentId => this.props.deleteComment({commentId, parentId}))
    }

    editBlog = (postId, editedPost) => {
        API.editPost(postId, editedPost).then(res => {
            console.log(res)
            return res
        }).then(res => this.props.editPost({postId, post:res}))
    }

    editComment = (commentId, editedComment) => {
       API.editComment(commentId, editedComment).then(res => {
            console.log(res)
            return res
        }).then(res => this.props.editComment({commentId, comment:res}))
    }


    render(){
        return(
            <div>
                <h1> API and State tests </h1>
                <h4> Note: Not in production site. Bugs expected. Operate with caution.</h4>
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

function mapStateToProps({ food, calendar }) {
    return {}
}

function mapDispatchToProps(dispatch) {
  return {
    setCategories: (categories) => dispatch(setCategories(categories)),
    addPost: (post) => dispatch(addPost(post)),
    addComment: (comment) => dispatch(addComment(comment)),
    votePost: (postId, voteScore) => dispatch(votePost(postId, voteScore)),
    voteComment: (commentId, voteScore) => dispatch(voteComment(commentId, voteScore)),
    deletePost:(postId) => dispatch(deletePost(postId)),
    deleteComment: (commentId, parentId) => dispatch(deleteComment(commentId, parentId)),
    editPost:(postId, post) => dispatch(editPost(postId, post)),
    editComment:(commentId, comment) => dispatch(editComment(commentId, comment))
  }


}

// export default Debug
export default connect(mapStateToProps, mapDispatchToProps)(Debug)