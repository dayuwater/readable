import React, {Component} from 'react'
import BlogOverview from '../components/BlogOverview';
import CategoryPage from './CategoryPage'
import { connect } from 'react-redux'
import * as API from '../utils/api'
import { setCategories, addPost, reset, addComment,
        votePost, voteComment, deletePost, deleteComment,
        editPost, editComment } from '../actions'

class MainPage extends Component{

    getAllCategories = () => {
        API.getAllCategories().then(res => 
            this.props.setCategories({categories:res})
        )
    }

    getAllPosts = () => {
        API.getAllPosts()
        .then(posts => posts.map(post => this.props.addPost({post})))
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
        console.log("loading")
        // load all the possible categories from API and store them in Redux
        this.getAllCategories()
        // load all the blogs from API and store them in Redux
        this.getAllPosts()

        
        
       


        
    }

    render(){
        return(
            <CategoryPage categories={this.props.categories} currentCategory={"index"} 
                blogs={this.props.blogs}/>
        )
    }
}

function mapStateToProps({ blogs, blog, comment }) {
    return {
        categories: blogs.category,
        blogs: Object.values(blog)

    }
}

function mapDispatchToProps(dispatch) {
  return {
    setCategories: (categories) => dispatch(setCategories(categories)),
    addPost: (post) => dispatch(addPost(post)),
    addComment: (comment) => dispatch(addComment(comment))
  }


}

// export default Debug
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
