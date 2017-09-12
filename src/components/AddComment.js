import React, {Component} from 'react'
import SerializeForm from 'form-serialize';
import * as Helpers from '../utils/helpers'
import * as API from '../utils/api'
import { connect } from 'react-redux'
import {addComment} from '../actions'


class AddComment extends Component{

    submitComment = (e) => {
        e.preventDefault()
        const values = SerializeForm(e.target, {hash:true})
        // append id and timestamp
        const appenedValues = {
            ...values,
            id: Helpers.uuid(),
            timestamp: Date.now(),
            parentId: this.props.currentBlog
        }
        // post the appended value to the server
        let result = ""
        API.addComment(appenedValues).then(res => {
            result = res
            // check the result and alert user
            if(result == API.error){
                alert("Sorry. It appears our server is down. Please try again later")
            }
            else{
                alert("Your comment is successfully posted")
                this.props.addComment(res)
            }
            
        })
    }
    render(){
        return (
            <div>
                <form onSubmit={this.submitComment}>
                    <input name="author" placeholder="Enter your name here" />
                    <button className="btn pull-right"> Post My Comment </button>
                    <br />
                    <br />
                    <br />
                    <textarea name="body" rows="10" > Comment Rationally </textarea>

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
    return {
        addComment: (comment) => dispatch(addComment({comment}))
        
    }


}

// export default Debug
export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
