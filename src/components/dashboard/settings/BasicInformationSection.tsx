"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import { Label } from "@/components/ui/label";

const basicInfoSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email(),
  phone: z.string(),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().optional(),
  address: z.string().min(5, "Address is required"),
});

type BasicInfoForm = z.infer<typeof basicInfoSchema>;

export default function BasicInformationSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<BasicInfoForm>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "user@example.com",
      phone: "+1 (555) 000-0000",
      gender: "male",
      dateOfBirth: "",
      address: "",
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: BasicInfoForm) => {
    console.log("Submitted data:", data);
  };

  return (
    <section className="space-y-6 rounded-xl border bg-white p-6">
      <div>
        <h2 className="text-xl font-semibold">Basic Information</h2>
        <p className="text-sm text-muted-foreground">
          Update your personal details
        </p>
      </div>

      <hr />

      {/* Profile Photo */}
      <div>
        <Label className="mb-3 block">Profile Photo</Label>
        <div className="flex items-center gap-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-lg border bg-muted">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>

          <Button
            type="button"
            variant="outlineBtn"
            onClick={() => fileInputRef.current?.click()}
          >
            Change Photo
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-6 lg:grid-cols-2"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="lg:col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={3}
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="lg:col-span-2 flex justify-end">
            <Button type="submit">Save Basic Information</Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
