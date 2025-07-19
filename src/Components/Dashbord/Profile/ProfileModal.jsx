import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ProfileModal = ({ userData, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    phone: '',
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        image: userData.image || '',
        phone: userData.phone || '',
      });
    }
  }, [userData]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(`/user/${userData.email}`, formData);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Success', 'Profile updated successfully!', 'success');
        closeModal();
        refetch();
      }
    } catch (err) {
      Swal.fire('Error', 'Update failed', 'error');
    }
  };

  return (
    <>
      {/* Modal trigger (inside button) */}
      <span onClick={openModal} className="cursor-pointer">
        Update Profile
      </span>

      {/* Modal itself */}
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
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <DialogTitle className="text-lg font-medium text-gray-900 mb-4">
                    Update Profile
                  </DialogTitle>

                  <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-lime-500 focus:border-lime-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Image URL</label>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-lime-500 focus:border-lime-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-lime-500 focus:border-lime-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email (read-only)</label>
                      <input
                        type="email"
                        value={userData.email}
                        disabled
                        className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm"
                      />
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-md"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProfileModal;
