import React, { Component } from 'react'
import BlogOverview from '../components/BlogOverview';
import Comment from '../components/Comment';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import {flip_load_switch, setCurrentCategory, setSorting, setCurrentBlog} from '../actions'
import { connect } from 'react-redux'

class SortingControl extends Component{

    static PropTypes = {
        sortOptions: PropTypes.array.isRequired,
        sortKeys: PropTypes.array.isRequired
    }

    setSorting = (sorting) => {
        this.props.setSorting(sorting)
    }




    render(){
        const { sortOptions, sortKeys} = this.props
        // https://v4-alpha.getbootstrap.com/components/buttons/
        const bootstrapOrder = ["primary", "success", "info", "warning", "danger"]
        return(
            <div>
                <p> Currently Sorted By: {sortOptions[sortKeys.indexOf(this.props.currentSorting)]}.   Choose a new sorting criteria by clicking on the corresponding button below</p>
                
                <div className="row">
                    {
                        sortOptions.map((v, i) => <div key={sortKeys[i]} 
                            className={`btn btn-${bootstrapOrder[i%4]} col-md-3 col-xs-6`}
                            onClick={() => this.setSorting(sortKeys[i])}> {v} </div>)

                    }
                    
                </div>
            </div>
        )
    }
}


function mapStateToProps({ blogs, blog, comment }) {
    return {
        currentSorting: blogs.sorting,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSorting: (sorting) => dispatch(setSorting({sorting}))
    }


}

// export default Debug
export default connect(mapStateToProps, mapDispatchToProps)(SortingControl)

