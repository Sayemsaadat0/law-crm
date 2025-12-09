"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const hearingSchema = z.object({
  date: z.string().min(1, "Date is required"),
  serial_number: z.string().optional(),
  note: z.string().min(1, "Note is required"),
  file: z.instanceof(File).optional(),
});

type HearingFormData = z.infer<typeof hearingSchema>;

interface HearingInstance {
  date: string;
  serial_number?: string;
  note: string;
  file?: string;
}

interface HearingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instance?: HearingInstance;
  caseId?: string;
  caseNumber?: string;
  fileNumber?: string;
}

const HearingForm = ({
  open,
  onOpenChange,
  instance,
  caseId,
  caseNumber,
  fileNumber,
}: HearingFormProps) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const form = useForm<HearingFormData>({
    resolver: zodResolver(hearingSchema),
    defaultValues: instance
      ? {
          date: instance.date,
          serial_number: instance.serial_number || "",
          note: instance.note,
        }
      : {
          date: "",
          serial_number: "",
          note: "",
        },
  });

  const onSubmit = (data: HearingFormData) => {
    try {
      const formData = new FormData();
      formData.append("date", data.date);
      if (data.serial_number) {
        formData.append("serial_number", data.serial_number);
      }
      formData.append("note", data.note);
      if (data.file) {
        formData.append("file", data.file);
      }
      if (caseId) {
        formData.append("case_id", caseId);
      }

      console.log("Hearing Form Data:", formData);
      console.log("Is Update:", !!instance);

      toast.success(instance ? "Hearing updated successfully!" : "Hearing created successfully!");
      form.reset();
      setFilePreview(null);
      onOpenChange(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("file", file);
      setFilePreview(file.name);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {instance ? "Edit Hearing" : "New Hearing"}
          </DialogTitle>
          {(caseNumber || fileNumber) && (
            <div className="text-sm text-gray-500 mt-1">
              {caseNumber && <span className="mr-2">Case: {caseNumber}</span>}
              {fileNumber && <span>File: {fileNumber}</span>}
            </div>
          )}
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="hearing-date" className="text-sm font-medium text-gray-700">
              Date
            </Label>
            <Input
              id="hearing-date"
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

          {/* Serial Number (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="hearing-serial" className="text-sm font-medium text-gray-700">
              Serial Number <span className="text-gray-400">(Optional)</span>
            </Label>
            <Input
              id="hearing-serial"
              placeholder="Enter serial number"
              className="w-full h-10"
              {...form.register("serial_number")}
            />
            {form.formState.errors.serial_number && (
              <p className="text-xs text-red-500 mt-1">
                {form.formState.errors.serial_number.message}
              </p>
            )}
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="hearing-file" className="text-sm font-medium text-gray-700">
              File Upload
            </Label>
            <div className="relative">
              <Input
                id="hearing-file"
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full h-10 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-green file:text-gray-900 hover:file:bg-primary-green/90"
                onChange={handleFileChange}
              />
              {filePreview && (
                <p className="text-xs text-gray-500 mt-1">{filePreview}</p>
              )}
              {instance?.file && !filePreview && (
                <p className="text-xs text-gray-500 mt-1">Current file: {instance.file}</p>
              )}
            </div>
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label htmlFor="hearing-note" className="text-sm font-medium text-gray-700">
              Note
            </Label>
            <Textarea
              id="hearing-note"
              placeholder="Enter hearing notes"
              className="w-full min-h-[100px]"
              {...form.register("note")}
            />
            {form.formState.errors.note && (
              <p className="text-xs text-red-500 mt-1">
                {form.formState.errors.note.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outlineBtn"
              onClick={() => {
                form.reset();
                setFilePreview(null);
                onOpenChange(false);
              }}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary-green hover:bg-primary-green/90 text-gray-900"
            >
              {instance ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HearingForm;
