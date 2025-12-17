"use client";

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  User,
  Users,
  Calendar,
  DollarSign,
  MapPin,
  Scale,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import type { TCase } from "@/types/case.type";
import {
  casesApi,
  caseClientsApi,
  casePartiesApi,
  courtsApi,
  usersApi,
  type CaseListItem,
  type Court,
  type UserListItem,
} from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import PaymentPanel from "@/components/pageComponent/cases/PaymentPanel";
import CaseTimeline from "@/components/pageComponent/cases/CaseTimeline";
import PaymentForm from "@/components/pageComponent/cases/PaymentForm";
import HearingForm from "@/components/pageComponent/cases/HearingForm";
import { toast } from "sonner";

// ---------- helpers ----------

const stageMapToApi: Record<"Active" | "Disposed" | "Left", string> = {
  Active: "active",
  Disposed: "disposed",
  Left: "left",
};

const stageMapFromApi: Record<string, "Active" | "Disposed" | "Left"> = {
  active: "Active",
  disposed: "Disposed",
  left: "Left",
  archive: "Disposed",
};

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

  return {
    id: String(apiCase.id),
    case_number: apiCase.number_of_case,
    file_number: apiCase.file_number || "",
    case_stage: stageMapFromApi[apiCase.stages?.toLowerCase() || "active"] || "Active",
    case_description: apiCase.description || "",
    case_date: apiCase.date || "",
    court_id: String(apiCase.court_id),
    court_details: apiCase.court
      ? {
          id: String(apiCase.court.id),
          name: apiCase.court.name,
          address: apiCase.court.address,
        }
      : { id: "", name: "", address: "" },
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

const caseSchema = z.object({
  date: z.string().min(1, "Date is required"),
  number_of_case: z.string().min(1, "Case number is required"),
  stages: z.enum(["Active", "Disposed", "Left"]),
  court_id: z.string().min(1, "Court is required"),
  lawyer_id: z.string().min(1, "Lawyer is required"),
  description: z.string().min(1, "Description is required"),
});

const clientSchema = z.object({
  client_name: z.string().min(1, "Client name is required"),
  client_email: z.string().email("Invalid email address").optional().or(z.literal("")),
  client_phone: z.string().optional(),
  client_address: z.string().optional(),
  account_number: z.string().optional(),
  account_name: z.string().optional(),
  account_id: z.string().optional(),
  description: z.string().optional(),
  branch: z.string().optional(),
});

const partySchema = z.object({
  party_name: z.string().min(1, "Party name is required"),
  party_email: z.string().email("Invalid email address").optional().or(z.literal("")),
  party_phone: z.string().optional(),
  party_address: z.string().optional(),
  reference: z.string().optional(),
  description: z.string().optional(),
});

type CaseFormValues = z.infer<typeof caseSchema>;
type ClientFormValues = z.infer<typeof clientSchema>;
type PartyFormValues = z.infer<typeof partySchema>;

// ---------- page ----------

export default function CaseEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [caseData, setCaseData] = useState<TCase | null>(null);
  const [rawCase, setRawCase] = useState<CaseListItem | null>(null);
  const [courts, setCourts] = useState<Court[]>([]);
  const [lawyers, setLawyers] = useState<UserListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [hearingDialogOpen, setHearingDialogOpen] = useState(false);
  const [selectedHearing, setSelectedHearing] = useState<
    | { title: string; serial_no: string; date: string; note: string; file?: string }
    | undefined
  >(undefined);

  const caseForm = useForm<CaseFormValues>({
    resolver: zodResolver(caseSchema),
  });
  const clientForm = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
  });
  const partyForm = useForm<PartyFormValues>({
    resolver: zodResolver(partySchema),
  });

  const canEdit = user?.role === "admin" || user?.role === "owner";

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
        setError("Case not found");
        setCaseData(null);
        return;
      }

      setRawCase(apiData as CaseListItem);
      const mapped = mapApiCaseToTCase(apiData as CaseListItem);
      setCaseData(mapped);

      // Initialize forms with fetched data
      caseForm.reset({
        date: mapped.case_date || "",
        number_of_case: mapped.case_number,
        stages: mapped.case_stage,
        court_id: mapped.court_id,
        lawyer_id: mapped.lawyer_id,
        description: mapped.case_description,
      });

      clientForm.reset({
        client_name: mapped.client_details.name,
        client_email: mapped.client_details.email || "",
        client_phone: mapped.client_details.phone || "",
        client_address: mapped.client_details.address || "",
        account_number: mapped.client_details.account_number || "",
        account_name: mapped.client_details.account_name || "",
        account_id: mapped.client_details.account_id || "",
        description: mapped.client_details.description || "",
        branch: mapped.client_details.branch || "",
      });

      partyForm.reset({
        party_name: mapped.party_details.name,
        party_email: mapped.party_details.email || "",
        party_phone: mapped.party_details.phone || "",
        party_address: mapped.party_details.address || "",
        reference: mapped.party_details.reference || "",
        description: mapped.party_details.details || "",
      });
    } catch (err: any) {
      setError(err.message || "Failed to load case");
      setCaseData(null);
    } finally {
      setIsLoading(false);
    }
  }, [id, caseForm, clientForm, partyForm]);

  useEffect(() => {
    fetchCase();
  }, [fetchCase]);

  // fetch courts & lawyers for selects
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [courtsRes, lawyersRes] = await Promise.all([
          courtsApi.getAll({ status: true, per_page: 100 }),
          usersApi.getAll({ role: "lawyer", per_page: 100 }),
        ]);
        if (courtsRes.data) setCourts(courtsRes.data.data || []);
        if (lawyersRes.data) setLawyers(lawyersRes.data.data || []);
      } catch (err) {
        // already handled in other places if needed
      }
    };
    loadOptions();
  }, []);

  const handleBack = () => {
    navigate("/dashboard/cases");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const onCaseSubmit = async (values: CaseFormValues) => {
    if (!rawCase || !id) return;
    try {
      const toastId = toast.loading("Updating case details...");
      await casesApi.update(Number(id), {
        date: values.date,
        number_of_case: values.number_of_case,
        stages: stageMapToApi[values.stages],
        court_id: Number(values.court_id),
        lawyer_id: Number(values.lawyer_id),
        description: values.description,
      });
      toast.success("Case details updated successfully", { id: toastId });
      await fetchCase();
    } catch (err: any) {
      toast.error(err.message || "Failed to update case details");
    }
  };

  const onClientSubmit = async (values: ClientFormValues) => {
    if (!rawCase) return;
    const raw: any = rawCase as any;
    const firstClient = (raw.caseClients ?? raw.case_clients)?.[0];
    if (!firstClient) {
      toast.error("No client record found for this case.");
      return;
    }
    try {
      const toastId = toast.loading("Updating client details...");
      await caseClientsApi.update(firstClient.id, {
        client_name: values.client_name,
        client_email: values.client_email || null,
        client_phone: values.client_phone || null,
        client_address: values.client_address || null,
        billing_account_name: values.account_name || null,
        billing_account_number: values.account_number || null,
        billing_bank_name: "", // adjust when you add to UI
        billing_branch_name: values.branch || null,
        client_description: values.description || null,
        case_id: Number(id),
      });
      toast.success("Client details updated successfully", { id: toastId });
      await fetchCase();
    } catch (err: any) {
      toast.error(err.message || "Failed to update client details");
    }
  };

  const onPartySubmit = async (values: PartyFormValues) => {
    if (!rawCase) return;
    const raw: any = rawCase as any;
    const firstParty = (raw.caseParties ?? raw.case_parties)?.[0];
    if (!firstParty) {
      toast.error("No party record found for this case.");
      return;
    }
    try {
      const toastId = toast.loading("Updating party details...");
      await casePartiesApi.update(firstParty.id, {
        party_name: values.party_name,
        party_email: values.party_email || null,
        party_phone: values.party_phone || null,
        party_address: values.party_address || null,
        reference: values.reference || null,
        party_description: values.description || null,
        case_id: Number(id),
      });
      toast.success("Party details updated successfully", { id: toastId });
      await fetchCase();
    } catch (err: any) {
      toast.error(err.message || "Failed to update party details");
    }
  };

  const handleHearingCreated = () => {
    fetchCase();
  };

  const handlePaymentCreated = () => {
    fetchCase();
  };

  if (!canEdit) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Access restricted</h1>
          <p className="text-gray-600">
            Only administrators and owners can edit case details.
          </p>
          <Button variant="outlineBtn" onClick={handleBack}>
            Go back to cases
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading || !caseData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-primary-green/30 border-t-primary-green rounded-full animate-spin" />
          <p className="text-sm text-gray-600">Loading case editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header / Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Button onClick={handleBack} variant="textBtn">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <span className="cursor-pointer hover:text-gray-900">Cases</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-semibold">
            Edit {caseData.case_number}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border bg-emerald-50 border-emerald-200 text-emerald-700">
            <FileText className="w-3 h-3 mr-1" />
            Edit Mode
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left / Center: Case + Client + Party forms */}
        <div className="xl:col-span-2 space-y-6">
          {/* Case overview card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-green/10 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-primary-green" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {caseData.case_number}
                  </h1>
                  <p className="text-xs text-gray-500 mt-1">
                    Case ID #{caseData.id} •{" "}
                    {caseData.case_date ? formatDate(caseData.case_date) : "No date"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  Stage
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border bg-primary-green/10 text-gray-800 border-primary-green/40">
                  {caseData.case_stage}
                </span>
              </div>
            </div>

            {/* Case form */}
            <form
              onSubmit={caseForm.handleSubmit(onCaseSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label htmlFor="case-date">Case Date</Label>
                <Input
                  id="case-date"
                  type="date"
                  className="h-10"
                  {...caseForm.register("date")}
                />
                {caseForm.formState.errors.date && (
                  <p className="text-xs text-red-500">
                    {caseForm.formState.errors.date.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="case-number">Case Number</Label>
                <Input
                  id="case-number"
                  placeholder="Enter case number"
                  className="h-10"
                  {...caseForm.register("number_of_case")}
                />
                {caseForm.formState.errors.number_of_case && (
                  <p className="text-xs text-red-500">
                    {caseForm.formState.errors.number_of_case.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="court">Court</Label>
                <Select
                  value={caseForm.watch("court_id")}
                  onValueChange={(v: string) => caseForm.setValue("court_id", v)}
                >
                  <SelectTrigger id="court" className="h-10">
                    <SelectValue placeholder="Select court" />
                  </SelectTrigger>
                  <SelectContent>
                    {courts.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {caseForm.formState.errors.court_id && (
                  <p className="text-xs text-red-500">
                    {caseForm.formState.errors.court_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lawyer">Lawyer</Label>
                <Select
                  value={caseForm.watch("lawyer_id")}
                  onValueChange={(v: string) => caseForm.setValue("lawyer_id", v)}
                >
                  <SelectTrigger id="lawyer" className="h-10">
                    <SelectValue placeholder="Select lawyer" />
                  </SelectTrigger>
                  <SelectContent>
                    {lawyers.map((l) => (
                      <SelectItem key={l.id} value={String(l.id)}>
                        {l.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {caseForm.formState.errors.lawyer_id && (
                  <p className="text-xs text-red-500">
                    {caseForm.formState.errors.lawyer_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Case Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  className="min-h-[90px]"
                  {...caseForm.register("description")}
                />
                {caseForm.formState.errors.description && (
                  <p className="text-xs text-red-500">
                    {caseForm.formState.errors.description.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2 flex justify-end pt-2">
                <Button type="submit" className="bg-primary-green hover:bg-primary-green/90">
                  Save Case Changes
                </Button>
              </div>
            </form>
          </div>

          {/* Client & Party side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Client card */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Client (Bill To)
                  </h2>
                  <p className="text-xs text-gray-500">
                    Update client & billing information
                  </p>
                </div>
              </div>

              <form onSubmit={clientForm.handleSubmit(onClientSubmit)} className="space-y-3">
                <div className="space-y-1.5">
                  <Label>Client Name</Label>
                  <Input
                    className="h-9"
                    placeholder="Client name"
                    {...clientForm.register("client_name")}
                  />
                  {clientForm.formState.errors.client_name && (
                    <p className="text-xs text-red-500">
                      {clientForm.formState.errors.client_name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    className="h-9"
                    placeholder="Email address"
                    {...clientForm.register("client_email")}
                  />
                  {clientForm.formState.errors.client_email && (
                    <p className="text-xs text-red-500">
                      {clientForm.formState.errors.client_email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Phone</Label>
                  <Input
                    className="h-9"
                    placeholder="Phone number"
                    {...clientForm.register("client_phone")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Address</Label>
                  <Textarea
                    rows={2}
                    className="min-h-[60px]"
                    placeholder="Client address"
                    {...clientForm.register("client_address")}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Account ID</Label>
                    <Input
                      className="h-9"
                      placeholder="Account ID"
                      {...clientForm.register("account_id")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Account Number</Label>
                    <Input
                      className="h-9"
                      placeholder="Account number"
                      {...clientForm.register("account_number")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Account Name</Label>
                    <Input
                      className="h-9"
                      placeholder="Account name"
                      {...clientForm.register("account_name")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Branch</Label>
                    <Input
                      className="h-9"
                      placeholder="Branch name"
                      {...clientForm.register("branch")}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Textarea
                    rows={2}
                    className="min-h-[60px]"
                    placeholder="Additional notes"
                    {...clientForm.register("description")}
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" variant="outlineBtn" className="h-9 px-4">
                    Save Client
                  </Button>
                </div>
              </form>
            </div>

            {/* Party card */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Party (Opposite)
                  </h2>
                  <p className="text-xs text-gray-500">
                    Update opposite party details
                  </p>
                </div>
              </div>

              <form onSubmit={partyForm.handleSubmit(onPartySubmit)} className="space-y-3">
                <div className="space-y-1.5">
                  <Label>Party Name</Label>
                  <Input
                    className="h-9"
                    placeholder="Party name"
                    {...partyForm.register("party_name")}
                  />
                  {partyForm.formState.errors.party_name && (
                    <p className="text-xs text-red-500">
                      {partyForm.formState.errors.party_name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    className="h-9"
                    placeholder="Email address"
                    {...partyForm.register("party_email")}
                  />
                  {partyForm.formState.errors.party_email && (
                    <p className="text-xs text-red-500">
                      {partyForm.formState.errors.party_email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Phone</Label>
                  <Input
                    className="h-9"
                    placeholder="Phone number"
                    {...partyForm.register("party_phone")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Address</Label>
                  <Textarea
                    rows={2}
                    className="min-h-[60px]"
                    placeholder="Party address"
                    {...partyForm.register("party_address")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Reference</Label>
                  <Input
                    className="h-9"
                    placeholder="Reference"
                    {...partyForm.register("reference")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Textarea
                    rows={2}
                    className="min-h-[60px]"
                    placeholder="Additional notes"
                    {...partyForm.register("description")}
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" variant="outlineBtn" className="h-9 px-4">
                    Save Party
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right column: Hearings & Payments (reuse existing components) */}
        <div className="space-y-6">
          {/* Quick stats card */}
          <div className="bg-gradient-to-br from-primary-green/10 via-white to-blue-50 border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary-green" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Quick summary
                  </p>
                  <p className="font-semibold text-gray-900">
                    {caseData.hearings.length} hearings •{" "}
                    {caseData.payments.length} payments
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>
                  {caseData.case_date ? formatDate(caseData.case_date) : "No date"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span className="truncate">
                  {caseData.court_details.name || "No court"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>
                  {caseData.payments.reduce((s, p) => s + p.paid_amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Payments */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Payments
                  </h3>
                  <p className="text-xs text-gray-500">
                    Manage all payments for this case
                  </p>
                </div>
              </div>
            </div>

            <PaymentPanel
              payments={caseData.payments}
              onAddPayment={() => setPaymentDialogOpen(true)}
              onEditPayment={() => setPaymentDialogOpen(true)}
            />
          </div>

          {/* Hearings / timeline */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Hearings timeline
                  </h3>
                  <p className="text-xs text-gray-500">
                    Add or adjust upcoming and past hearings
                  </p>
                </div>
              </div>
            </div>

            <CaseTimeline
              hearings={caseData.hearings}
              courtName={caseData.court_details.name}
              onAddHearing={() => {
                setSelectedHearing(undefined);
                setHearingDialogOpen(true);
              }}
              onEditHearing={(hearing) => {
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
      </div>

      {/* Hearing modal */}
      <HearingForm
        open={hearingDialogOpen}
        onOpenChange={setHearingDialogOpen}
        instance={selectedHearing}
        caseId={caseData.id}
        caseNumber={caseData.case_number}
        fileNumber={caseData.file_number}
        onCreated={handleHearingCreated}
      />

      {/* Payment modal */}
      <PaymentForm
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        hearings={caseData.hearings}
        caseId={caseData.id}
        caseNumber={caseData.case_number}
        fileNumber={caseData.file_number}
        onCreated={handlePaymentCreated}
      />
    </div>
  );
}


