import React, {Component} from 'react'
import SerializeForm from 'form-serialize';
import * as Helpers from '../utils/helpers'
import * as API from '../utils/api'


class AddComment extends Component{

    submitComment = (e) => {
        e.preventDefault()
        const values = SerializeForm(e.target, {hash:true})
        // append id and timestamp
        const appenedValues = {
            ...values,
            id: Helpers.uuid(),
            timestamp: Date.now(),
            parentId: "8xf0y6ziyjabvozdd253nd"
        }
        // post the appended value to the server
        let result = ""
        API.addComment(appenedValues).then(res => {
            result = res
            console.log(result)
            // check the result and alert user
            if(result == API.error){
                alert("Sorry. It appears our server is down. Please try again later")
            }
            else{
                alert("Your blog is successfully posted")
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

export default AddComment