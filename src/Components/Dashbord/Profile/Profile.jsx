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
  

  if (isLoading || loading)
    return <LoadingEle></LoadingEle>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 via-lime-50 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl">
        <div className="h-48 bg-gradient-to-r from-green-600 to-lime-500 rounded-t-2xl"></div>
        <div className="flex flex-col items-center -mt-20 px-6 pb-6">
          <img
            src={userData?.image}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg bg-gray-300"
          />
          <p className="mt-2 text-xl font-semibold text-gray-800">{userData?.name}</p>
          <p className="text-sm text-gray-500 mb-2">Role: {userData?.role}</p>

          <div className="w-full bg-gray-100 p-4 rounded-lg mt-4">
            <div className="grid md:grid-cols-2 gap-4 text-gray-700 text-sm">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-black">{userData?.email}</p>
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-black">{userData?.phone || 'Not set'}</p>
              </div>
              <div>
                <p className="font-medium">Account Created</p>
                <p>{new Date(userData?.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-medium">Last Login</p>
                <p>{new Date(userData?.last_loggedIn).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="relative flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-md shadow">
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
