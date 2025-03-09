import { NavBar } from '../NavBar/NavBar';
import { HeroSection } from '../HeroSection/HeroSection';
import { OverlayForm } from '../OverrelayForm/OverrelayForm';
import { Router } from '../Router/Router';

export class HomePage {
    private element: HTMLElement;
    private contactForm: OverlayForm;

    constructor(router: Router) {
        this.element = document.createElement('div');
        this.element.className = 'page home-page';
        
        // Create contact form
        this.contactForm = new OverlayForm(
            'Get in touch',
            [
                {
                    id: 'name',
                    name: 'name',
                    type: 'text',
                    label: 'Your Name',
                    placeholder: 'Enter your name',
                    required: true
                },
                {
                    id: 'email',
                    name: 'email',
                    type: 'email',
                    label: 'Email Address',
                    placeholder: 'Enter your email',
                    required: true
                },
                {
                    id: 'message',
                    name: 'message',
                    type: 'textarea',
                    label: 'Message',
                    placeholder: 'What would you like to discuss?',
                    required: true,
                    rows: 5
                }
            ],
            'Send Message'
        );
        
        // Handle form submission
        this.contactForm.onSubmit((data) => {
            console.log('Form submitted:', data);
        });
        
        // Create navigation
        const navBar = new NavBar([
            { text: 'Home', href: '/' },
            { text: 'About Me', href: '/about' },
            { text: 'Services', href: '/services' },
            { text: 'My Work', href: '/work' },
            { text: 'Testimonials', href: '/testimonials' },
        ]);
        
        navBar.onConnectButtonClick(() => {
            this.contactForm.open();
        });
        
        // Create hero section
        const heroSection = new HeroSection(
            'Front-end engineer based \n in casablanca', 
            'Hi I\'m Ayman Aamam 👋🏻', 
            'I\'m a front-end engineer and a member of 42 network, building \n fast, accessible, and scalable web applications.'
        );
        
        heroSection.addContactButton(() => {
            this.contactForm.open();
        });
        
        // Render components to the page
        navBar.render(this.element);
        this.setupRouterLinks(navBar, router);
        heroSection.render(this.element);
    }
    
    private setupRouterLinks(navBar: NavBar, router: Router): void {
        const links = this.element.querySelectorAll('.navbar-item a');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href') || '/';
                router.navigate(href);
            });
        });
    }
    
    public getElement(): HTMLElement {
        return this.element;
    }
}