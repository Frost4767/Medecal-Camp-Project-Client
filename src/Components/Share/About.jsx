import { MdPeople, MdFavorite, MdCheckCircle, MdLocationOn } from "react-icons/md";

const AboutMedicalCamp = () => {
  const stats = [
    { label: "Total Participants", value: "12K+", icon: <MdPeople className="w-6 h-6" /> },
    { label: "Health Services Provided", value: "30K+", icon: <MdFavorite className="w-6 h-6" /> },
    { label: "Camps Successfully Held", value: "150+", icon: <MdCheckCircle className="w-6 h-6" /> },
    { label: "Cities Covered", value: "60+", icon: <MdLocationOn className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-green-50 mb-24">
      {/* Hero Section */}
      <div className="bg-white shadow-md border-b border-green-200">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-extrabold text-green-900 mb-4">
            Empowering Communities with <span className="text-lime-600">MediCamp</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
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
              className="bg-white rounded-2xl shadow-lg p-6 text-center border border-green-100 hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-3 text-lime-600 text-3xl">{stat.icon}</div>
              <div className="text-3xl font-bold text-green-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-green-100 to-lime-100 rounded-2xl shadow-md p-10 border border-lime-200">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Our Mission</h2>
          <p className="text-gray-700 text-center text-lg leading-loose">
            MediCamp aims to bridge the gap between communities and essential healthcare by organizing accessible, quality, and compassionate medical camps. From preventive screenings to doctor consultations – we’re dedicated to building a healthier future for all.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-green-900 mb-12 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { step: 1, title: "Browse Camps", text: "Explore upcoming medical camps in your area and see what healthcare services are available." },
            { step: 2, title: "Register Effortlessly", text: "Secure your spot by completing a simple registration form. Quick and seamless!" },
            { step: 3, title: "Attend & Get Support", text: "Visit the camp, receive expert care, and improve your health with confidence." }
          ].map(({ step, title, text }) => (
            <div key={step} className="text-center bg-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition">
              <div className="bg-green-200 text-green-800 font-bold text-xl w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
                {step}
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMedicalCamp;
