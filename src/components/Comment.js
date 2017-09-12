import React, { Component } from 'react';
import TriangleUp from 'react-icons/lib/go/triangle-up';
import TriangleDown from 'react-icons/lib/go/triangle-down';
import FaTrash from 'react-icons/lib/fa/trash';
import FaEdit from 'react-icons/lib/fa/edit';
import PropTypes from 'prop-types'
import * as Helpers from '../utils/helpers.js';
import * as API from '../utils/api.js';
import { connect } from 'react-redux'
import {deleteComment} from '../actions'

class Comment extends Component {

    static PropTypes = {
        content : PropTypes.object.isrequired
    }

    deleteComment = (commentId) => {
        API.deleteComment(commentId).then(res => {
            return res.parentId
        }).then(parentId => this.props.deleteComment({commentId, parentId}))
    }

    delete = () => {
        if (window.confirm("WARNING: You are about to delete your comment. Are you sure?")) {
            this.deleteComment(this.props.content.id)
        }
       
       
    }
    render() {
        const {content} = this.props
        return (
            <div className="comment container" >
                <div className="row">
                    <div className="col-xs-1">
                        <p> <TriangleUp size={30} /> </p>
                        <h3> {content.voteScore} </h3>
                        <p> <TriangleDown size={30} /> </p>
                    </div>
                    <div className="col-xs-11">
                        <div className="row">
                            <p className="col-sm-10 col-xs-6"> By {content.author} on {Helpers.convertTimestamp(content.timestamp)} </p>
                            <div className="col-sm-2 col-xs-6">
                                <a> <FaEdit />  Edit</a>
                                <a onClick={() => this.delete()}> <FaTrash />  Delete</a>
                            </div>
                        </div>
                        <p className="content"> 
                            {content.body}
                        </p>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps({ blogs, blog, comment }) {
    return {
        currentBlog: blogs.currentBlog
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //deleteComment: (c, p) => dispatch(deleteComment({c, p}))
        deleteComment: (commentId, parentId) => dispatch(deleteComment(commentId, parentId))
        
    }


}

// export default Debug
export default connect(mapStateToProps, mapDispatchToProps)(Comment)