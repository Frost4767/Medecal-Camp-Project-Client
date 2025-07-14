import { useState, Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from '@headlessui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import useAuth from '../../Hooks/useAuth';

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserMd,
  FaUsers,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaVenusMars,
  FaUser,
  FaEnvelope,
  FaExclamationTriangle
} from 'react-icons/fa';

const CampDetails = () => {
  const { campId } = useParams();
  const axiosInstance = useAxios();
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    phone: '',
    gender: '',
    emergencyContact: ''
  });

  const { data: camp, isLoading, isError } = useQuery({
    queryKey: ['camp', campId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/camp/${campId}`);
      return res.data;
    }
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post('/participants', data);
    },
    onSuccess: async () => {
      await axiosInstance.patch(`/camp/${campId}/increment-participant`);
      queryClient.invalidateQueries({ queryKey: ['camp', campId] });
      setIsOpen(false);
    }
  });

  if (isLoading || loading)
    return <p className="text-center py-10">Loading...</p>;
  if (isError)
    return <p className="text-center py-10 text-red-600">Failed to load camp details.</p>;

  const dateObj = new Date(camp.dateTime);
  const formattedDate = dateObj.toLocaleDateString();
  const formattedTime = dateObj.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const participantData = {
      campId,
      campName: camp.name,
      campFees: camp.fees,
      location: camp.location,
      healthcareProfessional: camp.healthcareProfessional,
      participantName: user?.displayName,
      participantEmail: user?.email,
      age: formData.age,
      phone: formData.phone,
      gender: formData.gender,
      emergencyContact: formData.emergencyContact
    };
    mutation.mutate(participantData);
  };

  return (
    <section className="mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Image */}
        <div>
          <img
            src={camp.image}
            alt={camp.name}
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Right Info */}
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-5">
          <h1 className="text-4xl font-bold text-green-800 mb-3">{camp.name}</h1>
          <div className="space-y-3 text-gray-700">
            <p className="flex items-center gap-3">
              <FaMoneyBillWave className="text-green-600" />
              <strong>Camp Fees:</strong> {camp.fees === 0 ? 'Free' : `৳${camp.fees}`}
            </p>
            <p className="flex items-center gap-3">
              <FaCalendarAlt className="text-purple-600" />
              <strong>Date & Time:</strong> {formattedDate} at {formattedTime}
            </p>
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-500" />
              <strong>Location:</strong> {camp.location}
            </p>
            <p className="flex items-center gap-3">
              <FaUserMd className="text-blue-600" />
              <strong>Healthcare Professional:</strong> {camp.healthcareProfessional}
            </p>
            <p className="flex items-center gap-3">
              <FaUsers className="text-yellow-600" />
              <strong>Participants:</strong> {camp.participantCount}
            </p>
          </div>
          <p className="text-gray-600 whitespace-pre-line pt-4">{camp.description}</p>

          <button
            onClick={openModal}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
          >
            Join Camp
          </button>
        </div>
      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto " onClose={closeModal}>
          <div className="min-h-screen px-4 text-center bg-black/40 flex flex-col justify-center items-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="inline-block w-full max-w-3xl p-8 my-20 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <DialogTitle
                  as="h3"
                  className="text-2xl font-semibold text-gray-900 mb-6"
                >
                  📝 Join Camp Registration
                </DialogTitle>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <input readOnly value={camp.name} className="input-readonly" placeholder="Camp Name" />
                  <input readOnly value={camp.fees === 0 ? 'Free' : `৳${camp.fees}`} className="input-readonly" placeholder="Camp Fees" />
                  <input readOnly value={camp.location} className="input-readonly" placeholder="Location" />
                  <input readOnly value={camp.healthcareProfessional} className="input-readonly" placeholder="Healthcare Professional" />
                  <input readOnly value={user?.displayName} className="input-readonly" placeholder="Participant Name" />
                  <input readOnly value={user?.email} className="input-readonly" placeholder="Participant Email" />

                  <input name="age" type="number" required min={0} onChange={handleChange} value={formData.age} placeholder="Age" className="input-field border-2 rounded-sm border-green-200" />
                  <input name="phone" type="tel" required onChange={handleChange} value={formData.phone} placeholder="Phone Number" className="input-field border-2 rounded-sm border-green-200" />
                  <select name="gender" required onChange={handleChange} value={formData.gender} className="input-field border-2 rounded-sm border-green-200">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <input name="emergencyContact" type="tel" required onChange={handleChange} value={formData.emergencyContact} placeholder="Emergency Contact" className="input-field border-2 rounded-sm border-green-200" />

                  <div className="col-span-full flex justify-end gap-4">
                    <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
                      Cancel
                    </button>
                    <button type="submit" disabled={mutation.isLoading} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50">
                      {mutation.isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </form>

                {mutation.isError && (
                  <p className="mt-4 text-red-600 flex items-center gap-2">
                    <FaExclamationTriangle /> Error submitting form. Please try again.
                  </p>
                )}
                {mutation.isSuccess && (
                  <p className="mt-4 text-green-600">Successfully registered!</p>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};

export default CampDetails;
