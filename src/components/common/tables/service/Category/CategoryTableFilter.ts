import { ICategory } from "@/services/categoryService";

export function CategoryTableFilter(
  category: ICategory[] | undefined,
  filterValue: string,
): ICategory[] {
  const searchString = filterValue.toLowerCase();

  return (
    category?.filter((category: ICategory) => {
      return (
        category.name.toLowerCase().includes(searchString) ||
        category.status.toLowerCase().includes(searchString)
      );
    }) || []
  );
}
