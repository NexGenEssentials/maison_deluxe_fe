"use client";

import { ActivateUserAPI, DeleteUser, getUser } from "@/app/api/common/action";
import ResetPassword from "@/app/components/common/resetPassword";
import CenterModal from "@/app/components/model/centerModel";
import { useAppContext } from "@/app/context";
import { User } from "@/app/types/user";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { MdLockOpen } from "react-icons/md";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { push } = router;
  const { setActiveModalId } = useAppContext();

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getUser();

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

  const handleDelete = async (id: number) => {
    try {
      const result = await DeleteUser(id);
      if (result) {
        setUsers((prev) => prev.filter((client) => client.id !== id));
      }
    } catch (error) {
      console.error(`something went wrong`);
    }
  };

  const handleAddUser = () => {
    push("/dashboard/users");
  };

  const handleActivateUser = async (id: number, active: boolean) => {
    let action;
    if (active) {
      action = "deactivate";
    } else {
      action = "activate";
    }
    try {
      const result = await ActivateUserAPI(id, { action });

      if (result.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === id ? { ...user, active: !user.is_active } : user
          )
        );
      }
    } catch (error) {}
  };

  return (
    <>
      <div className=" p-6">
        <div className="max-w-7xl  mx-auto space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                Users List
              </h1>
              <button
                type="button"
                onClick={handleAddUser}
                className="bg-primaryRed/70 hover:bg-primaryRed duration-300 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg"
              >
                Add New User
              </button>
            </div>
            {loading ? (
              <div className="text-center text-gray-600">Loading users...</div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : users.length === 0 ? (
              <div className="text-gray-500 text-center">No users found.</div>
            ) : (
              <div className="overflow-x-auto shadow rounded-md ">
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
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Action
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
                        <td className="px-6 py-4 text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <div
                              onClick={() =>
                                handleActivateUser(user.id, user.is_active)
                              }
                              className="cursor-pointer hover:text-primaryRed text-lg"
                            >
                              {user.is_active ? <FaPause /> : <FaPlay />}
                            </div>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <FiEdit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setActiveModalId("resetpassword")}
                              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <MdLockOpen className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
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
              </div>
            )}
          </div>
        </div>
      </div>

      <CenterModal id={"resetpassword"}>
        <ResetPassword />
      </CenterModal>
    </>
  );
};

export default UsersPage;
