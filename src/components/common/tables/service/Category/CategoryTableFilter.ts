import { CategorySchema } from "@/services/categoryService";

export function CategoryTableFilter(
  category: CategorySchema[] | undefined,
  filterValue: string,
): CategorySchema[] {
  const searchString = filterValue.toLowerCase();

  return (
    category?.filter((category: CategorySchema) => {
      return (
        category.name.toLowerCase().includes(searchString) ||
        category.status.toLowerCase().includes(searchString)
      );
    }) || []
  );
}
