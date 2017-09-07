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

    getPostsForCategory = (category) => {
        API.getPostsForOneCategory(category)
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
        
        // load all the possible categories from API and store them in Redux
        this.getAllCategories()

        // if it is index page, this would be undefined
        const currentCategory = this.props.match.params.category

        if(currentCategory === undefined){
            // load all the blogs from API and store them in Redux if this is the index page
            this.getAllPosts()
        
        }
        // load only the blogs for a particular category if it is a category page
        else{
            this.getPostsForCategory(currentCategory)
        }

        
        
       


        
    }

    render(){
        const currentCategory = (this.props.match.params == {}) ? "index" : this.props.match.params.category
        return(
            <CategoryPage categories={this.props.categories} currentCategory={currentCategory} 
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
