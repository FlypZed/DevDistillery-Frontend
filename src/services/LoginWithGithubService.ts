import ResponseResultDTO from "../models/ResponseResultDTO";
import { HttpClient } from "./HttpClientService";

class LoginWithGithubService {

    private client: HttpClient;
    constructor(protected basePath: string) {
        this.client = new HttpClient("https://github.com/login/oauth/authorize", 10000);
    }

    loginWithGitHub(code: string): Promise<ResponseResultDTO<string>> {
        return this.client.post('/api/auth/login-github', { code });
    }

}

const loginWithGithubServiceInstance = new LoginWithGithubService('/api/auth');

export default loginWithGithubServiceInstance;