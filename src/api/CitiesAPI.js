
export const CitiesAPI = async (indexOfFirstItem, indexOfLastItem) => {
        return fetch(`http://localhost:8080/rest/api/v1/customPagination?startIndex=${indexOfFirstItem}&lastIndex=${indexOfLastItem}`)
        .then(res => res.json())
        .then(data => data)
    }

export const CitySearchAPI = async (searchText) => {
        return fetch(`http://localhost:8080/rest/api/v1/search?searchText=${searchText}`)
        .then(res => res.json())
        .then(data => data)
    }    

export const UserLoginAPI = async (username, password) => {
    return fetch(`http://localhost:8080/api/v1/users/verify/login?username=${username}&password=${password}`)
        .then(res => res.json())
        .then(data => data)
}



