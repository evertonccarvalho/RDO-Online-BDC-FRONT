"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";
import { Separator } from "@/components/ui/separator";

export default function UpdateService() {
  return (
    <div className="space-y-4 p-3">
      <div>
        <Breadcrumb pageName="Atualizar Obra" />
        <p className="text-sm text-muted-foreground">Atualizar Obra</p>
      </div>
      <Separator />
      <UpdateService />
    </div>
  );
}
