import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import PayForm from '../../../Payment/PayForm';
import FeedbackButton from './FeedbackButton';
import ModalPayForm from '../../../Payment/PayForm';




const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const RegisteredCamps = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedReg, setSelectedReg] = useState(null);

  const { data: registered = [], isLoading, refetch } = useQuery({
    queryKey: ['registeredCamps', user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered-camps?email=${user.email}`);
      return res.data;
    }
  });

  if (isLoading || loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Registered Camps</h2>
      <table className="min-w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Camp</th>
            <th className="px-4 py-2">Fees</th>
            <th className="px-4 py-2">Participant</th>
            <th className="px-4 py-2">Payment</th>
            <th className="px-4 py-2">Confirmation</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {registered.map((reg) => (
            <tr key={reg._id} className="border-t">
              <td className="px-4 py-2">{reg.campName}</td>
              <td className="px-4 py-2">${reg.campFees}</td>
              <td className="px-4 py-2">{reg.participantName}</td>
              <td className="px-4 py-2">
                {reg.paymentStatus === 'paid' ? (
                  <span className="text-green-600 font-medium">
                    Paid
                  </span>
                ) : (
                  <Elements stripe={stripePromise}>
                    <ModalPayForm reg={reg} refetch={refetch} />
                  </Elements>
                )}
              </td>
              <td className="px-4 py-2 capitalize">{reg.confirmationStatus || 'Pending'}</td>
              <td className="px-4 py-2 space-x-2">
                {reg.paymentStatus !== 'paid' && (
                  <button
                    onClick={async () => {
                      await axiosSecure.delete(`/cancel-registration/${reg._id}`);
                      refetch();
                    }}
                    className="btn-red"
                  >
                    Cancel
                  </button>
                )}
                {reg.paymentStatus === 'paid' && (
                  <FeedbackButton reg={reg} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredCamps;
