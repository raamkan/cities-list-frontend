
import React from "react";
import CityDetail from "./CityDetail";
import {useStore} from "../context/store";
import { fetchCities, fetchCitySearch } from "../context/actions";
import LoginPage from "./LoginPage";

function CitiesSearch(props){

    const [searchResult, setSearchResult] = React.useState([]);
    const [searchChars, setSearchChars] = React.useState('');
    const {state, dispatch} = useStore();

    const [loginPopup, setLoginPopup] = React.useState(false);



const handleChange = function(event){
    const inputChars = event.target.value;
    if(inputChars.length >= 3){
        dispatch(fetchCitySearch(inputChars));
    } else if(inputChars.length == 0){
            dispatch(fetchCities(0,30));
    }
}

const handleLogin = function(){

}

return (
    <>
    <div>
        <div className="topNav">
                <a className="active" href="#Home">Home</a>
                <a href="#admin">Admin</a>
                <a href="#contact">Contact</a>
                <div className="search-container">
                    <form action="#home">
                        <input type="text" placeholder="Search..." name="search" onChange={(event) =>  handleChange(event)} />
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>
                <button type="button" className="loginBtn" onClick={() => setLoginPopup(true)}>Login</button>
                {loginPopup && <LoginPage setLoginPopup = {setLoginPopup}/>}
            </div>
    </div>
    </>
);
}

export default CitiesSearch;