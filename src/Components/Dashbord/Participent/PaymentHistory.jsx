import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ['paymentHistory'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payment-history');
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error fetching payment history.</div>;

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">💳 Payment History</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left bg-white">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Camp Name</th>
              <th className="px-4 py-3">Fees</th>
              <th className="px-4 py-3">Payment Status</th>
              <th className="px-4 py-3">Confirmation</th>
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Paid At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment, index) => (
              <tr key={payment._id} className="hover:bg-blue-50 transition">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{payment.campName || 'N/A'}</td>
                <td className="px-4 py-3">৳ {payment.campFees}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    payment.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    payment.confirmed === true ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {payment.confirmed && 'true'}
                  </span>
                </td>
                <td className="px-4 py-3 text-blue-600 font-mono">{payment.paymentIntentId?.slice(0, 10)}...</td>
                <td className="px-4 py-3 text-gray-600">{new Date(payment.paidAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && (
          <div className="text-center py-6 text-gray-500">No payment history available.</div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
