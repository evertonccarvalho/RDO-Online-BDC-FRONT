import api from "./api";
import { TokenService } from "./tokenService";

export type SubCategoryParams = {
  name: string;
  status: string;
  serviceCategoryId?: string | number;
};
export type ISubCategory = {
  id: number;
  name: string;
  status: string;
  serviceCategoryId?: string;
};

const subCategoryService = {
  create: async (params: SubCategoryParams) => {
    const res = await api
      .post(`/subcategory`, params, {
        headers: {
          Authorization: TokenService.get(),
        },
      })
      .catch((error) => {
        if (error.response.status === 400) {
          return error.response;
        }
        return error;
      });
    return res;
  },

  fetchAll: async () => {
    try {
      const response = await api.get(`/subcategory`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return response.data;
    } catch (error) {
      console.log("Erro ao buscar serviços:", error);
      throw error;
    }
  },

  getById: async (subCategoryId: number | undefined) => {
    try {
      if (subCategoryId === undefined) {
        throw new Error("O ID da equipe não foi fornecido.");
      }

      const res = await api.get(`/subcategory/${subCategoryId}`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching subCategory by ID:", error);
      throw error;
    }
  },

  update: async (subCategoryId: number, params: SubCategoryParams) => {
    try {
      const res = await api.put(`/subcategory/${subCategoryId}`, params, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.status;
    } catch (error) {
      console.error("Error updating subCategory:", error);
      throw error;
    }
  },

  delete: async (subCategoryId: number) => {
    try {
      const res = await api.delete(`/subcategory/${subCategoryId}`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.status;
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      throw error;
    }
  },
};

export { subCategoryService };
