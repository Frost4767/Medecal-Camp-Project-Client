import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const featuredCamps = [
  {
    id: 1,
    name: "Eye Checkup Camp",
    date: "25th Aug 2025",
    location: "Dhaka",
    status: "Registration Open",
    image: "https://i.ibb.co/7NQGGdkP/ai-generated-8881545-1280.jpg",
  },
  {
    id: 2,
    name: "Blood Donation Camp",
    date: "30th Aug 2025",
    location: "Chattogram",
    status: "Limited Seats",
    image: "https://i.ibb.co/QvLP2kxn/scientist-2141259-1280.jpg",
  },
  {
    id: 3,
    name: "Diabetes Screening",
    date: "5th Sep 2025",
    location: "Sylhet",
    status: "Registration Open",
    image: "https://i.ibb.co/KpGQS81m/doctor-4303020-1280.jpg",
  },
];

const FeaturedCamps = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-16  bg-blue-50  dark:bg-background  transition-colors duration-300">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-800 dark:text-green-400">
          Featured Medical Camps
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredCamps.map((camp) => (
            <motion.div
              key={camp.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden relative hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              data-aos="fade-up"
            >
              {/* Extra info badge */}
              <span className="absolute top-3 right-3 bg-yellow-400 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                {camp.status}
              </span>

              <img
                src={camp.image}
                alt={camp.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-300">
                  {camp.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <span className="font-semibold">Date:</span> {camp.date}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <span className="font-semibold">Location:</span> {camp.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCamps;
