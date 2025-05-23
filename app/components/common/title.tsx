import React from "react";

const Title = ({ title }: { title: string }) => {
  return (
    <div className="font-[Playfair_Display] bg-gradient-to-r from-white via-yellow-150 to-primaryGreen/300 bg-clip-text text-transparent font-bold text-[48px]">
      {title}
    </div>
  );
};

export default Title;
