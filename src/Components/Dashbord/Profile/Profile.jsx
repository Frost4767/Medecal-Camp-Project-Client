import { useQuery } from '@tanstack/react-query';
import { 
  FaUserEdit, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaRegClock, FaIdBadge, FaStar, FaHeartbeat, FaCalendarAlt, 
  FaUsersCog, FaClipboardList 
} from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import ProfileModal from './ProfileModal';
import LoadingEle from '../../Share/LoadingEle';

const Profile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData, isLoading, refetch } = useQuery({
    queryKey: ['user-profile', user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading || loading) return <LoadingEle />;

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-tr from-background via-background to-background dark:from-background dark:via-background dark:to-background">
      <div className="max-w-5xl mx-auto">
        
        {/* Profile Header */}
        <div className="relative flex flex-col md:flex-row items-center bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 dark:border-gray-700/50">
          {/* Profile Image */}
          <div className="relative w-36 h-36 md:w-40 md:h-40 mx-auto md:mx-0 overflow-hidden rounded-full ring-4 ring-green-400 dark:ring-green-600 shadow-xl">
            <img
              src={userData?.image || '/default-profile.png'}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Details */}
          <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left flex-1">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent drop-shadow-md">
              {userData?.name}
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
              {userData?.role === "admin" ? "Administrator" : "Registered User"}
            </p>

            {/* Update Profile Button */}
            <div className="mt-6 flex justify-center md:justify-start">
              <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-lime-500 hover:from-lime-500 hover:to-green-500 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-green-300/50 dark:hover:shadow-green-900/50 transition-all">
                <FaUserEdit />
                <ProfileModal userData={userData} refetch={refetch} />
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard icon={<FaEnvelope />} title="Email" value={userData?.email} />
          <InfoCard icon={<FaPhone />} title="Phone" value={userData?.phone || 'Not set'} />
          <InfoCard icon={<FaMapMarkerAlt />} title="Address" value={userData?.address || 'Not set'} />
          <InfoCard icon={<FaRegClock />} title="Last Login" value={userData?.last_loggedIn ? new Date(userData.last_loggedIn).toLocaleString() : 'N/A'} />
          <InfoCard icon={<FaIdBadge />} title="Member ID" value={`MCMS-${userData?._id?.slice(-6) || '000000'}`} />
          <InfoCard icon={<FaCalendarAlt />} title="Joined On" value={userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Unknown'} />
        </div>

        {/* Role Based Section */}
        {userData?.role === "user" && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoCard icon={<FaHeartbeat />} title="Health Credits" value={userData?.credits || '50 Free Checkup Credits'} />
            <InfoCard icon={<FaStar />} title="Account Status" value={userData?.status || 'Active'} />
          </div>
        )}

        {userData?.role === "admin" && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoCard icon={<FaUsersCog />} title="Total Users Managed" value="120+" />
            <InfoCard icon={<FaClipboardList />} title="Total Camps Organized" value="35+" />
          </div>
        )}
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div className="group flex items-center gap-4 bg-white/30 dark:bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 hover:scale-[1.04] hover:shadow-xl hover:shadow-green-300/40 dark:hover:shadow-green-900/40 transition-all">
    <div className="text-green-600 dark:text-green-400 text-3xl group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{value}</h3>
    </div>
  </div>
);

export default Profile;
