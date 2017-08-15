import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BlogOverview from './components/BlogOverview';
import Comment from './components/Comment';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Welcome To Our Fantastic Blog! </h1>
        <div className = "blogs container">
          <h2> Most Popular </h2>
        
          <BlogOverview />
          <BlogOverview />
          <BlogOverview />
        </div>

        <Comment />

        
        
      </div>
    );
  }
}

export default App;
