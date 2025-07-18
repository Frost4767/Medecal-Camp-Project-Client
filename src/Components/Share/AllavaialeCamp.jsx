import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserMd,
  FaUsers
} from 'react-icons/fa';
import { Link } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const AvailableCamps = () => {
  const [layout, setLayout] = useState('grid-cols-1 md:grid-cols-2 lg:grid-cols-3');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const axiosSecure = useAxiosSecure();

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ['allCamps'],
    queryFn: async () => {
      const res = await axiosSecure('/allcamp');
      return res.data;
    }
  });

  const filterAndSortCamps = () => {
    let filtered = [...camps];
    if (sortBy === 'most-registered') {
      filtered.sort((a, b) => b.participantCount - a.participantCount);
    } else if (sortBy === 'fees') {
      filtered.sort((a, b) => a.fees - b.fees);
    } else if (sortBy === 'alphabetical') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    return filtered.filter(camp =>
      camp.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filtered = filterAndSortCamps();

  if (isLoading) return <p className="text-center py-10 text-lg font-semibold">Loading...</p>;

  return (
    <section className="px-4 sm:px-6 lg:px-12 2xl:px-36 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-10">
        💉 Explore Available Medical Camps
      </h2>

      {/* Search + Sort + Layout */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by camp name..."
          className="border border-green-300 focus:ring-2 focus:ring-green-400 rounded px-4 py-2 w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-green-300 focus:ring-2 focus:ring-green-400 rounded px-4 py-2 w-full md:w-1/4"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="most-registered">Most Registered</option>
          <option value="fees">Camp Fees</option>
          <option value="alphabetical">Alphabetical (A-Z)</option>
        </select>

        <button
          onClick={() =>
            setLayout(prev =>
              prev === 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            )
          }
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow-md"
        >
          Toggle Layout
        </button>
      </div>

      {/* Cards */}
      <div className={`grid gap-8 ${layout}`}>
        {filtered.map(camp => {
          const dateObj = new Date(camp.dateTime);
          const formattedDate = dateObj.toLocaleDateString();
          const formattedTime = dateObj.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });

          return (
            <div
              key={camp._id}
              className="group relative flex flex-col rounded-2xl bg-white shadow-md hover:shadow-xl transition overflow-hidden border border-blue-100"
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] overflow-hidden">
                <img
                  src={camp.image}
                  alt={camp.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Badge */}
              <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
                {camp.fees === 0 ? 'Free' : `৳${camp.fees}`}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-2 flex-grow">
                <h3 className="text-xl font-bold text-green-700 line-clamp-1">{camp.name}</h3>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCalendarAlt className="text-purple-600" />
                  {formattedDate} at {formattedTime}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <FaMapMarkerAlt className="text-red-500" /> {camp.location}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <FaUserMd className="text-blue-500" /> {camp.healthcareProfessional}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <FaUsers className="text-yellow-600" /> Participants: {camp.participantCount}
                </p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                  {camp.description}
                </p>
                <div className="mt-auto pt-3">
                  <Link
                    to={`/camp-details/${camp._id}`}
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AvailableCamps;
