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

function test(e){
	console.log(e.target);
	
}

//create your first component
const Home = () => {
	const [liItem, setLiItem] = useState(["Coffe"]);
	const liItemHandler = (e) => {
		if (e.key == "Enter" && e.target.value.trim()) {
		setLiItem(liItem.concat(e.target.value))
		e.target.value = "";
		}
	};

	const liItemGenerator = liItem.map((x) =>{
		return <LiGenerator key={x} item={x} onClick={() => itemUpdater(x)} />
	});
	
	const itemUpdater = (valueToRemove) => {
		const updatedItems = liItem.filter((x) => x != valueToRemove);
		setLiItem(updatedItems);
	};
	

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
