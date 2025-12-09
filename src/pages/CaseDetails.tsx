"use client";

import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CaseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard/cases");
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div>
        <Button
          onClick={handleBack}
          variant="outlineBtn"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cases
        </Button>
      </div>

      {/* Coming Soon Content */}
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon</h1>
          <p className="text-lg text-gray-600 mb-2">
            Case ID: <span className="font-semibold text-gray-900">{id}</span>
          </p>
          <p className="text-lg text-gray-600">
            This feature is under development and will be available soon.
          </p>
        </div>
      </div>
    </div>
  );
}


