import React from 'react';
import './LocationMap.scss';
import ReactMapGL, {Marker , Popup} from "react-map-gl";
import axios from 'axios';
import { useState , useEffect } from 'react';
import locationIcon from "../../assets/Icons/location.png";

function LocationMap() {

  const [chargingStations, setChargingStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);  
  
  const [viewport, setViewport] = useState ({
    latitude: 51.0456064,
    longitude: -114.057541,
    width: "100vw",
    height: "100vh",
    zoom: 10
  })

  // Fetch charging stations data from the Express.js backend
  function renderStations() {
    axios.get('http://localhost:8080/charging-stations')
      .then(response => {
        console.log(response.data)
        setChargingStations(response.data)
      }).catch(error => {
        console.log("There is problem fetching charging stations");
      });
  }

  useEffect(() => {
    renderStations()
  }, []);

  return (
    <div className='greene-mapcontainer'>
        <ReactMapGL 
            {...viewport}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
            mapStyle="mapbox://styles/mrugeshdesai1/clthxmret00zc01ptge8hhedg"
            onViewportChange = {setViewport} 
            >

            {chargingStations.map(station => (
                <Marker 
                key={station.id}
                latitude= {station.lat}
                longitude= {station.lng}
                onClick={() => setSelectedStation(station)} 
                >
                    <button className='greene-mapcontainer-markerbutton'>
                        <img src={locationIcon} alt='locationIcon' className='greene-mapcontainer-marker'/>
                    </button>
                </Marker>    
            ))}

            {selectedStation ? (
                <Popup latitude= {chargingStations.lat} longitude= {chargingStations.lng} onClose={() => {setSelectedStation(null)}}>
                    <div>
                        <h3>{chargingStations.name}</h3>
                        <p>{chargingStations.address}</p>
                    </div>
                </Popup>
            ) : null}

        </ReactMapGL>
    </div>
  )
}

export default LocationMap