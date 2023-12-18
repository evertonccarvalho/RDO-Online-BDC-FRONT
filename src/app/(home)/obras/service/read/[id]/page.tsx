"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";

import Servico from "@/app/(home)/(paginas)/(cadastro)/servico/page";
import { TableListServices } from "@/components/common/tables/service/TableListServices";
import CategoryPage from "../../../Category/Category";
import SubCategoryPage from "../../../subCategory/SubCategory";

const ServicesPage = () => {
  return (
    <>
      <div className="">
        <div>
          <Breadcrumb pageName="Obras" />
        </div>
        <div className="">
          <TableListServices />
          <Servico />
          <div className="grid grid-cols-2 gap-4 py-2">
            <SubCategoryPage />
            <CategoryPage />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
