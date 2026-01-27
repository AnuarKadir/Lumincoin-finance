import "./styles/style.scss";
import { Router } from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import 'bootstrap-icons/font/bootstrap-icons.css';

import '@fortawesome/fontawesome-free/css/all.min.css';

class App {
    constructor() {
        new Router();
    }
}

new App();