

import {CitiesAPI, CitySearchAPI, UserLoginAPI} from '../api/CitiesAPI'

export const FETCH_CITY_DATA = "FETCH_CITY_DATA";

export const fetchCities = (indexOfSelectedFirstItem, indexOfSelectedLastItem) => async (dispatch) => {
    console.log("In action + " + indexOfSelectedFirstItem, indexOfSelectedLastItem)
    const data = await CitiesAPI(indexOfSelectedFirstItem, indexOfSelectedLastItem);
    console.log("action " + data);
    dispatch(saveCities(data))
}


export const fetchCitySearch = (searchText) => async (dispatch) => {
    const data = await CitySearchAPI(searchText);
    console.log("action " + data);
    dispatch(saveCities(data))
}


export const fetchUserCred = (searchText) => async (dispatch) => {
    const data = await UserLoginAPI(searchText);
    console.log("action " + data);
    dispatch(saveCities(data))
}



export const saveCities = (cityData) => {
    return {
    type: FETCH_CITY_DATA,
    cityData,
}}