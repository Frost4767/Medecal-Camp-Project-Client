import { Fragment, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AiFillCheckCircle } from "react-icons/ai";
import { toast } from 'react-toastify';

const FeedbackButton = ({ reg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const axiosSecure = useAxiosSecure();

  const { data: feedback, isLoading, refetch } = useQuery({
    queryKey: ['feedback', reg._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/chkfeedback?participantId=${reg._id}`);
      return res.data;
    },
    enabled: !!reg?._id,
  });

  const closeModal = () => {
    setIsOpen(false);
    setRating(5);
    setComment('');
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    await axiosSecure.post('/feedback', {
      participantId: reg._id,
      rating,
      comment,
      camp: reg.campName,
      participantName: reg.participantName
    });
    toast("Your feedback submitted");
    closeModal();
    refetch();
  };

  if (isLoading) return <p>' '</p>;

  return (
    <>
      {feedback ? (
        <div className='flex justify-center'>
          <AiFillCheckCircle size={24} className="text-green-600 dark:text-green-400" />
        </div>
      ) : (
        <button
          onClick={openModal}
          className="bg-secondary dark:bg-secondary hover:bg-green-700 dark:hover:bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
        >
          Feedback
        </button>
      )}

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
            <div className="fixed inset-0 bg-black/30" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Rate This Camp
                  </DialogTitle>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Rating (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(+e.target.value)}
                      className="input input-bordered w-full mt-1 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Comment</label>
                    <textarea
                      className="textarea textarea-bordered w-full mt-1 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                      placeholder="Your comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      className="px-2 py-1 rounded-sm border-1 cursor-pointer  hover:text-black  border-red-500 text-red-400"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-2 py-1 rounded-sm cursor-pointer bg-secondary hover:bg-green-500  dark:bg-green-400  dark:text-white"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FeedbackButton;
