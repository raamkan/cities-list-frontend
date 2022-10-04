import {FETCH_CITY_DATA} from "../context/actions";

const fetchCityPaginated = (state, {cityData}) => 
    {
    console.log("inside reducer" + cityData);
    return {
        ...state,
        cityLists: [...cityData],
    };

}

export const cityReducer = {
    [FETCH_CITY_DATA]: fetchCityPaginated
}