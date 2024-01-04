"use client";
import Breadcrumb from "@/components/common/Breadcrumb";
import { Separator } from "@/components/ui/separator";
import UpdateUserForm from "./UpdateUserForm";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-4 p-3">
      <div>
        <Breadcrumb pageName="Atualizar Usuário" />
        <p className="text-sm text-muted-foreground">
          Atulizar conta do usuario
        </p>
      </div>
      <Separator />
      <UpdateUserForm />
    </div>
  );
}
