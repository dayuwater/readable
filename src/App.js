import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BlogOverview from './components/BlogOverview';
import Comment from './components/Comment';
import CategoryPage from './components/CategoryPage'
import Debug from './components/Debug'
import BlogPage from './components/BlogPage'
import BlogEditPage from './components/BlogEditPage'
import {Route, Link} from 'react-router-dom'
import * as API from './utils/api'


class App extends Component {
  componentDidMount(){
    console.log("Initializing")
    // load the states from server if the server is on

    // add a loading switch in order to accomodate poor network connection

    // TODO: store this in category state
    API.getAllCategories().then(res => {
      if(res == API.error){
        console.log("network error")
      }
      else{
        console.log("reset category")
        console.log(res)
      }
    })

    let posts = []
    API.getAllPosts().then(res => {
      posts = res
      if(posts == API.error){
        console.log("network error")
        return []
      }
      // reset the state here
      console.log("resetting state")
      return posts
    })
    .then(posts => posts.map(post => API.getComments(post.id).then(
      res => {
        post.comments = res
        // TODO : Store the post to the state
        console.log(post)
        return post
      }
    )))
    
  
    

  }

  render() {
    return (
      <div className="App">
        
        <Route exact path="/" component={CategoryPage} />
        <Route exact path="/debug" component={Debug} />
        <Route exact path="/blog" component={BlogPage} /> 
        <Route path="/blog_edit" component={BlogEditPage} />

      </div>
    );
  }
}

export default App;
