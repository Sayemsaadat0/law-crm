"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { UploadCloud } from "lucide-react";

// Zod validation
const profileSchema = z.object({
  name: z.string().min(2, "Enter a valid name"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  avatar: z.any().optional(),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    form.setValue("avatar", file);

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  async function onSubmit(values: ProfileValues) {
    setLoading(true);
    console.log(values, "values");

    try {
      // simulate backend
      await new Promise((res) => setTimeout(res, 1400));

      toast.success("Profile updated!");

      form.reset();
      setPreview(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(e.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border bg-white p-6 rounded-xl">
      <h2 className="text-lg font-semibold mb-3">Edit Profile</h2>
      <p className="text-sm text-gray-500 mb-6">
        Update your personal information. Your profile helps others identify
        you.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              {preview ? (
                <img src={preview} alt="Avatar" width={80} height={80} />
              ) : (
                <UploadCloud className="text-gray-400" size={32} />
              )}
            </div>

            <div>
              <label className="cursor-pointer text-sm font-medium text-blue-600">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={loading}
                />
              </label>
              <p className="text-xs text-gray-400">
                JPG, PNG, or WebP (Max 2MB)
              </p>
            </div>
          </div>

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Your full name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="you@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="+8801XXXXXXXXX"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
