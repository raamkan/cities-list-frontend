import React from "react";
import EditCityInfo from "./EditCityInfo";
import '../css/cityDetails.css';
import editSvg from "../images/edit-white-icon.png"

function CityDetail(props){

    const[editPopup, setEditPopup] = React.useState(false);
    
    return (
        <div className="city-catalog">
             <div className="cityInfo">
                <img src={props.cityImage} alt="No Image" className="city--image"></img>
                <div className="details">
                    {<img src={editSvg} className="editImg" onClick={() => setEditPopup(true)} /> }
                    <p>{props.cityName}</p>
                </div>
                
            </div>

            {editPopup && <EditCityInfo setEditPopup = {setEditPopup} id={props.id}/>}
        </div>
    )
}

export default CityDetail;