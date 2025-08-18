import React from "react";

const MedicalCampSection = () => {
  return (
    <section className="relative z-10 min-h-screen md:h-[80vh] bg-gradient-to-tr from-green-200 via-lime-100 to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center p-6 md:p-12 lg:p-24 transition-colors duration-500">
      <div className="max-w-6xl mx-auto text-center space-y-10">
        
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
          <span className="bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent">
            🏥 Community Medical Support
          </span>{" "}
          <span className="text-gray-800 dark:text-gray-200">Like Never Before</span>
        </h2>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
          Discover government-approved and organizer-led health camps offering
          <span className="font-semibold text-green-700 dark:text-green-400"> free & affordable checkups</span>, 
          specialist consultations, and emergency screenings. All in your local area, all at your fingertips.
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          <InfoCard 
            icon="🔬" 
            title="Free Health Screenings" 
            desc="Blood pressure, glucose, vision, and more at no cost. Early detection saves lives." 
          />
          <InfoCard 
            icon="👨‍⚕️" 
            title="Licensed Doctors On Site" 
            desc="All camps are hosted by certified professionals with real-time support and referral." 
          />
          <InfoCard 
            icon="📍" 
            title="Nearby & Accessible" 
            desc="Filter by your area and preferred dates — stay informed, stay proactive." 
          />
        </div>

        {/* Stats */}
        <div className="pt-8">
          <p className="text-green-900 dark:text-green-400 text-lg md:text-xl font-semibold drop-shadow-sm">
            Over{" "}
            <span className="text-lime-600 dark:text-green-300 font-extrabold">50,000+</span>{" "}
            participants have benefited from our camps so far 🚀
          </p>
        </div>
      </div>
    </section>
  );
};

/* Reusable Info Card with Glassmorphism Style */
const InfoCard = ({ icon, title, desc }) => (
  <div className="group bg-white/30 dark:bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 hover:scale-[1.05] hover:shadow-xl hover:shadow-green-300/40 dark:hover:shadow-green-900/40 transition-all">
    <h4 className="text-xl font-bold text-green-800 dark:text-green-400 mb-3 flex items-center gap-2">
      <span className="text-2xl">{icon}</span> {title}
    </h4>
    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default MedicalCampSection;
