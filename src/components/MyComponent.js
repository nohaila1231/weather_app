import React, { useEffect  , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/mySlice';
import { Button } from 'primereact/button';
import './MyComponent.css';

const MyComponent = () => {
    const[city , setCity] = useState('');
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.myData);

  const handleSearch = () => {
    if (city.trim()) {
      dispatch(fetchData(city)); 
    }
  };

  return (
    <div className="weather-container">
      <h1 className="title">Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button label="Search" onClick={handleSearch} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && data.name && (
        <div className="weather-details">
          <h2>{data.name}</h2>
          <p>Temperature: {data.main?.temp}°C</p>
          <p>Weather: {data.weather?.[0]?.description}</p>
        </div>
      )}
    </div>
  );
};

export default MyComponent;