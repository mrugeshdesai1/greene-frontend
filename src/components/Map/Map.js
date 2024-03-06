import React from 'react';
import './Map.scss';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';
import axios from 'axios';
import { useState , useEffect } from 'react';

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 51.15,
    lng: -113.91,
  };  
  

const MAP_API = process.env.GOOGLE_MAP_API_KEY;

function Map() {

    const [chargingStations, setChargingStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);

    // Fetch charging stations data from the Express.js backend
    function renderStations() {
        axios.get('http://localhost:8080/charging-stations')
          .then(response => {
            console.log(response)
            setChargingStations(response.data)
          }).catch(error => {
            console.log("There is problem fetching charging stations");
          });
      }

    useEffect(() => {
        renderStations()
    }, []);
    


  return (
    <LoadScript googleMapsApiKey= {MAP_API}>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
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
        
        <div>
            <h3>{selectedStation.name}</h3>
            <p>{selectedStation.address}</p>
        </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map