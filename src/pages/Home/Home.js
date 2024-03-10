import React from 'react';
import './Home.scss';
import Map from '../../components/Map/Map';
import LocationMap from '../../components/LocationMap/LocationMap';
import HeroImage from '../../components/HeroImage/HeroImage';
import AboutSection from '../../components/AboutSection/AboutSection';

function Home() {
  return (
    <div className='greene__home'>
      <HeroImage />
      <div className='greene__home-mainsection'>
        <AboutSection />
        <LocationMap />
      </div>
    </div>
  )
}

export default Home