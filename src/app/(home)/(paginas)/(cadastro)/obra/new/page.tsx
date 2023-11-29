"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";
import { Separator } from "@/components/ui/separator";
import CreateWork from "./CreateWorkForm";

export default function NewWork() {
  return (
    <div className="space-y-4 p-3">
      <div>
        <Breadcrumb pageName="Nova Obra" />
        <p className="text-sm text-muted-foreground">Nova Obra</p>
      </div>
      <Separator />
      <CreateWork />
    </div>
  );
}
