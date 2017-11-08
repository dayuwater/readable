import React, { Component } from 'react'
import SerializeForm from 'form-serialize';
import * as Helpers from '../utils/helpers'
import TriangleLeft from 'react-icons/lib/go/triangle-left';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions/index'



class BlogEditPage extends Component{


    submitBlog = (e) => {
        e.preventDefault()
        const values = SerializeForm(e.target, {hash:true})
        
        // post the appended value to the server
        let result = ""
        // if this is editing
        if(this.props.currentBlogId){
            // select title and body from the post
            const id = this.props.currentBlogId
            const category = this.props.category
            const selectedValues = {
                title: values.title,
                body: values.body
            }
            
            this.props.editingPost({postId:this.props.currentBlogId, post:selectedValues})
            .then(_ => {
                alert("Your blog is successfully edited")
                this.props.history.push("/");
            })
            

        }
        // if this is creating
        else{
            // append id and timestamp
            const appendedValues = {
                ...values,
                id: Helpers.uuid(),
                timestamp: Date.now()
            }

            this.props.addingPost({post:appendedValues}).then(_ => {
                alert("Your blog is successfully posted")
                this.props.history.push("/");
            })
        }
        
       
        

        


    }
    render(){
        const editOrNew = this.props.currentBlogId ? "Edit" : "New"
        const {author, title, category, body} = this.props
        return(
            <div className="container">
                <Link to="/"> <TriangleLeft size={30}/> <h3>Back</h3> </Link>
                <form onSubmit={this.submitBlog} >
                <h1> {editOrNew} Blog </h1>
                <h2> Title and Author </h2>
                <div className="row">
                    <b className="col-md-1">  Title </b>
                    <input  type="text" name="title" placeholder="Enter title here" defaultValue={title}
                     required />
                   
                </div>
                <br/>
                <div className="row">
                   
                    <b className="col-md-1">  By </b>
                    { author || 
                    <input type="text"  placeholder="What is your name?" name="author" defaultValue={author} required
                    /> 
                    }
                   
                </div>
                <br/>
                <div className="row">
                    <b className="col-md-1">  Category </b>
                    { category ||
                    <div>
                    <input  type="radio"  name="category" value="react" defaultChecked={category === "react" || editOrNew === "New"}/>
                    React
                    <input  type="radio"  name="category" value="redux" defaultChecked={category === "redux"}/>
                    Redux
                    <input  type="radio"  name="category" value="udacity" defaultChecked={category === "udacity"}/>
                    Udacity
                    </div>
                    
                    }
                   
                </div>
                 
                <h2> Content </h2>
                <h3> Hint: You can modify the size of the textarea </h3>
                <textarea rows="15" cols="160" name="body" defaultValue={body} /> 
                <button className="btn"> Submit </button>
                </form>
            </div>
        )
    }

}

export function mapStateToProps({ blogs, blog, comment }, props){
    if(blogs.currentBlog){
        return{
            currentBlogId : blogs.currentBlog,
            ...blog[blogs.currentBlog].blog
        }

    }
    else{
        return {
            currentBlogId : blogs.currentBlog
        }
    }
}

export function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogEditPage)