import React from "react";
import CityDetail from "./CityDetail";

function Cities(props){

    return (
        <div>
            { 
                props.data.map((cityData, index) => (
                   <CityDetail cityName={cityData.cityName} cityImage={cityData.cityImage} />
                ))
            }
        </div>
        
    )

}

export default Cities;