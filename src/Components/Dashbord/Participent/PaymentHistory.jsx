import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingEle from "../../Share/LoadingEle";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payment-history");
      return res.data;
    },
  });

  const filteredData = payments.filter((payment) => {
    const search = searchText.toLowerCase();
    return (
      payment.campName.toLowerCase().includes(search) ||
      payment.participantName?.toLowerCase().includes(search) ||
      new Date(payment.paidAt).toLocaleDateString().includes(search)
    );
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  if (isLoading) {
    return <LoadingEle />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent drop-shadow-md mb-6 text-center">
        💳 Payment History
      </h2>

      {/* Search bar */}
      <div className="max-w-md mx-auto mb-6 flex">
        <input
          type="text"
          placeholder="Search by camp name, date or participant"
          className="w-full px-4 py-2 border border-green-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <span className="px-3 py-2 bg-green-600 text-white rounded-r-md flex items-center justify-center dark:bg-green-500">
          <FaSearch />
        </span>
      </div>

      {/* Table */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden dark:bg-gray-900/70 dark:backdrop-blur-md border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse text-sm">
            <thead className="bg-green-600 dark:bg-green-700 text-white">
              <tr>
                <th className="px-6 py-4 font-semibold">#</th>
                <th className="px-6 py-4 font-semibold">Camp Name</th>
                <th className="px-6 py-4 font-semibold">Fees</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Confirmed</th>
                <th className="px-6 py-4 font-semibold">Transaction ID</th>
                <th className="px-6 py-4 font-semibold">Paid At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
              {currentData.length > 0 ? (
                currentData.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-green-50 dark:hover:bg-gray-700 transition duration-200"
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200 font-medium whitespace-nowrap">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200 font-medium whitespace-nowrap">
                      {payment.campName}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      ৳ {payment.campFees}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1 whitespace-nowrap">
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 capitalize text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {payment.confirmed ? "Confirmed" : "Pending"}
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {payment.paymentIntentId?.slice(0, 10)}...
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {new Date(payment.paidAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500 dark:text-gray-400">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-green-600 dark:bg-green-500 text-white rounded disabled:opacity-50 hover:bg-green-700 dark:hover:bg-green-600 transition"
        >
          Prev
        </button>
        <span className="text-sm dark:text-gray-200">
          Page <strong>{currentPage}</strong> of {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1 bg-green-600 dark:bg-green-500 text-white rounded disabled:opacity-50 hover:bg-green-700 dark:hover:bg-green-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaymentHistory;
