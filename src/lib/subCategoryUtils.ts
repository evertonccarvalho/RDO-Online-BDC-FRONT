// subCategoryUtils.ts

import { ISubCategory } from "@/services/subCategoryService";

export function getSubCategoryName(
  subcategoryId: number | undefined,
  subCategories: ISubCategory[] | undefined,
): string {
  const subCategory = subCategories?.find(
    (subCat: ISubCategory) => subCat.id === subcategoryId,
  );
  return subCategory ? subCategory.name : "Subcategoria não encontrada";
}
