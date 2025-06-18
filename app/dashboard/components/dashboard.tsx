import React, { useState } from "react";

import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiChevronDown,
} from "react-icons/fi";
import MetricCard from "./cards";
import { ClientData, clientData } from "@/app/costants";

const StatusBadge: React.FC<{ status: ClientData["status"] }> = ({
  status,
}) => {
  const statusStyles = {
    Success: "bg-green-100 text-green-800 border-green-200",
    Destructive: "bg-red-100 text-red-800 border-red-200",
    Available: "bg-blue-100 text-blue-800 border-blue-200",
    Pending: "bg-orange-100 text-orange-800 border-orange-200",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

const DashboardAnalytics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === clientData.length
        ? []
        : clientData.map((client) => client.id)
    );
  };

  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Period
              <FiChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Revenue"
            value="6,123,000,123"
            currency="RWF"
            trend={-3.5}
            bgColor="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800"
            textColor="text-white"
          />
          <MetricCard
            title="Total Bookings"
            value="6,123"
            trend={-3.5}
            bgColor="bg-white border border-gray-200"
            textColor="text-gray-900"
          />
          <MetricCard
            title="Total"
            value="6,123"
            trend={-3.5}
            bgColor="bg-white border border-gray-200"
            textColor="text-gray-900"
          />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Client Management
                </h2>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur. Amet tellus diam
                  blandit sit leo feugiat sit leo.
                </p>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <FiFilter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Status
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                  2
                </span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FiDownload className="w-4 h-4" />
                Export Excel
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === clientData.length}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Client Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Check-in & Out date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Booking Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clientData.map((client) => (
                    <tr
                      key={client.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(client.id)}
                          onChange={() => handleRowSelect(client.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                            {client.avatar}
                          </div>
                          <span className="font-medium text-gray-900">
                            {client.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={client.status} />
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {client.checkInOut}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {client.bookingDate}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
