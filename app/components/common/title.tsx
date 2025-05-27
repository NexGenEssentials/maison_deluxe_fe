import React from "react";

const Title = ({ title }: { title: string }) => {
  return (
    <div className="max-sm:text-3xl font-[Playfair_Display] bg-gradient-to-r from-white via-yellow-200 to-primaryGreen/300 bg-clip-text text-transparent font-bold text-[min(10vw,48px)]">
      {title}
    </div>
  );
};

export default Title;
