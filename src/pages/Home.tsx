"use client";

import { FileText, Calendar, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { dummyCase } from "@/dummy/dummy.data";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

  // Process data for Case Stage Pie Chart
  const caseStageData = dummyCase.reduce((acc, caseItem) => {
    const stage = caseItem.case_stage;
    const existing = acc.find((item) => item.name === stage);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: stage, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const PIE_COLORS = ["#3b82f6", "#ef4444", "#f97316", "#10b981"];

  // Process data for Cases by Court Bar Chart
  const casesByCourt = dummyCase.reduce((acc, caseItem) => {
    const courtName = caseItem.court_details.name;
    const existing = acc.find((item) => item.name === courtName);
    if (existing) {
      existing.cases += 1;
    } else {
      acc.push({ name: courtName, cases: 1 });
    }
    return acc;
  }, [] as { name: string; cases: number }[]);

  // Process data for Cases by Lawyer Bar Chart
  const casesByLawyer = dummyCase.reduce((acc, caseItem) => {
    const lawyerName = caseItem.lawyer_details.name;
    const existing = acc.find((item) => item.name === lawyerName);
    if (existing) {
      existing.cases += 1;
    } else {
      acc.push({ name: lawyerName, cases: 1 });
    }
    return acc;
  }, [] as { name: string; cases: number }[]);

  // Process data for Monthly Revenue Line Chart
  const monthlyRevenue = dummyCase.reduce((acc, caseItem) => {
    caseItem.payments.forEach((payment) => {
      const date = new Date(payment.paid_date);
      const month = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      const existing = acc.find((item) => item.month === month);
      if (existing) {
        existing.revenue += payment.paid_amount;
      } else {
        acc.push({ month, revenue: payment.paid_amount, date: date.getTime() });
      }
    });
    return acc;
  }, [] as { month: string; revenue: number; date: number }[]);

  // Sort monthly revenue by date
  monthlyRevenue.sort((a, b) => {
    return a.date - b.date;
  });

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold ">Welcome back 👋</h1>
      </div>

      {/* Stats Cards - Horizontal Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Cases Card - Light Blue */}
        <Link to="/dashboard/cases" className="bg-linear-to-br from-blue-400 via-blue-50 to-blue-100 rounded-2xl border-2 border-blue-300/40 shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-500 p-7 relative overflow-hidden group cursor-pointer block">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-300/40 rounded-full -mr-20 -mt-20 group-hover:scale-150 group-hover:bg-blue-400/50 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200/30 rounded-full -ml-16 -mb-16 group-hover:scale-125 transition-all duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Total Cases</p>
                </div>
                <h3 className="text-5xl font-extrabold  mb-2 bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  {dummyCase.length}
                </h3>
                <p className="text-xs font-medium text-blue-600/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  All registered cases
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 shadow-lg group-hover:shadow-blue-500/50 group-hover:rotate-6 transition-all duration-500 border-2 border-blue-400/50">
                <FileText className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </Link>

        {/* Upcoming Cases Card - Light Pink */}
        <Link to="/dashboard/cases" className="bg-linear-to-br from-pink-400 via-pink-50 to-pink-100 rounded-2xl border-2 border-pink-300/40 shadow-2xl hover:shadow-pink-500/20 hover:scale-[1.02] transition-all duration-500 p-7 relative overflow-hidden group cursor-pointer block">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-pink-300/40 rounded-full -mr-20 -mt-20 group-hover:scale-150 group-hover:bg-pink-400/50 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-200/30 rounded-full -ml-16 -mb-16 group-hover:scale-125 transition-all duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                  <p className="text-sm font-semibold text-pink-700 uppercase tracking-wide">Upcoming Cases</p>
                </div>
                <h3 className="text-5xl font-extrabold  mb-2 bg-linear-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
                  {dummyCase.length}
                </h3>
                <p className="text-xs font-medium text-pink-600/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                  Scheduled hearings
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-linear-to-br from-pink-500 to-pink-600 shadow-lg group-hover:shadow-pink-500/50 group-hover:rotate-6 transition-all duration-500 border-2 border-pink-400/50">
                <Calendar className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </Link>

        {/* Completed Cases Card - Light Green */}
        <Link to="/dashboard/cases" className="bg-linear-to-br from-green-400 via-green-50 to-green-100 rounded-2xl border-2 border-green-300/40 shadow-2xl hover:shadow-green-500/20 hover:scale-[1.02] transition-all duration-500 p-7 relative overflow-hidden group cursor-pointer block">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-300/40 rounded-full -mr-20 -mt-20 group-hover:scale-150 group-hover:bg-green-400/50 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-200/30 rounded-full -ml-16 -mb-16 group-hover:scale-125 transition-all duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-sm font-semibold text-green-700 uppercase tracking-wide">Completed Cases</p>
                </div>
                <h3 className="text-5xl font-extrabold  mb-2 bg-linear-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  {dummyCase.length}
                </h3>
                <p className="text-xs font-medium text-green-600/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Resolved cases
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-linear-to-br from-green-500 to-green-600 shadow-lg group-hover:shadow-green-500/50 group-hover:rotate-6 transition-all duration-500 border-2 border-green-400/50">
                <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </Link>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Case Stage Distribution - Pie Chart */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Case Stage Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={caseStageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {caseStageData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Cases by Court - Bar Chart */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Cases by Court</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={casesByCourt}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cases" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Revenue - Line Chart */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => `৳${value.toLocaleString()}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cases by Lawyer - Bar Chart */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Cases by Lawyer</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={casesByLawyer}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cases" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Cases Table - Full Width */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold ">
            Upcoming Cases
          </h2>
        </div>
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary-green border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-black first:rounded-tl-xl">
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
                        (isLast ? " last:rounded-b-xl" : "")
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
                            <p className="text-sm font-medium ">
                              {caseItem.case_number}
                            </p>
                            <p className="text-xs text-gray-500">
                              {caseItem.file_number}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <p className="text-sm font-medium ">
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
                        <p className="text-sm font-medium ">
                          {caseItem.client_details.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {caseItem.client_details.account_id}
                        </p>
                      </td>

                      <td className="px-4 py-3">
                        <p className="text-sm font-medium ">
                          {caseItem.party_details.name}
                        </p>
                      </td>

                      <td className={`px-4 py-3 ${isLast ? "last:rounded-br-xl" : ""}`}>
                        <p className="text-sm font-medium ">
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
  );
};

export default Home;
