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
      confirmButtonText: 'Yes, cancel it!',
      background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#f9fafb' : '#111827',
      customClass: {
        confirmButton: 'rounded-md px-4 py-2 hover:scale-105 transition-transform',
        cancelButton: 'rounded-md px-4 py-2 hover:scale-105 transition-transform'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/cancel-registration/${id}`);
          refetch();
          Swal.fire({
            title: 'Cancelled!',
            text: 'The registration has been cancelled.',
            icon: 'success',
            background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#f9fafb' : '#111827',
            confirmButtonColor: '#059669',
            customClass: {
              confirmButton: 'rounded-md px-4 py-2 hover:scale-105 transition-transform'
            }
          });
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to cancel registration.',
            icon: 'error',
            background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#f9fafb' : '#111827',
            confirmButtonColor: '#d33',
            customClass: {
              confirmButton: 'rounded-md px-4 py-2 hover:scale-105 transition-transform'
            }
          });
        }
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

  useEffect(() => setCurrentPage(1), [searchTerm]);

  if (isLoading || loading) return <LoadingEle />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent drop-shadow-md mb-6 text-center">
        🎪 Registered Camps
      </h2>

      {/* Search */}
      <div className="max-w-md mx-auto mb-6 flex">
        <input
          type="text"
          placeholder="Search by camp name, date or participant"
          className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="px-3 py-2 bg-green-600 text-white rounded-r-md flex items-center justify-center dark:bg-green-500">
          <FaSearch />
        </span>
      </div>

      {/* Table */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden dark:bg-gray-900/70 dark:backdrop-blur-md border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse text-sm">
            <thead className="bg-green-600 dark:bg-green-700 text-white">
              <tr>
                <th className="px-6 py-4 font-semibold">Camp</th>
                <th className="px-6 py-4 font-semibold">Fees</th>
                <th className="px-6 py-4 font-semibold">Participant</th>
                <th className="px-6 py-4 font-semibold">Payment</th>
                <th className="px-6 py-4 font-semibold">Confirmation</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {paginatedData.length > 0 ? (
                paginatedData.map((reg) => (
                  <tr key={reg._id} className="hover:bg-green-50 dark:hover:bg-gray-700 transition duration-200">
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200 font-medium">{reg.campName}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300 flex items-center gap-1">
                      <FaMoneyBill className="text-green-600 dark:text-green-400" /> ৳{reg.campFees}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{reg.participantName}</td>
                    <td className="px-6 py-4">
                      {reg.paymentStatus === 'paid' ? (
                        <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                          <FaRegCheckCircle /> Paid
                        </span>
                      ) : (
                        <Elements stripe={stripePromise}>
                          <ModalPayForm reg={reg} refetch={refetch} />
                        </Elements>
                      )}
                    </td>
                    <td className="px-6 py-4 capitalize text-gray-700 dark:text-gray-300">{reg.confirmationStatus || 'Pending'}</td>
                    <td className="px-6 py-4 space-x-2">
                      {reg.paymentStatus !== 'paid' && (
                        <button
                          onClick={() => handleCancel(reg._id)}
                          className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white text-sm px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105 flex items-center gap-1"
                        >
                          <MdCancel /> Cancel
                        </button>
                      )}
                      {reg.paymentStatus === 'paid' && <FeedbackButton reg={reg} />}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-400 text-lg">
                    No registered camps available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-green-600 dark:bg-green-500 text-white rounded disabled:opacity-50 hover:bg-green-700 dark:hover:bg-green-600 transition"
        >
          Prev
        </button>
        <span className="text-sm dark:text-gray-200">
          Page <strong>{currentPage}</strong> of {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1 bg-green-600 dark:bg-green-500 text-white rounded disabled:opacity-50 hover:bg-green-700 dark:hover:bg-green-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RegisteredCamps;
