import api from "./api";
import { TokenService } from "./tokenService";

export type SubCategoryParams = {
  name: string;
  status: string;
  categoryId?: string;
};

const subCategoryService = {
  create: async (params: SubCategoryParams) => {
    const res = await api
      .post(`/subCategory`, params, {
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
      const response = await api.get(`/subCategory`, {
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

      const res = await api.get(`/subCategory/${subCategoryId}`, {
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
      const res = await api.put(`/subCategory/${subCategoryId}`, params, {
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
      const res = await api.delete(`/subCategory/${subCategoryId}`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.status;
    } catch (error) {
      console.error("Error deleting subCategory:", error);
      throw error;
    }
  },
};

export { subCategoryService };
