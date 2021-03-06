import React, { Component } from 'react'
import MdChat from 'react-icons/lib/md/chat';
import PropTypes from 'prop-types'
import ReactSVG from 'react-svg'
import TriangleUp from 'react-icons/lib/go/triangle-up';
import TriangleDown from 'react-icons/lib/go/triangle-down';
import {Route, Link} from 'react-router-dom'
import * as Actions from '../actions'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import FaTrash from 'react-icons/lib/fa/trash';
import FaEdit from 'react-icons/lib/fa/edit';


class BlogOverview extends Component{

    // <BlogOverview key={blog.blog.id} 
    //                     blog={blog.blog} commentNum={blog.comments.length}/>

    
    static PropTypes = {
        blog : PropTypes.object.isRequired,
        commentNum : PropTypes.number.isRequired,
        background : PropTypes.string.isRequired

    }

    setCurrentBlog = (postId) => {
        this.props.setCurrentBlog({postId})
    }

    delete = () => {
        if(window.confirm("Are you sure you want to delete this post?"))
            this.props.deletingPost({postId:this.props.blog.id})
    }

   
    vote = (direction) => {
        this.props.votingPost({postId:this.props.blog.id, direction})
    }


    render(){
        const { blog, commentNum, background} = this.props
        return (
            <div>
                
                <div className={`blog-overview container ${background}`}>
                    <div className="row">
                        <div className="col-sm-4 img-container">
                            <h2> <TriangleUp onClick={() => this.vote("upVote")}/> 
                                {blog.voteScore} 
                                <TriangleDown onClick={() => this.vote("downVote")}/> 
                                <Link to={`/blog_edit/blog_edit/${blog.id}`}  onClick={() => this.setCurrentBlog(blog.id)}> <FaEdit />  Edit</Link>
                                <a onClick={() => this.delete()}> <FaTrash />  Delete</a> </h2>
                            
                            <ReactSVG
                                path={
                                    // The name of the svg = the category
                                    // I use icons to show users what category a blog is
                                    `http://localhost:3000/${blog.category}.svg`
                                }
                                style={{ width: 260, height: 200 }}
                            />
                        </div>
                        <div className="col-sm-8">
                            <div className="row">
                                <h3 className="col-xs-10"> <Link to={`/${blog.category}/${blog.id}`} 
                                    onClick={() => this.setCurrentBlog(blog.id)}>{blog.title}</Link> </h3>
                                <h3 className="col-xs-1"> <MdChat size={30} /> </h3>
                                <h3 className="col-xs-1"> {commentNum}  </h3>
                            </div>
                            <p className="metadata"> posted {
                                // sort of cheating, just slice 14 characters from end to remove time zone info
                                new Date(blog.timestamp).toString().slice(0,-14)
                            } by {blog.author} </p>
                            <p className="content"> {blog.body} </p>


                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


function mapStateToProps({ blogs, blog, comment }) {
    return {
        
    }
}

function mapDispatchToProps(dispatch) {
   
    return bindActionCreators(Actions, dispatch)

}


// export default Debug
export default connect(mapStateToProps, mapDispatchToProps)(BlogOverview)