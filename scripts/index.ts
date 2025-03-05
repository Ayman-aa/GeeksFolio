import { Button } from './components/Button/Button';
import { NavBar } from './components/NavBar/NavBar';
import { HeroSection } from './components/HeroSection/HeroSection';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    if (app) {
        const navBar = new NavBar([
            { text: 'Home', href: '#' },
            { text: 'About Me', href: '#' },
            { text: 'Services', href: '#' },
            { text: 'My Work', href: '#' },
            { text: 'Testimonials', href: '#' },
        ]);
        navBar.render(app);

        const heroSection = new HeroSection('Front-end engineer based \n in casablanca', 'Hi  I’m Ayman Aamam 👋🏻', 'I’m a front-end engineer and a member of 42 network, building \n fast, accessible, and scalable web applications.');
        heroSection.render(app);

    }
});console.log('Hello, TypeScript');
