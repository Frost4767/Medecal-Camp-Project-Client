import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaUserMd, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import LoadingEle from '../../Components/Share/LoadingEle';
import useAxios from '../../Hooks/useAxios';
import { Link } from 'react-router';

const PopularCamps = () => {
  const axiosInstance = useAxios();
  const { data: camps = [], isLoading } = useQuery({
    queryKey: ['popularCamps'],
    queryFn: async () => {
      const res = await axiosInstance.get('/allcamp');
      return res.data;
    },
  });

  const topCamps = [...camps]
    .sort((a, b) => b.participantCount - a.participantCount)
    .slice(0, 6);

  if (isLoading) return <LoadingEle />;

  // Motion variants
  const cardVariants = {
    hiddenLeft: { opacity: 0, x: -50 },
    hiddenRight: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 pt-16 pb-16 bg-gradient-to-r from-blue-50 to-blue-50 dark:from-background dark:to-background overflow-x-hidden transition-colors duration-300">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-green-800 dark:text-green-400 mb-12">
        Popular Medical Camps
      </h2>

      <div className="relative max-w-4xl mx-auto">
        <div className="hidden md:block absolute left-1/2 top-0 w-1 bg-gradient-to-b from-green-400 via-blue-500 to-purple-600 rounded-full inset-y-0 -translate-x-1/2 shadow-md z-0" />

        <div className="relative z-10 flex flex-col gap-16">
          {topCamps.map((camp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={camp._id}
                initial={isLeft ? 'hiddenLeft' : 'hiddenRight'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                className={`relative w-full md:w-3/4 ${isLeft ? 'md:ml-auto md:pr-10' : 'md:mr-auto md:pl-10'}`}
              >
                <div
                  className={`hidden md:block absolute top-8 ${
                    isLeft ? '-right-6' : '-left-6'
                  } w-5 h-5 rounded-full bg-gradient-to-tr from-green-400 to-purple-600 shadow-lg border-4 border-white dark:border-gray-800`}
                ></div>

                <div
                  className={`flex flex-col md:flex-row items-stretch bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-blue-200 dark:border-gray-700 hover:shadow-2xl transition-transform duration-300 hover:scale-[1.03] overflow-hidden justify-between`}
                >
                  <div
                    className={`w-full md:w-64 flex-shrink-0 bg-gray-200 dark:bg-gray-700 ${
                      isLeft ? 'order-1' : 'order-2'
                    }`}
                  >
                    <img
                      src={camp.image}
                      alt={camp.name}
                      className="w-full h-full object-cover max-w-full"
                    />
                  </div>

                  <div
                    className={`p-6 flex flex-col gap-2 ${
                      isLeft ? 'order-2 md:order-2 text-left' : 'order-2 md:order-1 text-right'
                    } flex-1`}
                  >
                    <h3 className="text-2xl text-start font-bold text-green-700 dark:text-green-400">
                      {camp.name}
                    </h3>

                    <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                      <FaUserMd className="text-green-600" /> {camp.healthcareProfessional}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                      <FaCalendarAlt className="text-blue-500" />{' '}
                      {new Date(camp.dateTime).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                      <FaUsers className="text-purple-600" /> {camp.participantCount} Participants
                    </p>

                    <p className="text-start text-gray-600 dark:text-gray-400 whitespace-pre-line pt-4">
                      {camp.description}
                    </p>

                    <Link
                      to={`/camp-details/${camp._id}`}
                      className="mt-4 text-center inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-24">
        <Link
          to="/camps"
          className="mt-4 text-center border-2 border-green-500 bg-white dark:bg-gray-700 dark:text-gray-100 hover:text-white hover:bg-green-700 text-green-600 px-5 py-2 rounded-lg font-semibold transition sm:text-xl"
        >
          See All Camps
        </Link>
      </div>
    </section>
  );
};

export default PopularCamps;
