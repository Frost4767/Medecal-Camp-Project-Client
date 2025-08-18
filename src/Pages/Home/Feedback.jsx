import Marquee from "react-fast-marquee";
import {
  FaQuoteLeft,
  FaStar,
  FaStethoscope,
  FaHospitalUser,
  FaHeartbeat,
  FaHandsHelping,
} from "react-icons/fa";
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
      icon: <FaStethoscope className="text-green-500 text-4xl drop-shadow-md" />,
      title: "Professional Medical Staff",
      description:
        "Our camps are staffed by experienced doctors and nurses ensuring top-quality care.",
    },
    {
      icon: <FaHospitalUser className="text-blue-500 text-4xl drop-shadow-md" />,
      title: "Free Health Screenings",
      description:
        "Comprehensive, no-cost health checkups available to all participants.",
    },
    {
      icon: <FaHeartbeat className="text-red-500 text-4xl drop-shadow-md" />,
      title: "Focus on Heart Health",
      description:
        "Special programs aimed at improving cardiovascular wellbeing.",
    },
    {
      icon: <FaHandsHelping className="text-yellow-500 text-4xl drop-shadow-md" />,
      title: "Community Engagement",
      description:
        "Empowering local communities with health education and resources.",
    },
  ];

  return (
    <section className="relative py-20 px-6 sm:px-12 my-16 rounded-3xl bg-gradient-to-br from-green-50 via-lime-100 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 shadow-lg">
      {/* Static Relevant Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
        {relevantInfo.map((info, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/40 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div>{info.icon}</div>
            <div>
              <h4 className="text-green-800 dark:text-green-400 font-semibold text-lg mb-1">
                {info.title}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {info.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Marquee */}
      <div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
          <span className="bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent drop-shadow-md">
            What Our Participants Say
          </span>
        </h2>

        <Marquee pauseOnHover speed={50} gradient={false}>
          {feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="relative w-80 mx-4 p-6 rounded-3xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-white/30 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Big Quote Icon */}
              <FaQuoteLeft className="absolute text-green-200 dark:text-gray-700 text-7xl top-4 left-4 opacity-20" />

              {/* Feedback comment */}
              <p className="text-gray-700 dark:text-gray-200 text-sm font-medium italic mb-5 z-10 line-clamp-4">
                “
                {fb.comment.length > 160
                  ? fb.comment.slice(0, 160) + "…"
                  : fb.comment}
                ”
              </p>

              {/* Rating & User */}
              <div className="z-10">
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: fb.rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <div className="font-semibold text-green-700 dark:text-green-400 text-sm">
                  {fb.participantName}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {fb.email}
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default FeedbackSection;
