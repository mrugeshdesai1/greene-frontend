import React from 'react';
import './Map.scss';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import axios from 'axios';
import { useState , useEffect } from 'react';

const mapContainerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 51.15,
    lng: -113.91,
  }; 
  

const MAP_API = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

function Map() {


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAP_API,
  });

    const [chargingStations, setChargingStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);

    // Fetch charging stations data from the Express.js backend
    function renderStations() {
        axios.get('http://localhost:8080/charging-stations')
          .then(response => {
            setChargingStations(response.data)
          }).catch(error => {
            console.log("There is problem fetching charging stations");
          });
      }

    useEffect(() => {
        renderStations()
    }, []);
    


  return (
    <div className= 'greene__locations'>
      {!isLoaded ? (
        <h1 className= 'greene__locations-loading'>Loading...</h1>
      ) : (
        <GoogleMap className='greene__locations-mapcontainer' mapContainerStyle={mapContainerStyle} zoom={8} center={center}>
          {chargingStations.map(station => (
            <Marker 
              key={station.id}
              position={{ lat: station.lat, lng: station.lng }}
              onClick={() => setSelectedStation(station)}
            />
          ))}

          {selectedStation && (
              <InfoWindow
                  position={{ lat: selectedStation.lat, lng: selectedStation.lng }}
                  onCloseClick={() => setSelectedStation(null)}
                  >
              
                  <div greene__locations-stationinfo>
                      <h3>{selectedStation.name}</h3>
                      <p>{selectedStation.address}</p>
                  </div>
              </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  )
}

export default Map