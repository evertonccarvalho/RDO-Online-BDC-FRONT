import { CategorySchema, categoryService } from "@/services/categoryService";
import {
  SubCategorySchema,
  subCategoryService,
} from "@/services/subCategoryService";
import { useEffect, useState } from "react";

function CategoriSlect() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState<SubCategorySchema[]>([]);

  useEffect(() => {
    // Carregar todas as categorias ao montar o componente
    async function loadCategories() {
      try {
        const categories = await categoryService.fetchAll();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    loadCategories();
  }, []);

  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    try {
      const response = await subCategoryService.getById(+categoryId);
      let subCategoriesArray: SubCategorySchema[] = [];

      if (Array.isArray(response)) {
        subCategoriesArray = response;
      } else if (response) {
        subCategoriesArray = [response];
      }

      setSubCategories(subCategoriesArray);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  return (
    <div>
      <select
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((category: CategorySchema) => (
          <option key={category.id} value={category.id}>
            {category.id + category.name}
          </option>
        ))}
      </select>

      <select>
        <option value="">Select Subcategory</option>
        {subCategories.map((subcategory: SubCategorySchema) => (
          <option key={subcategory.id} value={subcategory.id}>
            {subcategory.id + subcategory.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoriSlect;
