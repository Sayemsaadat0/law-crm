"use client";

import { 
  FileText, 
  Calendar, 
  CheckCircle2
} from "lucide-react";
import { dummyCase } from "@/dummy/dummy.data";

const Home = () => {
  // Static data
  const totalCases = dummyCase.length;
  const upcomingCases = dummyCase.filter(
    (caseItem) => caseItem.case_stage === "Active"
  ).length;
  const completedCases = dummyCase.filter(
    (caseItem) => caseItem.case_stage === "Disposed"
  ).length;

  // Show all cases from dummy data
  const upcomingCasesList = dummyCase;

  // Get stage badge style
  const getStageStyle = (stage: string) => {
    if (stage === "Active") {
      return "bg-primary/10 text-primary border-primary/20";
    } else if (stage === "Disposed") {
      return "bg-red-100 text-red-800 border-red-200";
    } else {
      return "bg-orange-100 text-orange-800 border-orange-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back 👋</h1>
      </div>

      {/* Stats Cards - Three Simple Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Cases Card - Light Blue */}
        <div className="bg-blue-50 rounded-xl border border-blue-100 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Cases</p>
              <h3 className="text-3xl font-bold text-gray-900">{totalCases}</h3>
            </div>
            <div className="p-4 rounded-xl bg-blue-100">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Upcoming Cases Card - Light Pink */}
        <div className="bg-pink-50 rounded-xl border border-pink-100 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Upcoming Cases</p>
              <h3 className="text-3xl font-bold text-gray-900">{upcomingCases}</h3>
            </div>
            <div className="p-4 rounded-xl bg-pink-100">
              <Calendar className="w-8 h-8 text-pink-600" />
            </div>
          </div>
        </div>

        {/* Completed Cases Card - Light Green */}
        <div className="bg-green-50 rounded-xl border border-green-100 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed Cases</p>
              <h3 className="text-3xl font-bold text-gray-900">{completedCases}</h3>
            </div>
            <div className="p-4 rounded-xl bg-green-100">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Cases Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Cases</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  SL
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Case Id
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Number of Case
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Case Stage
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Payment Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Party
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Lawyer
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {upcomingCasesList.map((caseItem, index) => {
                return (
                  <tr
                    key={caseItem.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        {index + 1}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {caseItem.case_number}
                          </p>
                          <p className="text-xs text-gray-500">
                            {caseItem.file_number}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">{caseItem.case_number}</p>
                    </td>

                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStageStyle(caseItem.case_stage)}`}>
                        {caseItem.case_stage}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        N/A
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">
                        {caseItem.client_details.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {caseItem.client_details.account_id}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">
                        {caseItem.party_details.name}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">
                        {caseItem.lawyer_details.name}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;