import { ServiceSchema } from "@/lib/validations/service";
import api from "./api";
import { TokenService } from "./tokenService";

const serviceService = {
  create: async (workId: number, params: ServiceSchema) => {
    const res = await api
      .post(`/works/${workId}/services`, params, {
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

  register: async (workId: number, params: ServiceSchema) => {
    try {
      const res = await api.post(`/works/${workId}/services`, params, {
        headers: {
          Authorization: TokenService.get(),
        },
      });

      return res.data; // Return the response data or modify as needed
    } catch (error) {
      if (error instanceof Error)
        console.error("Erro ao registrar serviço", error.message);
      throw error;
    }
  },

  fetchAll: async (workId: number) => {
    try {
      const response = await api.get(`/works/${workId}/services`, {
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

  getById: async (serviceId: number, workId: number | undefined) => {
    try {
      if (serviceId === undefined) {
        throw new Error("O ID do serviço não foi fornecido.");
      }

      const res = await api.get(`/works/${workId}/services/${serviceId}`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching service by ID:", error);
      throw error;
    }
  },

  update: async (
    serviceId: number,
    workId: number | string,
    params: ServiceSchema,
  ) => {
    try {
      const res = await api.put(
        `/works/${workId}/services/${serviceId}`,
        params,
        {
          headers: {
            Authorization: TokenService.get(),
          },
        },
      );
      return res.status;
    } catch (error) {
      console.error("Error updating work:", error);
      throw error;
    }
  },

  delete: async (serviceId: number, workId: number) => {
    try {
      const res = await api.delete(`/works/${workId}/services/${serviceId}`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.status;
    } catch (error) {
      console.error("Error deleting work:", error);
      throw error;
    }
  },
};

export { serviceService };
