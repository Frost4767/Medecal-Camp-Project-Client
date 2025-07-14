import React from 'react';
import MyCarousel from './MyCarousel';
import CaroContainer from '../../Container/CaroContainer';
import PopularCamps from './Popularcamps';

const Home = () => {
    return (
        <div>
            <CaroContainer><MyCarousel></MyCarousel></CaroContainer>
            <PopularCamps></PopularCamps>
        </div>
    );
};

export default Home;