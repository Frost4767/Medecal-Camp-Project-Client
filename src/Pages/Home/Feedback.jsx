import Marquee from "react-fast-marquee";
import { FaQuoteLeft, FaStar, FaStethoscope, FaHospitalUser, FaHeartbeat, FaHandsHelping } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";

const FeedbackSection = () => {
  const axiosInstance = useAxios();

  const { data: feedbacks = [] } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosInstance.get("/feedbacks");
      return res.data;
    },
  });

  const relevantInfo = [
    {
      icon: <FaStethoscope className="text-green-600 text-3xl" />,
      title: "Professional Medical Staff",
      description: "Our camps are staffed by experienced doctors and nurses ensuring top-quality care.",
    },
    {
      icon: <FaHospitalUser className="text-blue-600 text-3xl" />,
      title: "Free Health Screenings",
      description: "Comprehensive, no-cost health checkups available to all participants.",
    },
    {
      icon: <FaHeartbeat className="text-red-600 text-3xl" />,
      title: "Focus on Heart Health",
      description: "Special programs aimed at improving cardiovascular wellbeing.",
    },
    {
      icon: <FaHandsHelping className="text-yellow-600 text-3xl" />,
      title: "Community Engagement",
      description: "Empowering local communities with health education and resources.",
    },
  ];

  return (
    <section className="bg-green-50 dark:bg-gray-900 rounded-3xl shadow-inner my-16 py-16 sm:px-12 px-6 mx-auto transition-colors duration-300">
      {/* Static Relevant Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {relevantInfo.map((info, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <div>{info.icon}</div>
            <div>
              <h4 className="text-green-800 dark:text-green-400 font-semibold text-lg mb-1">{info.title}</h4>
              <p className="text-gray-700 dark:text-gray-200 text-sm">{info.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Marquee */}
      <div className="mt-10">
        <h2 className="text-4xl font-extrabold text-green-700 dark:text-green-400 mb-6 text-center">
          What Our Participants Say
        </h2>
        <Marquee pauseOnHover speed={40} gradient={false}>
          {feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="w-80 mx-4 p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-lg dark:border-gray-700 border border-green-100 flex flex-col justify-between relative overflow-hidden hover:shadow-xl transition duration-300"
            >
              <FaQuoteLeft className="absolute text-green-100 dark:text-green-800 text-7xl top-3 left-3 opacity-10" />

              <p className="text-gray-700 dark:text-gray-200 text-sm font-medium italic mb-5 z-10 line-clamp-4">
                “{fb.comment.length > 160 ? fb.comment.slice(0, 160) + "…" : fb.comment}”
              </p>

              <div className="z-10">
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: fb.rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <div className="font-semibold text-green-700 dark:text-green-400 text-sm">{fb.participantName}</div>
                <div className="text-xs text-gray-400 dark:text-gray-300">{fb.email}</div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default FeedbackSection;
