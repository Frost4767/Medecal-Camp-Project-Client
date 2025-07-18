import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageRegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [loadingId, setLoadingId] = useState(null);

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
  if(isLoading) return <p>Loading...</p>

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Registered Camps</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Camp Name</th>
            <th className="p-2 border">Fees</th>
            <th className="p-2 border">Participant</th>
            <th className="p-2 border">Payment</th>
            <th className="p-2 border">Confirmation</th>
            <th className="p-2 border">Cancel</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <tr key={p._id} className="text-center">
              <td className="p-2 border">{p.campName}</td>
              <td className="p-2 border">{p.campFees} BDT</td>
              <td className="p-2 border">{p.participantName}</td>
              <td className="p-2 border">
                <span className={`px-2 py-1 rounded-full text-white text-sm ${p.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                  {p.paymentStatus || 'unpaid'}
                </span>
              </td>
              <td className="p-2 border">
                {p.confirmationStatus === 'confirmed' ? (
                  <span className="text-green-600 font-semibold">Confirmed</span>
                ) : (
                  <button
                    className="btn btn-sm btn-info"
                    disabled={loadingId === p._id}
                  >
                    {loadingId === p._id ? 'Updating...' : 'Pending'}
                  </button>
                )}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleCancel(p._id)}
                  className="btn btn-sm btn-error disabled:cursor-not-allowed cursor-pointer"
                  disabled={p.paymentStatus === 'paid' && p.confirmationStatus === 'confirmed'}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {participants.length === 0 && (
          <div className="text-center py-6 text-gray-500">No participant available.</div>
        )}
    </div>
  );
};

export default ManageRegisteredCamps;