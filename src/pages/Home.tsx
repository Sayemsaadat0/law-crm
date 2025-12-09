"use client";

import { FileText, Calendar, CheckCircle2 } from "lucide-react";
import { dummyCase } from "@/dummy/dummy.data";

const Home = () => {
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

      <div className="grid grid-cols-8 gap-5">
        {/* Stats Column */}
        <div className="col-span-2 space-y-4">
          {/* Total Cases Card - Light Blue */}
          <div className="bg-blue-50 rounded-xl border border-blue-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Cases</p>
                <h3 className="text-3xl font-bold text-gray-900">
                  {dummyCase.length}
                </h3>
              </div>
              <div className="p-4 rounded-xl bg-blue-100">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Upcoming Cases Card - Light Pink */}
          <div className="bg-pink-50 rounded-xl border border-pink-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Upcoming Cases</p>
                <h3 className="text-3xl font-bold text-gray-900">
                  {dummyCase.length}
                </h3>
              </div>
              <div className="p-4 rounded-xl bg-pink-100">
                <Calendar className="w-8 h-8 text-pink-600" />
              </div>
            </div>
          </div>

          {/* Completed Cases Card - Light Green */}
          <div className="bg-green-50 rounded-xl border border-green-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed Cases</p>
                <h3 className="text-3xl font-bold text-gray-900">
                  {dummyCase.length}
                </h3>
              </div>
              <div className="p-4 rounded-xl bg-green-100">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Column */}
        <div className="col-span-6">
            <div className="pb-2">
              <h2 className="text-lg font-semibold text-gray-900">
                Upcoming Cases
              </h2>
            </div>
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
            <div className="overflow-x-auto overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-green border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-black first:rounded-tl-xl last:rounded-tr-xl">
                      SL
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-black">
                      Case Id
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-black">
                      Number of Case
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-black">
                      Case Stage
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-black">
                      Payment Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-black">
                      Client
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-black">
                      Party
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-black last:rounded-tr-xl">
                      Lawyer
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dummyCase.map((caseItem, index, arr) => {
                    const isLast = index === arr.length - 1;
                    return (
                      <tr
                        key={caseItem.id}
                        className={
                          "hover:bg-gray-50 transition-colors" +
                          (isLast
                            ? " last:rounded-b-xl"
                            : "")
                        }
                      >
                        <td className={`px-4 py-3 ${isLast ? "first:rounded-bl-xl" : ""}`}>
                          <span className="text-sm font-medium text-gray-700">
                            {index + 1}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
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
                          <p className="text-sm font-medium text-gray-900">
                            {caseItem.case_number}
                          </p>
                        </td>

                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStageStyle(
                              caseItem.case_stage
                            )}`}
                          >
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

                        <td className={`px-4 py-3 ${isLast ? "last:rounded-br-xl" : ""}`}>
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
      </div>
    </div>
  );
};

export default Home;
