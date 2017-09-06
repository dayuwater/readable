import React, {Component} from 'react'
import BlogOverview from '../components/BlogOverview';
import Comment from '../components/Comment';
import PropTypes from 'prop-types'
class CategoryPage extends Component {
    static PropTypes = {
        categories : PropTypes.array.isRequired,
        currentCategory: PropTypes.string.isRequired,
        blogs: PropTypes.array.isRequired
    }
    
    render(){
        return (
            <div>
                <h1> Welcome To Our Fantastic Blog! </h1>

                <div className="blogs container">
                    <div className="row">
                        {this.props.categories.map(c => (
                             this.props.currentCategory === c ?
                             <h2 className="category current col-xs-4" key={c}> {c} </h2> :
                             <h2 className="category col-xs-4" key={c}> {c} </h2>
                        ))}
                        
                    </div>

                    {this.props.blogs.map(blog => <BlogOverview key={blog.blog.id} 
                        blog={blog.blog} commentNum={blog.comments.length}/>)}

                    
                   
                </div>
            </div>

        )
    }
    
}

export default CategoryPage