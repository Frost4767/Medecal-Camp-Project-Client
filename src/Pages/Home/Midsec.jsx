import React from "react";

const MedicalCampSection = () => {
  return (
    <section className="relative z-10 min-h-screen md:h-[80vh] bg-gradient-to-br from-green-50 to-lime-100 dark:from-gray-900 dark:to-gray-900 flex items-center justify-center p-6 md:p-12 lg:p-24 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-4xl font-extrabold text-green-900 dark:text-green-400 leading-tight drop-shadow-xl">
          🏥 Community Medical Support{" "}
          <span className="text-lime-600 dark:text-green-300">Like Never Before</span>
        </h2>

        <p className="text-gray-700 dark:text-gray-200 text-lg md:text-xl max-w-4xl mx-auto">
          Discover government-approved and organizer-led health camps offering
          free and affordable checkups, specialist consultations, and emergency
          screenings. All in your local area, all at your fingertips.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 hover:shadow-xl transition">
            <h4 className="text-lg font-bold text-green-800 dark:text-green-400 mb-2">
              🔬 Free Health Screenings
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Blood pressure, glucose, vision, and more at no cost. Early
              detection saves lives.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 hover:shadow-xl transition">
            <h4 className="text-lg font-bold text-green-800 dark:text-green-400 mb-2">
              👨‍⚕️ Licensed Doctors On Site
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              All camps are hosted by certified professionals with real-time
              support and referral.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 hover:shadow-xl transition">
            <h4 className="text-lg font-bold text-green-800 dark:text-green-400 mb-2">
              📍 Nearby & Accessible
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Filter by your area and preferred dates — stay informed, stay
              proactive.
            </p>
          </div>
        </div>

        <div className="pt-6">
          <p className="text-green-900 dark:text-green-400 text-base md:text-lg font-semibold">
            Over <span className="text-lime-600 dark:text-green-300 font-bold">50,000+</span>{" "}
            participants have benefited from our camps so far.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MedicalCampSection;
