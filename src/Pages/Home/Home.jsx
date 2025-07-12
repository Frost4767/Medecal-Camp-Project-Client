import React from 'react';
import MyCarousel from './MyCarousel';
import CaroContainer from '../../Container/CaroContainer';

const Home = () => {
    return (
        <div>
            <CaroContainer><MyCarousel></MyCarousel></CaroContainer>
        </div>
    );
};

export default Home;