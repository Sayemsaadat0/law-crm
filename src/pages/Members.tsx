"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddUserModal from "@/components/dashboard/members/AddUserModal";
import AddLowerModal from "@/components/dashboard/members/AddLowerModal";

function Members() {
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openLowerModal, setOpenLowerModal] = useState(false);

  return (
    <div>
      <div className="flex justify-end gap-4">
        <Button onClick={() => setOpenUserModal(true)}>Add User</Button>
        <Button onClick={() => setOpenLowerModal(true)}>Add Lower</Button>
      </div>

      {/* Modals */}
      <AddUserModal open={openUserModal} onOpenChange={setOpenUserModal} />
      <AddLowerModal open={openLowerModal} onOpenChange={setOpenLowerModal} />
    </div>
  );
}

export default Members;
