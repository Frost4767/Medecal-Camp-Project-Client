import {
  MdSearch,
  MdExpandMore,
  MdExpandLess,
  MdChat,
  MdEmail,
  MdPhone,
  MdLocalHospital,
} from "react-icons/md";
import { useState } from "react";

export default function Support() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: "Do I need to register for the medical camp?",
      answer:
        "Yes, registration helps us manage participant flow efficiently. Walk-ins are allowed but slots may be limited.",
    },
    {
      question: "What health services are provided?",
      answer:
        "Our camp offers general health check-ups, doctor consultations, basic diagnostics like BP, sugar, BMI checks, and free medicines for minor ailments.",
    },
    {
      question: "Can I bring my medical reports?",
      answer:
        "Absolutely! Bringing your previous medical reports helps doctors provide accurate advice.",
    },
    {
      question: "Is there a cost for attending the camp?",
      answer:
        "The basic check-up and consultation are free. Some specialized tests may have a nominal fee.",
    },
    {
      question: "What safety measures are in place?",
      answer:
        "All health protocols are strictly followed including sanitization, social distancing, and mandatory masks to ensure participant safety.",
    },
  ];

  const supportOptions = [
    {
      icon: <MdChat className="w-6 h-6" />,
      title: "Live Chat",
      description: "Get instant help from our camp support team",
    },
    {
      icon: <MdEmail className="w-6 h-6" />,
      title: "Email Support",
      description: "Send queries regarding registration or medical services",
    },
    {
      icon: <MdPhone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Call our dedicated medical camp helpline",
    },
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-green-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md border-b border-green-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 dark:text-green-400 mb-4">
            Medical Camp <span className="text-lime-600 dark:text-lime-400">Support</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Get help regarding registration, medical services, or safety protocols for our health camp.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MdSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-3 border border-green-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent bg-white dark:bg-gray-700 dark:text-gray-200 transition-colors"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Support Options */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {supportOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-green-100 dark:border-gray-700 hover:shadow-xl transition cursor-pointer"
            >
              <div className="bg-lime-200 dark:bg-green-600/40 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-green-700 dark:text-lime-300">
                {option.icon}
              </div>
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-2">
                {option.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {option.description}
              </p>
            </div>
          ))}
        </div>

        {/* Safety Tips */}
        <div className="bg-gradient-to-br from-green-100 to-lime-100 dark:from-gray-800 dark:to-gray-700 border border-lime-200 dark:border-gray-700 rounded-xl p-6 mb-12 shadow-md">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">
            🛡️ Health & Safety Guidelines
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <p className="mb-2">• Maintain social distancing</p>
              <p className="mb-2">• Wear masks at all times</p>
              <p>• Sanitize hands regularly</p>
            </div>
            <div>
              <p className="mb-2">• Bring your medical reports</p>
              <p className="mb-2">• Follow staff instructions for your safety</p>
              <p>• Report any health issues immediately</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-green-100 dark:border-gray-700">
          <div className="p-6 border-b border-green-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-green-900 dark:text-green-400">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              Find answers to common questions about our medical camp
            </p>
          </div>

          <div className="divide-y divide-green-100 dark:divide-gray-700">
            {faqs.map((faq, index) => (
              <div key={index}>
                <div
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-green-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <span className="font-medium text-green-900 dark:text-green-300 pr-4">
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <MdExpandLess className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  ) : (
                    <MdExpandMore className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  )}
                </div>

                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
