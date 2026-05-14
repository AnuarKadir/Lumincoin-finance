import {AuthUtils} from "./auth-utils";

export class RouteUtils {
    static openRoutes = ['/login', '/sign-up', '/404'];

    static isOpenRoute(route) {
        return this.openRoutes.includes(route);
    }

    static getRedirectRoute(route) {
        const isAuthenticated = AuthUtils.isAuthenticated();
        const isOpen = this.isOpenRoute(route);

        if (!isAuthenticated && !isOpen) {
            return '/login';
        }

        if (isAuthenticated && (route === '/login' || route === '/sign-up')) {
            return '/';
        }

        return null;
    }
}