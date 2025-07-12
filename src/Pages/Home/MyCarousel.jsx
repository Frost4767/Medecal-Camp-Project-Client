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
            src="https://i.ibb.co/v4hvmrZh/im1.jpg"
            alt="Lost Item"
            className="object-cover w-full h-full z-0"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Lost Something?</h2>
            <p className="text-lg md:text-xl ">Post your lost item and get help finding it.</p>
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
            src="https://i.ibb.co/WN5Bzwdn/im3.png"
            alt="Found Item"
            className="object-cover w-full h-full z-0 "
          />
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Found Something?</h2>
            <p className="text-lg md:text-xl ">Help others by posting what you've found.</p>
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
            src="https://i.ibb.co/3bSVSVw/im4.jpg"
            alt="Recovered"
            className="object-cover w-full h-full z-0"
          />
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Item Recovered!</h2>
            <p className="text-lg md:text-xl ">Mark items as recovered and help others.</p>
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