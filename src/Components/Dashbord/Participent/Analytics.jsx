import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { FaHeartbeat, FaTrophy, FaStar, FaUsers } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ParticipantAnalytics = () => {
  const axiosSecure= useAxiosSecure();
  const { user } = useAuth();

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
      <h2 className="text-3xl font-bold text-center mb-8 text-green-600">
        📊 Camp Analytics Dashboard
      </h2>

      {isLoading ? (
        <div className="text-center text-gray-500">Loading data...</div>
      ) : registeredCamps.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg text-gray-500 bg-gray-50">
          <p className="text-lg">You haven’t registered in any camp yet.</p>
        </div>
      ) : (
        <>
          {/* Info Cards above charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-green-50 text-green-800 border border-green-200 rounded-xl p-6 shadow-md hover:scale-[1.03] transition-transform duration-300">
              <h4 className="text-2xl font-semibold mb-2">{registeredCamps.length}</h4>
              <p className="uppercase font-semibold tracking-wide">Total Registered Camps</p>
            </div>
            <div className="bg-green-50 text-green-800 border border-green-200 rounded-xl p-6 shadow-md hover:scale-[1.03] transition-transform duration-300">
              <h4 className="text-2xl font-semibold mb-2">{paidCount}</h4>
              <p className="uppercase font-semibold tracking-wide">Paid Camps</p>
            </div>
            <div className="bg-green-50 text-green-800 border border-green-200 rounded-xl p-6 shadow-md hover:scale-[1.03] transition-transform duration-300">
              <h4 className="text-2xl font-semibold mb-2">{unpaidCount}</h4>
              <p className="uppercase font-semibold tracking-wide">Unpaid Camps</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

            {/* Bar Chart */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Camp Fees Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="fees" fill="#16a34a" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Payment Status Distribution</h3>
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
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              🌱 Stay Informed & Inspired
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-green-50 text-green-800 border border-green-200 rounded-xl p-5 shadow-md hover:scale-[1.03] transition-transform duration-300">
                <div className="text-3xl mb-2 text-green-600">
                  <FaHeartbeat />
                </div>
                <p className="text-sm">Motivation</p>
                <h4 className="text-base font-medium mt-1">
                  Your dedication to health inspires others.
                </h4>
              </div>

              <div className="bg-green-50 text-green-800 border border-green-200 rounded-xl p-5 shadow-md hover:scale-[1.03] transition-transform duration-300">
                <div className="text-3xl mb-2 text-green-600">
                  <FaTrophy />
                </div>
                <p className="text-sm">Goal</p>
                <h4 className="text-base font-medium mt-1">
                  Attend 10 Camps to unlock a Wellness Badge.
                </h4>
              </div>

              <div className="bg-green-50 text-green-800 border border-green-200 rounded-xl p-5 shadow-md hover:scale-[1.03] transition-transform duration-300">
                <div className="text-3xl mb-2 text-green-600">
                  <FaStar />
                </div>
                <p className="text-sm">Feedback</p>
                <h4 className="text-base font-medium mt-1">
                  Share your camp feedback to improve our services.
                </h4>
              </div>

              <div className="bg-green-50 text-green-800 border border-green-200 rounded-xl p-5 shadow-md hover:scale-[1.03] transition-transform duration-300">
                <div className="text-3xl mb-2 text-green-600">
                  <FaUsers />
                </div>
                <p className="text-sm">Referral</p>
                <h4 className="text-base font-medium mt-1">
                  Refer a friend and earn discounts on next camp!
                </h4>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ParticipantAnalytics;
