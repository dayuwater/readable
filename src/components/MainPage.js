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


    getAllCategories = () => {
        this.props.fetchCategories()
    }


    getAllPosts = () => {
        this.props.fetchPosts({category:"index"})
    }

    getPostsForCategory = (category) => {
        this.props.fetchPosts({category})
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
