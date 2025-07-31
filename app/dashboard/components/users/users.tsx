"use client";

import React, { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  phone: string;
  full_name: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/users"); // Replace with your actual endpoint
      const result = await res.json();
      if (result.status === "success") {
        setUsers(result.data);
      } else {
        setError("Failed to retrieve users");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-7xl  mx-auto space-y-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 overflow-hidden">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Users List
          </h1>

          {loading ? (
            <div className="text-center text-gray-600">Loading users...</div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : users.length === 0 ? (
            <div className="text-gray-500 text-center">No users found.</div>
          ) : (
            <div className="overflow-x-auto shadow rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      Full Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                        {user.full_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {user.phone || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
