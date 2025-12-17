"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { usersApi, casesApi, courtsApi, type UserListItem, type Court } from "@/lib/api";

const caseBasicInfoSchema = z.object({
  date: z.string().min(1, "Date is required"),
  number_of_file: z.string().min(1, "Number of file is required"),
  number_of_case: z.string().min(1, "Number of case is required"),
  court_id: z.string().min(1, "Court is required"),
  stages: z.enum(["Active", "Disposed", "Left"], {
    message: "Stage is required",
  }),
  breakdowns: z.string().min(1, "Breakdowns is required"),
  lawyer_id: z.string().min(1, "Lawyer is required"),
});

type CaseBasicInfoFormType = z.infer<typeof caseBasicInfoSchema>;

interface CaseBasicInfoFormProps {
  instance?: CaseBasicInfoFormType;
  isActive?: boolean;
  onStepComplete?: () => void;
}

const CaseBasicInfoForm = ({ 
  instance, 
  isActive = true,
  onStepComplete 
}: CaseBasicInfoFormProps) => {
  const [lawyers, setLawyers] = useState<UserListItem[]>([]);
  const [isLoadingLawyers, setIsLoadingLawyers] = useState(false);
  const [courts, setCourts] = useState<Court[]>([]);
  const [isLoadingCourts, setIsLoadingCourts] = useState(false);

  const form = useForm<CaseBasicInfoFormType>({
    resolver: zodResolver(caseBasicInfoSchema),
    defaultValues: instance || {
      date: "",
      number_of_file: "",
      number_of_case: "",
      court_id: "",
      stages: undefined,
      breakdowns: "",
      lawyer_id: "",
    },
  });

  useEffect(() => {
    if (instance) {
      form.reset(instance);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance]);

  // Fetch lawyers (users with role = lawyer)
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        setIsLoadingLawyers(true);
        const response = await usersApi.getAll({ role: "lawyer", per_page: 100 });
        if (response.data) {
          setLawyers(response.data.data || []);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to load lawyers");
      } finally {
        setIsLoadingLawyers(false);
      }
    };

    fetchLawyers();
  }, []);

  // Fetch courts from API
  useEffect(() => {
    const fetchCourts = async () => {
      try {
        setIsLoadingCourts(true);
        const response = await courtsApi.getAll({ status: true, per_page: 100 });
        if (response.data) {
          setCourts(response.data.data || []);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to load courts");
      } finally {
        setIsLoadingCourts(false);
      }
    };

    fetchCourts();
  }, []);

  const onSubmit = async (data: CaseBasicInfoFormType) => {
    let toastId: string | number | undefined;
    try {
      // Basic info should only submit when step is active
      if (!isActive) return;

      // Prepare payload for API (convert to backend field names/types)
      const payload = {
        date: data.date,
        lawyer_id: Number(data.lawyer_id),
        number_of_file: Number(data.number_of_file),
        number_of_case: Number(data.number_of_case),
        court_id: Number(data.court_id),
        stages: data.stages.toLowerCase(), // Active -> active
        description: data.breakdowns,
      };

      toastId = toast.loading("Creating case...");

      const response = await casesApi.create(payload);

      const createdCase: any = response.data && (response.data as any).data
        ? (response.data as any).data
        : response.data;

      const caseId = createdCase?.id;

      if (!caseId) {
        throw new Error("Case ID missing from server response");
      }

      // Store case ID for next steps (client & party)
      localStorage.setItem("current_case_id", String(caseId));

      if (toastId !== undefined) {
        toast.success("Case basic information saved!", { id: toastId });
      } else {
        toast.success("Case basic information saved!");
      }
      
      // Move to next step
      if (onStepComplete) {
        onStepComplete();
      }
    } catch (err: any) {
      if (toastId !== undefined) {
        toast.error(err.message || "Failed to save case basic info", { id: toastId });
      } else {
        toast.error(err.message || "Failed to save case basic info");
      }
    }
  };

  return (
    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
      {/* Date & Lawyer in a flex row, center-aligned */}
      <div className="flex flex-row items-center space-x-6">
        {/* Date */}
        <div className="flex flex-col flex-1 space-y-2">
          <Label htmlFor="date" className="text-sm font-medium text-gray-700">
            Date
          </Label>
          <Input
            id="date"
            type="date"
            className="w-full h-10"
            {...form.register("date")}
          />
          {form.formState.errors.date && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.date.message}
            </p>
          )}
        </div>
        {/* Lawyer */}
        <div className="flex flex-col flex-1 space-y-2">
          <Label htmlFor="lawyer_id" className="text-sm font-medium text-gray-700">
            Lawyer
          </Label>
          <Select
            value={form.watch("lawyer_id") || ""}
            onValueChange={(value: string) => {
              form.setValue("lawyer_id", value);
              form.trigger("lawyer_id");
            }}
          >
            <SelectTrigger className="w-full h-[42px]!">
              <SelectValue placeholder="Select lawyer" />
            </SelectTrigger>
            <SelectContent>
              {isLoadingLawyers ? (
                <SelectItem value="_loading" disabled>
                  Loading lawyers...
                </SelectItem>
              ) : lawyers.length === 0 ? (
                <SelectItem value="_no_lawyers" disabled>
                  No lawyers found
                </SelectItem>
              ) : (
                lawyers.map((lawyer) => (
                  <SelectItem key={lawyer.id} value={String(lawyer.id)}>
                    {lawyer.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {form.formState.errors.lawyer_id && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.lawyer_id.message}
            </p>
          )}
        </div>
      </div>

      {/* Number of File */}
      <div className="flex flex-row items-center space-x-6">
        <div className="flex flex-col flex-1 space-y-2">
          <Label htmlFor="number_of_file" className="text-sm font-medium text-gray-700">
            Number of File
          </Label>
          <Input
            id="number_of_file"
            placeholder="Enter number of file"
            className="w-full h-10"
            {...form.register("number_of_file")}
          />
          {form.formState.errors.number_of_file && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.number_of_file.message}
            </p>
          )}
        </div>

        <div className="flex flex-col flex-1 space-y-2">
          <Label htmlFor="number_of_case" className="text-sm font-medium text-gray-700">
            Number of Case
          </Label>
          <Input
            id="number_of_case"
            placeholder="Enter number of case"
            className="w-full h-10"
            {...form.register("number_of_case")}
          />
          {form.formState.errors.number_of_case && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.number_of_case.message}
            </p>
          )}
        </div>
      </div>

      {/* Court & Stages in a flex row */}
      <div className="flex flex-row space-x-6">
        {/* Court */}
        <div className="flex flex-col flex-1 space-y-2">
          <Label htmlFor="court_id" className="text-sm font-medium text-gray-700">
            Court
          </Label>
          <Select
            value={form.watch("court_id") || ""}
            onValueChange={(value: string) => {
              form.setValue("court_id", value);
              form.trigger("court_id");
            }}
          >
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Select court" />
            </SelectTrigger>
            <SelectContent>
              {isLoadingCourts ? (
                <SelectItem value="_loading_courts" disabled>
                  Loading courts...
                </SelectItem>
              ) : courts.length === 0 ? (
                <SelectItem value="_no_courts" disabled>
                  No courts found
                </SelectItem>
              ) : (
                courts.map((court) => (
                  <SelectItem key={court.id} value={String(court.id)}>
                    {court.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {form.formState.errors.court_id && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.court_id.message}
            </p>
          )}
        </div>

        {/* Stages */}
        <div className="flex flex-col flex-1 space-y-2">
          <Label htmlFor="stages" className="text-sm font-medium text-gray-700">
            Stages
          </Label>
          <Select
            value={form.watch("stages") || ""}
            onValueChange={(value: "Active" | "Disposed" | "Left") => {
              form.setValue("stages", value);
              form.trigger("stages");
            }}
          >
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Disposed">Disposed</SelectItem>
              <SelectItem value="Left">Left</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.stages && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.stages.message}
            </p>
          )}
        </div>
      </div>

      {/* Breakdowns */}
      <div className="space-y-2">
        <Label htmlFor="breakdowns" className="text-sm font-medium text-gray-700">
          Breakdowns
        </Label>
        <Textarea
          id="breakdowns"
          placeholder="Enter breakdowns"
          className="w-full min-h-24"
          {...form.register("breakdowns")}
        />
        {form.formState.errors.breakdowns && (
          <p className="text-xs text-red-500 mt-1">
            {form.formState.errors.breakdowns.message}
          </p>
        )}
      </div>

      {/* Lawyer */}


      {/* Submit Button */}
      <div className="pt-2">
        <Button 
          type="submit"
          disabled={!isActive}
          className="w-full bg-primary-green hover:bg-primary-green/90 text-gray-900 font-medium h-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Case & Continue
        </Button>
      </div>
    </form>
  );
};

export default CaseBasicInfoForm;
