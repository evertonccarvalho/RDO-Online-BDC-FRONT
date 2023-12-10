import { RegisterSchema } from "@/lib/validations/auth";
import api from "./api";
import { TokenService } from "./tokenService";

interface LoginParams {
  email: string;
  password: string;
}

const authService = {
  register: async (params: RegisterSchema) => {
    const res = await api.post("/auth/register", params).catch((error) => {
      if (error.response.status === 400) {
        return error.response;
      }
      return error;
    });
    return res;
  },

  login: async (params: LoginParams) => {
    const res = await api.post("/auth/login", params).catch((error) => {
      if (error.response.status === 400 || error.response.status === 401) {
        return error.response;
      }
      return error;
    });

    if (res.status === 200) {
      TokenService.save(res.data.token);
    }

    return res;
  },

  autoLogin: async (token: string) => {
    const res = await api
      .get("/auth", { headers: { Authorization: `Bearer ${token}` } })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 401) {
          return error.response;
        }
        return error;
      });

    if (res.status === 200) {
      TokenService.save(token);
    }
    return res;
  },
};

export default authService;
