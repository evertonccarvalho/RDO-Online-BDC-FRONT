"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";

import { TableListServices } from "@/components/common/tables/service/TableListServices";

const ServicesPage = () => {
  return (
    <>
      <div className="">
        <div>
          <Breadcrumb pageName="Obras" />
        </div>
        <div className="">
          <TableListServices />
          <div className="grid grid-cols-2 gap-4 py-2"></div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
