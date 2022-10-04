import React, { useState } from "react";
import { fetchCities } from "../context/actions";
import '../css/editCityInfo.css';
import { Buffer } from 'buffer';
import {useStore} from "../context/store";


function EditCityInfo(props) {

    const setEditPopup = props.setEditPopup;
    const [cityName, setCityName] = React.useState([]);
    const [cityImageURL, setCityImageURL] = React.useState([]);
    const [closeForm, setCloseForm] = React.useState(false);
    const {state, dispatch} = useStore();
    const [error, setError] = useState(false);


    function handleCityName(event) {
        setCityName(event.target.value);
    }

    function handleCityImage(event) {
        setCityImageURL(event.target.value);
    }

    function handleSubmit(){


        /**
         * As of now i am just adding the credentials into local storage instead having authenticated implemented.
         *  
         *  As time permits i will implements authentication on the backend and integrate it with this component code.
         */
        let username = localStorage.getItem("username").replace(/"/g,"");
        let password = localStorage.getItem("password").replace(/"/g,"");
        const encodedString = Buffer.from(username+":"+ password).toString('base64');

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Basic '+encodedString,
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
              }, 
            body: JSON.stringify({ id: props.id, cityName : cityName, cityImage: cityImageURL})
        };

       

            fetch('http://localhost:8080/rest/api/v1/update/cityInfo', requestOptions)
            .then(
                (response)=> {
                    if(response.status == 200){
                        {setCloseForm(true); setEditPopup(false); setError(false)}
                     } else if(response.status == 401) {
                        setError(true);
                     }
                }
            )
            .then(()=>
                    dispatch(fetchCities(0,30)
                )
        );
    }

        return (
            <div className= {closeForm ? "modale" : "modale opened"} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-header">
                        <h4>Enter City Name and City Image URL</h4>
                        <a href="#" className="btn-close" aria-hidden="true" onClick={() => {setCloseForm(true); setEditPopup(false)}}>&times;</a>
                    </div>
                    <div className="modal-body">
                                { error === true && <p>You don't Admin access to Edit</p>}
                            <div className="inputDiv">
                                <label>City Name : </label>
                                <input type="text" placeholder="Enter city name" onChange={handleCityName} disabled = {(error)? "disabled" : ""}/>
                            </div>
                            <div className="inputDiv">
                                <label>Image URL : </label>
                                <input type="text" placeholder="Enter image url" onChange={handleCityImage} disabled = {(error)? "disabled" : ""}/>  
                            </div>  
                            <button type="button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div> 
            </div>
        )
}
  
export default EditCityInfo;