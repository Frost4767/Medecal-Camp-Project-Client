import React from "react";
import { motion } from "framer-motion";

const recentCamps = [
  { id: 1, name: "General Health Checkup", location: "Dhaka", healthcareProfessional: "Dr. Rahman", status: "New", image: "https://i.ibb.co.com/7NQGGdkP/ai-generated-8881545-1280.jpg" },
  { id: 2, name: "Cardiology Screening", location: "Chattogram", healthcareProfessional: "Dr. Sultana", status: "Popular", image: "https://i.ibb.co.com/VcG4pP0m/hert.jpg" },
  { id: 3, name: "Dental Care Camp", location: "Sylhet", healthcareProfessional: "Dr. Karim", status: "New", image: "https://i.ibb.co.com/mCjqPvWW/daibatis.jpg" },
  { id: 4, name: "Eye Care Camp", location: "Rajshahi", healthcareProfessional: "Dr. Anika", status: "Limited", image: "https://i.ibb.co.com/QFxr02Kr/dental.jpg" },
  { id: 5, name: "Blood Donation", location: "Barishal", healthcareProfessional: "Dr. Kamal", status: "Popular", image: "https://i.ibb.co.com/q3C8W0xM/women.jpg" },
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
    <section className="relative py-20 bg-background transition-colors duration-500">
      <div className="container mx-auto px-6">
        
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14">
          <span className="bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent drop-shadow-md">
            Recently Added Camps
          </span>
        </h2>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {recentCamps.map((camp, index) => (
            <motion.div
              key={camp.id}
              className="relative w-72 rounded-3xl overflow-hidden shadow-lg bg-white/40 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-500"
              style={{ rotate: index % 2 === 0 ? "1deg" : "-1deg" }}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
            >
              {/* Image */}
              <div className="w-full h-40 overflow-hidden">
                <img
                  src={camp?.image}
                  alt={camp.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold text-green-800 dark:text-green-300">
                  {camp.name}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">📍 Location:</span> {camp.location}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">👨‍⚕️ Doctor:</span> {camp.healthcareProfessional}
                </p>
              </div>

              {/* Status badge */}
              <span
                className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full text-white shadow-md ${statusColor[camp.status]}`}
              >
                {camp.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentCamps;
