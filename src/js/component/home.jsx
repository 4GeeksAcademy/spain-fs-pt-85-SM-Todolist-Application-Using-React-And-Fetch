import React from "react";
import PropTypes from "prop-types";
import LiGenerator from "./li";
import { useState, useEffect } from "react";


//que cuando te logues los botones de registrarse y logarte desaparezcan para que aparezca otro de deslogarse
//REVISAR COMENTARIOS PARA EMPEZAR A DEJARLO BONITO TB, ELIMINAR NAVBAR E INFO INECESARIA DE INDEX.JS

//funcion para dar de alta nuevos usuarios, se le pasa el string del usuario a crear para que haga una llamada POST a la API
async function createUser(newUser) {
	try {
		let response = await fetch(`https://playground.4geeks.com/todo/users/${newUser}`, {
			method: "POST",
		})
		console.log(response);
		let data = await response.json()
		console.log(data);
		return true;
	}
	catch (error) {
		// Error handling
		console.error(error);
		return;
	};
}

//función para validar la existencia de usuario, recibe como parametro el usuario a validar, en caso de que el usuario no exista lo dará de alta y se logará en el directamente
//devuelve el objeto del usuario en cuestión para poder ser tratado
async function validateUser(userToValidate) {
	try {
		let response = await fetch(`https://playground.4geeks.com/todo/users/${userToValidate}`, {
			method: 'GET'
		})

		if (response.status === 200) {
			console.log(`hola ${userToValidate}`) 
			return;
		}
		if (response.status === 404) {
			createUser(userToValidate);
			validateUser(userToValidate)
			return;
		}
		console.log(response);
		let data = await response.json();
		console.log(data.todos);
		return data.todos;

	} catch (error) {
		console.log(error);
		return;
	}
}
//crear otro useEffect el cual cuando vea cambios en userLoggin ejecute la función de compobación de si el usuario existe, en caso de que exista querre que arriba a la izquierda se forme
//un hola usuario con el valor del usuairo recibido y que en caso de que no exista, se ejecute la función de crear usuario con el valor del usuario que se ha intentado logar para 
//finalmente añadir el nuevo usuario

