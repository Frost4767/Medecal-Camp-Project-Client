import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { FaHeartbeat, FaTrophy, FaStar, FaUsers } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingEle from '../../Share/LoadingEle';

const ParticipantAnalytics = () => {
  const axiosSecure= useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: registeredCamps = [], isLoading } = useQuery({
    queryKey: ['participantAnalytics', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered-camps?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  // BarChart Data Formatting
  const barChartData = registeredCamps.map((camp) => ({
    name: camp.campName,
    fees: parseInt(camp.campFees),
  }));

  // PieChart Data Formatting (payment status counts)
  const paidCount = registeredCamps.filter(c => c.paymentStatus === 'paid').length;
  const unpaidCount = registeredCamps.filter(c => c.paymentStatus !== 'paid').length;

  const pieData = [
    { name: 'Paid', value: paidCount },
    { name: 'Unpaid', value: unpaidCount },
  ];
  const COLORS = ['#16a34a', '#6b7280']; // green-600 and gray-500

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-green-600 dark:text-secondary">
        📊 Camp Analytics Dashboard
      </h2>

      {isLoading || loading ? (
        <LoadingEle />
      ) : registeredCamps.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg text-gray-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
          <p className="text-lg">You haven’t registered in any camp yet.</p>
        </div>
      ) : (
        <>
          {/* Info Cards above charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { title: "Total Registered Camps", value: registeredCamps.length },
              { title: "Paid Camps", value: paidCount },
              { title: "Unpaid Camps", value: unpaidCount },
            ].map((card, idx) => (
              <div key={idx} className="bg-green-50 dark:bg-green-900 text-green-800 dark:text-gray-200 border border-green-200 dark:border-green-700 rounded-3xl p-6 shadow-md hover:scale-[1.03] transition-transform duration-300">
                <h4 className="text-2xl font-semibold mb-2">{card.value}</h4>
                <p className="uppercase font-semibold tracking-wide">{card.title}</p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            {/* Bar Chart */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Camp Fees Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode => darkMode ? "#374151" : "#e5e7eb"} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#16a34a" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#16a34a" }} />
                  <Tooltip />
                  <Bar dataKey="fees" fill="#16a34a" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-6">
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

          {/* Extra Static Section */}
          <div className="mt-14">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
              🌱 Stay Informed & Inspired
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <FaHeartbeat className="text-3xl mb-2 text-green-600 dark:text-green-400" />, title: "Motivation", desc: "Your dedication to health inspires others." },
                { icon: <FaTrophy className="text-3xl mb-2 text-green-600 dark:text-green-400" />, title: "Goal", desc: "Attend 10 Camps to unlock a Wellness Badge." },
                { icon: <FaStar className="text-3xl mb-2 text-green-600 dark:text-green-400" />, title: "Feedback", desc: "Share your camp feedback to improve our services." },
                { icon: <FaUsers className="text-3xl mb-2 text-green-600 dark:text-green-400" />, title: "Referral", desc: "Refer a friend and earn discounts on next camp!" },
              ].map((card, idx) => (
                <div key={idx} className="bg-green-50 dark:bg-green-900 text-green-800 dark:text-gray-200 border border-green-200 dark:border-green-700 rounded-3xl p-5 shadow-md hover:scale-[1.03] transition-transform duration-300">
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

export default ParticipantAnalytics;
