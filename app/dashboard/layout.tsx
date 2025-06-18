"use client";

import SideBarNav from "./components/sideBarNav";
import Topbar from "./components/topbar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const { expanded } = useAppContext();
  return (
    <div>
      <Topbar />
      <div className="flex items-start justify-between">
        <SideBarNav />
        {children}
      </div>
    </div>
  );
}
