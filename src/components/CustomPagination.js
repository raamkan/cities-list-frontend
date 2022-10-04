import React from "react";
import CityDetail from "./CityDetail";
import '../css/pageNumbers.css';
import {fetchCities} from "../context/actions";
import {useStore} from "../context/store";

function CustomPagination(props){

    let currentPage = 1;
    const [citiesPerPage, setCitiesPerPage] = React.useState(30);
    const [currentPageNumber, setCurrentPageNumber] = React.useState(0);

    const [pageNumberLimit, setPageNumberLimit] = React.useState(8);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = React.useState(8);
    const [minPageNumberLimit, setMinPageNumberLimit] = React.useState(0);
    const {state, dispatch} = useStore();

    const pages = [];
    for(let i=1; i <=Math.ceil(props.data / citiesPerPage); i++){
        pages.push(i);
    }


    const paginationData = (currentPage) => {
        const indexOfSelectedLastItem = currentPage * citiesPerPage;
        const indexOfSelectedFirstItem = (indexOfSelectedLastItem - citiesPerPage)+1;
        dispatch(fetchCities(indexOfSelectedFirstItem, indexOfSelectedLastItem));
    }

    const handleClick = (event) => {
        event.preventDefault();
        console.log("page number" , event.target.value)
        currentPage = Number(event.target.value);
        setCurrentPageNumber(currentPage);
            paginationData(currentPage);
    };

    const handleClickNextBtn = (event) => {
        let currentPage = currentPageNumber + 1;
        setCurrentPageNumber(currentPageNumber + 1);
       if(currentPage+1 > maxPageNumberLimit ){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
        paginationData(currentPage);
        
    };

    const handleClickPrevBtn = (event) => {
        if(currentPageNumber > 1){
            let currentPage = currentPageNumber-1;
            setCurrentPageNumber(currentPageNumber-1);
            if((currentPage) % pageNumberLimit == 0){
                    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
                    setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
                }
            paginationData(currentPage);
        } 
     };

    React.useEffect(() => {

        console.log("call inside useEffect")
        dispatch(fetchCities(0,30));
    },[])

    const renderPageNumbders = pages.map((number, index) => {
            if(number < maxPageNumberLimit+1 && number > minPageNumberLimit) {
                return (
                <button type="button" onClick={handleClick} className={currentPageNumber === index+1  ? "active": "pageNumber button"} value={number}>
                    {number}
                </button>
            )
            } else {
                return null;
            }
    })

    const renderCities = (data) => {

        return (
            <div>
            { 
                data.map((cityData, index) => (
                   <CityDetail id={cityData.id} cityName={cityData.cityName} cityImage={cityData.cityImage} />
                ))
            }
            </div>
        );
    };



    
    return (
        <>
                
            {state.cityLists.length > 29 ? 
                <div className="pageNumbers">
                        <button type="button" onClick={handleClickPrevBtn}>
                            Prev
                        </button>
                        {renderPageNumbders}
                        <button type="button" onClick={handleClickNextBtn}>
                            Next
                        </button>
                </div> : ""}
                   
            
            {renderCities(state.cityLists)}
        </>
    )

}

export default CustomPagination