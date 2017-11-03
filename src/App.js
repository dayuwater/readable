import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BlogOverview from './components/BlogOverview';
import Comment from './components/Comment';
import CategoryPage from './components/CategoryPage'
import Debug from './components/Debug'
import BlogPage from './components/BlogPage'
import BlogEditPage from './components/BlogEditPage'
import MainPage from './components/MainPage'
import {Route, Link} from 'react-router-dom'
import * as API from './utils/api'


class App extends Component {
  

  render() {
    return (
      <div className="App">
        
        <Route exact path="/" component={MainPage} />
        <Route path="/:category" component={MainPage} />
        <Route exact path="/debug" component={Debug} />
        <Route path="/:category/:id" component={BlogPage} /> 
        <Route path="/newblog" component={BlogEditPage} />
        <Route path="/blog_edit/:id" component={BlogEditPage} />

      </div>
    );
  }
}

export default App;
