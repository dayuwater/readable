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
                {/* <Link to={`/book/${this.state.id}`} className="book-title">{this.state.title}</Link> */}
                <div className="blogs container">
                    <div className="row">
                        <h2 className="category col-xs-3"> All </h2>
                        {this.props.categories.map(c => (
                             this.props.currentCategory === c ?
                             <h2 className="category current col-xs-3" key={c}> {c} </h2> :
                             <h2 className="category col-xs-3" key={c}> {c} </h2>
                        ))}
                        
                    </div>

                    
                    {
                        
                        // if you are confused see App.css. This basically means alternating backgrounds
                        this.props.blogs.map((blog,i) => <BlogOverview key={blog.blog.id} 
                        blog={blog.blog} commentNum={blog.comments.length } background={`odd-${i%2}`}/>)
                        
                    }

                    
                   
                </div>
            </div>

        )
    }
    
}

export default CategoryPage