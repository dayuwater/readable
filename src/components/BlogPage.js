import React, { Component } from 'react'
import Comment from './Comment'
import TriangleUp from 'react-icons/lib/go/triangle-up';
import TriangleDown from 'react-icons/lib/go/triangle-down';
import TriangleLeft from 'react-icons/lib/go/triangle-left';
import AddComment from './AddComment'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import {bindActionCreators} from 'redux'
import { Link } from 'react-router-dom';
import SortingControl from './SortingControl'
import FaTrash from 'react-icons/lib/fa/trash';
import FaEdit from 'react-icons/lib/fa/edit';

class BlogPage extends Component {


    reset = () => {
        this.props.reset({})
    }

    delete = () => {
        const id =  this.props.blog.blog.id
        // console.log( this.props.deletingPost({postId:id})) // Return a promise
        if(window.confirm("Are you sure you want to delete this post?"))
            this.props.deletingPost({postId:id})
            .then(this.props.history.push('/'))
            
            
    }


    getBlog = (postId) => {
        this.props.fetchOnePost({postId})
    }

    vote = (direction) => {
        this.props.votingPost({postId:this.props.blog.blog.id, direction})
    }

    componentDidMount(){
        // if users visit this site by a URL for a specific blog
        if(!this.props.blog){
            this.reset()
            const postId = this.props.match.params.id
            this.getBlog(postId)

        }

        // otherwise, load from Redux
    }
    

    render() {
        const {blog, comments, blogs} = this.props
        const sortKeys = ['voteScore', 'author', 'timestamp', 'body']
        const sortOptions = ['Score', 'Author', 'Time', 'Body']

        // Perhaps indicating users that the page is loading is a better choice for mobile users
        // but this could potentially hurt the user experience for high-speed Internet
        if(blogs.currentBlog === ""){
            return(
                <h1> Loading </h1>
            )
        }

        if(blogs.currentBlog === Actions.BLOG_NOT_EXIST){
            return (
                <div>
                    <Link to="/" className="pull-left"> <TriangleLeft size={30}/> <h3>Back</h3> </Link>
                    <h1> 404: That Post does not exist or already deleted </h1>
                </div>
            )
        }

        return (
            <div className="blog container">
                <div className="row">
                    <Link to="/" className="pull-left"> <TriangleLeft size={30}/> <h3>Back</h3> </Link>
                    { /* perhaps this works by subdivision of bootstrap components */}
                    <div className="pull-right">
                        <Link to={`/blog_edit/blog_edit/${blog.blog.id}`} className="col-xs-4"> <FaEdit size={30}/> <h3>Edit</h3> </Link>
                        <a className="col-xs-4" onClick={this.delete}> <FaTrash size={30}/> <h3>Delete</h3> </a>
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

  return bindActionCreators(Actions, dispatch)

}

// export default Debug
export default connect(mapStateToProps, mapDispatchToProps)(BlogPage)

