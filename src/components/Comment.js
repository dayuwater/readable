import React, { Component } from 'react';
import TriangleUp from 'react-icons/lib/go/triangle-up';
import TriangleDown from 'react-icons/lib/go/triangle-down';
import FaTrash from 'react-icons/lib/fa/trash';
import FaEdit from 'react-icons/lib/fa/edit';
import PropTypes from 'prop-types'
import * as Helpers from '../utils/helpers.js';
import * as API from '../utils/api.js';
import { connect } from 'react-redux'
import {deleteComment, voteComment, editComment} from '../actions'
import SerializeForm from 'form-serialize';

class Comment extends Component {

    static PropTypes = {
        content : PropTypes.object.isrequired
    }

    state = {
        mode : "read"
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

    vote = (direction) => {
        API.voteComment(this.props.content.id, direction).then(res => {
            this.props.voteComment(this.props.content.id, res.voteScore)
        })
    }

    edit = () => {
        this.setState(() => ({
            mode : "edit"

        }))
    }

    submitComment = (e) => {
        e.preventDefault()
        const values = SerializeForm(e.target, {hash:true})
        // append body and timestamp
        const appenedValues = {
            body: values.body,
            timestamp: Date.now(),
           
        }
        // post the appended value to the server
        let result = ""
        API.editComment(this.props.content.id,appenedValues).then(res => {
            result = res
            // check the result and alert user
            if(result == API.error){
                alert("Sorry. It appears our server is down. Please try again later")
            }
            else{
                alert("Your comment is successfully edited")
                
                this.setState(() => ({
                    mode : "read"
        
                }))
                this.props.editComment(this.props.content.id, res)
            }
            
            
        })
        
    }

    render() {
        const {content} = this.props
        const {mode} = this.state
        if(mode === "edit"){
            return(
                <div className="comment container" >
                    <form onSubmit={this.submitComment}>
                    <p className="col-sm-10 col-xs-6"> By {content.author} on {Helpers.convertTimestamp(content.timestamp)} </p>
                       
                        
                        <button className="btn pull-right"> Finish Editing </button>

                       
                        
                        <br />
                        <br />
                        <br />
                        <textarea name="body" rows="10"  defaultValue={content.body} />  

                    </form>

                </div>
            )
        }

        else{
            return (
                <div className="comment container" >
                    <div className="row">
                        <div className="col-xs-1">
                            <p> <TriangleUp size={30} onClick={() => this.vote("upVote")}/> </p>
                            <h3> {content.voteScore} </h3>
                            <p> <TriangleDown size={30} onClick={() => this.vote("downVote")}/> </p>
                        </div>
                        <div className="col-xs-11">
                            <div className="row">
                                <p className="col-sm-10 col-xs-6"> By {content.author} on {Helpers.convertTimestamp(content.timestamp)} </p>
                                <div className="col-sm-2 col-xs-6">
                                    <a onClick={() => this.edit()}> <FaEdit />  Edit</a>
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
}

function mapStateToProps({ blogs, blog, comment }) {
    return {
        currentBlog: blogs.currentBlog
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //deleteComment: (c, p) => dispatch(deleteComment({c, p}))
        deleteComment: (commentId, parentId) => dispatch(deleteComment(commentId, parentId)),
        voteComment: (commentId, voteScore) => dispatch(voteComment({commentId, voteScore})),
        editComment: (commentId, comment) => dispatch(editComment({commentId, comment}))
        
    }


}

// export default Debug
export default connect(mapStateToProps, mapDispatchToProps)(Comment)