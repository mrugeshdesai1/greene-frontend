import React from 'react';
import './LocationMap.scss';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { useState , useEffect , useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

function LocationMap() {

  const [chargingStations, setChargingStations] = useState([]);

  // Fetch charging stations data from the Express.js backend
  function renderStations() {
    axios.get('http://localhost:8080/charging-stations')
      .then(response => {
        console.log(response.data)
        setChargingStations(response.data);
      }).catch(error => {
        console.log("There is problem fetching charging stations");
      });
  }

  useEffect(() => {
    renderStations()
  }, []);

  const mapContainer = useRef(null);



  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mrugeshdesai1/clthxmret00zc01ptge8hhedg',
      center: [-114.057541,51.0456064], //[lng, lat] order
      zoom: 8,
    });

  chargingStations.forEach((location) => {
    const popup = new mapboxgl.Popup().setHTML(
      `<div classname='greene-mapcontainer-locationdetails'><p>${location.station_name}<p><p>${location.station_address}</p></div>`
    );

    new mapboxgl.Marker()
        .setLngLat([location.lng,location.lat])
        .setPopup(popup)
        .addTo(map)
        .getElement()
        .addEventListener('click', () => {
          popup.addTo(map);
        });
    });

    return () => map.remove();
  }, [chargingStations]);

  return (
    <div className='greene-mapcontainer'>
      <div ref={mapContainer} className='greene-mapcontainer-map' />
    </div>
  )
}

export default LocationMap