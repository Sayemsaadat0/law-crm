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
import { dummyMembers } from "@/dummy/dummy.data";

// --------------------------
// FORM SCHEMA
// --------------------------
const memberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type MemberFormType = z.infer<typeof memberSchema>;

// Dummy member data

// --------------------------
// COMPONENT
// --------------------------
export default function Members() {
  const [members, setMembers] = useState(dummyMembers);
  const isAdmin = true; // Admin state

  const form = useForm<MemberFormType>({
    resolver: zodResolver(memberSchema),
  });

  // --------------------------
  // SUBMIT HANDLER
  // --------------------------
  const onSubmit = (data: MemberFormType) => {
    try {
      setTimeout(() => {
        console.log("Form Submitted:", data);

        setMembers((prev) => [
          ...prev,
          {
            id: `member-${String(prev.length + 1).padStart(3, "0")}`,
            name: data.name,
            email: data.email,
            phone: "+880-1700-000000", // Default phone
            role: "Lawyers", // Default role
            thumbnail: "https://i.pinimg.com/736x/ff/74/2d/ff742d89abb3d60cdbdcd29eb49f87fd.jpg",
          },
        ]);

        toast.success("Member created successfully!");
        form.reset();
      }, 800);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    }
  };

  // Get role badge style
  const getRoleStyle = (role: string) => {
    if (role === "Lawyers") {
      return "bg-blue-100 text-blue-800 border-blue-200";
    } else if (role === "Owner") {
      return "bg-green-100 text-green-800 border-green-200";
    } else if (role === "Admin") {
      return "bg-purple-100 text-purple-800 border-purple-200";
    } else {
      return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Member Management</h1>
      </div>

      <div className={`grid grid-cols-8 gap-5`}>
        {isAdmin && (
          <div className="col-span-2 bg-white p-6 shadow-sm rounded-xl border border-gray-200">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Add New Member</h2>
              <p className="text-sm text-gray-500 mt-1">Fill in the details below</p>
            </div>
            
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="member-name" className="text-sm font-medium text-gray-700">
                  Name
                </Label>
                <Input
                  id="member-name"
                  placeholder="Enter member name"
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
                <Label htmlFor="member-email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="member-email"
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

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="member-password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="member-password"
                  type="password"
                  placeholder="Enter password"
                  className="w-full h-10"
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button 
                  type="submit"
                  className="w-full bg-primary-green hover:bg-primary-green/90 text-gray-900 font-medium h-10"
                >
                  Create Member
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Member Table */}
        <div className={isAdmin ? "col-span-6" : "col-span-8"}>
          <div className="bg-background rounded-lg border border-border shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-green border-b border-border">
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                      Name
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                      Email & Phone
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-black">
                      Role
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-black">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {members.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-8 text-center text-sm text-muted-foreground"
                      >
                        No members found
                      </td>
                    </tr>
                  ) : (
                    members.map((member) => (
                      <tr
                        key={member.id}
                        className="hover:bg-muted/10 transition-colors"
                      >
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <img
                              src={member.thumbnail}
                              alt={member.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <p className="text-xs font-medium">{member.name}</p>
                          </div>
                        </td>
                        <td className="px-3 py-2.5">
                          <p className="text-xs font-medium">{member.email}</p>
                          <p className="text-xs text-muted-foreground">{member.phone}</p>
                        </td>
                        <td className="px-3 py-2.5">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getRoleStyle(
                              member.role
                            )}`}
                          >
                            {member.role}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center justify-end">
                            <button
                              onClick={() => {
                                setMembers((prev) => prev.filter((m) => m.id !== member.id));
                                toast.success("Member deleted successfully!");
                              }}
                              className="p-1.5 rounded-md hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
                              title="Delete member"
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
    </div>
  );
}
