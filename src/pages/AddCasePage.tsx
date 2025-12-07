/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plus,
  ChevronRight,
  ChevronLeft,
  FileText,
  User,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Schema and Types
const schema = z.object({
  case_number: z.string().min(1, "Case number is required"),
  file_number: z.string().min(1, "File number is required"),
  court_id: z.string().min(1, "Court is required"),
  lawyer_id: z.string().min(1, "Lawyer is required"),
  case_stage: z.string().min(1, "Case stage is required"),
  case_description: z.string().min(1, "Case description is required"),

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

interface StepConfig {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Court {
  id: string;
  name: string;
}

interface Lawyer {
  id: string;
  name: string;
}

// Constants
const steps: StepConfig[] = [
  {
    number: 1,
    title: "Case Information",
    description: "Enter basic case details",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    number: 2,
    title: "Client Details",
    description: "Add client information",
    icon: <User className="w-5 h-5" />,
  },
  {
    number: 3,
    title: "Party Details",
    description: "Add party information",
    icon: <Users className="w-5 h-5" />,
  },
];

const courts: Court[] = [
  { id: "1", name: "Supreme Court" },
  { id: "2", name: "District Court - Civil Division" },
  { id: "3", name: "District Court - Criminal" },
  { id: "4", name: "High Court" },
  { id: "5", name: "Family Court" },
  { id: "6", name: "Labor Court" },
];

const lawyers: Lawyer[] = [
  { id: "1", name: "Sarah Johnson" },
  { id: "2", name: "Robert Williams" },
  { id: "3", name: "Jennifer Martinez" },
  { id: "4", name: "David Anderson" },
  { id: "5", name: "Amanda Clark" },
  { id: "6", name: "Christopher Lee" },
];

const caseStages: string[] = [
  "Filing",
  "Hearing",
  "Pending",
  "Completed",
  "Closed",
];

// Components
const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {steps.map((s, index) => (
          <div key={s.number} className="flex items-center flex-1">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                currentStep >= s.number
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {s.number}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                  currentStep > s.number ? "bg-blue-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-3">
        <div className="p-3 rounded-lg bg-blue-100">
          {currentStep === 1 && <FileText className="w-6 h-6 text-blue-600" />}
          {currentStep === 2 && <User className="w-6 h-6 text-blue-600" />}
          {currentStep === 3 && <Users className="w-6 h-6 text-blue-600" />}
        </div>
        <div>
          <p className="text-sm font-semibold text-blue-600">
            Step {currentStep} of 3
          </p>
          <h2 className="text-2xl font-bold text-gray-900">
            {steps[currentStep - 1].title}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            {steps[currentStep - 1].description}
          </p>
        </div>
      </div>
    </div>
  );
};

const FormField = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
          <span>✕</span> <span>{error}</span>
        </p>
      )}
    </div>
  );
};

