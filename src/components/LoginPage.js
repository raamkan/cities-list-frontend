import React from "react";
import {useStore} from "../context/store";
import '../css/loginPage.css';
import { fetchUserCred } from "../context/actions";

function LoginPage(props){

    const setLoginPopup = props.setLoginPopup;

    const [userName, setUserName] = React.useState([]);
    const [password, setPassword] = React.useState([]);
    const [closeForm, setCloseForm] = React.useState(false);
    const {state, dispatch} = useStore();

    function handleUsername(event) {
        setUserName(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }
 

    function handleLogin(){

        /**
         *  As of now i am just adding the credentials into local storage instead having authenticated implemented.
         *  
         *  As time permits i will implements authentication on the backend and integrate it with this component code.
         * 
         */
        localStorage.setItem("username", JSON.stringify(userName));
        localStorage.setItem("password", JSON.stringify(password));
        
        setCloseForm(true);


        /**
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify({ username : userName, password: password})
        };
        const response = fetch(`http://localhost:8080/api/v1/users/verify/login?username=${userName}&password=${password}`).then(response => 
        {
            if(response.status == 200){
                {setCloseForm(true); setLoginPopup(false);}
            } else if(response.status == 404) {
               return Promise.reject('No record Found');
            } else {
                return Promise.reject('Invalid credentials');
            }
        }).then(()=>
            dispatch(fetchUserCred(userName,password))
        ).catch(error => alert("Invalid Credentials Please try again..."));
        **/
    }


    return (
        <div className= {closeForm ? "modale" : "modale opened"} aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-header">
                <h4>Enter your Credentials</h4>
                <a href="#" className="btn-close" aria-hidden="true" onClick={() => {setCloseForm(true); setLoginPopup(false)}}>&times;</a>
            </div>
            <div className="modal-body">
                    <div className="inputDiv">
                        <label>UserName : </label>
                        <input type="text" placeholder="Enter Username" onChange={handleUsername}/>
                    </div>
                    <div className="inputDiv">
                        <label>Password : </label>
                        <input type="text" placeholder="Enter Password" onChange={handlePassword}/>  
                    </div>  
                    <button type="button" onClick={handleLogin}>Submit</button>
            </div>
        </div> 
    </div>
    )
}

export default LoginPage;