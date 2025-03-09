import { NavBar } from '../NavBar/NavBar';
import { Router } from '../Router/Router';
import { OverlayForm } from '../OverrelayForm/OverrelayForm';
import { getSvgPath } from '../../utils/utils';

export class ComingSoonPage {
    private element: HTMLElement;
    private contactForm: OverlayForm;
    private pageName: string;

    constructor(router: Router, pageName: string) {
        this.pageName = pageName;
        this.element = document.createElement('div');
        this.element.className = 'page coming-soon-page';
        this.applyStyles();
        
        // Create contact form (reused across pages)
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
        
        this.contactForm.onSubmit((data) => {
            console.log('Form submitted:', data);
        });
        
        // Create navigation with the same structure
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
        
        // Coming soon content
        const content = document.createElement('section');
        content.className = 'coming-soon-content';
        
        // Icon
        const iconContainer = document.createElement('div');
        iconContainer.className = 'coming-soon-icon';
        const icon = document.createElement('div');
        icon.className = 'construction-icon';
        icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="animated-svg">
    <!-- Base platform -->
    <path d="M2 22H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="svg-path base"/>
    
    <!-- Code brackets with pulse effect -->
    <path d="M5 16L2 12L5 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-path code-left"/>
    <path d="M19 16L22 12L19 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-path code-right"/>
    
    <!-- Central structure (stylized building/site) -->
    <path d="M9 22V12C9 10.8954 9.89543 10 11 10H13C14.1046 10 15 10.8954 15 12V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="svg-path building"/>
    
    <!-- Connecting elements (platform) -->
    <path d="M6 22V18" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="svg-path connector-1"/>
    <path d="M18 22V18" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="svg-path connector-2"/>
    
    <!-- Progress bar -->
    <path d="M7 14H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="svg-path progress-track"/>
    <path d="M7 14H13" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="svg-path progress-fill"/>
    
    <!-- Gear/cog (animated rotation) -->
    <path d="M12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6Z" stroke="currentColor" stroke-width="1.5" class="svg-path gear"/>
    <path d="M12 6V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="svg-path gear-connector"/>
    <path d="M14.1213 5.87868L15.5355 7.29289" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="svg-path gear-spoke-1"/>
    <path d="M9.87868 5.87868L8.46447 7.29289" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="svg-path gear-spoke-2"/>
    
    <!-- Pulsing dot -->
    <circle cx="12" cy="4" r="1" fill="currentColor" class="pulse-circle"/>
</svg>`;
        
        iconContainer.appendChild(icon);
        
        // Title
        const title = document.createElement('h1');
        title.className = 'coming-soon-title';
        title.textContent = this.pageName;
        
        // Message
        const message = document.createElement('h2');
        message.className = 'coming-soon-message';
        message.textContent = 'Coming Soon';
        
        // Description
        const description = document.createElement('p');
        description.className = 'coming-soon-description';
        description.textContent = `This section is currently under development. Please check back soon for updates on ${this.pageName.toLowerCase()}.`;
        
        // Notification section
        const notificationSection = document.createElement('div');
        notificationSection.className = 'coming-soon-notification';
        
        const notificationText = document.createElement('p');
        notificationText.textContent = 'Want to be notified when this section is live?';
        
        const notifyButton = document.createElement('button');
        notifyButton.className = 'notify-button';
        notifyButton.textContent = 'Notify Me';
        notifyButton.addEventListener('click', () => {
            this.contactForm.open();
        });
        
        notificationSection.appendChild(notificationText);
        notificationSection.appendChild(notifyButton);
        
        // Assemble everything
        content.appendChild(iconContainer);
        content.appendChild(title);
        content.appendChild(message);
        content.appendChild(description);
        content.appendChild(notificationSection);
        
        // Render components
        navBar.render(this.element);
        navBar.setupRouterLinks(router);
        this.element.appendChild(content);
    }
    
    private applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .coming-soon-page {
                color: white;
                min-height: 100vh;
            }
            
            .coming-soon-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: 4rem 2rem;
                max-width: 800px;
                margin: 0 auto;
                animation: fadeIn 1s ease forwards;
            }
            
            .coming-soon-icon {
                width: 120px;
                height: 120px;
                margin-bottom: 2rem;
                animation: float 3s ease-in-out infinite;
            }
            
            .construction-icon {
                width: 100%;
                height: 100%;
            }
            
            .construction-icon svg {
                width: 100%;
                height: 100%;
                color: rgba(139, 20, 181, 0.9);
            }
            
            .coming-soon-title {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                transform: translateY(1.25rem);
                opacity: 0;
                animation: slideUp 0.8s ease forwards 0.2s;
            }
            
            .coming-soon-message {
                font-size: 3rem;
                color: rgba(139, 20, 181, 0.9);
                margin-bottom: 2rem;
                transform: translateY(1.25rem);
                opacity: 0;
                animation: slideUp 0.8s ease forwards 0.4s, glow 2s ease-in-out infinite alternate;
            }
            
            .coming-soon-description {
                font-size: 1.2rem;
                line-height: 1.6;
                margin-bottom: 3rem;
                opacity: 0;
                animation: fadeIn 1s ease forwards 0.6s;
            }
            
            .coming-soon-notification {
                background-color: rgba(139, 20, 181, 0.2);
                border: 1px solid rgba(139, 20, 181, 0.6);
                border-radius: 1rem;
                padding: 1.5rem 2rem;
                opacity: 0;
                animation: fadeIn 1s ease forwards 0.8s;
            }
            
            .coming-soon-notification p {
                margin-bottom: 1rem;
            }
            
            .notify-button {
                background-color: rgba(139, 20, 181, 0.8);
                color: white;
                border: none;
                border-radius: 2rem;
                padding: 0.75rem 2rem;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .notify-button:hover {
                background-color: rgba(139, 20, 181, 1);
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(139, 20, 181, 0.4);
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            
            @keyframes slideUp {
                from {
                    transform: translateY(1.25rem);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes float {
                0% {
                    transform: translateY(0px);
                }
                50% {
                    transform: translateY(-10px);
                }
                100% {
                    transform: translateY(0px);
                }
            }
            
            @keyframes glow {
                from {
                    text-shadow: 0 0 5px rgba(139, 20, 181, 0.5), 0 0 10px rgba(139, 20, 181, 0.3);
                }
                to {
                    text-shadow: 0 0 10px rgba(139, 20, 181, 0.8), 0 0 20px rgba(139, 20, 181, 0.5), 0 0 30px rgba(139, 20, 181, 0.3);
                }
            }

            .animated-svg .svg-path {
                stroke-dasharray: 100;
                stroke-dashoffset: 100;
                animation: drawPath 2s forwards ease-in-out;
            }

            .animated-svg .base {
                animation-delay: 0s;
            }

            .animated-svg .code-left {
                animation-delay: 0.2s;
            }

            .animated-svg .code-right {
                animation-delay: 0.2s;
            }

            .animated-svg .building {
                animation-delay: 0.4s;
            }

            .animated-svg .connector-1 {
                animation-delay: 0.6s;
            }

            .animated-svg .connector-2 {
                animation-delay: 0.7s;
            }

            .animated-svg .progress-track {
                animation-delay: 0.8s;
            }

            .animated-svg .progress-fill {
                animation-delay: 1s;
                stroke: rgba(139, 20, 181, 0.9);
                animation: drawPath 2s forwards ease-in-out 1s, pulseProgress 2s infinite 3s;
            }

            .animated-svg .gear, .animated-svg .gear-connector, .animated-svg .gear-spoke-1, .animated-svg .gear-spoke-2 {
                animation-delay: 1.2s;
            }

            .animated-svg .gear, .animated-svg .gear-spoke-1, .animated-svg .gear-spoke-2 {
                transform-origin: 12px 4px;
                animation: drawPath 2s forwards ease-in-out 1.2s, rotateGear 4s linear infinite 3s;
            }

            .pulse-circle {
                animation: pulseDot 2s infinite ease-in-out;
                transform-origin: center;
                transform-box: fill-box;
            }

            @keyframes drawPath {
                to {
                    stroke-dashoffset: 0;
                }
            }

            @keyframes pulseProgress {
                0% { stroke-opacity: 1; }
                50% { stroke-opacity: 0.6; }
                100% { stroke-opacity: 1; }
            }

            @keyframes rotateGear {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            @keyframes pulseDot {
                0% { r: 1; opacity: 1; fill: rgba(139, 20, 181, 0.9); }
                50% { r: 2; opacity: 0.7; fill: rgba(219, 77, 255, 0.8); }
                100% { r: 1; opacity: 1; fill: rgba(139, 20, 181, 0.9); }
            }
        `;
        document.head.appendChild(style);
    }
    
    public getElement(): HTMLElement {
        return this.element;
    }
}