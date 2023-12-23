import { ICategory } from "@/services/categoryService";
import { ISubCategory } from "@/services/subCategoryService";

export function getCategoryName(
  categoryId: number | undefined,
  Categories: ICategory[] | undefined,
): string {
  const Category = Categories?.find((Cat: ICategory) => Cat.id === categoryId);
  return Category ? Category.name : "Categoria não encontrada";
}

export function CategoryTableFilter(
  subCategory: ISubCategory[] | undefined,
  filterValue: string,
  Categories: ICategory[] | undefined,
): ISubCategory[] {
  const searchString = filterValue.toLowerCase();

  return (
    subCategory?.filter((subCategory: ISubCategory) => {
      return (
        subCategory.name.toLowerCase().includes(searchString) ||
        subCategory.status.toLowerCase().includes(searchString) ||
        getCategoryName(Number(subCategory.serviceCategoryId), Categories)
          .toLowerCase()
          .includes(searchString)
      );
    }) || []
  );
}
