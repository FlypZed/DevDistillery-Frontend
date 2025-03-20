import ResponseResultDTO from "../models/ResponseResultDTO";
import User from "../models/User";
import HttpClientInstance, { HttpClient } from "./HttpClientService";

class UserService {

    constructor(protected basePath: string) {
    }

    getUser(id : string): Promise<ResponseResultDTO<User>>{
        return HttpClientInstance.get(`/${id}`);
    }

}

const userServiceInstance = new UserService('/v1/users');

export default userServiceInstance;