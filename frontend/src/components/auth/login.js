import {AuthUtils} from "../../utils/auth-utils";
import {ValidationUtils} from "../../utils/validation-utils";
import {AuthService} from "../../services/auth-service";
export class Login {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.rememberMeElement = document.getElementById('remember-me');
        this.commonErrorElement = document.getElementById('common-error');


        this.validations = [
            {element: this.passwordElement},
            {element: this.emailElement, options: {pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/}},
        ];

        document.getElementById('process-button').addEventListener('click', this.login.bind(this));
    }

    async login() {
        this.commonErrorElement.style.display = "none"
        if (ValidationUtils.validateForm(this.validations)) {

            const loginResult = await AuthService.logIn({
                email: this.emailElement.value,
                password: this.passwordElement.value,
                rememberMe: this.rememberMeElement.checked
            });

            if(loginResult) {
                AuthUtils.setAuthInfo(loginResult.accessToken, loginResult.refreshToken, {
                    id: loginResult.user.id,
                    name: loginResult.user.name
                })
                return this.openNewRoute('/');
            }

            this.commonErrorElement.style.display = 'block';
        }
    }
}