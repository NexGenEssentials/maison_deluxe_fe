import React, { FC, ReactNode } from "react";
interface GraphProps {
  title: string;
  children: ReactNode;
}
const GraphSection: FC<GraphProps> = ({ title, children }) => {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h1 className="text-center font-semibold tex-xl">{title}</h1>
      <div>{children}</div>
    </div>
  );
};

export default GraphSection;
