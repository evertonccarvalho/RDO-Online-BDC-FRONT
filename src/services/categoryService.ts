import api from "./api";
import { TokenService } from "./tokenService";

export type CategoryParams = {
  name: string;
  status: string;
};
export type CategorySchema = {
  id: number;
  name: string;
  status: string;
};

const categoryService = {
  create: async (params: CategoryParams) => {
    const res = await api
      .post(`/category`, params, {
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
      const response = await api.get(`/category`, {
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

  getById: async (categoryId: number | undefined) => {
    try {
      if (categoryId === undefined) {
        throw new Error("O ID da equipe não foi fornecido.");
      }

      const res = await api.get(`/category/${categoryId}`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      throw error;
    }
  },

  update: async (categoryId: number, params: CategoryParams) => {
    try {
      const res = await api.put(`/category/${categoryId}`, params, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  delete: async (categoryId: number) => {
    try {
      const res = await api.delete(`/category/${categoryId}`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.status;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  },
};

export { categoryService };
