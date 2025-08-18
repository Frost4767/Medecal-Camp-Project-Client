import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { FaHeartbeat, FaTrophy, FaStar, FaUsers, FaMoneyBillWave, FaClinicMedical, FaCalendarCheck, FaRegSmile } from 'react-icons/fa';

// Static Data for Demo (Added Health Camp D & E)
const participants = [
  { name: "John Doe", campName: "Health Camp A", paymentStatus: "paid", date: "2025-08-01", rating: 4 },
  { name: "Jane Smith", campName: "Health Camp B", paymentStatus: "unpaid", date: "2025-08-02", rating: 3 },
  { name: "Alice Johnson", campName: "Health Camp A", paymentStatus: "paid", date: "2025-08-03", rating: 5 },
  { name: "Bob Lee", campName: "Health Camp C", paymentStatus: "paid", date: "2025-08-04", rating: 4 },
  { name: "Charlie Kim", campName: "Health Camp B", paymentStatus: "unpaid", date: "2025-08-05", rating: 3 },
  { name: "Diana Ross", campName: "Health Camp C", paymentStatus: "paid", date: "2025-08-06", rating: 5 },
  { name: "Ethan Hunt", campName: "Health Camp A", paymentStatus: "paid", date: "2025-08-07", rating: 4 },
  { name: "Fiona Gallagher", campName: "Health Camp B", paymentStatus: "paid", date: "2025-08-08", rating: 5 },
  { name: "George Martin", campName: "Health Camp C", paymentStatus: "unpaid", date: "2025-08-09", rating: 2 },
  { name: "Hannah Lee", campName: "Health Camp D", paymentStatus: "paid", date: "2025-08-10", rating: 5 },
  { name: "Ian Brown", campName: "Health Camp E", paymentStatus: "unpaid", date: "2025-08-11", rating: 3 },
  { name: "Jack White", campName: "Health Camp D", paymentStatus: "paid", date: "2025-08-12", rating: 4 },
  { name: "Karen Black", campName: "Health Camp E", paymentStatus: "paid", date: "2025-08-13", rating: 5 },
];

// Generate charts data
const totalParticipants = participants.length;
const paidParticipants = participants.filter(p => p.paymentStatus === 'paid').length;
const unpaidParticipants = totalParticipants - paidParticipants;
const upcomingCamps = 5; // Static

// Participants per Camp
const campMap = {};
participants.forEach(p => {
  if (!campMap[p.campName]) campMap[p.campName] = { paid: 0, unpaid: 0 };
  if (p.paymentStatus === 'paid') campMap[p.campName].paid += 1;
  else campMap[p.campName].unpaid += 1;
});

const barChartData = Object.keys(campMap).map(campName => ({
  name: campName,
  Paid: campMap[campName].paid,
  Unpaid: campMap[campName].unpaid,
  Total: campMap[campName].paid + campMap[campName].unpaid,
}));

const pieData = [
  { name: 'Paid', value: paidParticipants },
  { name: 'Unpaid', value: unpaidParticipants },
];

const radarData = [
  { metric: 'Health Awareness', value: 80 },
  { metric: 'Participant Satisfaction', value: 90 },
  { metric: 'Feedback Score', value: 75 },
  { metric: 'Referral Efficiency', value: 60 },
  { metric: 'Camp Attendance', value: 85 },
];

const lineData = [
  { date: "2025-08-01", participants: 5 },
  { date: "2025-08-02", participants: 8 },
  { date: "2025-08-03", participants: 12 },
  { date: "2025-08-04", participants: 7 },
  { date: "2025-08-05", participants: 10 },
  { date: "2025-08-06", participants: 15 },
  { date: "2025-08-07", participants: 9 },
  { date: "2025-08-08", participants: 14 },
];

const areaData = [
  { date: "2025-08-01", revenue: 200 },
  { date: "2025-08-02", revenue: 400 },
  { date: "2025-08-03", revenue: 600 },
  { date: "2025-08-04", revenue: 350 },
  { date: "2025-08-05", revenue: 500 },
  { date: "2025-08-06", revenue: 700 },
  { date: "2025-08-07", revenue: 450 },
  { date: "2025-08-08", revenue: 650 },
];

