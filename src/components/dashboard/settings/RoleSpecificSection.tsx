"use client";
import LawyerProfessionalInfo from "./LawyerProfessionalInfo";
import ClientLegalInfo from "./ClientLegalInfo";

interface RoleSpecificSectionProps {
  role: "admin" | "lawyer" | "client";
}

export default function RoleSpecificSection({
  role,
}: RoleSpecificSectionProps) {
  return (
    <section className="space-y-6 rounded-xl border border-border bg-background p-6">
      <div>
        <h2 className="text-xl font-semibold">
          {role === "lawyer" && "Professional Information"}
          {role === "client" && "Legal Information"}
          {role === "admin" && "Administrator Settings"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {role === "lawyer" && "Manage your legal credentials and expertise"}
          {role === "client" && "Manage your legal documents and preferences"}
          {role === "admin" && "Administrative settings and preferences"}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Role-specific content */}
      <div>
        {role === "lawyer" && <LawyerProfessionalInfo />}
        {role === "client" && <ClientLegalInfo />}
        {role === "admin" && (
          <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
            Admin settings will be configured here
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />
    </section>
  );
}
