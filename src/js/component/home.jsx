import React from "react";
import PropTypes from "prop-types";
import LiGenerator from "./li";
import { useState, useEffect } from "react";

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
		if (response.status === 404) {
			await createUser(userToValidate);
			return await validateUser(userToValidate);
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



//COMPONENTE PRINCIPAL
const Home = () => {
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
	const [logoutButtonClassName, setLogoutButtonClasssName] = useState("btn btn-danger d-none")

	//constante para que sea llamada cada vez que el input de los botones register y login sea cambiado añadiendo el valor 
	const handleInputChange = (e) => {
		setInputRegisterNewUser(e.target.value);
	}

	//se genera función asincrona la cual obtiene los todos de la api y lo actualiza en la variable hook para ser generados los items en el html a través de otra función
	async function fetchTodos() {
		const fetchedTodos = await validateUser(userLoggin)
		if (fetchedTodos) setTodos(fetchedTodos);
	}

	//función que toma el valor almacenado provisionalmente en inputRegisterNewUser para almacenarlo en registerNewUser y devolver el valor del input del botón register a un valor vacío
	const registerNewUserHandler = () => {
		setRegisterNewUser(inputRegisterNewUser);
		alert(`Usuario ${inputRegisterNewUser} creado, una vez se haya logado podrá introducir nuevos elementos a su lista de tareas.`)
		setInputRegisterNewUser("");
	}

	//función que toma el valor almacenado provisionalmente en inputRegisterNewUser para almacenarlo en userLoggin y devolver el valor del input del botón register a un valor vacío
	//además de modificar la visibilidad de botones y generar texto de bienvenida
	const userLogginHandler = async () => {
		setUserLoggin(inputRegisterNewUser);
		await fetchTodos();
		setTextGreeterClassName("fw-bold");
		setRegisterButtonClassName("btn btn-info d-none");
		setLogginButtonClassName("btn btn-primary d-none");
		setLogoutButtonClasssName("btn btn-danger");
		alert(`Usuario ${inputRegisterNewUser} logado!`);
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
	}, [userLoggin])

	//se genera escucha, cuando se pulsa la letra enter y hay un valor distinto a un espacio(tambien quita valores con espacio al inicio y fin del valor introducido)
	//llama a la función postNewItem del archivo index.js, devuelve el valor del input a un string vacío y llama a la función fetchTodos para actualizar el hook todos
	const todosHandler = (e) => {
		if (!userLoggin){
			e.preventDefault();
			alert("Por favor, loguese con su usuario para poder modificar este campo.")
		}
		if (e.key == "Enter" && e.target.value.trim()) {
			postNewItem(userLoggin, e)
			e.target.value = "";
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
	const itemUpdater = async (itemToRemove) => {
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
			await fetchTodos();
			console.log(response);
			let data = await response.json();
			console.log(data);
			return
		} catch (error) {
			console.log(error);
			return;
		}
	}

	//función de logout, cierra sesión del usuario activo y maneja la visibilidad de texto de bienvenida y de botones
	const logOut = async () => {
	setTextGreeterClassName("d-none");
	setRegisterButtonClassName("btn btn-info");
	setLogginButtonClassName("btn btn-primary");
	setLogoutButtonClasssName("btn btn-danger d-none");
	setUserLoggin("");
	setTodos([]);
	}

	//variable para manejar el texto de los objetos faltantes
	const todosLeftTextUpdater = todos.length === 1 ? "1 item left" : todos.length + " items left"

	return (
		<>
			<nav className="navbar navbar-expand bg-body-tertiary">
				<div className="container-fluid">
					<div className={textGreeterClassName}>Hello {userLoggin}</div>
					<div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
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
												Please state the user to create.
												<input type="text" className="form-control" value={inputRegisterNewUser} onChange={handleInputChange} />
											</div>
											<div className="modal-footer">
												<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={registerNewUserHandler}>Create User</button>
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
												Please state your user name, if the stated user doesn't exist it will be automatically created and logged in.
												<input type="text" className="form-control" value={inputRegisterNewUser} onChange={handleInputChange} />
											</div>
											<div className="modal-footer">
												<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={userLogginHandler}>Login</button>
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
												<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={logOut}>Yes</button>
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
			{/* fin del navbar */}
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
