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
          <div className="row">
            <h2 className="category current col-xs-4"> React </h2>
            <h2 className="category col-xs-4"> Redux </h2>
            <h2 className="category col-xs-4"> Udacity </h2>
          </div>
        
          <BlogOverview />
          <BlogOverview />
          <BlogOverview />

          <Comment />
          <Comment />
          <Comment />
        </div>

       

        
        
      </div>
    );
  }
}

export default App;
