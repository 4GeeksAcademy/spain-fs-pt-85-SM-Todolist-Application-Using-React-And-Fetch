import React from "react";
import PropTypes from "prop-types";
import LiGenerator from "./li";
import {Navbar} from "./navbar"
import { useState, useEffect } from "react";
import { postNewItem, validateUser } from "..";


//create your first component
const Home = () => {
	//se genera hook para los todos de la lista
	const [todos, setTodos] = useState([]);
	const [loggedUser, setLoggedUser] = useState("");

	function loggedUserHandler(user){
		setLoggedUser(user);
	}
 
    //se genera función sincrona la cual obtiene los todos de la api y lo actualiza en la variable hook
    async function fetchTodos(){
        const fetchedTodos = await validateUser("SMM")
        if (fetchedTodos) setTodos(fetchedTodos);
    }
    
    //se llama a la función fetchTodos para una carga inicial de los todos a realizar
    useEffect(() =>{
        fetchTodos()
    },[])

    //se genera escucha, cuando se pulsa la letra enter y hay un valor distinto a un espacio(tambien quita valores con espacio al inicio y fin del valor introducido)
    //llama a la función postNewItem del archivo index.js, devuelve el valor del input a un string vacío y llama a la función fetchTodos para actualizar el hook todos
	const todosHandler = (e) => {
		if (e.key == "Enter" && e.target.value.trim()) {
			postNewItem("SMM", e)
			e.target.value = "";
            fetchTodos()
		}
	};

	//se hace un map al array todos, el cual genera un LI con el id y label recibidos de la api guardados en el hook todos
	const todosGenerator = todos.map((todo) => {
		return <LiGenerator
			key={todo.id}
			item={todo.label}
			buttonOnClick={() => itemUpdater(todo)} />
	});

	//función para eliminar items de la lista
	const itemUpdater = (itemToRemove) => {
		const updatedItems = todos.filter((x) => x != itemToRemove);
		setTodos(updatedItems);
	};

	//variable para manejar el texto de los objetos faltantes
	const todosLeftTextUpdater = todos.length === 1 ? "1 item left" : todos.length + " items left"

	return (
		<>
			<Navbar userLogginUpdater={loggedUserHandler}/>
			<div className="d-flex justify-content-center fs-1">
				To Do List
			</div>
			<div className="border col-lg-6 col-11 mx-auto">
				<input className="ps-5 py-2 w-100 border border-top-0 border-start-0 border-end-0 fs-5 " type="text"
					onKeyDown={todosHandler} 
                    placeholder="What needs to be done?" />
				<ul className="list-group list-group-flush">
					{todosGenerator}
				</ul>
				<p className="mb-0 p-2 ps-3 fs-6 border-top fw-light text-secondary d-flex align-items-center">{todosLeftTextUpdater}</p>
			</div>
		</>
	);
};

export default Home;
