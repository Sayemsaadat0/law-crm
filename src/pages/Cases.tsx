"use client";

import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CaseStageBadge } from "@/components/dashboard/cases/CaseStageBadge";
import { CaseActionDropdown } from "@/components/dashboard/cases/CaseActionDropdown";
import { dummyCase } from "@/dummy/dummy.data";

export default function CasesPage() {
  return (
    <div className="space-y-3">
      {/* Top Actions */}
      <div className="flex items-center justify-end gap-2">
        <Link to="/dashboard/cases/create">
          <Button className="h-8 px-3 text-xs bg-primary hover:bg-primary/90 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Case</span>
          </Button>
        </Link>
      </div>

      <div className="bg-background rounded-lg border border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  SL
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Case Id
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Number of Case
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Previous Date
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Next Date
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Case Stage
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Payment Status
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Client
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Party
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Lawyer
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
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
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <div>
                          <p className="text-xs font-medium">
                            {caseItem.case_number}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {caseItem.file_number}
                          </p>
                        </div>
                      </div>
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
                          onView={() => {}}
                          onEdit={() => {}}
                          onReceivePayment={() => {}}
                          onNewHearing={() => {}}
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
    </div>
  );
}
