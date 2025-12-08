"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Zod validation schema
const clientSchema = z.object({
  nidNumber: z.string().min(1, "NID Number is required"),
  emergencyContact: z.string().min(1, "Emergency Contact is required"),
  presentAddress: z.string().min(1, "Present Address is required"),
  caseTypePreference: z.string().min(1, "Please select a case type"),
  nidFile: z
    .any()
    .refine((file) => file instanceof File, "NID image is required"),
});

const CASE_TYPES = [
  "Criminal Defense",
  "Civil Litigation",
  "Family Law",
  "Corporate",
  "Real Estate",
  "Employment",
];

type ClientFormValues = z.infer<typeof clientSchema>;

export default function ClientLegalInfo() {
  const [nidPreview, setNidPreview] = useState<string | null>(null);

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      nidNumber: "",
      emergencyContact: "",
      presentAddress: "",
      caseTypePreference: "",
      nidFile: null,
    },
  });

  const handleFilePreview = (
    file: File,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = (values: ClientFormValues) => {
    console.log("Client Legal Info:", values);
    alert("Client Legal Information Saved!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* NID Number */}
        <FormField
          control={form.control}
          name="nidNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NID Number</FormLabel>
              <FormControl>
                <Input placeholder="1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Emergency Contact */}
        <FormField
          control={form.control}
          name="emergencyContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Present Address */}
        <FormField
          control={form.control}
          name="presentAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Present Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your present address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Case Type Preference */}
        <FormField
          control={form.control}
          name="caseTypePreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Case Type Preference</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a case type</option>
                  {CASE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* NID Upload */}
        <FormField
          control={form.control}
          name="nidFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NID Image</FormLabel>
              <FormControl>
                <div className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-6 text-center cursor-pointer">
                  {field.value ? (
                    <img
                      src={nidPreview!}
                      alt="NID"
                      className="h-32 w-32 object-cover rounded"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Click to upload NID
                    </p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        handleFilePreview(file, setNidPreview);
                      }
                    }}
                    className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Save Client Legal Info</Button>
        </div>
      </form>
    </Form>
  );
}
