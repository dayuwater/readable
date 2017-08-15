import React, { Component } from 'react'
import { connect } from 'react-redux'
import MdChat from 'react-icons/lib/md/chat';


class BlogOverview extends Component{
    render(){
        return (
            <div className="blog-overview container">
                <div className="row">
                    <div className="col-sm-4 img-container">
                        <img src="http://via.placeholder.com/260x200" alt="desc"/>
                    </div> 
                    <div className="col-sm-8">
                        <div className="row">
                            <h3 className="col-xs-10"> The definition of the real exchange rate is:  P/EP*, where P is the price of  </h3>
                            <h3 className="col-xs-1"> <MdChat size={30} /> </h3>
                            <h3 className="col-xs-1"> 11 </h3>
                        </div>
                        <p className="metadata"> posted 2 hrs ago by Author </p>
                        <p className="content"> Since we are using the terms appreciation and depreciations, we need to use the positive number for both of them.  The real appreciation is correct because we are using P/EP*, but for devaluations it should be the increase in E and for devaluations because of changes in prices is the increase in P*/P.  So, the only thing we need to do is to change the signs.
 </p>
                       
                    </div>
                </div>
                
            </div>
        )
    }
}

export default BlogOverview;