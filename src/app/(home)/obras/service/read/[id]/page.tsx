"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";

import { TableListServices } from "@/components/common/TableListServices";

const ServicesPage = () => {
  return (
    <>
      <div className="">
        <div>
          <Breadcrumb pageName="Obras" />
        </div>
        <div className="">
          <TableListServices />
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
