import React from 'react';
import './Home.scss';
import Map from '../../components/Map/Map';
import LocationMap from '../../components/LocationMap/LocationMap';
import HeroImage from '../../components/HeroImage/HeroImage';

function Home() {
  return (
    <>
      <HeroImage />
      <LocationMap />
    </>
  )
}

export default Home