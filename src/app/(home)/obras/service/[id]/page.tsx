"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";

import { TableListServices } from "@/components/common/TableListServices";

const ServicesPage = () => {
  return (
    <>
      <div className="p-5">
        <div>
          <Breadcrumb pageName="Obras" />
          <p className="text-sm text-muted-foreground">Obras</p>
        </div>
        <div className="container">
          <TableListServices />
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
