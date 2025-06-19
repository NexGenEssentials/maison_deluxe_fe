"use client";
import React, { useState } from "react";
import RoomTypeForm from "./forms/createRoon";
import RoomTable from "./roomsTable/roomTable";

const tabs = ["Rooms", "Create New Room Type"];
const RoomType = () => {
  const [tab, setTab] = useState("Rooms");
  return (
    <div className="p-8 space-y-4">
      <div>
        <div className="border border-gray-200 rounded-lg w-full md:w-1/2 mx-auto flex overflow-hidden">
          {tabs.map((tbs) => (
            <span
              onClick={() => setTab(tbs)}
              className={`${
                tbs !== tab
                  ? "bg-secondaryRed/70 hover:bg-secondaryRed text-white"
                  : "text-gray-300 cursor-not-allowed"
              } w-full flex items-center justify-center py-3 font-semibold cursor-pointer capitalize`}
              key={tbs}
            >
              {tbs}
            </span>
          ))}
        </div>
      </div>
      {tab === "Rooms" && <RoomTable />}
      {tab === "Create New Room Type" && <RoomTypeForm />}
    </div>
  );
};

export default RoomType;
