import React, { useEffect, useState } from "react";

import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiChevronDown,
} from "react-icons/fi";
import {
  DeleteBooking,
  getAllBookings,
  updateBookingStatus,
} from "@/app/api/bookings/action";
import Loader from "@/app/components/common/loader";
import { BookingData } from "@/app/types/booking";
import { formatToDateOnly } from "@/app/utils/filters";
import CenterModal from "@/app/components/model/centerModel";
import { useAppContext } from "@/app/context";
import BookingDetails from "./bookingDetails";

const StatusBadge: React.FC<{
  status: "confirmed" | "failed" | "available" | "pending" | "rejected";
}> = ({ status }) => {
  const statusStyles: Record<
    "confirmed" | "failed" | "available" | "pending" | "rejected",
    string
  > = {
    confirmed: "bg-green-100 text-green-800 border-green-200",
    failed: "bg-red-100 text-red-800 border-red-200",
    available: "bg-blue-100 text-blue-800 border-blue-200",
    pending: "bg-orange-100 text-orange-800 border-orange-200",
    rejected: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

const BookingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [viewBooking, setViewBooking] = useState<BookingData | null>(null);
  const { setActiveModalId } = useAppContext();
  const [filteredBookings, setFilteredBookings] = useState<BookingData[]>([]);
  const [sortField, setSortField] = useState<"room" | "date" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getAllBBookings();
  }, []);

  useEffect(() => {
    let results = [...bookings];

    // Search filter
    if (searchTerm.trim()) {
      results = results.filter(
        (booking) =>
          booking.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.booking_reference
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Sorting logic
    if (sortField) {
      results.sort((a, b) => {
        if (sortField === "room") {
          const roomA = a.room_category.name.toLowerCase();
          const roomB = b.room_category.name.toLowerCase();
          return sortOrder === "asc"
            ? roomA.localeCompare(roomB)
            : roomB.localeCompare(roomA);
        } else if (sortField === "date") {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        }
        return 0;
      });
    }

    setFilteredBookings(results);
  }, [bookings, searchTerm, sortField, sortOrder]);

  const getAllBBookings = async () => {
    try {
      const result = await getAllBookings();
      if (result.status) {
        setBookings(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId: number) => {
    try {
      const result = await DeleteBooking(bookingId);
      if (result)
        setBookings((prev) =>
          prev.filter((booking) => booking.id !== bookingId)
        );
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const result = await updateBookingStatus(id, newStatus);

      if (result.status === "success") {
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === id ? { ...booking, status: newStatus } : booking
          )
        );
      } else {
        console.error("Failed to update booking status:", result.message);
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    } finally {
      setActiveModalId("");
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Booking List
                </h2>
                <p className="text-gray-600">
                  Easily track, manage, and confirm guest reservations in
                  real-time.
                </p>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by client name or booking reference"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-700">Sort by:</label>
                  <select
                    className="text-sm border border-gray-300 rounded px-3 py-2"
                    onChange={(e) =>
                      setSortField(e.target.value as "room" | "date" | null)
                    }
                  >
                    <option value="">None</option>
                    <option value="room">Room Type</option>
                    <option value="date">Booking Date</option>
                  </select>

                  <button
                    onClick={() =>
                      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                    }
                    className="text-sm px-3 py-2 rounded border border-gray-300"
                  >
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </button>
                </div>

                <button
                  onClick={() => {
                    // reset filter
                    setSearchTerm("");
                    setSortField(null);
                    setSortOrder("asc");
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-primaryRed hover:text-white bg-red-50 hover:bg-red-800 text-sm font-semibold rounded-lg transition-colors"
                >
                  <FiFilter className="w-4 h-4" />
                  Clear Filter
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4 border px-4 py-2 rounded-lg border-gray-300">
                <span className="text-sm font-medium text-gray-700">Total</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                  {filteredBookings.length}
                </span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-black/20 text-white font-semibold text-sm rounded-lg hover:bg-red-800 transition-colors">
                <FiDownload className="w-4 h-4" />
                Export PDF
              </button>
            </div>

            {/* Table */}
            {loading ? (
              <Loader />
            ) : (
              <div className="overflow-x-auto">
                {filteredBookings.slice(0, 5).length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    No bookings found
                  </div>
                ) : (
                  <>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 text-nowrap">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                            #
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                            Client Name
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                            Status
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                            Booking Reference
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                            Room Type
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                            Check-in & Out date
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                            Booking Date
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentBookings.map((booking, index) => (
                          <tr
                            key={booking.id}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <td className="text-center">{index + 1}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                                  {booking.guest_name
                                    .slice(0, 2)
                                    .toLocaleUpperCase()}
                                </div>
                                <span className="font-medium text-gray-900">
                                  {booking.guest_name}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <StatusBadge
                                status={
                                  booking.status as
                                    | "confirmed"
                                    | "rejected"
                                    | "available"
                                    | "pending"
                                }
                              />
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-600">
                              {booking.booking_reference}
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-600">
                              {booking.room_category.name}
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-600">
                              <strong> {booking.check_in}</strong> to{" "}
                              <strong>{booking.check_out}</strong>
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-600">
                              {formatToDateOnly(booking.created_at)}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <select
                                  className="text-sm border border-gray-300 rounded px-3 py-2"
                                  onChange={(e) =>
                                    handleStatusChange(
                                      booking.id,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">pending</option>
                                  <option value="confirm">Confirm</option>
                                  <option value="reject">Reject</option>
                                </select>
                                <button
                                  onClick={() => {
                                    setActiveModalId("booking-details");
                                    setViewBooking(booking);
                                  }}
                                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <FiEye className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                  <FiEdit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(booking.id)}
                                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <FiTrash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex justify-between items-center mt-6 px-6">
                      <div className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                          Previous
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => goToPage(i + 1)}
                            className={`px-3 py-1 border rounded ${
                              currentPage === i + 1
                                ? "bg-primaryBlue text-white"
                                : ""
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <CenterModal
        children={viewBooking && <BookingDetails data={viewBooking} />}
        id={"booking-details"}
      />
    </div>
  );
};

export default BookingPage;