const Step1Form = ({
  register,
  errors,
  setValue,
  watch,
}: {
  register: any;
  errors: any;
  setValue: any;
  watch: any;
}) => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Case Number" error={errors.case_number?.message}>
          <Input
            {...register("case_number")}
            placeholder="e.g., CIV/2024/001"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </FormField>

        <FormField label="File Number" error={errors.file_number?.message}>
          <Input
            {...register("file_number")}
            placeholder="Enter file number"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </FormField>

        <FormField label="Court" error={errors.court_id?.message}>
          <Select
            value={watch("court_id")}
            onValueChange={(value: any) =>
              setValue("court_id", value, { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              <SelectValue placeholder="Select a court" />
            </SelectTrigger>
            <SelectContent>
              {courts.map((court) => (
                <SelectItem key={court.id} value={court.id}>
                  {court.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Lawyer" error={errors.lawyer_id?.message}>
          <Select
            value={watch("lawyer_id")}
            onValueChange={(value: any) =>
              setValue("lawyer_id", value, { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              <SelectValue placeholder="Select a lawyer" />
            </SelectTrigger>
            <SelectContent>
              {lawyers.map((lawyer) => (
                <SelectItem key={lawyer.id} value={lawyer.id}>
                  {lawyer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Case Stage" error={errors.case_stage?.message}>
          <Select
            value={watch("case_stage")}
            onValueChange={(value: any) =>
              setValue("case_stage", value, { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              <SelectValue placeholder="Select case stage" />
            </SelectTrigger>
            <SelectContent>
              {caseStages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <FormField
        label="Case Description"
        error={errors.case_description?.message}
      >
        <Textarea
          {...register("case_description")}
          placeholder="Provide detailed information about the case"
          rows={5}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
        />
      </FormField>
    </div>
  );
};

const Step2Form = ({ register, errors }: { register: any; errors: any }) => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Client Name" error={errors.client_name?.message}>
          <Input
            {...register("client_name")}
            placeholder="Enter client name"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </FormField>

        <FormField
          label="Account Number"
          error={errors.account_number?.message}
        >
          <Input
            {...register("account_number")}
            placeholder="Enter account number"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </FormField>

        <FormField label="Account Name" error={errors.account_name?.message}>
          <Input
            {...register("account_name")}
            placeholder="Enter account name"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </FormField>

        <FormField label="Account ID" error={errors.account_id?.message}>
          <Input
            {...register("account_id")}
            placeholder="Enter account ID"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </FormField>
      </div>

      <FormField
        label="Client Description"
        error={errors.client_description?.message}
      >
        <Textarea
          {...register("client_description")}
          placeholder="Provide details about the client"
          rows={5}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
        />
      </FormField>
    </div>
  );
};

const Step3Form = ({ register, errors }: { register: any; errors: any }) => {
  return (
    <div className="space-y-5">
      <FormField label="Party Name" error={errors.party_name?.message}>
        <Input
          {...register("party_name")}
          placeholder="Enter party name"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </FormField>

      <FormField
        label="Party Description"
        error={errors.party_description?.message}
      >
        <Textarea
          {...register("party_description")}
          placeholder="Provide details about the party"
          rows={5}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
        />
      </FormField>

      <FormField label="Additional Notes" error={errors.party_notes?.message}>
        <Textarea
          {...register("party_notes")}
          placeholder="Add any additional notes about the party"
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
        />
      </FormField>
    </div>
  );
};

const FormNavigation = ({
  currentStep,
  isLastStep,
  isSubmitting,
  onPrevious,
  onNext,
}: {
  currentStep: number;
  isLastStep: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
}) => {
  return (
    <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="flex items-center space-x-2 px-6 py-3 text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Previous</span>
      </button>

      {!isLastStep ? (
        <button
          type="button"
          onClick={onNext}
          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>Submit Case</span>
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

// Main Component
export default function AddCasePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      case_number: "",
      file_number: "",
      court_id: "",
      lawyer_id: "",
      case_stage: "",
      case_description: "",
      client_name: "",
      client_description: "",
      account_number: "",
      account_name: "",
      account_id: "",
      party_name: "",
      party_description: "",
      party_notes: "",
    },
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
      alert("Case added successfully!");
      setLoading(false);
      setStep(1);
      form.reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue-500 via-orange-500 to-green-500"></div>

        <div className="p-8 lg:p-10">
          <div className="mb-10">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Case</h1>
            </div>
            <p className="text-gray-600">
              Fill in the details to register a new legal case
            </p>
          </div>

          <StepIndicator currentStep={step} />

          <div onSubmit={form.handleSubmit(onSubmit)}>
            {step === 1 && (
              <Step1Form
                register={form.register}
                errors={form.formState.errors}
                setValue={form.setValue}
                watch={form.watch}
              />
            )}

            {step === 2 && (
              <Step2Form
                register={form.register}
                errors={form.formState.errors}
              />
            )}

            {step === 3 && (
              <Step3Form
                register={form.register}
                errors={form.formState.errors}
              />
            )}

            <FormNavigation
              currentStep={step}
              isLastStep={step === 3}
              isSubmitting={loading}
              onPrevious={prevStep}
              onNext={nextStep}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">Note:</span> All
          information will be securely stored and can be edited later in the
          Cases section.
        </p>
      </div>
    </div>
  );
}
