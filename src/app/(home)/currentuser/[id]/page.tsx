"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";
import { Separator } from "@/components/ui/separator";
import UpdateProfileForm from "./UpdateProfileForm";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6 p-5">
      <div>
        <Breadcrumb pageName="Atualizar Usuário" />
        <p className="text-sm text-muted-foreground">
          Atulizar conta do usuario
        </p>
      </div>
      <Separator />
      <UpdateProfileForm />
    </div>
  );
}
