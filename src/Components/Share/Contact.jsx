import { MdEmail, MdPhone, MdLocationOn, MdPerson, MdMessage, MdLocalHospital } from "react-icons/md";
import { toast } from "react-toastify";

export default function Contact() {
  const contactInfo = [
    {
      icon: <MdEmail className="w-5 h-5" />,
      title: "Email Us",
      details: "medicamp@healthcare.org",
    },
    {
      icon: <MdPhone className="w-5 h-5" />,
      title: "Call Us",
      details: "+880 1711-223344",
    },
    {
      icon: <MdLocationOn className="w-5 h-5" />,
      title: "Camp Location",
      details: "Community Center, Dhanmondi, Dhaka",
    },
  ];

  const handle = () => {
    toast.success("Your message has been sent. We will contact you soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-lime-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md border-b border-green-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 dark:text-green-400 mb-4">
            Contact Our <span className="text-lime-600 dark:text-lime-400">Medical Camp Team</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions about our health checkup camp, registration, or medical services?  
            Reach out to us — we’re here to help you!
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 text-center border border-green-100 dark:border-gray-700 hover:shadow-xl transition"
            >
              <div className="bg-lime-100 dark:bg-green-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lime-600 dark:text-lime-300">
                {info.icon}
              </div>
              <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">{info.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{info.details}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-8 border border-green-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-6 text-center">
            Send us a Message
          </h2>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdPerson className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-lime-500 focus:border-transparent 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdEmail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-lime-500 focus:border-transparent 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                <MdMessage className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                rows="4"
                placeholder="Write your queries about registration, doctors, or medical facilities..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           focus:ring-2 focus:ring-lime-500 focus:border-transparent resize-none 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              ></textarea>
            </div>

            <button
              onClick={handle}
              className="w-full bg-[#00a63e] hover:bg-[#00a63dd7] text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Send Message
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-3xl shadow-md p-8 border border-green-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-green-900 dark:text-green-400 mb-6 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Do I need to register for the camp in advance?",
                a: "Yes, registration helps us manage participants better. Walk-in patients are also welcome, but slots may be limited.",
              },
              {
                q: "Is the medical camp free?",
                a: "Yes, general health check-ups are free. Some specialized tests may require a small fee.",
              },
              {
                q: "What services will be provided at the camp?",
                a: "The camp includes free health check-ups, doctor consultations, basic medicines, and diagnostic tests like blood pressure, sugar, and BMI.",
              },
              {
                q: "Can I bring my medical reports to the camp?",
                a: "Absolutely! Bringing previous medical reports helps doctors understand your health better.",
              },
            ].map((faq, i) => (
              <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 bg-white dark:bg-gray-800 border border-[#01c047] dark:border-[#00a63e] rounded-lg p-6 shadow-md">
          <h3 className="font-semibold text-[#00a63e] dark:text-[#00a63e] mb-2 flex items-center gap-2">
            <MdLocalHospital className="w-5 h-5" /> Emergency Medical Help
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            For urgent medical needs or emergencies during the camp, please contact us immediately:
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="border px-3 py-1 rounded-full text-sm font-medium text-[#00a63e] dark:text-[#00a63e]">
              Hotline: +880 9999-112233
            </span>
            <span className="border px-3 py-1 rounded-full text-sm font-medium text-[#00a63e] dark:text-[#00a63e]">
              emergency@healthcare.org
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
