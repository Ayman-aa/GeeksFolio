import { Router } from './components/Router/Router';
import { HomePage } from './components/Pages/HomePage';
import { AboutPage } from './components/Pages/AboutPage';
import { ComingSoonPage } from './components/Pages/ComingSoonPage';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    if (app) {
        // Create router instance
        const router = new Router(app);
        
        // Register routes
        router.addRoute({
            path: '/',
            component: () => new HomePage(router).getElement(),
            title: 'GeeksFolio - Home'
        });
        
        router.addRoute({
            path: '/about',
            component: () => new AboutPage(router).getElement(),
            title: 'GeeksFolio - About Me'
        });
        
        // Use the ComingSoonPage for placeholder routes
        router.addRoute({
            path: '/services',
            component: () => new ComingSoonPage(router, 'Services').getElement(),
            title: 'GeeksFolio - Services'
        });
        
        router.addRoute({
            path: '/work',
            component: () => new ComingSoonPage(router, 'My Work').getElement(),
            title: 'GeeksFolio - My Work'
        });
        
        router.addRoute({
            path: '/testimonials',
            component: () => new ComingSoonPage(router, 'Testimonials').getElement(),
            title: 'GeeksFolio - Testimonials'
        });
        
        // Initialize router
        router.init();
    }
});