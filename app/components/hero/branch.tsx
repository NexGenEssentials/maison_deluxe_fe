"use client";

export default function FeatureBranch() {
  return (
    <div className="max-lg:hidden relative h-[400px] w-full bg-cover bg-center">

      <svg
        className="absolute left-0 top-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
      >
        <path
          d="
      M500,70
      L500,95
      Q500,100 495,100
      L305,100
      Q300,100 300,105
      L300,195
      Q300,200 305,200
      L495,200
      Q500,200 500,205
      L500,330
    "
          stroke="#a3e635"
          strokeOpacity="0.8"
          strokeWidth="2"
          fill="none"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="1000"
            to="0"
            dur="10s"
            fill="freeze"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dasharray"
            from="0,1000"
            to="1000,0"
            dur="10s"
            fill="freeze"
            repeatCount="indefinite"
          />
        </path>
      </svg>


      {/* Feature 1 - Online Check-in */}
      <div className="absolute left-[15%] top-[180px] flex items-center space-x-3 rounded-full bg-green-500/10 backdrop-blur-md px-6 text-sm py-4 shadow-lg">
        <div className="w-3 h-3 bg-lime-400 rotate-45"></div>
        <span className="text-lime-400 font-medium text-nowrap">Concierge Service</span>
      </div>

      {/* Feature 2 - High Speed Wi-Fi */}
      <div className="absolute left-[50%] top-[35px] flex items-center space-x-3 rounded-full bg-white/10 backdrop-blur-md px-6 text-sm py-4 text-white shadow-lg animate-feature-highlight delay-[700ms]">
        <div className="w-3 h-3 bg-lime-400 rotate-45"></div>
        <span className="text-nowrap">Private Airport Transfers</span>
      </div>

      <div className="absolute left-[48%] top-[320px] flex items-center space-x-3 rounded-full bg-white/10 backdrop-blur-md px-6 text-sm py-4 text-white shadow-lg animate-feature-highlight delay-[1400ms]">
        <div className="w-3 h-3 bg-lime-400 rotate-45"></div>
        <span className="text-nowrap">Exclusive Rooftop Views</span>
      </div>

    </div>
  );
}
