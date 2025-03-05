import { Button } from './components/Button/Button';
import { NavBar } from './components/NavBar/NavBar';
import { HeroSection } from './components/HeroSection/HeroSection';
import { OverlayForm } from './components/OverrelayForm/OverrelayForm';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    if (app) {
        // Create contact form
        const contactForm = new OverlayForm(
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
        contactForm.onSubmit((data) => {
            console.log('Form submitted:', data);
            // Here you would typically send the data to your backend
        });
        
        // Modify NavBar to include a CTA button
        const navBar = new NavBar([
            { text: 'Home', href: '#' },
            { text: 'About Me', href: '#' },
            { text: 'Services', href: '#' },
            { text: 'My Work', href: '#' },
            { text: 'Testimonials', href: '#' },
        ]);
        
        // Add click event to the NavBar's connect button
        navBar.onConnectButtonClick(() => {
            contactForm.open();
        });
        
        navBar.render(app);

        const heroSection = new HeroSection('Front-end engineer based \n in casablanca', 'Hi  I\'m Ayman Aamam 👋🏻', 'I\'m a front-end engineer and a member of 42 network, building \n fast, accessible, and scalable web applications.');
        
        // Add a contact button to the hero section
        heroSection.addContactButton(() => {
            contactForm.open();
        });
        
        heroSection.render(app);
    }
});