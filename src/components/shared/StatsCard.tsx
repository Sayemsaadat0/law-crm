import type { ReactNode } from "react";

interface StatsCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  percentage: string;
  percentageColor?: string;
  description: string;
}

export function StatsCard({
  icon,
  title,
  value,
  percentage,
  percentageColor = "text-green-500",
  description,
}: StatsCardProps) {
  return (
    <div className="flex flex-col justify-between  bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="p-3 bg-primary rounded-xl text-white">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
      <hr className="my-2" />
      <p className="text-lg p-4 text-gray-500">
        <span className={`${percentageColor} font-semibold`}>{percentage}</span>{" "}
        {description}
      </p>
    </div>
  );
}
