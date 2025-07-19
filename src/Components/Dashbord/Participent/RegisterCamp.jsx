import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Swal from 'sweetalert2';
import { FaMoneyBill, FaRegCheckCircle, FaSearch } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import ModalPayForm from '../../../Payment/PayForm';
import FeedbackButton from './FeedbackButton';
import LoadingEle from '../../Share/LoadingEle';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const RegisteredCamps = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedReg, setSelectedReg] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { data: registered = [], isLoading, refetch } = useQuery({
    queryKey: ['registeredCamps', user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered-camps?email=${user.email}`);
      return res.data;
    }
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This registration will be cancelled!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#059669',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/cancel-registration/${id}`);
        refetch();
        Swal.fire('Cancelled!', 'The registration has been cancelled.', 'success');
      }
    });
  };

  const filteredData = registered.filter((reg) =>
    reg.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.healthcareProfessional?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(reg.joinedAt).toLocaleDateString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (isLoading || loading) return <LoadingEle></LoadingEle>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
        🎪 Registered Camps
      </h2>

      <div className="max-w-md mx-auto mb-6 flex">
              <input
                type="text"
                placeholder="Search by camp name, date or participant"
                className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="px-3 py-2 bg-green-600 text-white rounded-r-md">
                <FaSearch />
              </span>
        </div>

      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse text-sm">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-4 font-semibold">Camp</th>
                <th className="px-6 py-4 font-semibold">Fees</th>
                <th className="px-6 py-4 font-semibold">Participant</th>
                <th className="px-6 py-4 font-semibold">Payment</th>
                <th className="px-6 py-4 font-semibold">Confirmation</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.map((reg) => (
                <tr key={reg._id} className="hover:bg-green-50 transition duration-200">
                  <td className="px-6 py-4 text-gray-800 font-medium">{reg.campName}</td>
                  <td className="px-6 py-4 text-gray-700 flex items-center gap-1">
                    <FaMoneyBill className="text-green-600" /> ৳{reg.campFees}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{reg.participantName}</td>
                  <td className="px-6 py-4">
                    {reg.paymentStatus === 'paid' ? (
                      <span className="text-green-600 font-semibold flex items-center gap-1">
                        <FaRegCheckCircle /> Paid
                      </span>
                    ) : (
                      <Elements stripe={stripePromise}>
                        <ModalPayForm reg={reg} refetch={refetch} />
                      </Elements>
                    )}
                  </td>
                  <td className="px-6 py-4 capitalize text-gray-700">
                    {reg.confirmationStatus || 'Pending'}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    {reg.paymentStatus !== 'paid' && (
                      <button
                        onClick={() => handleCancel(reg._id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105 flex items-center gap-1"
                      >
                        <MdCancel /> Cancel
                      </button>
                    )}
                    {reg.paymentStatus === 'paid' && <FeedbackButton reg={reg} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedData.length === 0 && (
          <div className="text-center py-6 text-gray-500 text-lg">
            No registered camps available.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page <strong>{currentPage}</strong> of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RegisteredCamps;
