import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";


const recentCamps = [
  { id: 1, name: "General Health Checkup", location: "Dhaka", healthcareProfessional: "Dr. Rahman", status: "New" },
  { id: 2, name: "Cardiology Screening", location: "Chattogram", healthcareProfessional: "Dr. Sultana", status: "Popular" },
  { id: 3, name: "Dental Care Camp", location: "Sylhet", healthcareProfessional: "Dr. Karim", status: "New" },
  { id: 4, name: "Eye Care Camp", location: "Rajshahi", healthcareProfessional: "Dr. Anika", status: "Limited" },
  { id: 5, name: "Blood Donation", location: "Barishal", healthcareProfessional: "Dr. Kamal", status: "Popular" },
];

const statusColor = {
  New: "bg-green-500",
  Popular: "bg-blue-500",
  Limited: "bg-yellow-500",
};

const RecentCamps = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-16  bg-blue-50 dark:bg-background transition-colors duration-300">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-800 dark:text-green-400">
          Recently Added Camps
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6">
          {recentCamps.map((camp, index) => (
            <motion.div
              key={camp.id}
              className={`relative w-64 h-56 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300`}
              style={{ rotate: index % 2 === 0 ? "1deg" : "-1deg" }}
              data-aos="fade-up"
            >
              {/* Colored tile background */}
              <div className="w-full h-full bg-gradient-to-tr from-blue-300 to-blue-500 dark:from-gray-700 dark:to-gray-600 flex flex-col justify-end p-4 text-white">
                
                <h3 className="text-lg font-bold">{camp.name}</h3>
                <p className="text-sm"><span className="font-semibold">Location:</span> {camp.location}</p>
                <p className="text-sm"><span className="font-semibold">Doctor:</span> {camp.healthcareProfessional}</p>
              </div>

              {/* Status dot */}
              <span className={`absolute top-3 left-3 w-3 h-3 rounded-full ${statusColor[camp.status]} shadow-md`}></span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentCamps;
