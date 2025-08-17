import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";
import { MdOutlineLocalHospital, MdCheckCircle } from "react-icons/md";
import { Link } from "react-router";

const slides = [
  {
    id: 1,
    title: "Community Health Outreach",
    description:
      "Empowering over 2,000+ patients with free general check-ups, chronic illness screenings, and medical counseling in rural zones.",
    extraInfo: [
      "Free general check-ups",
      "Chronic illness screenings",
      "Medical counseling",
      "Rural health empowerment",
    ],
    image: "https://i.ibb.co/nsmw7HfV/old.jpg",
  },
  {
    id: 2,
    title: "Women’s Health Initiative",
    description:
      "Over 1,200 women benefited from specialized gynecological support, nutrition consultations, and breast health screenings.",
    extraInfo: [
      "Gynecological support",
      "Nutrition consultations",
      "Breast health screenings",
      "Specialized women care",
    ],
    image: "https://i.ibb.co/4Zm7c0CW/deugs.jpg",
  },
  {
    id: 3,
    title: "Child & Dental Wellness Camp",
    description:
      "Delivered essential eye and dental care to 800+ children with awareness sessions and on-site treatment from specialists.",
    extraInfo: [
      "Dental check-ups",
      "Eye care support",
      "Awareness sessions",
      "Specialist consultations",
    ],
    image: "https://i.ibb.co/jkvGsWb9/child.jpg",
  },
];

const listVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4 },
  }),
};

const MyCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="max-w-[2520px] mx-auto h-[80vh] relative">
      <Carousel
        infiniteLoop
        autoPlay
        interval={5000}
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        className="h-full"
        onChange={(index) => setCurrentSlide(index)}
      >
        {slides.map(({ id, title, description, extraInfo, image }, index) => (
          <div key={id} className="relative w-full h-[80vh] overflow-hidden">

            {/* Background Image */}
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover brightness-70 scale-105"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={currentSlide === index ? { scale: 1, opacity: 1 } : { scale: 1.2, opacity: 0 }}
              transition={{ duration: 1 }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />

            {/* Content */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-20 z-20 space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 25 }}
              animate={currentSlide === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold
                bg-gradient-to-r from-emerald-300 via-lime-200 to-teal-300
                bg-clip-text text-transparent drop-shadow-lg">
                {title}
              </h2>

              <p className="text-sm sm:text-lg md:text-xl max-w-3xl text-gray-200 leading-relaxed">
                {description}
              </p>

              {/* Extra Info */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-2">
                {extraInfo.map((info, idx) => (
                  <motion.div
                    key={idx}
                    custom={idx}
                    initial="hidden"
                    animate={currentSlide === index ? "visible" : "hidden"}
                    variants={listVariants}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full shadow-md text-xs sm:text-sm md:text-base text-white"
                  >
                    <MdCheckCircle className="text-green-400 w-4 h-4 flex-shrink-0" />
                    {info}
                  </motion.div>
                ))}
              </div>

              {/* Button */}
              <Link to='/camps'>
              <motion.button
                className="cursor-pointer mt-4 inline-flex items-center gap-2 sm:gap-3
                  bg-gradient-to-r from-emerald-400 via-lime-400 to-teal-400
                  text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-lg
                  hover:scale-105 transition-transform duration-300 text-sm sm:text-base md:text-lg"
                initial={{ opacity: 0, y: 15 }}
                animate={currentSlide === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                <MdOutlineLocalHospital className="w-5 h-5 sm:w-6 sm:h-6" />
                Join the Mission
              </motion.button>
              </Link>
            </motion.div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
