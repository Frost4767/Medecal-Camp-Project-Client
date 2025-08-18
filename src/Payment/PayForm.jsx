// components/ModalPayForm.jsx
import { Fragment, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const ModalPayForm = ({ reg, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const closeModal = () => setIsOpen(false);

  const openModal = async () => {
    setProcessing(true);
    try {
      const res = await axiosSecure.post('/payment-intent', {
        amount: reg.campFees,
        campId: reg.campId,
        participantId: reg._id
      });
      setClientSecret(res.data.clientSecret);
      setCardError('');
      setSuccess('');
      setTransactionId('');
      setIsOpen(true);
    } catch (err) {
      setCardError('❌ Failed to initiate payment.');
    } finally {
      setProcessing(false);
    }
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setCardError('');
    setSuccess('');
    setTransactionId('');

    if (!stripe || !elements) {
      setCardError('❌ Stripe is not loaded.');
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setCardError('❌ Card element not found.');
      setProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card }
    });

    if (error) {
      setCardError(`❌ ${error.message}`);
      setProcessing(false);
      return;
    }

    try {
      const res = await axiosSecure.post('/confirm-payment', {
        paymentIntentId: paymentIntent.id,
        campId: reg.campId,
        participantId: reg._id
      });

      if (res.data?.message === 'Payment confirmed') {
        setSuccess('✅ Payment successful!');
        toast(`Transaction ${paymentIntent.id}`);
        setTransactionId(paymentIntent.id);
        refetch();
      } else {
        setCardError('⚠️ Payment was successful, but DB update failed.');
      }
    } catch (err) {
      setCardError('⚠️ Server error after payment.');
    }

    setProcessing(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm px-8 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
      >
        Pay
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 dark:bg-black/50" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel
                  className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all"
                >
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 mb-4"
                  >
                    Confirm Your Payment
                  </DialogTitle>

                  <form onSubmit={handlePay} className="space-y-3">
                    <div className="border rounded p-3 bg-gray-50 dark:bg-gray-700">
                      <CardElement options={{ style: { base: { color: document.documentElement.classList.contains('dark') ? '#f9fafb' : '#111827', fontSize: '16px' }, invalid: { color: '#dc2626' } } }} />
                    </div>
                    <button
                      disabled={!stripe || processing}
                      type="submit"
                      className={`w-full py-2 rounded-full text-white font-semibold transition-transform transform hover:scale-105 ${
                        processing || !stripe
                          ? 'bg-green-500 opacity-50 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
                      }`}
                    >
                      {processing ? 'Processing...' : 'Confirm Pay'}
                    </button>
                  </form>

                  {cardError && <p className="text-red-500 mt-2">{cardError}</p>}
                  {success && (
                    <p className="text-green-500 mt-2">
                      {success}<br />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Transaction ID: {transactionId}</span>
                    </p>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalPayForm;
