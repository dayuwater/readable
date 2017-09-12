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
        editPost, editComment, setCurrentCategory, setSorting } from '../actions'
import { Link } from 'react-router-dom';
import SortingControl from './SortingControl'

class BlogPage extends Component {

    getBlog = (postId) => {
        API.getOnePost(postId)
        .then(post => this.props.addPost({post}))
        .then(
            () => (
                this.props.blogs.map((blog) => {this.getComments(blog.blog.id)})
            )
        )
    }

    getComments = (postId) => {
        API.getComments(postId)
        .then(comments => comments.map(comment => this.props.addComment({comment})))
    }

    componentDidMount(){
        //const currentBlog = this.props.match.params.id
        //this.getBlog(currentBlog)
        //console.log(this.props.blog)
       
    }
    

    render() {
        const {blog, comments} = this.props
        const sortKeys = ['voteScore', 'author', 'timestamp', 'body']
        const sortOptions = ['Score', 'Author', 'Time', 'Body']
        return (
            <div className="blog container">
                <Link to="/"> <TriangleLeft size={30}/> <h3>Back</h3> </Link>
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
                        
                            <TriangleUp size={30}/>
                            <b className="blog-rating"> {blog.blog.voteScore} </b>
                            <TriangleDown size={30}/>
                        
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
    setCategories: (categories) => dispatch(setCategories(categories)),
    addPost: (post) => dispatch(addPost(post)),
    addComment: (comment) => dispatch(addComment(comment)),
    
   

  }


}

// export default Debug
export default connect(mapStateToProps, mapDispatchToProps)(BlogPage)

