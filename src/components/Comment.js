import React, { Component } from 'react';
import TriangleUp from 'react-icons/lib/go/triangle-up';
import TriangleDown from 'react-icons/lib/go/triangle-down';
import FaTrash from 'react-icons/lib/fa/trash';
import FaEdit from 'react-icons/lib/fa/edit';
class Comment extends Component {
    render() {
        return (
            <div className="comment container" >
                <div className="row">
                    <div className="col-xs-1">
                        <p> <TriangleUp size={30} /> </p>
                        <h3> 10 </h3>
                        <p> <TriangleDown size={30} /> </p>
                    </div>
                    <div className="col-xs-11">
                        <div className="row">
                            <p className="col-sm-10 col-xs-6"> By Author on 2017-7-8 </p>
                            <div className="col-sm-2 col-xs-6">
                                <a> <FaEdit />  Edit</a>
                                <a> <FaTrash />  Delete</a>
                            </div>
                        </div>
                        <p className="content"> As this is a non-exempt position, you will be paid overtime for hours worked in excess of forty (40) hours during a work week, which would be paid at one and a half (1.5) times your regular hourly rate, or $18 per hour. However, your work week may not exceed twenty-five (25) hours a week during an academic term or forty (40) hours per week during official GW breaks without approval from GW Student Employment. Further, your supervisor must also authorize overtime before the time is worked. If you are an international student authorized to work under a visa, you must follow the regulations regarding hours worked set forth in your visa. Please contact GW’s International Services Office for additional information at (202) 994-4477.
                        </p>
                    </div>

                </div>
            </div>
        )
    }
}

export default Comment;