import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import {
  FaMapMarkerAlt,
  FaUserMd,
  FaCalendarAlt,
  FaMoneyBill,
  FaUsers
} from 'react-icons/fa';
import { Link } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import LoadingEle from '../../Components/Share/LoadingEle';


const PopularCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { data: camps = [], isLoading } = useQuery({
    queryKey: ['popularCamps'],
    queryFn: async () => {
      const res = await axiosSecure.get('/allcamp');
      return res.data;
    }
  });

  const sectionRef = useRef();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  

  
  const topCamps = [...camps]
    .sort((a, b) => b.participantCount - a.participantCount)
    .slice(0, 6);

    if (isLoading)
    return (
      <LoadingEle></LoadingEle>
    );

  return (
    <section
      ref={sectionRef}
      className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 pt-32 pb-16 bg-gradient-to-br from-blue-50 to-white"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-green-800 mb-12">
        Popular Medical Camps
      </h2>

      {/* Timeline container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-green-400 via-blue-500 to-purple-600 rounded-full h-full -translate-x-1/2 shadow-lg"></div>

        {/* Cards */}
        <div className="space-y-12">
          {topCamps.map((camp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={camp._id}
                data-aos={isLeft ? 'fade-right' : 'fade-left'}
                className={`relative w-full md:w-3/4 ${
                  isLeft ? 'md:ml-auto md:pr-10' : 'md:mr-auto md:pl-10'
                }`}
              >
                {/* Circle on the line */}
                <div
                  className={`hidden md:block absolute top-8 ${
                    isLeft ? '-right-6' : '-left-6'
                  } w-5 h-5 rounded-full bg-gradient-to-tr from-green-400 to-purple-600 shadow-lg border-4 border-white`}
                ></div>

                <div
                  className={`flex flex-col md:flex-row items-stretch bg-white rounded-3xl shadow-xl border border-blue-200 hover:shadow-2xl transition-transform duration-300 hover:scale-[1.03] overflow-hidden justify-between`}
                  style={{ minHeight: '180px' }}
                >
                  {/* Image */}
                  <div
                    className={`w-full md:w-68 flex-shrink-0 bg-gray-200 ${
                      isLeft ? 'order-1' : 'order-2'
                    }`}
                  >
                    <img
                      src={camp.image}
                      alt={camp.name}
                      className="w-full h-full object-cover"
                      style={{ minHeight: '180px' }}
                      onError={e => {
                        e.currentTarget.src =
                          'https://via.placeholder.com/192?text=No+Image';
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div
                    className={`p-6 flex flex-col gap-2 ${
                      isLeft
                        ? 'order-2 md:order-2 text-left'
                        : 'order-2 md:order-1 text-right'
                    } flex-1`}
                  >
                    <h3 className="text-2xl font-bold text-green-700 text-start">
                      {camp.name}
                    </h3>

                    <p className="flex items-center gap-2 text-sm text-gray-700">
                      <FaMapMarkerAlt className="text-red-500" /> {camp.location}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gray-700">
                      <FaUserMd className="text-green-600" /> {camp.healthcareProfessional}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gray-700">
                      <FaCalendarAlt className="text-blue-500" />{' '}
                      {new Date(camp.dateTime).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gray-700">
                      <FaMoneyBill className="text-yellow-500" />{' '}
                      {camp.fees === 0 ? 'Free' : `৳${camp.fees}`}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gray-700">
                      <FaUsers className="text-purple-600" />{' '}
                      {camp.participantCount} Participants
                    </p>

                    <Link
                      to={`/camp-details/${camp._id}`}
                      className="mt-4 text-center inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-24">
        <Link
          to="/camps"
          className="mt-4 text-center border-2 border-green-500 bg-white hover:text-white hover:bg-green-700 text-green-600 px-5 py-2 rounded-lg font-semibold transition sm:text-xl"
        >
          See All Camps
        </Link>
      </div>
    </section>
  );
};

export default PopularCamps;
