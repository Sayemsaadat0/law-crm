"use client";

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
const lawyerSchema = z.object({
  lawyerId: z.string().min(1, "Lawyer ID is required"),
  barEnrollmentYear: z
    .string()
    .min(1, "Bar Council Enrollment Year is required")
    .regex(/^\d{4}$/, "Enter a valid year"),
  yearsOfExperience: z
    .string()
    .min(1, "Years of Experience is required")
    .regex(/^\d+$/, "Enter a valid number"),
  education: z.string().min(1, "Education & Certifications are required"),
  bio: z.string().max(300, "Bio cannot exceed 300 characters").optional(),
});

type LawyerFormValues = z.infer<typeof lawyerSchema>;

export default function LawyerProfessionalInfo() {
  const form = useForm<LawyerFormValues>({
    resolver: zodResolver(lawyerSchema),
    defaultValues: {
      lawyerId: "",
      barEnrollmentYear: "",
      yearsOfExperience: "",
      education: "",
      bio: "",
    },
  });

  const onSubmit = (values: LawyerFormValues) => {
    console.log("Form Values:", values);
    alert("Professional Information Saved!");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6 lg:grid-cols-2"
      >
        {/* Lawyer ID */}
        <FormField
          control={form.control}
          name="lawyerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lawyer ID / Registration Number</FormLabel>
              <FormControl>
                <Input placeholder="LAW-2024-001234" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bar Council Enrollment Year */}
        <FormField
          control={form.control}
          name="barEnrollmentYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bar Council Enrollment Year</FormLabel>
              <FormControl>
                <Input type="number" placeholder="2015" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Years of Experience */}
        <FormField
          control={form.control}
          name="yearsOfExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input type="number" placeholder="10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Education & Certifications */}
        <FormField
          control={form.control}
          name="education"
          render={({ field }) => (
            <FormItem className="lg:col-span-2">
              <FormLabel>Education & Certifications</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List your degrees and certifications"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Short Bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="lg:col-span-2">
              <FormLabel>Short Bio (Max 300 characters)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a brief bio about yourself"
                  maxLength={300}
                  {...field}
                />
              </FormControl>
              <p className="mt-1 text-xs text-muted-foreground">
                {field.value?.length || 0}/300 characters
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr className="lg:col-span-2" />
        <div className="lg:col-span-2 flex justify-end">
          <Button type="submit">Save Professional Information</Button>
        </div>
      </form>
    </Form>
  );
}
