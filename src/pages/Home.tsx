import { StatsCard } from "@/components/shared/StatsCard";
import { hearings } from "@/constant/case-hearings";
import type { TCaseHearing } from "@/types/hearing.type";
import { DollarSign, Users, UserPlus, BarChart3 } from "lucide-react";

function Home() {
  const loading = false;
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <StatsCard
          icon={
            <div className="p-4 rounded-xl bg-blue-50 text-blue-600">
              <DollarSign className="w-6 h-6" />
            </div>
          }
          title="Today's Money"
          value="$53k"
          percentage="+55%"
          description="than last week"
          percentageColor="text-green-500"
        />
        <StatsCard
          icon={
            <div className="p-4 rounded-xl bg-green-50 text-green-600">
              <Users className="w-6 h-6" />{" "}
            </div>
          }
          title="Today's Users"
          value="2,300"
          percentage="+3%"
          description="than last month"
          percentageColor="text-green-500"
        />
        <StatsCard
          icon={
            <div className="p-4 rounded-xl bg-orange-50 text-orange-600">
              <UserPlus className="w-6 h-6" />{" "}
            </div>
          }
          title="New Clients"
          value="3,462"
          percentage="-2%"
          description="than yesterday"
          percentageColor="text-red-500"
        />
        <StatsCard
          icon={
            <div className="p-4 rounded-xl bg-red-50 text-red-600">
              <BarChart3 className="w-6 h-6" />
            </div>
          }
          title="Sales"
          value="$103,430"
          percentage="+5%"
          description="than yesterday"
          percentageColor="text-green-500"
        />
      </div>

      <div>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Recent Hearings (Last 7 Days)
          </h2>
          <p className="text-gray-600">
            Overview of all case hearings from the past week
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading hearings...</p>
          </div>
        ) : (
          <HearingsTable hearings={hearings} />
        )}
      </div>
    </div>
  );
}

export default Home;

import {
  Calendar,
  Clock,
  User,
  Scale,
  Briefcase,
  FileText,
} from "lucide-react";

interface HearingsTableProps {
  hearings: TCaseHearing[];
}

export function HearingsTable({ hearings }: HearingsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "postponed":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (hearings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <Scale className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No hearings found for the last 7 days</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Case Number
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Party Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Lawyer
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Court
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {hearings.map((hearing) => (
              <tr
                key={hearing.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {hearing.case_number}
                      </p>
                      <p className="text-xs text-gray-500">
                        {hearing.case_type}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2 text-sm text-gray-900">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{formatDate(hearing.hearing_date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{formatTime(hearing.hearing_time)}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-start space-x-2">
                    <User className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {hearing.party_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {hearing.party_type}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-900">
                      {hearing.lawyer_name}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Scale className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-900">
                      {hearing.court_name}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      hearing.status
                    )}`}
                  >
                    {hearing.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
