import React, {Component} from 'react'
import SerializeForm from 'form-serialize';
import * as Helpers from '../utils/helpers'
import * as Actions from '../actions/index'
import { connect } from 'react-redux'
import {addComment} from '../actions'
import { bindActionCreators } from 'redux'


class AddComment extends Component{

    submitComment = (e) => {
        e.preventDefault()
        const values = SerializeForm(e.target, {hash:true})
        // append body and timestamp
        const appenedValues = {
            ...values,
            id: Helpers.uuid(),
            timestamp: Date.now(),
            parentId: this.props.currentBlog
        }
        // post the appended value to the server
        let result = ""
        
        this.props.addingComment({comment:appenedValues}).then(_ => {
            alert("Your comment is successfully posted")
        })

    }
    render(){
        return (
            <div>
                <form onSubmit={this.submitComment}>
                    <input name="author" placeholder="Enter your name here" required/>
                    <button className="btn pull-right"> Post My Comment </button>
                    <br />
                    <br />
                    <br />
                    <textarea name="body" rows="10"  placeholder="Comment Rationally" required/>  

                </form>

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
   return bindActionCreators(Actions, dispatch)


}

// export default Debug
export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
