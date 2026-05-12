import {HttpUtils} from "../utils/http-utils";
export class AuthService {

    static async logIn(data) {
        const result = await HttpUtils.request('/login', 'POST', false, data);
        const response = result.response;

        if (!response.tokens?.accessToken || !response.tokens?.refreshToken) {
            return false;
        }

        if (!response.user?.id || !response.user?.name) {
            return false;
        }

        return {
            accessToken: response.tokens.accessToken,
            refreshToken: response.tokens.refreshToken,
            user: {
                id: response.user.id,
                name: response.user.name,
                lastName: response.user.lastName
            }
        };
    }


    static async signUp(data) {
        const result = await HttpUtils.request('/signup', 'POST', false, data);

        if (result.error || !result.response) {
            return false;
        }

        const response = result.response;

        if (!response.user?.id || !response.user?.name) {
            console.error('Missing user info in signup response');
            return false;
        }

        return {
            user: {
                id: response.user.id,
                name: response.user.name,
                lastName: response.user.lastName,
                email: response.user.email
            }
        };
    }


    static async logOut(data) {
        await HttpUtils.request('/logout', 'POST', false, data);
    }
}