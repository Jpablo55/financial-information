import homeView from './views/home.js';
import customersView from './views/customers.js';

const routes = {
    '/': homeView,
    '/customers': customersView,
};

const router = async () => {
    const path = location.hash.slice(1).toLowerCase() || '/';
    const view = routes[path] || customersView;
    document.getElementById('app').innerHTML = await view();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
