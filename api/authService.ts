import api, { Api } from "./api";
import { SIGN_UP } from "./constants";
import { AxiosResponse } from "axios";

type SignUpResponse = {
  userId: string;
  email: string;
  name: string;
  lastActivity: string;
};

class AuthService {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  //   public async login(credentials: {
  //     email: string;
  //     password: string;
  //   }): Promise<void> {
  //     try {
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   }

  public async signUp(credentials: {
    email: string;
    password: string;
    name: string;
  }): Promise<AxiosResponse<SignUpResponse>> {
    const response = await this.api.post<SignUpResponse>(SIGN_UP, credentials);
    return response;
  }
}

const authService = new AuthService(api);
export default authService;
