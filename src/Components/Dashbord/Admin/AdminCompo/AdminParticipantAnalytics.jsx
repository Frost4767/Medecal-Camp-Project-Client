import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { FaHeartbeat, FaTrophy, FaStar, FaUsers } from 'react-icons/fa';

import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import LoadingEle from '@/Components/Share/LoadingEle';

const AdminParticipantAnalytics = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  // Fetch all participants (admin route)
  const { data: participants = [], isLoading } = useQuery({
    queryKey: ['adminParticipantAnalytics'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-participants');
      return res.data;
    },
    enabled: !!user?.email
  });

  // Bar chart: camps vs participant count
  const campMap = {};
  participants.forEach(p => {
    campMap[p.campName] = (campMap[p.campName] || 0) + 1;
  });
  const barChartData = Object.keys(campMap).map(key => ({
    name: key,
    participants: campMap[key]
  }));

  // Pie chart: payment status
  const paidCount = participants.filter(p => p.paymentStatus === 'paid').length;
  const unpaidCount = participants.filter(p => p.paymentStatus !== 'paid').length;
  const pieData = [
    { name: 'Paid', value: paidCount },
    { name: 'Unpaid', value: unpaidCount },
  ];
  const COLORS = ['#16a34a', '#6b7280'];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-green-600 dark:text-secondary">
        📊 Admin Analytics Dashboard
      </h2>

      {isLoading || loading ? (
        <LoadingEle />
      ) : participants.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg text-gray-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
          <p className="text-lg">No participants registered yet.</p>
        </div>
      ) : (
        <>
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { title: "Total Participants", value: participants.length },
              { title: "Paid Participants", value: paidCount },
              { title: "Unpaid Participants", value: unpaidCount },
            ].map((card, idx) => (
              <div key={idx} className="bg-green-50 dark:bg-green-900 text-green-800 dark:text-gray-200 border border-green-200 dark:border-green-700 rounded-xl p-6 shadow-md hover:scale-[1.03] transition-transform duration-300">
                <h4 className="text-2xl font-semibold mb-2">{card.value}</h4>
                <p className="uppercase font-semibold tracking-wide">{card.title}</p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            {/* Bar Chart */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Participants per Camp</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode => darkMode ? "#374151" : "#e5e7eb"} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#16a34a" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#16a34a" }} />
                  <Tooltip />
                  <Bar dataKey="participants" fill="#16a34a" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Payment Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    fill="#16a34a"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Extra Cards */}
          <div className="mt-14">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
              🌱 Admin Insights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <FaHeartbeat className="text-3xl mb-2 text-green-600 dark:text-green-400" />, title: "Motivation", desc: "Encourage participants for better health." },
                { icon: <FaTrophy className="text-3xl mb-2 text-green-600 dark:text-green-400" />, title: "Goal", desc: "Track participant attendance per camp." },
                { icon: <FaStar className="text-3xl mb-2 text-green-600 dark:text-green-400" />, title: "Feedback", desc: "Monitor participant feedback and ratings." },
                { icon: <FaUsers className="text-3xl mb-2 text-green-600 dark:text-green-400" />, title: "Referral", desc: "See participants referrals and incentives." },
              ].map((card, idx) => (
                <div key={idx} className="bg-green-50 dark:bg-green-900 text-green-800 dark:text-gray-200 border border-green-200 dark:border-green-700 rounded-xl p-5 shadow-md hover:scale-[1.03] transition-transform duration-300">
                  <div>{card.icon}</div>
                  <p className="text-sm">{card.title}</p>
                  <h4 className="text-base font-medium mt-1">{card.desc}</h4>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminParticipantAnalytics;
