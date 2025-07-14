import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MdAdd, MdOutlineViewInAr } from "react-icons/md"
import { Link } from "react-router";

const MyCarousel = () => {
  return (
    <div className="w-full h-[60vh] mb-14">
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        className="h-full"
      >
        {/* Slide 1 */}
        <div className="relative h-[70vh] w-full">
          {/* Image */}
          <img
            src="https://i.ibb.co/nsmw7HfV/old.jpg"
            alt="Lost Item"
            className="object-cover w-full h-full z-0"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10"></div>
          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Free Health Check-Up Camp</h2>
            <p className="text-lg md:text-xl md:max-w-2/5">Join us for a free medical check-up camp offering basic health screenings, blood pressure, diabetes tests, and general consultations by certified doctors.</p>
            <Link to='/camps'>
                
                <div className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold inline-flex items-center gap-2 mt-2">
                    <MdOutlineViewInAr className="w-5 h-5"/>
                    View Camps
                  </div>
            </Link>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-[70vh] w-full">
          <img
            src="https://i.ibb.co/4Zm7c0CW/deugs.jpg"
            alt="Found Item"
            className="object-cover w-full h-full z-0 "
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Women’s Wellness Camp</h2>
            <p className="text-lg md:text-xl md:max-w-2/5">Dedicated to women’s health, this camp includes gynecological consultation, breast cancer awareness, and nutritional guidance for a healthier life.</p>
            <Link to='/camps'>
                
                <div className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold inline-flex items-center gap-2 mt-2">
                    <MdOutlineViewInAr className="w-5 h-5"/>
                    View Camps
                  </div>
            </Link>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-[70vh] w-full">
          <img
            src="https://i.ibb.co/jkvGsWb9/child.jpg"
            alt="Recovered"
            className="object-cover w-full h-full z-0"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Eye & Dental Care Camp</h2>
            <p className="text-lg md:text-xl md:max-w-2/5">Specialized camp focused on eye and dental check-ups. Get free vision tests, dental scaling, and oral hygiene advice from expert professionals.</p>
            <Link to='/camps'>
                
                <div className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold inline-flex items-center gap-2 mt-2">
                    <MdOutlineViewInAr className="w-5 h-5"/>
                    View Camps
                  </div>
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default MyCarousel;