import React, { Component } from 'react'
import SerializeForm from 'form-serialize';
import * as Helpers from '../utils/helpers'
import * as API from '../utils/api'

class BlogEditPage extends Component{

    submitBlog = (e) => {
        e.preventDefault()
        const values = SerializeForm(e.target, {hash:true})
        // append id and timestamp
        const appenedValues = {
            ...values,
            id: Helpers.uuid(),
            timestamp: Date.now()
        }
        // post the appended value to the server
        let result = ""
        API.addPost(appenedValues).then(res => {
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
        return(
            <div className="container">
                <form onSubmit={this.submitBlog} >
                <h1> Edit Blog </h1>
                <h2> Title and Author </h2>
                <div className="row">
                    <b className="col-md-1">  Title </b>
                    <input  type="text" name="title" placeholder="Enter title here" 
                     required />
                   
                </div>
                <br/>
                <div className="row">
                    <b className="col-md-1">  By </b>
                    <input   type="text"  placeholder="What is your name?" name="author" required
                    />
                   
                </div>
                <br/>
                <div className="row">
                    <b className="col-md-1">  Category </b>
                    <input  type="radio"  name="category" value="react" defaultChecked="true"/>
                    React
                    <input  type="radio"  name="category" value="redux" defaultChecked="true"/>
                    Redux
                    <input  type="radio"  name="category" value="udacity" defaultChecked="true"/>
                    Udacity
                    
                   
                </div>
                 
                <h2> Content </h2>
                <h3> Hint: You can modify the size of the textarea </h3>
                <textarea rows="15" cols="160" name="body"> </textarea>
                <button className="btn"> Submit </button>
                </form>
            </div>
        )
    }

}

export default BlogEditPage