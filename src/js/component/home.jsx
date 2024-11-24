import React from "react";
import PropTypes from "prop-types";
import LiGenerator from "./li";
import { useState, useEffect } from "react";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";


// let arr = [];
// onkeydown={funcionDondeValidaSiEsUnEnterYAñadeLaInfoAlArr}
//el arr debería de alguna forma ser mapeado y añadido para que cada item sea su propio array que se sea pasado a LiGenerator
//finalmente habría que utilizar un hook para que pueda cargar la info de forma rápida



//create your first component
const Home = () => {
	const [liItem, setLiItem] = useState(["Coffe"])
	const liItemHandler = (e) => {
		if (e.key == "Enter" && e.target.value) {console.log("enter");
		setLiItem(liItem.concat(e.target.value))
		e.target.value = "";
		console.log(liItem);
		
		}
	}
	const liItemGenerator = liItem.map((x,index) =>{
		return <LiGenerator key={index} item={x} onClick={liItemDeleter} />
	})

	const liTargetValue = (e) => e.target.parentNode.childNodes[0].nodeValue;
	const liItemDeleter = liItem.filter((x,index) => {
		if (x != liTargetValue)	return <LiGenerator key={index} item={x} onClick={liItemDeleter}/>;
		else console.log(liTargetValue);
		
	});
	
	
	return (
		<div className="border">
			<input type="text" onKeyDown={liItemHandler}/>
			<ul>
				{liItemGenerator}
			</ul>
		</div>
	);
};

export default Home;
