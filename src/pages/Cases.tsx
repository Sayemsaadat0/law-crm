"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AddHearingModal from "@/components/dashboard/cases/AddHearingModal";
import AddAccountModal from "@/components/dashboard/cases/AddAccountModal";
import { Link } from "react-router-dom";

export interface CaseItem {
  id: string;
  title: string;
  clientName: string;
  status: string;
  createdAt: string;
}

const mockCases: CaseItem[] = [
  {
    id: "C-101",
    title: "Land Dispute Case",
    clientName: "Rahim Uddin",
    status: "Running",
    createdAt: "2025-01-03",
  },
  {
    id: "C-102",
    title: "Business Contract Issue",
    clientName: "Karim Khan",
    status: "Pending",
    createdAt: "2025-01-12",
  },
];

const CasesPage = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [showHearingModal, setShowHearingModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const handleHearingModalOpen = (case_id: string) => {
    setSelectedCaseId(case_id);
    setShowHearingModal(true);
  };

  const handleAccountModalOpen = (case_id: string) => {
    setSelectedCaseId(case_id);
    setShowAccountModal(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex justify-end">
        <Button>
          <Link to="create"> Add Case </Link>
        </Button>
      </div>
      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {mockCases.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.clientName}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.createdAt}</TableCell>

                <TableCell className="flex gap-2 justify-end">
                  <Button
                    onClick={() => handleHearingModalOpen(item.id)}
                    variant="outlineBtn"
                    size="sm"
                  >
                    Add Hearing
                  </Button>

                  <Button
                    onClick={() => handleAccountModalOpen(item.id)}
                    size="sm"
                  >
                    Add Account
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Hearing Modal */}
      <AddHearingModal
        open={showHearingModal}
        case_id={selectedCaseId}
        setOpen={setShowHearingModal}
      />

      {/* Account Modal */}
      <AddAccountModal
        open={showAccountModal}
        case_id={selectedCaseId}
        setOpen={setShowAccountModal}
      />
    </div>
  );
};

export default CasesPage;
