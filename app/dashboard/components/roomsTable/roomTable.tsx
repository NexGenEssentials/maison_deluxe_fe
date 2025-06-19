import { roomType } from "@/app/costants";
import React, { useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
// adjust to your path

const ITEMS_PER_PAGE = 10;

const RoomTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<(typeof roomType)[0] | null>(
    null
  );

  const handleView = (room: (typeof roomType)[0]) => setSelectedRoom(room);
  const handleCloseModal = () => setSelectedRoom(null);

  const paginatedData = roomType.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(roomType.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Room Types</h2>
      <div className="overflow-x-auto border border-gray-100 rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 ">
            <tr className="">
              <th className="px-4 py-4 text-center">#</th>
              <th className="px-4 py-4">Title</th>
              <th className="px-4 py-4 text-center">Available</th>
              <th className="px-4 py-4 text-center">Price ($)</th>
              <th className="px-4 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((room, index) => (
              <tr
                key={room.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-2 text-center">
                  {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                </td>
                <td className="px-4 py-2">{room.title}</td>
                <td className="px-4 py-2 text-center">{room.available}</td>
                <td className="px-4 py-2 text-center">${room.price}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-8">
                    <button
                      onClick={() => handleView(room)}
                      title="View"
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <FaEye className="w-4 h-4" />
                    </button>
                    <button
                      title="Edit"
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      title="Delete"
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* View Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-12 w-full max-w-3xl rounded shadow-lg relative">
            <button
              onClick={handleCloseModal}
              className="absolute text-2xl top-4 right-6 text-gray-500 hover:text-red-600"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">{selectedRoom.title}</h3>
            <img
              src={selectedRoom.image.src}
              alt={selectedRoom.title}
              className="w-full h-72 object-cover mb-4 rounded"
            />
            <p className="mb-2">{selectedRoom.description}</p>
            <h4 className="font-semibold mb-1">Amenities:</h4>
            <ul className="list-disc list-inside text-sm mb-4">
              {selectedRoom.amenities.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
            <p className="text-sm">
              <strong>Available:</strong> {selectedRoom.available} |{" "}
              <strong>Price:</strong> ${selectedRoom.price}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomTable;
