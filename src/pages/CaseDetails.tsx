"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentPanel from "@/components/pageComponent/cases/PaymentPanel";
import CaseTimeline from "@/components/pageComponent/cases/CaseTimeline";
import PaymentForm from "@/components/pageComponent/cases/PaymentForm";
import HearingForm from "@/components/pageComponent/cases/HearingForm";
import type { TCase } from "@/types/case.type";
import { casesApi, type CaseListItem } from "@/lib/api";

// Local helper to map API case shape to TCase (same as in Cases.tsx)
const mapApiCaseToTCase = (apiCase: CaseListItem): TCase => {
  const raw: any = apiCase as any;

  const firstClient = (raw.caseClients ?? raw.case_clients)?.[0];
  const firstParty = (raw.caseParties ?? raw.case_parties)?.[0];
  const hearingsArr = raw.caseHearings ?? raw.case_hearings;
  const paymentsArr = raw.casePayments ?? raw.case_payments;

  const hearings =
    Array.isArray(hearingsArr)
      ? hearingsArr.map((h: any) => ({
          title: h.title,
          serial_no: h.serial_number,
          hearing_date: h.date,
          details: h.note || "",
          file: h.file,
        }))
      : [];

  const payments =
    Array.isArray(paymentsArr)
      ? paymentsArr.map((p: any) => ({
          paid_amount: p.amount,
          paid_date: p.date,
        }))
      : [];

  const stageMap: Record<string, "Active" | "Disposed" | "Left"> = {
    active: "Active",
    disposed: "Disposed",
    left: "Left",
    archive: "Disposed",
  };

  return {
    id: String(apiCase.id),
    case_number: apiCase.number_of_case,
    file_number: apiCase.file_number || "",
    case_stage: stageMap[apiCase.stages?.toLowerCase() || "active"] || "Active",
    case_description: apiCase.description || "",
    case_date: apiCase.date || "",
    court_id: String(apiCase.court_id),
    court_details: apiCase.court
      ? {
          id: String(apiCase.court.id),
          name: apiCase.court.name,
          address: apiCase.court.address,
        }
      : {
          id: "",
          name: "",
          address: "",
        },
    lawyer_id: String(apiCase.lawyer_id),
    lawyer_details: apiCase.lawyer
      ? {
          id: String(apiCase.lawyer.id),
          name: apiCase.lawyer.name,
          email: apiCase.lawyer.email || "",
          phone: apiCase.lawyer.mobile || "",
          address: "",
          details: "",
          thumbnail: apiCase.lawyer.image || "",
        }
      : {
          id: "",
          name: "",
          email: "",
          phone: "",
          address: "",
          details: "",
          thumbnail: "",
        },
    client_id: firstClient ? String(firstClient.id) : "",
    client_details: firstClient
      ? {
          id: String(firstClient.id),
          name: firstClient.client_name,
          email: firstClient.client_email || "",
          phone: firstClient.client_phone || "",
          address: firstClient.client_address || "",
          details: "",
          thumbnail: "",
          account_number: firstClient.billing_account_number || "",
          account_name: firstClient.billing_account_name || "",
          account_id: firstClient.billing_bank_name || "",
          description: firstClient.client_description || "",
          branch: firstClient.billing_branch_name || "",
        }
      : {
          id: "",
          name: "",
          email: "",
          phone: "",
          address: "",
          details: "",
          thumbnail: "",
          account_number: "",
          account_name: "",
          account_id: "",
          description: "",
          branch: "",
        },
    party_id: firstParty ? String(firstParty.id) : "",
    party_details: firstParty
      ? {
          id: String(firstParty.id),
          name: firstParty.party_name,
          email: firstParty.party_email || "",
          phone: firstParty.party_phone || "",
          address: firstParty.party_address || "",
          details: firstParty.party_description || "",
          thumbnail: "",
          reference: firstParty.reference || "",
        }
      : {
          id: "",
          name: "",
          email: "",
          phone: "",
          address: "",
          details: "",
          thumbnail: "",
          reference: "",
        },
    hearings,
    payments,
  };
};

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
  const [caseData, setCaseData] = useState<TCase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCase = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      setError(null);
      const response = await casesApi.getById(Number(id));
      const apiData: any =
        response.data && (response.data as any).data
          ? (response.data as any).data
          : response.data;

      if (!apiData) {
        setCaseData(null);
        setError("Case not found");
        return;
      }

      const mapped = mapApiCaseToTCase(apiData as CaseListItem);
      setCaseData(mapped);
    } catch (err: any) {
      setError(err.message || "Failed to load case");
      setCaseData(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCase();
  }, [fetchCase]);

  const handleBack = () => {
    navigate("/dashboard/cases");
  };

  const handleHearingCreated = () => {
    fetchCase();
  };

  const handlePaymentCreated = () => {
    fetchCase();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-primary-green/30 border-t-primary-green rounded-full animate-spin" />
          <p className="text-sm text-gray-600">Loading case details...</p>
        </div>
      </div>
    );
  }

  if (!caseData || error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Case Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {error || "Unable to load case details."}
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
                  {caseData.case_date
                    ? formatDate(caseData.case_date)
                    : "N/A"}
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
        onCreated={handlePaymentCreated}
      />

      {/* Hearing Form Dialog */}
      <HearingForm
        open={hearingDialogOpen}
        onOpenChange={setHearingDialogOpen}
        instance={selectedHearing}
        caseId={caseData.id}
        caseNumber={caseData.case_number}
        fileNumber={caseData.file_number}
        onCreated={handleHearingCreated}
      />
    </div>
  );
}
