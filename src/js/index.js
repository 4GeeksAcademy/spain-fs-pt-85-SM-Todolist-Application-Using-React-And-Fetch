//import react into the bundle
import React from "react";
import ReactDOM from "react-dom/client";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Home from "./component/home.jsx";

//render your react application
ReactDOM.createRoot(document.getElementById('app')).render(<Home />);

// async function createUser(newUser) {
//     try {
//         let response = await fetch(`https://playground.4geeks.com/todo/users/${newUser}`, {
//             method: "POST",
//             // body: JSON.stringify(newUser),
//             // headers: {
//             //     "Content-Type": "application/json"
//             // }
//         })
//         console.log(response);

//         let data = await response.json()
//         console.log(data);

//         return true;
//     }
//     catch (error) {
//         // Error handling
//         console.error(error);
//         return;
//     };
// }

// async function validateUser(userToValidate) {
//     try {
//         let response = await fetch(`https://playground.4geeks.com/todo/users/${userToValidate}`, {
//             method: 'GET'
//         })

//         if (response.status === 200) console.log(`hola ${userToValidate}`);
//         if (response.status === 404) {
//             createUser(userToValidate);
//             validateUser(userToValidate)
//             return;
//         }
//         console.log(response);
//         let data = await response.json();
//         console.log(data.todos);
//         return data.todos;
        
//     } catch (error) {
//         console.log(error);
//         return;
//     }
// }
// //crear otro useEffect el cual cuando vea cambios en userLoggin ejecute la función de compobación de si el usuario existe, en caso de que exista querre que arriba a la izquierda se forme
// //un hola usuario con el valor del usuairo recibido y que en caso de que no exista, se ejecute la función de crear usuario con el valor del usuario que se ha intentado logar para 
// //finalmente añadir el nuevo usuario


// async function postNewItem(userToValidate, e) {
//     try {
//         let response = await fetch(`https://playground.4geeks.com/todo/todos/${userToValidate}`, {
//             method: 'POST',
//             body: JSON.stringify({
//                 "label": e.target.value,
//                 "is_done": false
//             }),
//             headers: {
//                 "Content-Type": "application/json"
//               }
//         })
//         console.log(response);
//         let data = await response.json();
//         console.log(data);
//         return
//     } catch (error) {
//         console.log(error);
//         return;
//     }
// }

// export { createUser, validateUser, postNewItem }