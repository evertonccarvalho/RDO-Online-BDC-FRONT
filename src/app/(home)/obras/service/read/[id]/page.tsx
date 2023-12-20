"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";

import { TableListServices } from "@/components/common/tables/service/TableListServices";
import CategoryPage from "../../../Category/Category";
import SubCategoryPage from "../../../subCategory/SubCategory";

const ServicesPage = () => {
  return (
    <>
      <div className="">
        <div>
          <Breadcrumb pageName="Serviços" />
        </div>
        <div className="">
          <TableListServices />
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
