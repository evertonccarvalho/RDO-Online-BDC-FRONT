import { serviceSchema } from "@/lib/validations/service";
import { z } from "zod";
import api from "./api";
import { TokenService } from "./tokenService";
import { IWork } from "./workService";

export type IService = {
  id: number;
  serviceDescription: string;
  unit: string;
  status: string;
  totalAmount: string;
  subcategoryId?: number;
  work?: IWork;
};

const serviceService = {
  create: async (workId: number, params: z.infer<typeof serviceSchema>) => {
    try {
      const res = await api.post(`/works/${workId}/services`, params, {
        headers: {
          Authorization: TokenService.get(),
        },
      });

      return res.status;
    } catch (error: any) {
      if (error.response.status === 400) {
        return error.response;
      } else {
        return error;
      }
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

  getById: async (workId: number, serviceId: number | undefined) => {
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
    workId: number,
    serviceId: number | undefined,
    params: z.infer<typeof serviceSchema>,
  ) => {
    try {
      if (serviceId === undefined) {
        throw new Error("O ID do serviço não foi fornecido.");
      }

      const res = await api.put(
        `/works/${workId}/services/${serviceId}`,
        params,
        {
          headers: {
            Authorization: TokenService.get(),
          },
        },
      );
      console.log("a resioista di service", res);
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
      return res;
    } catch (error) {
      console.error("Error deleting work:", error);
      throw error;
    }
  },
};

export { serviceService };
