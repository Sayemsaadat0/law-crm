"use client";

import BasicInformationSection from "@/components/dashboard/settings/BasicInformationSection";
import ChangePasswordForm from "@/components/dashboard/settings/ChangePasswordForm";
import RoleSpecificSection from "@/components/dashboard/settings/RoleSpecificSection";
import { useState } from "react";

type UserRole = "admin" | "lawyer" | "client";

export default function ProfileSettingsPage() {
  const [userRole, setUserRole] = useState<UserRole>("lawyer");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      {/* Role Selector */}
      <div className="mb-8 flex gap-3">
        {(["admin", "lawyer", "client"] as const).map((role) => (
          <button
            key={role}
            onClick={() => setUserRole(role)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              userRole === role
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-8">
        <BasicInformationSection />
        <RoleSpecificSection role={userRole} />
        <ChangePasswordForm />
      </div>
    </div>
  );
}

// "use client";

// import ChangePasswordForm from "@/components/dashboard/settings/ChangePasswordForm";
// import ProfileForm from "@/components/dashboard/settings/ProfileForm";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// export default function Settings() {
//   return (
//     <div className=" space-y-6">
//       <h1 className="text-2xl font-semibold mb-4">Account Settings</h1>

//       <Tabs defaultValue="profile" className="w-full">
//         {/* Tab Buttons */}
//         <TabsList className="grid grid-cols-2">
//           <TabsTrigger className="cursor-pointer" value="profile">
//             Profile
//           </TabsTrigger>
//           <TabsTrigger className="cursor-pointer" value="password">
//             Change Password
//           </TabsTrigger>
//         </TabsList>

//         {/* Profile Tab */}
//         <TabsContent value="profile" className="mt-4">
//           <ProfileForm />
//         </TabsContent>

//         {/* Change Password Tab */}
//         <TabsContent value="password" className="mt-4">
//           <ChangePasswordForm />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
