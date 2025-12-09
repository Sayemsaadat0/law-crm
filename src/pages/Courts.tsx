"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";

// --------------------------
// FORM SCHEMA
// --------------------------
const courtSchema = z.object({
  name: z.string().min(1, "Court name is required"),
  address: z.string().min(1, "Court address is required"),
  status: z.boolean(),
});

type CourtFormType = z.infer<typeof courtSchema>;

// Dummy court data
const dummyCourts = [
  {
    id: "court-001",
    name: "District Court - Civil Division",
    address: "123 Main Street, Dhaka, Bangladesh",
    status: "Active",
  },
  {
    id: "court-002",
    name: "High Court - Criminal Division",
    address: "456 Justice Avenue, Dhaka, Bangladesh",
    status: "Active",
  },
  {
    id: "court-003",
    name: "Supreme Court",
    address: "789 Legal Plaza, Dhaka, Bangladesh",
    status: "Active",
  },
  {
    id: "court-004",
    name: "Family Court",
    address: "321 Family Road, Chattogram, Bangladesh",
    status: "Active",
  },
  {
    id: "court-005",
    name: "Commercial Court",
    address: "654 Business District, Sylhet, Bangladesh",
    status: "Inactive",
  },
];

// --------------------------
// COMPONENT
// --------------------------
export default function CourtCrud() {
  const [courts, setCourts] = useState(dummyCourts);


  const form = useForm<CourtFormType>({
    resolver: zodResolver(courtSchema),
    defaultValues: {
      status: true, // Default to Active
    },
  });

  // --------------------------
  // SUBMIT HANDLER
  // --------------------------
  const onSubmit = (data: CourtFormType) => {
    try {

      setTimeout(() => {
        console.log("Form Submitted:", data);

        setCourts((prev) => [
          ...prev,
          {
            id: `court-${String(prev.length + 1).padStart(3, "0")}`,
            name: data.name,
            address: data.address,
            status: data.status ? "Active" : "Inactive",
          },
        ]);

        toast.success("Court created successfully!");
        form.reset();
      }, 800);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    }
  };

  // Get status badge style
  const getStatusStyle = (status: string) => {
    if (status === "Active") {
      return "bg-primary/10 text-primary border-primary/20";
    } else {
      return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Title and Add Court Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Court Management</h1>
      </div>

      <div className="grid grid-cols-8 gap-5">
        <div className="col-span-2 bg-white p-6 shadow-sm rounded-xl border border-gray-200">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Add New Court</h2>
            <p className="text-sm text-gray-500 mt-1">Fill in the details below</p>
          </div>
          
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="court-name" className="text-sm font-medium text-gray-700">
                Court Name
              </Label>
              <Input
                id="court-name"
                placeholder="Enter court name"
                className="w-full h-10"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="court-address" className="text-sm font-medium text-gray-700">
                Court Address
              </Label>
              <Input
                id="court-address"
                placeholder="Enter court address"
                className="w-full h-10"
                {...form.register("address")}
              />
              {form.formState.errors.address && (
                <p className="text-xs text-red-500 mt-1">
                  {form.formState.errors.address.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Status</Label>
              <div className="flex items-center space-x-3 pt-1">
                <Checkbox
                  id="court-status"
                  checked={form.watch("status")}
                  onCheckedChange={(checked: boolean) => {
                    form.setValue("status", checked === true);
                  }}
                  className="w-5 h-5 data-[state=checked]:bg-primary-green data-[state=checked]:border-primary-green data-[state=checked]:text-gray-900"
                />
                <Label
                  htmlFor="court-status"
                  className="text-sm font-normal cursor-pointer text-gray-700"
                >
                  Active
                </Label>
              </div>
              {form.formState.errors.status && (
                <p className="text-xs text-red-500 mt-1">
                  {form.formState.errors.status.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button 
                type="submit"
                className="w-full bg-primary-green hover:bg-primary-green/90 text-gray-900 font-medium h-10"
              >
                Create Court
              </Button>
            </div>
          </form>
        </div>
        {/* Court Table */}
        <div className="col-span-6">
          <div className="bg-background rounded-lg border border-border shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-green border-b border-border">
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                      SL
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                      Court Name
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                      Address
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                      Status
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-black">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {courts.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-3 py-8 text-center text-sm text-muted-foreground"
                      >
                        No courts found
                      </td>
                    </tr>
                  ) : (
                    courts.map((court, index) => (
                      <tr
                        key={court.id}
                        className="hover:bg-muted/10 transition-colors"
                      >
                        <td className="px-3 py-2.5">
                          <span className="text-xs font-medium text-muted-foreground">
                            {index + 1}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <p className="text-xs font-medium">{court.name}</p>
                        </td>
                        <td className="px-3 py-2.5">
                          <p className="text-xs text-muted-foreground">
                            {court.address}
                          </p>
                        </td>
                        <td className="px-3 py-2.5">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(
                              court.status
                            )}`}
                          >
                            {court.status}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center justify-end">
                            <button
                              onClick={() => {
                                setCourts((prev) => prev.filter((c) => c.id !== court.id));
                                toast.success("Court deleted successfully!");
                              }}
                              className="p-1.5 rounded-md hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
                              title="Delete court"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Court Table */}

      {/* --------------------------
          CREATE MODAL
        -------------------------- */}
    </div>
  );
}