//función para hacer post a un nuevo item, recibe el usuario al que se está haciendo el post y un evento para poder obtener así su valor
async function postNewItem(userToPostNewItem, e) {
	try {
		let response = await fetch(`https://playground.4geeks.com/todo/todos/${userToPostNewItem}`, {
			method: 'POST',
			body: JSON.stringify({
				"label": e.target.value,
				"is_done": false
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
		console.log(response);
		let data = await response.json();
		console.log(data);
		return
	} catch (error) {
		console.log(error);
		return;
	}
}

//función para eliminar elementos de la lista de tareas
async function itemDeleter(itemToDelete) {
	try {
		let response = await fetch(`https://playground.4geeks.com/todo/todos/${itemToDelete.id}`)
		console.log(response);
		let data = await response.json();
		console.log(data);
		fetchTodos();
		return
	} catch (error) {
		console.log(error);
		return
	}
}

//create your first component //create your first component //create your first component //create your first component //create your first component //create your first component
const Home = () => {
	//todo lo de navbar todo lo de navbar todo lo de navbar
	//constante para el registro de los input de los botones register y login
	const [inputRegisterNewUser, setInputRegisterNewUser] = useState("");
	//constante para el registro del nuevo usuario
	const [registerNewUser, setRegisterNewUser] = useState("");
	//constante para el registro del usuario logado
	const [userLoggin, setUserLoggin] = useState("")
	//se genera hook para los todos de la lista
	const [todos, setTodos] = useState([]);
	//se genera hook para la clase del div, con el objetivo cuando el usuario se logue le de la bienvenida
	const [textGreeterClassName, setTextGreeterClassName] = useState("d-none");
	// se genera hook para las clases de los botones de registrarse y logarse
	const [registerButtonClassName, setRegisterButtonClassName] = useState("btn btn-info");
	const [logginButtonClassName, setLogginButtonClassName] = useState("btn btn-primary");
	//se genera hook para la clase del botón de deslogarse
	const [logoutButtonClassName, setLogoutButtonClasssName] = useState("btn btn-danger ")

	//constante para que sea llamada cada vez que el input de los botones register y login sea cambiado añadiendo el valor 
	const handleInputChange = (e) => {
		setInputRegisterNewUser(e.target.value);
	}

	//se genera función sincrona la cual obtiene los todos de la api y lo actualiza en la variable hook
	async function fetchTodos() {
		const fetchedTodos = await validateUser(userLoggin)
		if (fetchedTodos) setTodos(fetchedTodos);
	}

	//función que toma el valor almacenado provisionalmente en inputRegisterNewUser para almacenarlo en registerNewUser y devolver el valor del input del botón register a un valor vacío
	const registerNewUserHandler = () => {
		setRegisterNewUser(inputRegisterNewUser);
		setInputRegisterNewUser("");
	}

	//función que toma el valor almacenado provisionalmente en inputRegisterNewUser para almacenarlo en userLoggin y devolver el valor del input del botón register a un valor vacío
	const userLogginHandler = async () => {
		setUserLoggin(inputRegisterNewUser);
		await fetchTodos();
		setTextGreeterClassName("fw-bold");
		alert(`Usuario ${inputRegisterNewUser} logado!`)
		setInputRegisterNewUser("");
	}

	//uso de use effect para que haga uso de la función de creación de usuario cada vez que registerNewUser cambie
	useEffect(() => {
		createUser(registerNewUser);
	}, [registerNewUser])

	//uso de use effect para que haga uso de la función de creación de usuario cada vez que userLoggin cambie
	useEffect(() => {
		validateUser(userLoggin);
		fetchTodos();
		//POR AQUI HABRÍA QUE PONER OTRA VARIABLE PARA QUE CAMBIE POR UN LADO LA CLASE DEL NAVBAR HACIENDO QUE SE MUESTRE ARRIBA A LA DERECHA EL USUARIO, PODRÍA ESTAR EN UN PRINCIPIO EN D-NONE
		//Y QUE CON ESTO SE QUITE ESE DISPLAY
	}, [userLoggin])



	//ahora este es el dato que tengo que enviar para la creación de usuario, luego voy a tener que hacer otro para que haga un get del usuario ya creado y que si la repuesta es ok ponga al final
	//del nabvar un hola y el nombre del usuario que existe
	console.log(registerNewUser);


	//se genera escucha, cuando se pulsa la letra enter y hay un valor distinto a un espacio(tambien quita valores con espacio al inicio y fin del valor introducido)
	//llama a la función postNewItem del archivo index.js, devuelve el valor del input a un string vacío y llama a la función fetchTodos para actualizar el hook todos
	const todosHandler = (e) => {
		if (!userLoggin){
			e.preventDefault();
			alert("Por favor, loguese con su usuario para poder ingresar nuevas tareas.")
		}
		if (e.key == "Enter" && e.target.value.trim()) {
			postNewItem(userLoggin, e)
			e.target.value = "";
			fetchTodos();
		}
		fetchTodos();
	};

	//se hace un map al array todos, el cual genera un LI con el id y label recibidos de la api guardados en el hook todos
	const todosGenerator = todos.map((todo) => {
		return <LiGenerator
			key={todo.id}
			item={todo.label}
			buttonOnClick={() => itemUpdater(todo)} />
	});

	//función para eliminar items de la lista
	const itemUpdater = async (itemToRemove) => {
		// console.log(itemToRemove.id);
		// const updatedItems = todos.filter((x) => x.id != itemToRemove.id);
		// 	// x != itemToRemove);
		// setTodos(updatedItems);
		try {
			let response = await fetch(`https://playground.4geeks.com/todo/todos/${itemToRemove.id}`,{
				method:"DELETE"
			})
			fetchTodos();
			console.log(response);
			return;
		} catch (error) {
			console.log(error);
			return;
		}
	};

	//variable para manejar el texto de los objetos faltantes
	const todosLeftTextUpdater = todos.length === 1 ? "1 item left" : todos.length + " items left"

	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className={textGreeterClassName}>Hello {userLoggin}</div>
					<div className="collapse navbar-collapse d-flex justify-content-end g-3" id="navbarSupportedContent">
						<ul className="navbar-nav  mb-2 mb-lg-0 ">
							{/* botón creación de nuevo usuario */}
							<li className="nav-item me-3">
								{/* <!-- Button trigger modal --> */}
								<button type="button" className={registerButtonClassName} data-bs-toggle="modal" data-bs-target="#register">
									Register
								</button>
								{/* <!-- Modal --> */}
								<div className="modal fade" id="register" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="registerLabel" aria-hidden="true">
									<div className="modal-dialog">
										<div className="modal-content">
											<div className="modal-header">
												<h1 className="modal-title fs-5" id="registerLabel">User Creation</h1>
												<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
											</div>
											<div className="modal-body">
												Please state the user to create
												<input type="text" className="form-control" value={inputRegisterNewUser} onChange={handleInputChange} />
											</div>
											<div className="modal-footer">
												<button type="button" className="btn btn-primary" onClick={registerNewUserHandler}>Create User</button>
												<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
											</div>
										</div>
									</div>
								</div>
							</li>
							{/* fin del botón de register */}
							{/* botón para user login con correspondiente entrada de texto */}
							<li className="nav-item">
								{/* <!-- Button trigger modal --> */}
								<button type="button" className={logginButtonClassName} data-bs-toggle="modal" data-bs-target="#login">
									Login
								</button>

								{/* <!-- Modal --> */}
								<div className="modal fade" id="login" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="loginLabel" aria-hidden="true">
									<div className="modal-dialog">
										<div className="modal-content">
											<div className="modal-header">
												<h1 className="modal-title fs-5" id="loginLabel">User Login</h1>
												<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
											</div>
											<div className="modal-body">
												Please state your user name
												<input type="text" className="form-control" value={inputRegisterNewUser} onChange={handleInputChange} />
											</div>
											<div className="modal-footer">
												<button type="button" className="btn btn-primary" onClick={userLogginHandler}>Login</button>
												<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
											</div>
										</div>
									</div>
								</div>
							</li>
							{/* fin del botón de loggin */}
							{/* inicio botón para hacer logout */}
							<li className="nav-item">
								{/* <!-- Button trigger modal --> */}
								<button type="button" className={logoutButtonClassName} data-bs-toggle="modal" data-bs-target="#logout">
									Logout
								</button>
								{/* <!-- Modal --> */}
								<div className="modal fade" id="logout" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="logoutLabel" aria-hidden="true">
									<div className="modal-dialog">
										<div className="modal-content">
											<div className="modal-header">
												<h1 className="modal-title fs-5" id="registerLabel">Are you sure you want to logout {userLoggin}?</h1>
												<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
											</div>
											<div className="modal-footer">
												<button type="button" className="btn btn-primary" onClick={registerNewUserHandler}>Yes</button>
												<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
											</div>
										</div>
									</div>
								</div>
							</li>
							{/* fin del botón de logout */}
						</ul>
					</div>
				</div>
			</nav>








			{/* inicio de cuerpo de la página */}
			<div className="d-flex justify-content-center fs-1">
				To Do List
			</div>
			{/* inicio de la lista de todos */}
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
