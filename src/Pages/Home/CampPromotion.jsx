import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const CampPromotion = () => {
  return (
    <section className="py-20 bg-blue-50 dark:bg-background text-white overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left side: text */}
        <motion.div
          className="md:w-1/2 space-y-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl text-black md:text-5xl font-extrabold dark:text-gray-100">
            Join Our <span className="text-[#016630] dark:text-[#00a63e]">Free Health Checkup Camp</span>!
          </h2>
          <p className="text-lg md:text-xl text-gray-100 dark:text-gray-200">
            Limited seats available. Book now to ensure your spot.
          </p>
          <Link to='/camps'>
          <motion.button
            className="bg-[#00a63e] cursor-pointer text-white dark:text-gray-900 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Book Your Spot
          </motion.button>
          </Link>
        </motion.div>

        {/* Right side: illustration / placeholder */}
        <motion.div
          className="md:w-1/2"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full aspect-[3/2] overflow-hidden bg-gray-800 rounded-3xl shadow-2xl flex items-center justify-center">
            <img
              src="https://i.ibb.co/N6cMtVr8/pexels-karolina-grabowska-4386466-min.jpg"
              alt="doctor"
              className="w-full h-full object-cover rounded-3xl shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CampPromotion;
