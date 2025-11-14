"use client";

import ChangePasswordForm from "@/components/dashboard/settings/ChangePasswordForm";
import ProfileForm from "@/components/dashboard/settings/ProfileForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Settings() {
  return (
    <div className=" space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Account Settings</h1>

      <Tabs defaultValue="profile" className="w-full">
        {/* Tab Buttons */}
        <TabsList className="grid grid-cols-2">
          <TabsTrigger className="cursor-pointer" value="profile">
            Profile
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="password">
            Change Password
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-4">
          <ProfileForm />
        </TabsContent>

        {/* Change Password Tab */}
        <TabsContent value="password" className="mt-4">
          <ChangePasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
