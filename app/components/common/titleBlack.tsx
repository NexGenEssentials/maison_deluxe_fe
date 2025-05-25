import React from "react";

const TitleBlack = ({ title }: { title: string }) => {
  return (
    <div className="font-[Playfair_Display] bg-gradient-to-r from-secondaryBlue  from-10% via-green-800 via-12% to-primaryGreen/90 to-30% bg-clip-text text-transparent font-bold text-[48px]">
      {title}
    </div>
  );
};

export default TitleBlack;
