import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const Newsletter = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-16 bg-blue-50 dark:bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100"
          data-aos="fade-up"
        >
          Subscribe for Updates
        </motion.h2>
        <motion.p
          className="mb-8 text-gray-700 dark:text-gray-300 text-lg"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Get the latest updates about upcoming medical camps directly in your inbox.
        </motion.p>

        <motion.form
          className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-[#00a63e] dark:focus:ring-[#00a63e] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#00a63e]  text-white font-semibold hover:bg-[#00a63dcb] dark:hover:bg-[#00a63dda] shadow-md transition-colors"
          >
            Subscribe
          </button>
        </motion.form>

        {/* Optional: small subtle note */}
        <motion.p
          className="mt-4 text-gray-500 dark:text-gray-400 text-sm"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          We respect your privacy. No spam ever.
        </motion.p>
      </div>
    </section>
  );
};

export default Newsletter;
