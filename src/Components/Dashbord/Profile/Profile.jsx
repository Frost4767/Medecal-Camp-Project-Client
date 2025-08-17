import { useQuery } from '@tanstack/react-query';
import { FaUserEdit } from 'react-icons/fa';
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 via-lime-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-800 px-4 transition-colors duration-500">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl w-full max-w-3xl transition-colors duration-500">
        <div className="h-48 bg-gradient-to-r from-green-600 to-lime-500 dark:from-green-800 dark:to-green-600 rounded-t-3xl transition-colors duration-500"></div>
        <div className="flex flex-col items-center -mt-20 px-6 pb-6">
          <img
            src={userData?.image}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-700 object-cover shadow-lg bg-gray-300 dark:bg-gray-600 transition-colors duration-500"
          />
          <p className="mt-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            {userData?.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Role: {userData?.role}
          </p>

          <div className="w-full bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4 transition-colors duration-500">
            <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-200 text-sm">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-900 dark:text-gray-100">{userData?.email}</p>
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-900 dark:text-gray-100">
                  {userData?.phone || 'Not set'}
                </p>
              </div>
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-900 dark:text-gray-100">
                  {userData?.address || 'Not set'}
                </p>
              </div>
              <div>
                <p className="font-medium">Last Login</p>
                <p className="text-gray-900 dark:text-gray-100">
                  {new Date(userData?.last_loggedIn).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="relative flex items-center gap-2 bg-secondary hover:bg-green-500 text-white dark:bg-secondary dark:hover:bg-green-800 px-4 py-2 rounded-md shadow transition-colors duration-500">
              <FaUserEdit />
              <ProfileModal userData={userData} refetch={refetch} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