const AdminParticipantAnalytics = () => {
  const recentParticipants = participants.slice(-5).reverse();
  const COLORS = ['#16a34a', '#ef4444'];

  return (
    <div className="w-full min-h-screen p-6 bg-gradient-to-br from-background to-background dark:from-background dark:to-background">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent drop-shadow-md">
        🏥 Admin Dashboard Analytics
      </h1>

      {/* Top Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { icon: <FaUsers className="text-4xl text-green-600 dark:text-green-300" />, title: "Total Participants", value: totalParticipants },
          { icon: <FaMoneyBillWave className="text-4xl text-green-600 dark:text-green-300" />, title: "Paid Participants", value: paidParticipants },
          { icon: <FaRegSmile className="text-4xl text-green-600 dark:text-green-300" />, title: "Unpaid Participants", value: unpaidParticipants },
          { icon: <FaCalendarCheck className="text-4xl text-green-600 dark:text-green-300" />, title: "Upcoming Camps", value: upcomingCamps },
        ].map((card, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300 border border-green-200 dark:border-green-700">
            <div>{card.icon}</div>
            <h2 className="text-2xl font-bold mt-2">{card.value}</h2>
            <p className="uppercase text-sm font-medium text-gray-500 dark:text-gray-300 mt-1">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Participants per Camp</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#16a34a" }} />
              <YAxis tick={{ fontSize: 12, fill: "#16a34a" }} />
              <Tooltip />
              <Bar dataKey="Paid" fill="#16a34a" radius={[5, 5, 0, 0]} />
              <Bar dataKey="Unpaid" fill="#ef4444" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Payment Status Distribution</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
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

      {/* Radar + Line + Area Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
        {/* Radar Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Camp Performance Radar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Performance" dataKey="value" stroke="#16a34a" fill="#16a34a" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Participants Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="participants" stroke="#16a34a" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Revenue Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#16a34a" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights Section */}
      <div className="mt-14">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          🌟 Admin Insights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[ 
            { icon: <FaHeartbeat className="text-3xl mb-2 text-green-600 dark:text-green-400" />, title: "Motivation", desc: "Encourage participants for better health." },
            { icon: <FaTrophy className="text-3xl mb-2 text-green-600 dark:text-green-400" />, title: "Goal", desc: "Track participant attendance per camp." },
            { icon: <FaStar className="text-3xl mb-2 text-green-600 dark:text-green-400" />, title: "Feedback", desc: "Monitor participant feedback and ratings." },
            { icon: <FaClinicMedical className="text-3xl mb-2 text-green-600 dark:text-green-400" />, title: "Referral", desc: "See participant referrals and incentives." },
          ].map((card, idx) => (
            <div key={idx} className="bg-green-50 dark:bg-green-900 text-green-800 dark:text-gray-200 border border-green-200 dark:border-green-700 rounded-3xl p-5 shadow-md hover:scale-[1.03] transition-transform duration-300">
              <div>{card.icon}</div>
              <p className="text-sm font-semibold">{card.title}</p>
              <h4 className="text-base font-medium mt-1">{card.desc}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Registrations Table */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6 mb-12">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Recent Registrations</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-2 px-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Name</th>
              <th className="py-2 px-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Camp</th>
              <th className="py-2 px-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Payment Status</th>
              <th className="py-2 px-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentParticipants.map((p, idx) => (
              <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2 px-3 text-gray-700 dark:text-gray-200">{p.name}</td>
                <td className="py-2 px-3 text-gray-700 dark:text-gray-200">{p.campName}</td>
                <td className={`py-2 px-3 font-semibold ${p.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-500'}`}>
                  {p.paymentStatus.toUpperCase()}
                </td>
                <td className="py-2 px-3 text-gray-700 dark:text-gray-200">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminParticipantAnalytics;
