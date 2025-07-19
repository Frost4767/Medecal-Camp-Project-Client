import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MyCarousel = () => {
  const slides = [
    {
      title: "Community Health Outreach",
      description:
        "Empowering over 2,000+ patients with free general check-ups, chronic illness screenings, and medical counseling in rural zones.",
      image: "https://i.ibb.co/nsmw7HfV/old.jpg",
    },
    {
      title: "Women’s Health Initiative",
      description:
        "Over 1,200 women benefited from specialized gynecological support, nutrition consultations, and breast health screenings.",
      image: "https://i.ibb.co/4Zm7c0CW/deugs.jpg",
    },
    {
      title: "Child & Dental Wellness Camp",
      description:
        "Delivered essential eye and dental care to 800+ children with hands-on awareness sessions and on-site treatment from specialists.",
      image: "https://i.ibb.co/jkvGsWb9/child.jpg",
    },
  ];

  return (
    <div className="w-full h-[80vh] mb-14">
      <Carousel
        infiniteLoop
        autoPlay
        interval={4000}
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[80vh] w-full">
            {/* Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="object-cover w-full h-full z-0"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10"></div>

            {/* Text */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-lime-300 via-white to-green-300 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl max-w-3xl text-lime-100 font-medium drop-shadow-md">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
