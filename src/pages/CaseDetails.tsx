"use client";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dummyCase } from "@/dummy/dummy.data";
import PaymentPanel from "@/components/pageComponent/cases/PaymentPanel";
import CaseTimeline from "@/components/pageComponent/cases/CaseTimeline";
import PaymentForm from "@/components/pageComponent/cases/PaymentForm";
import HearingForm from "@/components/pageComponent/cases/HearingForm";

export default function CaseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<
    { date: string; payment_for_hearing: string; amount: number } | undefined
  >(undefined);
  const [hearingDialogOpen, setHearingDialogOpen] = useState(false);
  const [selectedHearing, setSelectedHearing] = useState<
    | { title: string; serial_no: string; date: string; note: string; file?: string }
    | undefined
  >(undefined);

  // Find the case by ID
  const caseData = dummyCase.find((caseItem) => caseItem.id === id);

  if (!caseData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Case Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Case ID: <span className="font-semibold text-gray-900">{id}</span>
          </p>
          <Button
            onClick={() => navigate("/dashboard/cases")}
            variant="outlineBtn"
          >
            Back to Cases
          </Button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate("/dashboard/cases");
  };

  // Get stage badge style
  const getStageStyle = (stage: string) => {
    if (stage === "Active") {
      return "bg-primary-green text-black border-primary-green";
    } else if (stage === "Disposed") {
      return "bg-red-500 text-white border-red-500";
    } else {
      return "bg-orange-500 text-white border-orange-500";
    }
  };

  // Format date for case date display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}

      {/* Breadcrumb */}
      <div className="text-sm flex items-center gap-2 text-gray-600">
        <div>
          <Button onClick={handleBack} variant="textBtn">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
        <p className="hover:text-gray-900 cursor-pointer">Case</p>
        <div className="mx-2">/</div>
        <p className="text-gray-900 font-medium">
          {caseData.case_number}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Case Information Panel - Left and Center */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            {/* Case Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Case</h1>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-gray-700">
                    {caseData.case_number}
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStageStyle(
                      caseData.case_stage
                    )}`}
                  >
                    {caseData.case_stage}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Client Information (BILL TO) */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">
                  Client (BILL TO)
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-900">
                    {caseData.client_details.name}
                  </p>
                  <p className="text-gray-600 flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    {caseData.client_details.address}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {caseData.client_details.phone}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {caseData.client_details.email}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Account ID: {caseData.client_details.account_id}
                  </p>
                  {caseData.client_details.details && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
                        Details
                      </p>
                      <p className="text-sm text-gray-700">
                        {caseData.client_details.details}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Party Information (SHIP TO) */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">
                  Party (OPPOSITE)
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-900">
                    {caseData.party_details.name}
                  </p>
                  <p className="text-gray-600 flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    {caseData.party_details.address}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {caseData.party_details.phone}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {caseData.party_details.email}
                  </p>
                  {caseData.party_details.details && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
                        Details
                      </p>
                      <p className="text-sm text-gray-700">
                        {caseData.party_details.details}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Case Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
                  Case Date
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {formatDate(new Date().toISOString())}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
                  Court
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {caseData.court_details.name}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
                  Lawyer
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {caseData.lawyer_details.name}
                </p>
              </div>
            </div>

            {/* Notes/Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase mb-2">
                Case Description
              </h3>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">
                  {caseData.case_description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Payment and Timeline */}
        <div className="space-y-6">
          {/* Payment Panel Component */}
          <PaymentPanel
            payments={caseData.payments}
            onAddPayment={() => {
              setSelectedPayment(undefined);
              setPaymentDialogOpen(true);
            }}
            onEditPayment={(payment: {
              paid_date: string;
              paid_amount: number;
            }) => {
              setSelectedPayment({
                date: payment.paid_date,
                payment_for_hearing: "",
                amount: payment.paid_amount,
              });
              setPaymentDialogOpen(true);
            }}
          />

          {/* Case Timeline Component */}
          <CaseTimeline
            hearings={caseData.hearings}
            courtName={caseData.court_details.name}
            onAddHearing={() => {
              setSelectedHearing(undefined);
              setHearingDialogOpen(true);
            }}
            onEditHearing={(hearing: {
              title: string;
              serial_no: string;
              hearing_date: string;
              details: string;
              file?: string;
            }) => {
              setSelectedHearing({
                title: hearing.title,
                serial_no: hearing.serial_no,
                date: hearing.hearing_date,
                note: hearing.details,
                file: hearing.file,
              });
              setHearingDialogOpen(true);
            }}
          />
        </div>
      </div>

      {/* Payment Form Dialog */}
      <PaymentForm
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        instance={selectedPayment}
        hearings={caseData.hearings}
        caseId={caseData.id}
        caseNumber={caseData.case_number}
        fileNumber={caseData.file_number}
      />

      {/* Hearing Form Dialog */}
      <HearingForm
        open={hearingDialogOpen}
        onOpenChange={setHearingDialogOpen}
        instance={selectedHearing}
        caseId={caseData.id}
        caseNumber={caseData.case_number}
        fileNumber={caseData.file_number}
      />
    </div>
  );
}
