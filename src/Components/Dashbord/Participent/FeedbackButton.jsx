import { Fragment, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const FeedbackButton = ({ reg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const axiosSecure = useAxiosSecure();


  const { data: feedback, isPending, isLoading,refetch } = useQuery({
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
      participantName: reg.participantName
    });
    
    closeModal();
    refetch();
    
  };
  if(isLoading) return <p>' '</p>

  return (
    <>
      {
        feedback? '✅': <button onClick={openModal} className="btn-blue">Feedback</button>
      }

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
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Rate This Camp
                  </DialogTitle>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(+e.target.value)}
                      className="input input-bordered w-full mt-1"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Comment</label>
                    <textarea
                      className="textarea textarea-bordered w-full mt-1"
                      placeholder="Your comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      className="btn btn-outline btn-error"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
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