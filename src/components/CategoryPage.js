import React, {Component} from 'react'
import BlogOverview from '../components/BlogOverview';
import Comment from '../components/Comment';
class CategoryPage extends Component {
    render(){
        return (
            <div>
                <h1> Welcome To Our Fantastic Blog! </h1>
                <div className="blogs container">
                    <div className="row">
                        <h2 className="category current col-xs-4"> React </h2>
                        <h2 className="category col-xs-4"> Redux </h2>
                        <h2 className="category col-xs-4"> Udacity </h2>
                    </div>

                    <BlogOverview />
                    <BlogOverview />
                    <BlogOverview />

                   
                </div>
            </div>

        )
    }
    
}

export default CategoryPage