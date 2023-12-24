"use client";
import Breadcrumb from "@/components/common/Breadcrumb";
import { Separator } from "@/components/ui/separator";
import UpdateProfileForm from "../../../../components/common/form/UpdateProfileForm";

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
