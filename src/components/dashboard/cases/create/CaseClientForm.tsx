"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const caseClientSchema = z.object({
  client_name: z.string().min(1, "Client name is required"),
  client_address: z.string().min(1, "Client address is required"),
  client_email: z.string().email("Invalid email address"),
  client_phone: z.string().min(1, "Client phone is required"),
  billing_account_name: z.string().min(1, "Billing account name is required"),
  billing_account_number: z.string().min(1, "Billing account number is required"),
  billing_bank_name: z.string().min(1, "Billing bank name is required"),
  billing_branch: z.string().min(1, "Billing branch is required"),
  client_description: z.string().min(1, "Client description is required"),
});

type CaseClientFormType = z.infer<typeof caseClientSchema>;

interface CaseClientFormProps {
  instance?: CaseClientFormType;
  isActive?: boolean;
  onStepComplete?: () => void;
}

const CaseClientForm = ({ 
  instance, 
  isActive = true,
  onStepComplete 
}: CaseClientFormProps) => {
  const form = useForm<CaseClientFormType>({
    resolver: zodResolver(caseClientSchema),
    defaultValues: instance || {
      client_name: "",
      client_address: "",
      client_email: "",
      client_phone: "",
      billing_account_name: "",
      billing_account_number: "",
      billing_bank_name: "",
      billing_branch: "",
      client_description: "",
    },
  });

  useEffect(() => {
    if (instance) {
      form.reset(instance);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance]);

  const onSubmit = (data: CaseClientFormType) => {
    try {
      console.log("Case Client Info:", data);
      toast.success("Client information saved!");
      
      // Move to next step
      if (onStepComplete) {
        onStepComplete();
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    }
  };

  return (
    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
      {/* Client Name & Email in a flex row */}
      <div className="flex flex-row items-center space-x-6">
        {/* Client Name */}
        <div className="flex flex-col flex-1 space-y-2">
          <Label htmlFor="client_name" className="text-sm font-medium text-gray-700">
            Client Name
          </Label>
          <Input
            id="client_name"
            placeholder="Enter client name"
            className="w-full h-10"
            {...form.register("client_name")}
          />
          {form.formState.errors.client_name && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.client_name.message}
            </p>
          )}
        </div>
        {/* Client Email */}
        <div className="flex flex-col flex-1 space-y-2">
          <Label htmlFor="client_email" className="text-sm font-medium text-gray-700">
            Client Email
          </Label>
          <Input
            id="client_email"
            type="email"
            placeholder="Enter client email"
            className="w-full h-10"
            {...form.register("client_email")}
          />
          {form.formState.errors.client_email && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.client_email.message}
            </p>
          )}
        </div>
      </div>

      {/* Client Phone & Address in a flex row */}
      <div className="flex flex-row items-center space-x-6">
        <div className="flex flex-col flex-1 space-y-2">
          <Label htmlFor="client_phone" className="text-sm font-medium text-gray-700">
            Client Phone
          </Label>
          <Input
            id="client_phone"
            placeholder="Enter client phone"
            className="w-full h-10"
            {...form.register("client_phone")}
          />
          {form.formState.errors.client_phone && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.client_phone.message}
            </p>
          )}
        </div>

        <div className="flex flex-col flex-1 space-y-2">
          <Label htmlFor="client_address" className="text-sm font-medium text-gray-700">
            Client Address
          </Label>
          <Input
            id="client_address"
            placeholder="Enter client address"
            className="w-full h-10"
            {...form.register("client_address")}
          />
          {form.formState.errors.client_address && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.client_address.message}
            </p>
          )}
        </div>
      </div>

      {/* Billing Account Name & Account Number in a flex row */}
      <div className="flex flex-row space-x-6">
        {/* Billing Account Name */}
        <div className="flex flex-col flex-1 space-y-2">
          <Label htmlFor="billing_account_name" className="text-sm font-medium text-gray-700">
            Billing Account Name
          </Label>
          <Input
            id="billing_account_name"
            placeholder="Enter billing account name"
            className="w-full h-10"
            {...form.register("billing_account_name")}
          />
          {form.formState.errors.billing_account_name && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.billing_account_name.message}
            </p>
          )}
        </div>

        {/* Billing Account Number */}
        <div className="flex flex-col flex-1 space-y-2">
          <Label htmlFor="billing_account_number" className="text-sm font-medium text-gray-700">
            Billing Account Number
          </Label>
          <Input
            id="billing_account_number"
            placeholder="Enter billing account number"
            className="w-full h-10"
            {...form.register("billing_account_number")}
          />
          {form.formState.errors.billing_account_number && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.billing_account_number.message}
            </p>
          )}
        </div>
      </div>

      {/* Billing Bank Name & Branch in a flex row */}
      <div className="flex flex-row space-x-6">
        {/* Billing Bank Name */}
        <div className="flex flex-col flex-1 space-y-2">
          <Label htmlFor="billing_bank_name" className="text-sm font-medium text-gray-700">
            Billing Bank Name
          </Label>
          <Input
            id="billing_bank_name"
            placeholder="Enter billing bank name"
            className="w-full h-10"
            {...form.register("billing_bank_name")}
          />
          {form.formState.errors.billing_bank_name && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.billing_bank_name.message}
            </p>
          )}
        </div>

        {/* Billing Branch */}
        <div className="flex flex-col flex-1 space-y-2">
          <Label htmlFor="billing_branch" className="text-sm font-medium text-gray-700">
            Billing Branch
          </Label>
          <Input
            id="billing_branch"
            placeholder="Enter billing branch"
            className="w-full h-10"
            {...form.register("billing_branch")}
          />
          {form.formState.errors.billing_branch && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.billing_branch.message}
            </p>
          )}
        </div>
      </div>

      {/* Client Description */}
      <div className="space-y-2">
        <Label htmlFor="client_description" className="text-sm font-medium text-gray-700">
          Client Description
        </Label>
        <Textarea
          id="client_description"
          placeholder="Enter client description"
          className="w-full min-h-24"
          {...form.register("client_description")}
        />
        {form.formState.errors.client_description && (
          <p className="text-xs text-red-500 mt-1">
            {form.formState.errors.client_description.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button 
          type="submit"
          disabled={!isActive}
          className="w-full bg-primary-green hover:bg-primary-green/90 text-gray-900 font-medium h-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save & Continue
        </Button>
      </div>
    </form>
  );
};

export default CaseClientForm;

