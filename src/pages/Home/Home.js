import React from 'react';
import './Home.scss';
import Map from '../../components/Map/Map';
import LocationMap from '../../components/LocationMap/LocationMap';

function Home() {
  return (
    <>
        {/* <Map /> */}
      <LocationMap />
    </>
  )
}

export default Home