import {HttpUtils} from "../utils/http-utils";

export class AuthService {

    static async logIn(data) {
        const result = await HttpUtils.request('/login', 'POST', false, data);
        if (result.error || !result.response) {
            return false;
        }
        if (!result.response.tokens || !result.response.tokens.accessToken || !result.response.tokens.refreshToken || !result.response.user) {
            return false;
        }
        console.log('Ответ сервера:', result.response)
        return result.response;
    }

    static async logOut(data) {
        await HttpUtils.request('/logout', 'POST', false, data);
    }
}