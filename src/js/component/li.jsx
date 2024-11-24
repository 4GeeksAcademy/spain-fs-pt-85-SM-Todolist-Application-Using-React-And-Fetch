import React from "react";
import PropTypes from "prop-types";
import home from "./home";

let LiGenerator = (props) => {
    return <li>
        {props.item}
        <button type="button" className="btn btn-outline-danger btn-sm border-0 fa-solid fa-xmark" onClick={props.onClick}>
        </button>
    </li>;
}


export default LiGenerator;