import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BlogOverview from './components/BlogOverview';
import Comment from './components/Comment';
import CategoryPage from './components/CategoryPage'
import BlogPage from './components/BlogPage'
import BlogEditPage from './components/BlogEditPage'
import MainPage from './components/MainPage'
import {Route, Link} from 'react-router-dom'
import * as API from './utils/api'


class App extends Component {
  

  render() {
    return (
      <div className="App">
        
        { /*  Here is one routing scheme that comforms to the rubric. 
          It looks ugly because I have to use at least 3 subpaths to avoid multiple matches */ }
        <Route exact path="/" component={MainPage} />
        <Route path="/newblog/newblog/newblog" component={BlogEditPage} />
        <Route exact path="/blog_edit/blog_edit/:id" component={BlogEditPage} />
        <Route exact path="/:category/:id" component={BlogPage} /> 
        <Route exact path="/:category" component={MainPage} />

        { /* Here is a more simple and straightforward routing scheme, although it does not conform to rubric 
         
        <Route exact path="/" component={MainPage} />
        <Route exact path="/newblog" component={BlogEditPage} />
        <Route exact path="/blog_edit/:id" component={BlogEditPage} />
        <Route exact path="/blog/:id" component={BlogPage} /> 
        <Route exact path="/:category" component={MainPage} />
      
      
      
        */ }
        

      </div>
    );
  }
}

export default App;
