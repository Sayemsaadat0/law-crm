"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfilePreview from "@/components/dashboard/profile/ProfilePreview";
import EditProfileForm from "@/components/dashboard/profile/EditProfileForm";
import ChangePasswordForm from "@/components/dashboard/profile/ChangePasswordForm";

// Dummy user data - replace with actual user data from context/state
const dummyUser = {
  name: "Sarah Johnson",
  email: "sarah.johnson@lawfirm.com",
  phone: "+880-1712-345678",
  joiningDate: "2024-01-15",
  role: "Admin",
  thumbnail: "https://i.pinimg.com/736x/ff/74/2d/ff742d89abb3d60cdbdcd29eb49f87fd.jpg",
};

function Profile() {
  const [user, setUser] = useState(dummyUser);

  const handleProfileUpdate = (data: { name: string; email: string; phone: string }) => {
    setUser((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-sm text-gray-500">
            Manage your profile information and preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full h-11 bg-white rounded-xl shadow-sm border border-gray-200 p-1 gap-1 mb-6 inline-flex">
            <TabsTrigger 
              value="profile"
              className="h-9 flex-1 px-4 rounded-lg font-medium text-sm transition-all bg-transparent text-gray-700 hover:bg-gray-50 data-[state=active]:bg-primary-green data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="edit"
              className="h-9 flex-1 px-4 rounded-lg font-medium text-sm transition-all bg-transparent text-gray-700 hover:bg-gray-50 data-[state=active]:bg-primary-green data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              Edit Profile
            </TabsTrigger>
            <TabsTrigger 
              value="password"
              className="h-9 flex-1 px-4 rounded-lg font-medium text-sm transition-all bg-transparent text-gray-700 hover:bg-gray-50 data-[state=active]:bg-primary-green data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              Change Password
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-0">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <ProfilePreview user={user} />
            </div>
          </TabsContent>

          <TabsContent value="edit" className="mt-0">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Edit Profile</h2>
                <p className="text-sm text-gray-500 mt-1">Update your profile information</p>
              </div>
              <EditProfileForm user={user} onUpdate={handleProfileUpdate} />
            </div>
          </TabsContent>

          <TabsContent value="password" className="mt-0">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
                <p className="text-sm text-gray-500 mt-1">Update your password to keep your account secure</p>
              </div>
              <ChangePasswordForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
