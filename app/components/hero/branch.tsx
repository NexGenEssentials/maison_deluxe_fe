// components/FeatureBranch.tsx
"use client";

export default function FeatureBranch() {
  return (
    <div
      className="max-lg:hidden relative h-[400px] w-full bg-cover bg-center"
    //   style={{ backgroundImage: `url('/images/heroBgImage.jpg')` }}
    >
      {/* Connector Lines */}
      {/* <div className="absolute left-[35%] top-[50px] h-[200px] w-[2px] bg-white/20 rounded-full"></div>
      <div className="absolute left-[35%] top-[150px] w-[150px] h-[2px] bg-white/20 rounded-full"></div>
      <div className="absolute left-[35%] top-[250px] w-[150px] h-[2px] bg-white/20 rounded-full"></div> */}

      {/* Feature 1 */}
      <div className="absolute left-[15%] top-[180px] flex items-center space-x-3 rounded-full bg-green-500/10 backdrop-blur-md px-6 text-sm py-4 shadow-lg">
        <div className="w-3 h-3 bg-lime-400 rotate-45"></div>
        <span className="text-lime-400 font-medium">Online Check-in</span>
      </div>

      {/* Feature 2 */}
      <div className="absolute left-[50%] top-[35px] flex items-center space-x-3 rounded-full bg-white/10 backdrop-blur-md px-6 text-sm py-4 text-white shadow-lg">
        <div className="w-3 h-3 bg-white rotate-45"></div>
        <span>High Speed Wi-Fi</span>
      </div>

      {/* Feature 3 */}
      <div className="absolute left-[50%] top-[330px] flex items-center space-x-3 rounded-full bg-white/10 backdrop-blur-md px-6 text-sm py-4 text-white shadow-lg">
        <div className="w-3 h-3 bg-white rotate-45"></div>
        <span>Pet Friendly</span>
      </div>
    </div>
  );
}
