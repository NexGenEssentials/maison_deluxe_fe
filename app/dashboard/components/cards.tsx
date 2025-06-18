import { FiInfo, FiTrendingDown, FiTrendingUp } from "react-icons/fi";


interface MetricCardProps {
  title: string;
  value: string;
  trend: number;
  currency?: string;
  bgColor: string;
  textColor: string;
}
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  currency,
  bgColor,
  textColor,
}) => (
  <div
    className={`${bgColor} ${textColor} rounded-2xl p-6 relative overflow-hidden`}
  >
    <div className="relative z-10">
      <h3 className="text-sm font-medium opacity-90 mb-2">{title}</h3>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-bold">{value}</span>
        {currency && (
          <span className="text-sm font-medium opacity-90">{currency}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {trend < 0 ? (
            <FiTrendingDown className="w-4 h-4 text-red-300" />
          ) : (
            <FiTrendingUp className="w-4 h-4 text-green-300" />
          )}
          <span
            className={`text-sm font-medium ${
              trend < 0 ? "text-red-300" : "text-green-300"
            }`}
          >
            {Math.abs(trend)}%
          </span>
        </div>
        <span className="text-sm opacity-75">than last month</span>
      </div>
      <button className="flex items-center gap-2 mt-4 text-sm font-medium opacity-90 hover:opacity-100 transition-opacity">
        View details
        <FiInfo className="w-4 h-4" />
      </button>
    </div>
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
  </div>
);

export default MetricCard