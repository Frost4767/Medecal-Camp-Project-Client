import React from 'react';
import MyCarousel from './MyCarousel';
import CaroContainer from '../../Container/CaroContainer';
import PopularCamps from './Popularcamps';
import FeedbackSection from './Feedback';
import Container from '../../Container/Container';
import MidInfoSection from './Midsec';
import MedicalCampSection from './Midsec';

const Home = () => {
    return (
        <div>
            <CaroContainer><MyCarousel></MyCarousel></CaroContainer>
            <PopularCamps></PopularCamps>
            <MedicalCampSection></MedicalCampSection>
            <Container><FeedbackSection></FeedbackSection></Container>
        </div>
    );
};

export default Home;