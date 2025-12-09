"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const editProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
});

type EditProfileFormType = z.infer<typeof editProfileSchema>;

interface EditProfileFormProps {
  user: {
    name: string;
    email: string;
    phone: string;
    thumbnail: string;
  };
  onUpdate?: (data: EditProfileFormType) => void;
}

export default function EditProfileForm({ user, onUpdate }: EditProfileFormProps) {
  const form = useForm<EditProfileFormType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = (data: EditProfileFormType) => {
    try {
      console.log("Profile Updated:", data);
      if (onUpdate) {
        onUpdate(data);
      }
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    }
  };

  return (
    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
      {/* Thumbnail Preview */}
      <div className="flex justify-center">
        <img
          src={user.thumbnail}
          alt={user.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
        />
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="edit-name" className="text-sm font-medium text-gray-700">
          Name
        </Label>
        <Input
          id="edit-name"
          placeholder="Enter your name"
          className="w-full h-10"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-xs text-red-500 mt-1">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="edit-email" className="text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          id="edit-email"
          type="email"
          placeholder="Enter email address"
          className="w-full h-10"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-xs text-red-500 mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="edit-phone" className="text-sm font-medium text-gray-700">
          Phone
        </Label>
        <Input
          id="edit-phone"
          placeholder="Enter phone number"
          className="w-full h-10"
          {...form.register("phone")}
        />
        {form.formState.errors.phone && (
          <p className="text-xs text-red-500 mt-1">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button 
          type="submit"
          className="w-full bg-primary-green hover:bg-primary-green/90 text-gray-900 font-medium h-10"
        >
          Update Profile
        </Button>
      </div>
    </form>
  );
}

