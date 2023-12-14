"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";

import { TableListSubCategory } from "@/components/common/tables/service/subCategory/TableListSubCategory";

const SubCategoryPage = () => {
  return (
    <>
      <div className="">
        <div>
          <Breadcrumb pageName="SUB CATEGORIAS" />
        </div>
        <div className="">
          <TableListSubCategory />
        </div>
      </div>
    </>
  );
};

export default SubCategoryPage;
