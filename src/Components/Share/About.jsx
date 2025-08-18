import { MdPeople, MdFavorite, MdCheckCircle, MdLocationOn } from "react-icons/md";

const AboutMedicalCamp = () => {
  const stats = [
    { label: "Total Participants", value: "12K+", icon: <MdPeople className="w-6 h-6" /> },
    { label: "Health Services Provided", value: "30K+", icon: <MdFavorite className="w-6 h-6" /> },
    { label: "Camps Successfully Held", value: "150+", icon: <MdCheckCircle className="w-6 h-6" /> },
    { label: "Cities Covered", value: "60+", icon: <MdLocationOn className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-green-50 dark:from-gray-900 dark:to-gray-800  transition-colors duration-500">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md border-b border-green-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 dark:text-green-400 mb-4">
            Empowering Communities with <span className="text-lime-600 dark:text-lime-400">MediCamp</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Bringing essential healthcare services directly to neighborhoods through impactful medical camps – organized, free, and trusted.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 text-center border border-green-100 dark:border-gray-700 hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-3 text-lime-600 dark:text-lime-400 text-3xl">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-green-900 dark:text-green-300 mb-1">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-green-100 to-lime-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-md p-10 border border-lime-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-6 text-center">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 text-center text-lg leading-loose">
            MediCamp aims to bridge the gap between communities and essential healthcare by organizing accessible, quality, and compassionate medical camps. From preventive screenings to doctor consultations – we’re dedicated to building a healthier future for all.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-green-900 dark:text-green-400 mb-12 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { step: 1, title: "Browse Camps", text: "Explore upcoming medical camps in your area and see what healthcare services are available." },
            { step: 2, title: "Register Effortlessly", text: "Secure your spot by completing a simple registration form. Quick and seamless!" },
            { step: 3, title: "Attend & Get Support", text: "Visit the camp, receive expert care, and improve your health with confidence." }
          ].map(({ step, title, text }) => (
            <div
              key={step}
              className="text-center bg-white dark:bg-gray-800 p-6 rounded-3xl border border-green-100 dark:border-gray-700 shadow-sm hover:shadow-md transition"
            >
              <div className="bg-green-200 dark:bg-green-600 text-green-800 dark:text-green-100 font-bold text-xl w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
                {step}
              </div>
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMedicalCamp;
