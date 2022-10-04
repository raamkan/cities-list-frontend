import React from 'react';
import Cities from './components/Cities';
import CitiesSearch from './components/CitiesSearch';
import CustomPagination from './components/CustomPagination';



function App() {

  const [loading, setLoading] = React.useState(false);
  const [cityCount, setCityCount] = React.useState([]);


  React.useEffect(() => {
    const fetchCitiesCount  = async () => {
        setLoading(true);
        await fetch(`http://localhost:8080/rest/api/v1/getTotalCities`)
        .then(res => res.json())
        .then(data => setCityCount(data))
        setLoading(false);
    }
    fetchCitiesCount();
  }, []);

  return (
    <div className="App">
      <CitiesSearch data={cityCount} />
      <CustomPagination data = {cityCount}/>
    </div>
  );
}

export default App;
