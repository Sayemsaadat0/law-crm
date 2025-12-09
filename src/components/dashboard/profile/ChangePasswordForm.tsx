/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const changePasswordSchema = z.object({
  previousPassword: z.string().min(1, "Previous password is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ChangePasswordFormType = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordForm() {
  const form = useForm<ChangePasswordFormType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordFormType) => {
    try {
      console.log("Password Changed:", data);
      toast.success("Password changed successfully!");
      form.reset();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    }
  };

  return (
    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
      {/* Previous Password */}
      <div className="space-y-2">
        <Label htmlFor="previous-password" className="text-sm font-medium text-gray-700">
          Previous Password
        </Label>
        <Input
          id="previous-password"
          type="password"
          placeholder="Enter previous password"
          className="w-full h-10"
          {...form.register("previousPassword")}
        />
        {form.formState.errors.previousPassword && (
          <p className="text-xs text-red-500 mt-1">
            {form.formState.errors.previousPassword.message}
          </p>
        )}
      </div>

      {/* New Password */}
      <div className="space-y-2">
        <Label htmlFor="new-password" className="text-sm font-medium text-gray-700">
          New Password
        </Label>
        <Input
          id="new-password"
          type="password"
          placeholder="Enter new password"
          className="w-full h-10"
          {...form.register("newPassword")}
        />
        {form.formState.errors.newPassword && (
          <p className="text-xs text-red-500 mt-1">
            {form.formState.errors.newPassword.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
          Confirm Password
        </Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="Confirm new password"
          className="w-full h-10"
          {...form.register("confirmPassword")}
        />
        {form.formState.errors.confirmPassword && (
          <p className="text-xs text-red-500 mt-1">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button 
          type="submit"
          className="w-full bg-primary-green hover:bg-primary-green/90 text-gray-900 font-medium h-10"
        >
          Change Password
        </Button>
      </div>
    </form>
  );
}

