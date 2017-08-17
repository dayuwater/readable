import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BlogOverview from './components/BlogOverview';
import Comment from './components/Comment';
import CategoryPage from './components/CategoryPage'
import Debug from './components/Debug'
import BlogPage from './components/BlogPage'
import {Route, Link} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Route exact path="/" component={CategoryPage} />
        <Route exact path="/debug" component={Debug} />
        <Route exact path="/blog" component={BlogPage} /> 

      </div>
    );
  }
}

export default App;
