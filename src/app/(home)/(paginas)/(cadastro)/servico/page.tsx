"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";

import { TableListServices } from "@/components/common/tables/service/TableListServices";
import Servico from "@/components/common/tables/service/chadcntable/serviceTable";

const ServicesPage = () => {
  return (
    <>
      <div className="">
        <div>
          <Breadcrumb pageName="Serviços" />
        </div>
        <div className="">
          <Servico />
          <TableListServices />
          <div className="grid grid-cols-2 gap-4 py-2"></div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
