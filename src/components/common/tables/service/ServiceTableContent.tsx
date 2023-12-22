// TableUtils.ts

import { IService } from "@/services/serviceService";
import { ISubCategory } from "@/services/subCategoryService";
import Loader from "../../Loader/page";
import { ServiceTableRows } from "./ServiceTableRows";

export default function ServiceTableContent(
  services: IService[] | null,
  subCategories: ISubCategory[] | null,
  filteredServices: IService[],
  currentItems: IService[],
  workId: number,
  handleOpenModal: (serviceId: number) => void,
  getSubCategoryName: (subcategoryId: number | undefined) => string,
) {
  if (!services || !subCategories || filteredServices.length === 0) {
    return (
      <tr className="text-Foreground h-24 w-full rounded bg-card">
        <td colSpan={7} className="text-center">
          {services === null ? <Loader /> : "No services available"}
        </td>
      </tr>
    );
  }

  return (
    <>
      {currentItems.map((service: IService, index: number) => (
        <ServiceTableRows
          key={index}
          id={service.id}
          description={service.serviceDescription}
          status={service.status}
          active={service.status}
          unit={service.unit}
          total={service.totalAmount}
          workId={workId}
          onOpenModal={handleOpenModal}
          subCategory={getSubCategoryName(service.subcategoryId)}
        />
      ))}
    </>
  );
}
