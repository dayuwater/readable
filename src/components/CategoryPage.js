import React, { Component } from 'react'
import BlogOverview from '../components/BlogOverview';
import Comment from '../components/Comment';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import {flip_load_switch, setCurrentCategory} from '../actions'
import { connect } from 'react-redux'


class CategoryPage extends Component {
    static PropTypes = {
        blogs: PropTypes.array.isRequired
    }

    linkOnClick = (category) => {
        this.props.setCurrentCategory(category)
    }



    render() {
        return (
            <div>
                <h1> Welcome To Our Fantastic Blog! </h1>
                {/* <Link to={`/book/${this.state.id}`} className="book-title">{this.state.title}</Link> */}
                <div className="blogs container">
                    <div className="row">
                        <Link to={"/"} className="category col-xs-3" onClick={() => this.linkOnClick("index")}> <h2>All</h2> </Link>
                        {this.props.categories.map(c => (
                            this.props.currentCategory === c ?
                                <Link to={`/category/${c}`} className="category current col-xs-3" key={c} onClick={() => this.linkOnClick(c)}> <h2> {c} </h2> </Link> :
                                <Link to={`/category/${c}`} className="category col-xs-3" key={c} onClick={() => this.linkOnClick(c)}> <h2> {c} </h2> </Link>
                        ))}


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
        currentCategory : blog.currentCategory,
        categories: blogs.category
    }
}

function mapDispatchToProps(dispatch) {
    return {
        flip: () => dispatch(flip_load_switch({})),
        setCurrentCategory: (category) => dispatch(setCurrentCategory({category}))
    }


}

// export default Debug
export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
