import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaSearch } from 'react-icons/fa';

const ManageRegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: participants = [], isLoading, refetch } = useQuery({
    queryKey: ['all-participants'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-participants');
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this registration!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#059669',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/cancel-camp/${id}`);
        refetch();
        Swal.fire('Cancelled!', 'Registration has been cancelled.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Failed to cancel registration.', 'error');
      }
    }
  };

  // Filtered data based on search
  const filtered = useMemo(() => {
    return participants.filter((p) =>
      [p.campName, p.date, p.healthcareProfessional, p.participantName]
        .some(field =>
          field?.toLowerCase().includes(searchText.toLowerCase())
        )
    );
  }, [searchText, participants]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <p className="text-center py-6">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
        👥 Manage Registered Camps
      </h2>

      {/* Search */}
      <div className="max-w-md mx-auto mb-6 flex">
        <input
          type="text"
          placeholder="Search by camp name, date or participant"
          className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-600"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
        />
        <span className="px-3 py-2 bg-green-600 text-white rounded-r-md">
          <FaSearch />
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-600 text-white text-sm">
            <tr>
              <th className="p-4 text-left">Camp Name</th>
              <th className="p-4 text-left">Fees</th>
              <th className="p-4 text-left">Participant</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Confirmation</th>
              <th className="p-4 text-left">Cancel</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 text-sm">
            {paginatedData.map((p) => (
              <tr key={p._id} className="hover:bg-green-50 transition duration-200">
                <td className="p-4">{p.campName}</td>
                <td className="p-4">৳{p.campFees}</td>
                <td className="p-4">{p.participantName}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-white font-semibold text-xs ${
                    p.paymentStatus === 'paid' ? 'bg-green-600' : 'bg-yellow-500'
                  }`}>
                    {p.paymentStatus}
                  </span>
                </td>
                <td className="p-4 capitalize">
                  {p.confirmationStatus || 'Pending'}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleCancel(p._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-full text-xs shadow hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
                    disabled={p.paymentStatus === 'paid' && p.confirmationStatus === 'confirmed'}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-6 text-gray-500 text-sm">
            No participants found.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-green-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageRegisteredCamps;
