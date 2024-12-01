import React from "react";
import PropTypes from "prop-types";
import home from "./home";

let LiGenerator = (props) => {
    return <li className="list-group-item ps-5 fs-5 d-flex justify-content-between" onClick={props.liOnClick}>
        {props.item}
        <button type="button" className="btn btn-outline-danger btn-sm border-0 fa-solid fa-xmark" onClick={props.buttonOnClick}>
        </button>
    </li>;
}


export default LiGenerator;