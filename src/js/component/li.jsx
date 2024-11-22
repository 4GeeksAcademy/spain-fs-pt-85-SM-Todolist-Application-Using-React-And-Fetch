import React from "react";
import PropTypes from "prop-types";


let LiGenerator = (props) => {
    return <li>
        {props.item}
        <button type="button" className="btn btn-outline-danger btn-sm border-0" onClick={props.filterFunction}>
            <i class="fa-solid fa-xmark"></i>
        </button>
    </li>;
}


export default LiGenerator;