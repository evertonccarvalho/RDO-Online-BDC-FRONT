// serviceFilter.ts

import { IService } from "@/services/serviceService";
import { ISubCategory } from "@/services/subCategoryService";

function getSubCategoryName(
  subcategoryId: number | undefined,
  subCategories: ISubCategory[] | undefined,
): string {
  const subCategory = subCategories?.find(
    (subCat: ISubCategory) => subCat.id === subcategoryId,
  );
  return subCategory ? subCategory.name : "Subcategoria não encontrada";
}

export function filterServices(
  services: IService[] | undefined,
  filterValue: string,
  subCategories: ISubCategory[] | undefined,
): IService[] {
  const searchString = filterValue.toLowerCase();

  return (
    services?.filter((service: IService) => {
      return (
        service.serviceDescription.toLowerCase().includes(searchString) ||
        service.status.toLowerCase().includes(searchString) ||
        service.unit.toLowerCase().includes(searchString) ||
        service.totalAmount.toString().includes(searchString) ||
        getSubCategoryName(service.subcategoryId, subCategories)
          .toLowerCase()
          .includes(searchString)
      );
    }) || []
  );
}
