import { useEffect, useState, Fragment } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import LoadingEle from '../../../Share/LoadingEle';

const ManageCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ['myCampss'],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/mycamps?email=${user?.email}`);
      return res.data;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedCamp) => {
      const res = await axiosSecure.patch(`/update-camp/${updatedCamp._id}`, updatedCamp);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myCampss']);
      toast.success('Update successfully');
      setIsUpdateOpen(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/delete-camp/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myCampss']);
      toast.success('Delete successfully');
      setIsDeleteOpen(false);
    }
  });

  const openUpdateModal = (camp) => {
    setSelectedCamp(camp);
    setIsUpdateOpen(true);
    Object.entries(camp).forEach(([key, value]) => setValue(key, value));
  };

  const openDeleteModal = (camp) => {
    setSelectedCamp(camp);
    setIsDeleteOpen(true);
  };

  const onUpdateSubmit = (data) => {
    data._id = selectedCamp._id;
    updateMutation.mutate(data);
  };

  // Pagination & Search
  const filteredCamps = camps.filter((camp) =>
    camp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);
  const paginatedCamps = filteredCamps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [filteredCamps, currentPage, totalPages]);

  if (isLoading || loading) return <LoadingEle />;

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent drop-shadow-md">🌿 Manage Your Camps</h2>

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
      <div className="overflow-x-auto rounded-2xl backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-green-100 dark:border-gray-700">
        <table className="min-w-full text-sm text-left dark:text-gray-200">
          <thead className="bg-green-600 dark:bg-green-700 text-white text-sm">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Doctor</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCamps.map((camp) => (
              <tr key={camp._id} className="border-t hover:bg-green-50 dark:hover:bg-gray-700 transition-all duration-300">
                <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">{camp.name}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {new Date(camp.dateTime).toLocaleDateString()}{" "}
                  {new Date(camp.dateTime).toLocaleTimeString([], {
                    hour: '2-digit', minute: '2-digit', hour12: true
                  })}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{camp.location}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{camp.healthcareProfessional}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => openUpdateModal(camp)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-700 dark:text-blue-200 text-xs font-semibold transition"
                  >
                    <FaEdit className="text-sm" /> Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(camp)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 text-red-700 dark:text-red-200 text-xs font-semibold transition"
                  >
                    <FaTrash className="text-sm" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedCamps.length === 0 && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">No camps found.</div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center space-x-2">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)}
            className={`w-8 h-8 rounded-full text-sm font-semibold transition ${
              currentPage === page + 1
                ? 'bg-green-600 text-white dark:bg-green-500'
                : 'bg-green-100 text-green-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-green-200 dark:hover:bg-green-600'
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>

      {/* Update Modal */}
      <Transition appear show={isUpdateOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsUpdateOpen(false)}>
          <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </TransitionChild>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl p-8 text-left align-middle transition-all border border-green-200 dark:border-gray-700">
                  <DialogTitle className="text-2xl font-extrabold mb-6 text-green-700 dark:text-green-400">✏️ Update Camp</DialogTitle>
                  <form onSubmit={handleSubmit(onUpdateSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input {...register("name", { required: true })} className="fancy-input dark:bg-gray-700 dark:text-gray-200" placeholder="Camp Name" />
                    <input type="file" disabled className="fancy-input bg-gray-100 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300" />
                    <input type="number" {...register("fees", { required: true })} className="fancy-input dark:bg-gray-700 dark:text-gray-200" placeholder="Fees" />
                    <input type="datetime-local" {...register("dateTime", { required: true })} className="fancy-input dark:bg-gray-700 dark:text-gray-200" />
                    <input {...register("location", { required: true })} className="fancy-input dark:bg-gray-700 dark:text-gray-200" placeholder="Location" />
                    <input {...register("healthcareProfessional", { required: true })} className="fancy-input dark:bg-gray-700 dark:text-gray-200" placeholder="Doctor Name" />
                    <textarea {...register("description", { required: true })} className="fancy-input md:col-span-2 h-24 resize-none dark:bg-gray-700 dark:text-gray-200" placeholder="Description" />
                    <button type="submit" className="md:col-span-2 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white py-2 px-6 rounded-full hover:shadow-lg transition">✅ Save Changes</button>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Modal */}
      <Transition appear show={isDeleteOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsDeleteOpen(false)}>
          <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </TransitionChild>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-red-200 dark:border-red-700 p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle className="text-xl font-bold text-red-700 dark:text-red-500 mb-4">⚠️ Delete Camp</DialogTitle>
                  <p className="text-sm mb-6 dark:text-gray-200">
                    Are you sure you want to delete <strong>{selectedCamp?.name}</strong>? This action cannot be undone.
                  </p>
                  <div className="flex justify-end gap-3">
                    <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                    <button onClick={() => deleteMutation.mutate(selectedCamp._id)} className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 text-white rounded hover:shadow-md transition">Delete</button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};

export default ManageCamps;
