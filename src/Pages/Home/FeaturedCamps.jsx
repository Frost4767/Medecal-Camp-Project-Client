import React from "react";
import { motion } from "framer-motion";

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

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const FeaturedCamps = () => {
  return (
    <section className="py-20 bg-background transition-colors duration-500">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14">
          <span className="bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent drop-shadow-md">
            Featured Medical Camps
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredCamps.map((camp, index) => (
            <motion.div
              key={camp.id}
              className="relative rounded-3xl shadow-lg bg-white/40 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
            >
              {/* Status badge */}
              <span className="absolute top-4 right-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md z-10">
                {camp.status}
              </span>

              {/* Image */}
              <div className="w-full h-48 overflow-hidden rounded-t-3xl">
                <img
                  src={camp.image}
                  alt={camp.name}
                  className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-300">
                  {camp.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <span className="font-semibold">📅 Date:</span> {camp.date}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <span className="font-semibold">📍 Location:</span> {camp.location}
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
