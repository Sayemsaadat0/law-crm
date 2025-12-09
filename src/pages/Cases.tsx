"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CaseStageBadge } from "@/components/dashboard/cases/CaseStageBadge";
import { CaseActionDropdown } from "@/components/dashboard/cases/CaseActionDropdown";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dummyCase } from "@/dummy/dummy.data";
import HearingForm from "@/components/pageComponent/cases/HearingForm";
import PaymentForm from "@/components/pageComponent/cases/PaymentForm";
import type { TCase } from "@/types/case.type";

// Tab array with title and value
const caseTabs = [
  { title: "All", value: "" },
  { title: "Active", value: "active" },
  { title: "Disposed", value: "disposed" },
  { title: "Archive", value: "archive" },
];

export default function CasesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");
  const [hearingDialogOpen, setHearingDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<TCase | null>(null);

  const handleNewHearing = (caseData: TCase) => {
    setSelectedCase(caseData);
    setHearingDialogOpen(true);
  };

  const handleReceivePayment = (caseData: TCase) => {
    setSelectedCase(caseData);
    setPaymentDialogOpen(true);
  };

  const handleViewCase = (caseData: TCase) => {
    navigate(`/dashboard/cases/${caseData.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Title and Add Case Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Case Management</h1>
        <Link to="/dashboard/cases/create">
          <Button className="h-8 px-3 text-xs text-black bg-primary-green hover:bg-primary-green/90 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Case</span>
          </Button>
        </Link>
      </div>

      {/* Tabs and Filters Section */}
      <div className="flex items-center justify-between gap-4">
        {/* Left Side - Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="h-10 bg-white rounded-xl shadow-sm border border-gray-200 p-1.5 gap-1.5">
            {caseTabs.map((tab) => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value} 
                className="h-8 px-4 rounded-lg font-medium text-sm transition-all bg-transparent text-gray-700 hover:bg-gray-50 data-[state=active]:bg-primary-green data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Right Side - Select and Search */}
        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] h-9 py-2">
              <SelectValue placeholder="Case Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="disposed">Disposed</SelectItem>
              <SelectItem value="left">Left</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search cases..."
              className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary h-9"
            />
          </div>
        </div>
      </div>

      <div className="bg-background rounded-lg border border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary-green border-b border-border">
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                  SL
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                  Case Id
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                  Number of Case
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                  Previous Date
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                  Next Date
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                  Case Stage
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                  Payment Status
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                  Client
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                  Party
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                  Lawyer
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-black">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {dummyCase.map((caseItem, index) => {
                return (
                  <tr
                    key={caseItem.id}
                    className="hover:bg-muted/10 transition-colors"
                  >
                    <td className="px-3 py-2.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        {index + 1}
                      </span>
                    </td>

                    <td className="px-3 py-2.5">
                      <Link
                        to={`/dashboard/cases/${caseItem.id}`}
                        className="flex items-center gap-1.5 hover:text-primary-green transition-colors cursor-pointer"
                      >
                        <div>
                          <p className="text-xs font-medium">
                            {caseItem.case_number}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {caseItem.file_number}
                          </p>
                        </div>
                      </Link>
                    </td>

                    <td className="px-3 py-2.5">
                      <p className="text-xs font-medium">{caseItem.case_number}</p>
                    </td>

                    <td className="px-3 py-2.5">
                      <p className="text-xs text-muted-foreground">N/A</p>
                    </td>

                    <td className="px-3 py-2.5">
                      <p className="text-xs text-muted-foreground">N/A</p>
                    </td>

                    <td className="px-3 py-2.5">
                      <CaseStageBadge stage={caseItem.case_stage} />
                    </td>

                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        N/A
                      </span>
                    </td>

                    <td className="px-3 py-2.5">
                      <p className="text-xs font-medium">
                        {caseItem.client_details.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {caseItem.client_details.account_id}
                      </p>
                    </td>

                    <td className="px-3 py-2.5">
                      <p className="text-xs font-medium">
                        {caseItem.party_details.name}
                      </p>
                    </td>

                    <td className="px-3 py-2.5">
                      <p className="text-xs font-medium">
                        {caseItem.lawyer_details.name}
                      </p>
                    </td>

                    <td className="px-3 py-2.5">
                      <div className="flex items-center justify-center">
                        <CaseActionDropdown
                          caseData={caseItem}
                          onView={handleViewCase}
                          onEdit={() => {}}
                          onReceivePayment={handleReceivePayment}
                          onNewHearing={handleNewHearing}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hearing Form Dialog */}
      {selectedCase && (
        <HearingForm
          open={hearingDialogOpen}
          onOpenChange={setHearingDialogOpen}
          caseId={selectedCase.id}
          caseNumber={selectedCase.case_number}
          fileNumber={selectedCase.file_number}
        />
      )}

      {/* Payment Form Dialog */}
      {selectedCase && (
        <PaymentForm
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          hearings={selectedCase.hearings}
          caseId={selectedCase.id}
          caseNumber={selectedCase.case_number}
          fileNumber={selectedCase.file_number}
        />
      )}
    </div>
  );
}
