import React, { Component } from 'react'
import BlogOverview from '../components/BlogOverview';
import Comment from '../components/Comment';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import {flip_load_switch, setCurrentCategory, setSorting, setCurrentBlog} from '../actions'
import { connect } from 'react-redux'


class CategoryPage extends Component {
    static PropTypes = {
        
    }

    linkOnClick = (category) => {
        this.props.setCurrentCategory(category)
    }

    setSorting = (sorting) => {
        this.props.setSorting(sorting)
    }

    

   
    render() {
        const sortOptions = ["Score", "Author", "Time", "Title"]
        // In order to make magic happens, this must use the same field name in the data structure
        const sortKeys = ["voteScore", "author", "timestamp", "title"]
        const bootstrapOrder = ["primary", "success", "info", "warning"]
        return (
            <div>
                <h1> Welcome To Our Fantastic Blog! </h1>
                {/* <Link to={`/book/${this.state.id}`} className="book-title">{this.state.title}</Link> */}
                <div className="blogs container">
                    <div className="row">
                        <Link to={"/"} className="category col-xs-3" onClick={() => this.linkOnClick("index")}> <h2>All</h2> </Link>
                        {this.props.categories.map(c => (
                            <Link to={`/category/${c}`} className="category col-xs-3" key={c} onClick={() => this.linkOnClick(c)}> <h2> {c} </h2> </Link>
                        ))}


                    </div>

                    <p> Currently Sorted By: {sortOptions[sortKeys.indexOf(this.props.currentSorting)]}.   Choose a new sorting criteria by clicking on the corresponding button below</p>

                    <div className="row">
                        {
                            sortOptions.map((v, i) => <div key={sortKeys[i]} 
                                className={`btn btn-${bootstrapOrder[i%4]} col-md-3 col-xs-6`}
                                onClick={() => this.setSorting(sortKeys[i])}> {v} </div>)

                        }
                        
                    </div>

                    {

                        // if you are confused see App.css. This basically means alternating backgrounds
                        this.props.blogs.map((blog, i) => <BlogOverview key={blog.blog.id}
                            blog={blog.blog} commentNum={blog.comments.length} background={`odd-${i % 2}`} />)
                    }



                </div>
            </div>

        )
    }

}

function mapStateToProps({ blogs, blog, comment }) {
    return {
        currentCategory : blogs.currentCategory,
        categories: blogs.category,
        currentSorting: blogs.sorting,

        // this simply means if the current page is the index page, show all the blogs
        // if the current page is a category page, only display the blogs in the same category
        // just utilize short-circuit evaluation, some nice usage of filter function and basic fact of the project
        blogs: Object.values(blog)
        .filter(blog => (blogs.currentCategory === "index" || blog.blog.category === blogs.currentCategory)) 
        // this means if the content is numeric, sort descending
        // else, sort ascending
        .sort((blog1, blog2) => (isNaN(parseInt(blog1.blog[blogs.sorting])) ?
                blog1.blog[blogs.sorting] > blog2.blog[blogs.sorting] : 
                blog1.blog[blogs.sorting] < blog2.blog[blogs.sorting]))
    }
}

function mapDispatchToProps(dispatch) {
    return {
        flip: () => dispatch(flip_load_switch({})),
        setCurrentCategory: (category) => dispatch(setCurrentCategory({category})),
        setCurrentBlog: (postId) => dispatch(setCurrentBlog({postId})),
        setSorting: (sorting) => dispatch(setSorting({sorting}))
    }


}

// export default Debug
export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
