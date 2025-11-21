"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { User, FileText, CheckCircle } from "lucide-react";
import { toast } from "sonner";

// ------------------------------------------------------
// STEP INDICATOR
// ------------------------------------------------------
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  const steps = [
    { number: 1, title: "Case Information", icon: User },
    { number: 2, title: "Client Details", icon: FileText },
    { number: 3, title: "Parties Details", icon: CheckCircle },
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isCurrent
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-gray-100 border-gray-300 text-gray-500"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step.number}</span>
                )}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  isCompleted || isCurrent ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

// ------------------------------------------------------
// STEP HEADER
// ------------------------------------------------------
type StepHeaderProps = {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
  description: string;
};

const StepHeader = ({ title, description }: StepHeaderProps) => {
  return (
    <div className="text-center mb-8">
      {/* <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-primary" />
      </div> */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// ------------------------------------------------------
// VALIDATION
// ------------------------------------------------------
const schema = z.object({
  case_number: z.string().min(1, "Case number is required"),
  file_number: z.string().min(1, "File number is required"),
  court_id: z.string().min(1, "Court is required"),
  lawyer_id: z.string().min(1, "Lawyer is required"),
  case_stage: z.string().min(1, "Case stage is required"),
  case_description: z.string().min(1, "Case description is required"),
  client_id: z.string().min(1, "Client is required"),
  parties_id: z.string().min(1, "Parties is required"),

  client_name: z.string().min(1, "Name is required"),
  client_description: z.string().min(1, "Description is required"),
  account_number: z.string().min(1, "Account number is required"),
  account_name: z.string().min(1, "Account name is required"),
  account_id: z.string().min(1, "Account ID is required"),

  party_name: z.string().min(1, "Name is required"),
  party_description: z.string().min(1, "Description is required"),
  party_notes: z.string().min(1, "Notes are required"),
});

type FormType = z.infer<typeof schema>;

// ------------------------------------------------------
// STATIC DATA
// ------------------------------------------------------
const courts = [
  { id: "1", name: "Supreme Court" },
  { id: "2", name: "District Court" },
];

const lawyers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Imran Hossain" },
];

const caseStages = ["Hearing", "Filing", "Pending", "Closed"];

const clients = [
  { id: "1", name: "Client One" },
  { id: "2", name: "Client Two" },
];

const parties = [
  { id: "1", name: "Party A" },
  { id: "2", name: "Party B" },
];

// ------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------
export default function AddCasePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // VALIDATE STEP
  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof FormType)[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = [
          "case_number",
          "file_number",
          "court_id",
          "lawyer_id",
          "case_stage",
          "case_description",
          "client_id",
          "parties_id",
        ];
        break;

      case 2:
        fieldsToValidate = [
          "client_name",
          "client_description",
          "account_number",
          "account_name",
          "account_id",
        ];
        break;

      case 3:
        fieldsToValidate = ["party_name", "party_description", "party_notes"];
        break;
    }

    return await form.trigger(fieldsToValidate);
  };

  // NEXT STEP
  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && step < 3) setStep(step + 1);
  };

  // PREVIOUS STEP
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const onSubmit = (data: FormType) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Form submitted:", data);
      toast.success("Case added successfully!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Add New Case</h1>

      <div className="space-y-6 bg-white p-4 md:p-8 lg:p-12 rounded-2xl border">
        <StepIndicator currentStep={step} totalSteps={3} />

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <StepHeader
                title="Case Information"
                description="Enter basic information about the case"
                Icon={User}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Case Number */}
                <div>
                  <Label className="mb-2">Case Number</Label>
                  <Input
                    placeholder="Enter case number"
                    {...form.register("case_number")}
                  />
                  {form.formState.errors.case_number && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.case_number.message}
                    </p>
                  )}
                </div>

                {/* File Number */}
                <div>
                  <Label className="mb-2">File Number</Label>
                  <Input
                    placeholder="Enter file number"
                    {...form.register("file_number")}
                  />
                  {form.formState.errors.file_number && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.file_number.message}
                    </p>
                  )}
                </div>

                {/* Court */}
                <div>
                  <Label className="mb-2">Select Court</Label>
                  <Select
                    onValueChange={(v: string) => form.setValue("court_id", v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose court" />
                    </SelectTrigger>
                    <SelectContent>
                      {courts.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.court_id && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.court_id.message}
                    </p>
                  )}
                </div>

                {/* Lawyer */}
                <div>
                  <Label className="mb-2">Select Lawyer</Label>
                  <Select
                    onValueChange={(v: string) => form.setValue("lawyer_id", v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose lawyer" />
                    </SelectTrigger>
                    <SelectContent>
                      {lawyers.map((l) => (
                        <SelectItem key={l.id} value={l.id}>
                          {l.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.lawyer_id && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.lawyer_id.message}
                    </p>
                  )}
                </div>

                {/* Case Stage */}
                <div>
                  <Label className="mb-2">Case Stage</Label>
                  <Select
                    onValueChange={(v: string) =>
                      form.setValue("case_stage", v)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {caseStages.map((st) => (
                        <SelectItem key={st} value={st}>
                          {st}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.case_stage && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.case_stage.message}
                    </p>
                  )}
                </div>

                {/* Case Description */}
                <div className="md:col-span-2">
                  <Label className="mb-2">Case Description</Label>
                  <Textarea
                    placeholder="Enter case description"
                    {...form.register("case_description")}
                  />
                  {form.formState.errors.case_description && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.case_description.message}
                    </p>
                  )}
                </div>

                {/* Client */}
                <div>
                  <Label className="mb-2">Select Client</Label>
                  <Select
                    onValueChange={(v: string) => form.setValue("client_id", v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.client_id && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.client_id.message}
                    </p>
                  )}
                </div>

                {/* Party */}
                <div>
                  <Label className="mb-2">Select Party</Label>
                  <Select
                    onValueChange={(v: string) =>
                      form.setValue("parties_id", v)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose party" />
                    </SelectTrigger>
                    <SelectContent>
                      {parties.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.parties_id && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.parties_id.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <StepHeader
                title="Client Details"
                description="Provide client details for the case"
                Icon={FileText}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Client Name */}
                <div>
                  <Label className="mb-2">Name</Label>
                  <Input
                    placeholder="Client name"
                    {...form.register("client_name")}
                  />
                  {form.formState.errors.client_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.client_name.message}
                    </p>
                  )}
                </div>

                {/* Account Number */}
                <div>
                  <Label className="mb-2">Account Number</Label>
                  <Input
                    placeholder="Enter account number"
                    {...form.register("account_number")}
                  />
                  {form.formState.errors.account_number && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.account_number.message}
                    </p>
                  )}
                </div>

                {/* Account Name */}
                <div>
                  <Label className="mb-2">Account Name</Label>
                  <Input
                    placeholder="Enter account name"
                    {...form.register("account_name")}
                  />
                  {form.formState.errors.account_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.account_name.message}
                    </p>
                  )}
                </div>

                {/* Account ID */}
                <div>
                  <Label className="mb-2">Account ID</Label>
                  <Input
                    placeholder="Enter account ID"
                    {...form.register("account_id")}
                  />
                  {form.formState.errors.account_id && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.account_id.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <Label className="mb-2">Description</Label>
                  <Textarea
                    placeholder="Client description"
                    {...form.register("client_description")}
                  />
                  {form.formState.errors.client_description && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.client_description.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <StepHeader
                title="Parties Details"
                description="Enter the details of the involved parties"
                Icon={CheckCircle}
              />

              <div className="grid grid-cols-1 gap-4">
                {/* Party Name */}
                <div>
                  <Label className="mb-2">Name</Label>
                  <Input
                    placeholder="Party name"
                    {...form.register("party_name")}
                  />
                  {form.formState.errors.party_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.party_name.message}
                    </p>
                  )}
                </div>

                {/* Party Description */}
                <div>
                  <Label className="mb-2">Description</Label>
                  <Textarea
                    placeholder="Party description"
                    {...form.register("party_description")}
                  />
                  {form.formState.errors.party_description && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.party_description.message}
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <Label className="mb-2">Notes</Label>
                  <Textarea
                    placeholder="Additional notes"
                    {...form.register("party_notes")}
                  />
                  {form.formState.errors.party_notes && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.party_notes.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* STEP BUTTONS */}
          <div className="flex justify-between pt-4">
            {step > 1 ? (
              <Button type="button" variant="outlineBtn" onClick={prevStep}>
                Previous
              </Button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
