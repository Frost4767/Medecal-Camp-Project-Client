import React from "react";
import { motion } from "framer-motion";

const recentCamps = [
  { id: 1, name: "General Health Checkup", location: "Dhaka", healthcareProfessional: "Dr. Rahman", status: "New" , image: "https://i.ibb.co.com/7NQGGdkP/ai-generated-8881545-1280.jpg"},
  { id: 2, name: "Cardiology Screening", location: "Chattogram", healthcareProfessional: "Dr. Sultana", status: "Popular" , image: "https://i.ibb.co.com/VcG4pP0m/hert.jpg"},
  { id: 3, name: "Dental Care Camp", location: "Sylhet", healthcareProfessional: "Dr. Karim", status: "New" , image: "https://i.ibb.co.com/mCjqPvWW/daibatis.jpg"},
  { id: 4, name: "Eye Care Camp", location: "Rajshahi", healthcareProfessional: "Dr. Anika", status: "Limited" , image: "https://i.ibb.co.com/QFxr02Kr/dental.jpg"},
  { id: 5, name: "Blood Donation", location: "Barishal", healthcareProfessional: "Dr. Kamal", status: "Popular" , image: "https://i.ibb.co.com/q3C8W0xM/women.jpg"},
];

const statusColor = {
  New: "bg-green-500",
  Popular: "bg-blue-500",
  Limited: "bg-yellow-500",
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const RecentCamps = () => {
  return (
    <section className="py-16 bg-blue-50 dark:bg-background transition-colors duration-300">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-green-800 dark:text-green-400">
          Recently Added Camps
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {recentCamps.map((camp, index) => (
            <motion.div
              key={camp.id}
              className={`relative w-64 h-56 rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300`}
              style={{ rotate: index % 2 === 0 ? "1deg" : "-1deg" }}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
            >
              {/* Colored tile background */}
              <div className="w-full h-full bg-gradient-to-tr from-white to-white dark:from-gray-700 dark:to-gray-600 flex flex-col justify-end p-4 text-white">
                
                <div className="w-full aspect-[3/2] overflow-hidden bg-gray-800 rounded-xl  ">
                  <img
                      src={camp?.image}
                      alt="doctor"
                      className="w-full h-full object-cover rounded-xl "
                    />
                 </div>
                
                
                <h3 className="text-[#016630] dark:text-secondary text-lg font-bold">{camp.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Location:</span> {camp.location}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Doctor:</span> {camp.healthcareProfessional}
                </p>
              </div>

              {/* Status dot */}
              <span
                className={`absolute top-3 left-3 w-3 h-3 rounded-full ${statusColor[camp.status]} shadow-md`}
              ></span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentCamps;
