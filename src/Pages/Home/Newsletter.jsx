import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Newsletter = () => {
  const handleSub = (e) => {
    e.preventDefault();
    toast("Subscribe successful");
  };

  // Variants for staggered fade-up animation
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="py-16 bg-blue-50 dark:bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl  font-extrabold mb-4 text-gray-900 dark:text-gray-100"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          Subscribe for Updates
        </motion.h2>

        <motion.p
          className="mb-8 text-gray-700 dark:text-gray-300 text-lg"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
        >
          Get the latest updates about upcoming medical camps directly in your inbox.
        </motion.p>

        <motion.form
          onSubmit={handleSub}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={2}
        >
          <input
            required
            type="email"
            placeholder="Enter your email"
            className="px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-[#00a63e] dark:focus:ring-[#00a63e] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#00a63e] text-white font-semibold hover:bg-[#00a63dcb] dark:hover:bg-[#00a63dda] shadow-md transition-colors"
          >
            Subscribe
          </button>
        </motion.form>

        <motion.p
          className="mt-4 text-gray-500 dark:text-gray-400 text-sm"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={3}
        >
          We respect your privacy. No spam ever.
        </motion.p>
      </div>
    </section>
  );
};

export default Newsletter;
