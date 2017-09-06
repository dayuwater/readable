import React, { Component } from 'react'
import { connect } from 'react-redux'
import MdChat from 'react-icons/lib/md/chat';
import PropTypes from 'prop-types'

class BlogOverview extends Component{

    // <BlogOverview key={blog.blog.id} 
    //                     blog={blog.blog} commentNum={blog.comments.length}/>

    
    static PropTypes = {
        blog : PropTypes.object.isRequired,
        commentNum : PropTypes.number.isRequired,
        background : PropTypes.string.isRequired

    }
    render(){
        const { blog, commentNum, background} = this.props
        return (
            <div>
                
                <div className={`blog-overview container ${background}`}>
                    <div className="row">
                        <div className="col-sm-4 img-container">
                            <img src="http://via.placeholder.com/260x200" alt="desc" />
                        </div>
                        <div className="col-sm-8">
                            <div className="row">
                                <h3 className="col-xs-10"> {blog.title}  </h3>
                                <h3 className="col-xs-1"> <MdChat size={30} /> </h3>
                                <h3 className="col-xs-1"> {commentNum}  </h3>
                            </div>
                            <p className="metadata"> posted {Date(blog.timestamp)} by {blog.author} </p>
                            <p className="content"> {blog.body} </p>


                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default BlogOverview;