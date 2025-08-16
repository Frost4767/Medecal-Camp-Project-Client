import React from 'react';
import MyCarousel from './MyCarousel';
import CaroContainer from '../../Container/CaroContainer';
import PopularCamps from './Popularcamps';
import FeedbackSection from './Feedback';
import Container from '../../Container/Container';
import MidInfoSection from './Midsec';
import MedicalCampSection from './Midsec';
import FeaturedCamps from './FeaturedCamps';
import RecentCamps from './RecentCamps';
import Newsletter from './Newsletter';
import CampPromotion from './CampPromotion';

const Home = () => {
    return (
        <div>
            <CaroContainer><MyCarousel></MyCarousel></CaroContainer>
            <PopularCamps></PopularCamps>
            
            <FeaturedCamps></FeaturedCamps>
            <MedicalCampSection></MedicalCampSection>
            <RecentCamps></RecentCamps>
            <CampPromotion></CampPromotion>
            <Container><FeedbackSection></FeedbackSection></Container>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;