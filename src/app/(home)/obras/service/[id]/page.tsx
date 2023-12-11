"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";
import { Separator } from "@/components/ui/separator";
import ServicePage from "./servicePage";

export default function Services() {
  return (
    <div className="space-y-4 p-3">
      <div>
        <Breadcrumb pageName="SERVIÇOS" />
        <p className="text-sm text-muted-foreground">SERVIÇOS</p>
      </div>
      <Separator />
      <ServicePage />
    </div>
  );
}
