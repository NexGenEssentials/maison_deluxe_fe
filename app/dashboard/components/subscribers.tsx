"use client";
import { getSubscribers } from "@/app/api/messages/action";
import Loader from "@/app/components/common/loader";
import React, { useEffect, useState } from "react";

const Subbscribers = () => {
  const [loading, setLoading] = useState(true);
  const [subscribers, setSubscribers] = useState<{ email: string }[]>([]);
  useEffect(() => {
    handleGetSubs();
  }, []);
  const handleGetSubs = async () => {
    try {
      const result = await getSubscribers();
      if (result.status) {
        setSubscribers(result.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow rounded-lg ">
      <h2 className="text-lg font-semibold mb-4">Subscribers</h2>
      <ul className="divide-y divide-gray-200 max-h-[400px] overflow-auto hide-scrollbar">
        {subscribers.map((subscriber, index) => (
          <li
            key={index}
            className="py-2 px-2 text-gray-800 text-sm font-semibold"
          >
            {index + 1}. {subscriber.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subbscribers;
