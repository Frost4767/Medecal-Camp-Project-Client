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
import useAuth from '../../../Hooks/useAuth';

const ProfileModal = ({ userData, refetch }) => {
  const { updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    phone: '',
    address: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const IMAGEBB_API_KEY = import.meta.env.VITE_image_upload_key; 

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        image: userData.image || '',
        phone: userData.phone || '',
        address: userData.address || '',
      });
    }
  }, [userData]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const uploadImageToImageBB = async () => {
    if (!imageFile) return formData.image; 
    setUploading(true);
    const form = new FormData();
    form.append('image', imageFile);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`, {
      method: 'POST',
      body: form,
    });

    const data = await res.json();
    setUploading(false);

    if (data.success) return data.data.url;
    else throw new Error('Image upload failed');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImageToImageBB(); // client-side upload
      const res = await axiosSecure.patch(`/user/${userData.email}`, { ...formData, image: imageUrl });
      updateUserProfile({ photoURL: imageUrl });
      if (res.data.modifiedCount > 0) {
        Swal.fire('Success', 'Profile updated successfully!', 'success');
        closeModal();
        refetch();
      }
    } catch (err) {
      Swal.fire('Error', err.message || 'Update failed', 'error');
    }
  };

  return (
    <>
      <span onClick={openModal} className="cursor-pointer text-white dark:text-primary">
        Update Profile
      </span>

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
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-colors duration-300">
                  <DialogTitle className="text-lg font-medium text-secondary mb-4">
                    Update Profile
                  </DialogTitle>

                  <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-lime-500 focus:border-lime-500 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-gray-900 dark:text-gray-100"
                      />
                      {uploading && <p className="text-sm text-green-600 mt-1">Uploading...</p>}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-lime-500 focus:border-lime-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-lime-500 focus:border-lime-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email (read-only)</label>
                      <input
                        type="email"
                        value={userData.email}
                        disabled
                        className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 shadow-sm transition-colors"
                      />
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-md transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-secondary dark:bg-secondary hover:bg-lime-700 dark:hover:bg-lime-600 text-white px-4 py-2 rounded-md transition-colors"
                        disabled={uploading}
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
