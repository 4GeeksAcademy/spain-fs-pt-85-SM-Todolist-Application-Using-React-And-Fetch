import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createUser, validateUser } from "..";


const Navbar = ({userLogginUpdater}) => {
	const [inputRegisterNewUser, setInputRegisterNewUser] = useState("");
	const [registerNewUser, setRegisterNewUser] = useState("");
	const [userLoggin, setUserLoggin] = useState("")
	
	const handleInputChange  = (e) => {
		setInputRegisterNewUser(e.target.value);
	}

	const registerNewUserHandler = () => {
		setRegisterNewUser(inputRegisterNewUser);
		setInputRegisterNewUser(""); 
	}
	
	const userLogginHandler = () => {
		const newUser = inputRegisterNewUser;
		setUserLoggin(newUser);
		setInputRegisterNewUser("");

		if (userLogginUpdater){
			userLogginUpdater(newUser)
		}
	}

	useEffect(()=>{
		createUser(registerNewUser);
	},[registerNewUser])

	useEffect(() => {
		validateUser(userLoggin);
		//POR AQUI HABRÍA QUE PONER OTRA VARIABLE PARA QUE CAMBIE POR UN LADO LA CLASE DEL NAVBAR HACIENDO QUE SE MUESTRE ARRIBA A LA DERECHA EL USUARIO, PODRÍA ESTAR EN UN PRINCIPIO EN D-NONE
		//Y QUE CON ESTO SE QUITE ESE DISPLAY
	}, [userLoggin])



	//ahora este es el dato que tengo que enviar para la creación de usuario, luego voy a tener que hacer otro para que haga un get del usuario ya creado y que si la repuesta es ok ponga al final
	//del nabvar un hola y el nombre del usuario que existe
	console.log(registerNewUser);




	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav  mb-2 mb-lg-0 d-flex justify-content-end">
						{/* botón creación de nuevo usuario */}
						<li className="nav-item me-3">
							{/* <!-- Button trigger modal --> */}
							<button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#register">
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
											<input type="text" className="form-control" value={inputRegisterNewUser} onChange={handleInputChange}/>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-primary" onClick={registerNewUserHandler}>Create User</button>
											<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
										</div>
									</div>
								</div>
							</div>

							
						</li>
						{/* botón para user login con correspondiente entrada de texto */}
						<li className="nav-item">
							{/* <!-- Button trigger modal --> */}
							<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#login">
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
											<input type="text" className="form-control" value={inputRegisterNewUser} onChange={handleInputChange}/>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-primary" onClick={userLogginHandler}>Login</button>
											<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
										</div>
									</div>
								</div>
							</div>
							
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export {Navbar};
