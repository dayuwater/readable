import React, { Component } from 'react'
import Comment from './Comment'
import TriangleUp from 'react-icons/lib/go/triangle-up';
import TriangleDown from 'react-icons/lib/go/triangle-down';
import TriangleLeft from 'react-icons/lib/go/triangle-left';
import AddComment from './AddComment'
import * as API from '../utils/api'
import { connect } from 'react-redux'
import { setCategories, addPost, reset, addComment,
        votePost, voteComment, deletePost, deleteComment,
        editPost, editComment, setCurrentCategory, setSorting, setCurrentBlog } from '../actions'
import { Link } from 'react-router-dom';
import SortingControl from './SortingControl'

class BlogPage extends Component {

    state = {
        ready: 1,
        valid: true
    }

    reset = () => {
        this.props.reset()
    }

    // when the delete is successful, it will redirect user to the homepage
    // redirect user first, then delete the post from Redux, so that it will not crash
    delete = () => {
        const id =  this.props.blog.blog.id
        if(window.confirm("Are you sure you want to delete this post?"))
            API.deletePost(id).then(_ => this.props.history.push('/'))
            .then( res => this.props.deletePost(id))
            
    }


    getBlog = (postId) => {
        API.getOnePost(postId)
        .then(post => {
            console.log(post)
            if(post.error || Object.keys(post).length === 0){
                console.log("iii")
                this.setState((state) => ({
                    valid:false
                })) 
            }
            this.props.addPost({post})
        })
        .then(
            () => {
                this.getComments(postId)
            }
        )
        
    }

    getComments = (postId) => {
        API.getComments(postId)
            .then(comments => comments.map(comment => this.props.addComment({ comment })))
            .then(() => {
                this.setState((state) => ({
                    ready: 1
                }))
            }
            )
    }

    setCurrentBlog = (postId) => {
        this.props.setCurrentBlog(postId)
    }

    componentWillMount(){
        // if a user type the URL or visit from elsewhere, enter direct visit mode
        // which will trigger API functions
       
        if(!this.props.blog){
            this.setState((state) => ({
                ready:0
            }))

            this.reset()

            const postId = this.props.match.params.id
            console.log(postId)
            this.setCurrentBlog(postId)
            this.getBlog(postId)
        }

    }


    vote = (direction) => {
        API.votePost(this.props.blog.blog.id, direction).then(res => {
            this.props.votePost(this.props.blog.blog.id, res.voteScore)
        })
    }
    

    render() {
        const {blog, comments} = this.props
        const sortKeys = ['voteScore', 'author', 'timestamp', 'body']
        const sortOptions = ['Score', 'Author', 'Time', 'Body']

        // Perhaps indicating users that the page is loading is a better choice for mobile users
        // but this could potentially hurt the user experience for high-speed Internet
        if(this.state.ready == 0){
            return(
                <h1> Loading </h1>
            )
        }

        if(!this.state.valid){
            return (
                <h1> 404: That Post does not exist or already deleted </h1>
            )
        }

        return (
            <div className="blog container">
                <div className="row">
                    <Link to="/" className="pull-left"> <TriangleLeft size={30}/> <h3>Back</h3> </Link>
                    { /* perhaps this works by subdivision of bootstrap components */}
                    <div className="pull-right">
                        <Link to={`/blog_edit/blog_edit/${blog.blog.id}`} className="col-xs-4"> <TriangleLeft size={30}/> <h3>Edit</h3> </Link>
                        <a className="col-xs-4" onClick={this.delete}> <TriangleLeft size={30}/> <h3>Delete</h3> </a>
                    </div>
                </div>
                <h1>
                    {blog.blog.title}
                </h1>
                <p className="metadata"> posted on {new Date(blog.blog.timestamp).toString().slice(0, -14)} by {blog.blog.author} </p>

                <div className="blog-body row">

                    <div className="col-md-2" />

                    <article className="col-md-8">
                        {blog.blog.body}   

                    </article>

                    <div className="col-md-2" />

                </div>

                <div className="row">
                    
                    <div className = "col-md-6" />
                    <div className = "col-md-6">
                        <b> How would you rate this article? </b>
                        
                            <TriangleUp size={30} onClick={() => this.vote("upVote")}/>
                            <b className="blog-rating"> {blog.blog.voteScore} </b>
                            <TriangleDown size={30} onClick={() => this.vote("downVote")} />
                        
                    </div>

                    

                </div>

                <div>
                    <h2> Comments ({blog.comments.length}) </h2>
                    
                    <AddComment />

                    <SortingControl sortKeys={sortKeys} sortOptions={sortOptions} />
                    <br />
                    <br />

                    {
                        comments.map(comment => <Comment key={comment.id} content={comment}/>)
                    }
                   

                </div>



            </div>
        )
    }
}


function mapStateToProps({ blogs, blog, comment }, props) {
    //const currentBlog = this.props.match.params.id
    return {
        categories: blogs.category,
        blog: Object.values(blog).filter(blog => blog.blog.id === blogs.currentBlog)[0],
        blogs,
        // just remember the criteria to sort is a global configuration, and it is stored in blogs
        comments: Object.values(comment)
        .filter(c => c.parentId === blogs.currentBlog)
        .sort((c1, c2) => (isNaN(parseInt(c1[blogs.sorting])) ?
        c1[blogs.sorting] > c2[blogs.sorting] : 
        c1[blogs.sorting] < c2[blogs.sorting])),

        sorting: blogs.sorting
        


    }
}

function mapDispatchToProps(dispatch) {
  return {
    reset: () => dispatch(reset({})),
    setCategories: (categories) => dispatch(setCategories(categories)),
    addPost: (post) => dispatch(addPost(post)),
    addComment: (comment) => dispatch(addComment(comment)),
    votePost: (postId, voteScore) => dispatch(votePost({postId, voteScore})),
    setCurrentBlog: (postId) => dispatch(setCurrentBlog({postId})),
    deletePost: (postId) => dispatch(deletePost({postId}))
   

  }


}

// export default Debug
export default connect(mapStateToProps, mapDispatchToProps)(BlogPage)

