import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

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
    return (
      <p className="text-center py-10 text-green-600 font-semibold">
        Loading payment history...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
        💳 Payment History
      </h2>

      {/* Search bar */}
      <div className="max-w-md mx-auto mb-6 flex">
        <input
          type="text"
          placeholder="Search by camp name, date or participant"
          className="w-full px-4 py-2 border border-green-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-600"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <span className="px-3 py-2 bg-green-600 text-white rounded-r-md flex items-center">
          <FaSearch />
        </span>
      </div>

      {/* Table */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse text-sm">
            <thead className="bg-green-600 text-white">
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
            <tbody className="divide-y divide-gray-100">
              {currentData.length > 0 ? (
                currentData.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-green-50 transition duration-200"
                  >
                    <td className="px-6 py-4 text-gray-800 font-medium whitespace-nowrap">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 text-gray-800 font-medium whitespace-nowrap">
                      {payment.campName}
                    </td>
                    <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                      ৳ {payment.campFees}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-600 font-semibold flex items-center gap-1 whitespace-nowrap">
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 capitalize text-gray-700 whitespace-nowrap">
                      {payment.confirmed ? "Confirmed" : "Pending"}
                    </td>
                    <td className="px-6 py-4 font-mono whitespace-nowrap">
                      {payment.paymentIntentId?.slice(0, 10)}...
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                      {new Date(payment.paidAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
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
          className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50 hover:bg-green-700 transition"
        >
          Prev
        </button>
        <span className="text-sm">
          Page <strong>{currentPage}</strong> of {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50 hover:bg-green-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaymentHistory;
