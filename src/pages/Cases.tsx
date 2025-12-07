"use client";

import { useState } from "react";
import { Search, Plus, Eye, Pencil, Briefcase } from "lucide-react";

import { CaseDetailsModal } from "@/components/dashboard/cases/CaseDetailsModal";
import { CaseStageBadge } from "@/components/dashboard/cases/CaseStageBadge";
import type { TCase, TCaseStage } from "@/types/case.type";
import { demoCases } from "@/constant/cases";
import { Button } from "@/components/ui/button";

const caseStages: TCaseStage[] = ["Active", "Disposed", "Left"];

export default function CasesPage() {
  const [selectedStage, setSelectedStage] = useState<TCaseStage>("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCase, setSelectedCase] = useState<TCase | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCases = demoCases.filter((caseItem) => {
    const matchesStage = caseItem.case_stage === selectedStage;
    const matchesSearch =
      caseItem.case_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.client_name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStage && matchesSearch;
  });

  const handleViewCase = (caseData: TCase) => {
    setSelectedCase(caseData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Actions */}
      <div className="flex justify-end gap-3 ml-auto">
        <div className="relative flex-1 lg:flex-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
          />
        </div>

        <Button className="whitespace-nowrap bg-primary/90 hover:bg-primary">
          <span>Add Case</span>
        </Button>
      </div>

      <div className="bg-background rounded-2xl shadow-sm border border-border p-6 space-y-6">
        {/* Stage Tabs */}
        <div className="flex gap-2 flex-wrap">
          {caseStages.map((stage) => (
            <button
              key={stage}
              onClick={() => setSelectedStage(stage)}
              className={`px-4 py-2 rounded-lg font-semibold border transition ${
                selectedStage === stage
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-background text-muted-foreground border-border hover:border-primary/20"
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredCases.length === 0 ? (
          <div className="bg-muted/30 rounded-xl p-12 text-center border border-border">
            <div className="flex flex-col items-center">
              <Briefcase className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No cases found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? "Try adjusting your search"
                  : `No ${selectedStage} cases available.`}
              </p>
              {!searchQuery && (
                <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition">
                  <Plus className="w-5 h-5" />
                  Create First Case
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Table */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                    Case
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredCases.map((caseItem) => (
                  <tr
                    key={caseItem.case_number}
                    className="hover:bg-muted/20 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-semibold">
                            {caseItem.case_number}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {caseItem.file_number}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-semibold">{caseItem.client_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {caseItem.account_id}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm line-clamp-2 text-muted-foreground">
                        {caseItem.case_description}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <CaseStageBadge stage={caseItem.case_stage} />
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleViewCase(caseItem)}
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-semibold text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/60 font-semibold text-sm">
                          <Pencil className="w-4 h-4" />
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="text-right text-sm text-muted-foreground">
          Showing {filteredCases.length} of {demoCases.length} cases
        </div>
      </div>

      <CaseDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        caseData={selectedCase}
      />
    </div>
  );
}
