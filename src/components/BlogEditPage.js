import React, { Component } from 'react'

class BlogEditPage extends Component{
    render(){
        return(
            <div className="container">
                <h1> Edit Blog </h1>
                <h2> Title and Author </h2>
                <div className="row">
                    <b className="col-md-1">  Title </b>
                    <input className="col-md-9" type="text"  placeholder="Enter title here" 
                    />
                   
                </div>
                <br/>
                <div className="row">
                    <b className="col-md-1">  By </b>
                    <input  type="text"  placeholder="What is your name?" 
                    />
                   
                </div>
                 
                <h2> Content </h2>
                <h3> Hint: You can modify the size of the textarea </h3>
                <textarea rows="15" cols="160"> </textarea>
                <button className="btn"> Submit </button>
            </div>
        )
    }

}

export default BlogEditPage