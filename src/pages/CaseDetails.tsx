"use client";

import { useParams } from "react-router-dom";

export default function CaseDetails() {
  const { id } = useParams<{ id: string }>();

  return (
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
  );
}

