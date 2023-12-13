"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";

import { TableListTeam } from "@/components/common/tables/team/TableListTeam";

const ServicesPage = () => {
  return (
    <>
      <div className="">
        <div>
          <Breadcrumb pageName="Equipe" />
        </div>
        <div className="">
          <TableListTeam />
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
