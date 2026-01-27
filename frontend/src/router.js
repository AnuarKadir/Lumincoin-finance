import {Dashboard} from "./components/dashboard";
import {Login} from "./components/auth/login";
import {SignUp} from "./components/auth/sign-up";
import {Logout} from "./components/auth/logout";

export class Router {

    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');

        this.initEvents();
        this.routes = [
            {
                route: '/',
                title: 'Дашборд',
                filePathTemplate: '/templates/pages/dashboard.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Dashboard();
                },
                scripts: ['chart.umd.js']
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/pages/auth/login.html',
                useLayout: false,
                load: () => {
                    document.body.classList.add('login-page');
                    new Login(this.openNewRoute.bind(this));
                },
                unload: () => {
                    document.body.classList.remove('login-page');
                },
            },
            {
                route: '/sign-up',
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/sign-up.html',
                useLayout: false,
                load: () => {
                    document.body.classList.add('register-page');
                    new SignUp(this.openNewRoute.bind(this));
                },
                unload: () => {
                    document.body.classList.remove('register-page');
                },
            },
            {
                route: '/logout',
                load: () => {
                    new Logout(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/404',
                title: 'Страница не найдена',
                filePathTemplate: '/templates/pages/404.html',
                useLayout: false,
            },
            {
                route: '/income',
                title: 'Категории доходов',
                filePathTemplate: '/templates/pages/income-categories/list.html',
                useLayout: '/templates/layout.html',
            },
            {
                route: '/income/create',
                title: 'Создание категории дохода',
                filePathTemplate: '/templates/pages/income-categories/create.html',
                useLayout: '/templates/layout.html',
            },
            {
                route: '/income/edit',
                title: 'Редактирование категории дохода',
                filePathTemplate: '/templates/pages/income-categories/edit.html',
                useLayout: '/templates/layout.html',
            },
            {
                route: '/expense',
                title: 'Категории расходов',
                filePathTemplate: '/templates/pages/expense-categories/list.html',
                useLayout: '/templates/layout.html',
            },
            {
                route: '/expense/create',
                title: 'Создание категории расхода',
                filePathTemplate: '/templates/pages/expense-categories/create.html',
                useLayout: '/templates/layout.html',
            },
            {
                route: '/expense/edit',
                title: 'Редактирование категории расхода',
                filePathTemplate: '/templates/pages/expense-categories/edit.html',
                useLayout: '/templates/layout.html',
            },
            {
                route: '/transactions',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/pages/transactions/list.html',
                useLayout: '/templates/layout.html',
            },
            {
                route: '/transactions/create',
                title: 'Создание категории расхода',
                filePathTemplate: '/templates/pages/transactions/create.html',
                useLayout: '/templates/layout.html',
            },
            {
                route: '/transactions/edit',
                title: 'Редактирование категории расхода',
                filePathTemplate: '/templates/pages/transactions/edit.html',
                useLayout: '/templates/layout.html',
            },
            ]
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    async openNewRoute(url) {
        const currentRoute = window.location.pathname;
        history.pushState({}, '', url);
        await this.activateRoute(null, currentRoute);
    }

    async clickHandler(e) {
        let element = null;
        if (e.target.nodeName === 'A') {
            element = e.target;
        } else if (e.target.parentNode.nodeName === 'A') {
            element = e.target.parentNode;
        }
        if (element) {
            if (element.getAttribute('data-bs-toggle')) {
                return;
            }
            e.preventDefault();
            const currentRoute = window.location.pathname;
            const url = element.href.replace(window.location.origin, '');
            if (!url || (currentRoute === url.replace('#', '')) || url.startsWith('javascript:void(0)')) {
                return;
            }
            await this.openNewRoute(url);
        }
    }
    findElements(urlRoute) {
        const allLinks = document.querySelectorAll('.main-sidebar .nav-link');
        allLinks.forEach(link => link.classList.remove('active', 'active-parent', 'nav-link-highlight'));

        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if(!href || href === '#') return;

            if(href === '/' && urlRoute === '/') {
                link.classList.add('active');
            }
            else if(href !== '/' && urlRoute.startsWith(href)) {
                link.classList.add('active');
                const parentCollapse = link.closest('.collapse');
                if (parentCollapse) {
                    parentCollapse.classList.add('show');
                    const parentToggle = document.querySelector(`.main-sidebar a[href='#${parentCollapse.id}']`);
                    if (parentToggle) {
                        parentToggle.classList.add('active-parent');
                        parentToggle.setAttribute('aria-expanded', 'true');
                        parentToggle.classList.remove('collapsed');
                    }
                }
            }
        })
        if (urlRoute.startsWith('/expense')) {
            const incomeLink = document.querySelector('.main-sidebar a[href="/income"]');
            if (incomeLink) {
                incomeLink.classList.add('nav-link-highlight');
            }
        }
    }
    async activateRoute(e, oldRoute) {

        if (oldRoute) {
            const currentRoute = this.routes.find(item => item.route === oldRoute);
            if (currentRoute.styles && currentRoute.styles.length > 0) {
                currentRoute.styles.forEach(style => {
                    document.querySelector(`link[href='/css/${style}']`).remove();
                });
            }
            if (currentRoute.unload && typeof currentRoute.unload === 'function') {
                currentRoute.unload();
            }
        }

        const urlRoute = window.location.pathname;
        const newRoute = this.routes.find(item => item.route === urlRoute);

        if (newRoute) {
            if (newRoute.styles && newRoute.styles.length > 0) {
                newRoute.styles.forEach(style => {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = '/css/' + style;
                    document.head.appendChild(link)
                })
            }
            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title + ' | Lumincoin Finance';
            }
            if (newRoute.filePathTemplate) {
                document.body.className = '';
                let contentBlock = this.contentPageElement;
                if (newRoute.useLayout) {
                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                    contentBlock = document.getElementById('content-layout');
                }
                contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
            }

            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }
        } else {
            console.log('No route found');
            history.pushState({}, '', '/404');
            await this.activateRoute();
        }
        this.findElements(urlRoute);
    }
}