"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --------------------------
// FORM SCHEMA
// --------------------------
const courtSchema = z.object({
  name: z.string().min(1, "Court name is required"),
  address: z.string().min(1, "Court address is required"),
  status: z.string().min(1, "Court status is required"),
});

type CourtFormType = z.infer<typeof courtSchema>;

// --------------------------
// COMPONENT
// --------------------------
export default function CourtCrud() {
  const [open, setOpen] = useState(false);
  const [courts, setCourts] = useState([
    { id: 1, name: "Central Court", address: "Dhaka", status: "Active" },
    { id: 2, name: "City Court", address: "Chattogram", status: "Inactive" },
  ]);

  const [loading, setLoading] = useState(false);

  const form = useForm<CourtFormType>({
    resolver: zodResolver(courtSchema),
  });

  // --------------------------
  // SUBMIT HANDLER
  // --------------------------
  const onSubmit = (data: CourtFormType) => {
    try {
      setLoading(true);

      setTimeout(() => {
        console.log("Form Submitted:", data);

        setCourts((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            ...data,
          },
        ]);

        toast.success("Court created successfully!");
        form.reset();
        setOpen(false);
        setLoading(false);
      }, 800);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-end">
        <Button onClick={() => setOpen(true)}>+ Create Court</Button>
      </div>

      {/* --------------------------
          COURT TABLE
        -------------------------- */}
      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {courts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-6 text-muted-foreground"
                >
                  No courts found
                </TableCell>
              </TableRow>
            ) : (
              courts.map((court) => (
                <TableRow key={court.id}>
                  <TableCell>{court.id}</TableCell>
                  <TableCell>{court.name}</TableCell>
                  <TableCell>{court.address}</TableCell>
                  <TableCell>{court.status}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* --------------------------
          CREATE MODAL
        -------------------------- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Court</DialogTitle>
          </DialogHeader>

          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="space-y-2">
              <Label>Court Name</Label>
              <Input
                placeholder="Enter court name"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label>Court Address</Label>
              <Input
                placeholder="Enter court address"
                {...form.register("address")}
              />
              {form.formState.errors.address && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.address.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                {...form.register("status")}
                defaultValue={form.getValues("status")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.status && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.status.message}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outlineBtn"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
