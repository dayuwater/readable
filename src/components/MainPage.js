import React, {Component} from 'react'
import BlogOverview from '../components/BlogOverview';
import CategoryPage from './CategoryPage'
import { connect } from 'react-redux'
import * as API from '../utils/api'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'

class MainPage extends Component{

    reset = () => {
        this.props.reset({})
    }

    // getAllCategories = () => {
    //     API.getAllCategories().then(res => 
    //         this.props.setCategories({categories:res})
    //     )
    // }

    getAllCategories = () => {
        this.props.fetchCategories()
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
        // reset the application state
        this.reset()
        
        // load all the possible categories from API and store them in Redux
        this.getAllCategories()

        // if it is index page, this would be undefined
        const currentCategory = this.props.match.params.category

        this.getAllPosts()
        this.props.setCurrentCategory({category:currentCategory || "index"})
        

       
    }
    

    render(){
        return(
            <CategoryPage  />
        )
    }
}

function mapStateToProps({ blogs, blog, comment }) {
    return {
        categories: blogs.category,
        blogs: Object.values(blog),
        currentCategory : blogs.currentCategory,
        sorting: blogs.sorting

    }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators(Actions, dispatch)
}

// export default Debug
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
