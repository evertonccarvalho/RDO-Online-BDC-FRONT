"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";
import { TableListCategory } from "@/components/common/tables/service/Category/TableListCategory";

const CategoryPage = () => {
  return (
    <>
      <div className="">
        <div>
          <Breadcrumb pageName="CATEGORIAS" />
        </div>
        <div className="">
          <TableListCategory />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
