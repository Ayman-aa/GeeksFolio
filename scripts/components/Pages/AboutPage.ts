import { NavBar } from '../NavBar/NavBar';
import { Router } from '../Router/Router';
import { OverlayForm } from '../OverrelayForm/OverrelayForm';
import { getSvgPath } from '../../utils/utils';

export class AboutPage {
    private element: HTMLElement;
    private contactForm: OverlayForm;

    constructor(router: Router) {
        this.element = document.createElement('div');
        this.element.className = 'page about-page';
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
        
        // Add the about page content with styled components
        const content = document.createElement('section');
        content.className = 'about-content';
        
        // Profile image
        const profileImage = document.createElement('img');
        profileImage.src = getSvgPath('hero-avatar'); // Use the same avatar or replace with a different one
        profileImage.alt = 'Profile';
        profileImage.className = 'about-profile-image';
        
        // Heading elements
        const subtitle = document.createElement('h3');
        subtitle.className = 'about-subtitle';
        subtitle.textContent = 'Get to know me 👨‍💻';
        
        const title = document.createElement('h1');
        title.className = 'about-title';
        title.textContent = 'About Me';
        
        // Bio section
        const bio = document.createElement('div');
        bio.className = 'about-bio';
        
        const bioText = document.createElement('p');
        bioText.className = 'about-paragraph';
        bioText.innerHTML = `
            I'm a front-end engineer specializing in building elegant, 
            responsive, and accessible web applications. With expertise in 
            modern JavaScript frameworks and design systems, I deliver 
            digital experiences that balance sophisticated aesthetics with optimal functionality.<br><br>
            
            As a member of the 42 Network, I emphasize collaboration and 
            continuously expand my technical capabilities to implement efficient, 
            scalable solutions for complex challenges.
        `;
        
        // Skills section
        const skillsSection = document.createElement('div');
        skillsSection.className = 'about-skills-section';
        
        const skillsTitle = document.createElement('h2');
        skillsTitle.className = 'about-skills-title';
        skillsTitle.textContent = 'Skills & Technologies';
        
        const skillsContainer = document.createElement('div');
        skillsContainer.className = 'about-skills';
        
        // Create skill items
        const skills = ['JavaScript', 'TypeScript', 'React', 'Angular', 'Next.js', 'CSS/SCSS', 'Node.js', 'Spring', 'Git', 'UI/UX Design'];
        
        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'about-skill-item';
            skillItem.textContent = skill;
            skillsContainer.appendChild(skillItem);
        });

        const aboutSite = document.createElement('div');
        aboutSite.className = 'about-site';

        const aboutSiteTitle = document.createElement('h2');
        aboutSiteTitle.className = 'about-site-title';
        aboutSiteTitle.textContent = 'About This Site';

        aboutSite.appendChild(aboutSiteTitle);

        const aboutSiteText = document.createElement('p');
        aboutSiteText.className = 'aboutSite-paragraph';
        aboutSiteText.innerHTML = `
            This website was created using TypeScript and Css for the frontend. 
            The site is a single-page application with a custom router and 
            reusable components. The content is dynamically loaded based on 
            the current route, and the navigation links are integrated with 
            the router for seamless transitions<br><br>

            You can find the full source code for this project on my GitHub
            through this link: <a href="https://github.com/Ayman-aa/GeeksFolio" target="_blank">GeeksFolio</a>
        `;

        aboutSite.appendChild(aboutSiteText);
        
        // Assemble the page
        content.appendChild(profileImage);
        content.appendChild(subtitle);
        content.appendChild(title);
        
        bio.appendChild(bioText);
        content.appendChild(bio);
        
        skillsSection.appendChild(skillsTitle);
        skillsSection.appendChild(skillsContainer);
        content.appendChild(skillsSection);
        content.appendChild(aboutSite);
        
        // Render components
        navBar.render(this.element);
        navBar.setupRouterLinks(router);
        this.element.appendChild(content);

        
    }
    
    private applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .about-page {
                color: white;
            }
            
            .about-content {
                padding-top: 5rem;
                padding-bottom: 3rem;
                padding-left: 0.625rem;
                padding-right: 0.625rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                max-width: 850px;
                margin: 0 auto;
            }
            
            .about-subtitle {
                margin-bottom: 0.5rem;
                transform: translateY(1.25rem);
                opacity: 0;
                animation: slideUp 0.8s ease forwards 0.2s;
                color: rgba(139, 20, 181, 0.9);
            }
            
            .about-title {
                margin: 1rem 0 2rem;
                transform: translateY(1.25rem);
                opacity: 0;
                animation: slideUp 0.8s ease forwards 0.4s;
            }
            
            .about-bio {
                margin-bottom: 3rem;
                opacity: 0;
                animation: fadeIn 1s ease forwards 0.6s;
            }
            
            .about-paragraph {
                margin-bottom: 2rem;
            }
            
            .about-skills-section {
                width: 100%;
                opacity: 0;
                margin-bottom: 3rem;
                animation: fadeIn 1s ease forwards 0.8s;
            }
            
            .about-skills-title {
                margin-bottom: 1.5rem;
            }
            
            .about-skills {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 1rem;
                margin-top: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .about-skill-item {
                background-color: rgba(139, 20, 181, 0.2);
                border: 1px solid rgba(139, 20, 181, 0.6);
                border-radius: 2rem;
                padding: 0.75rem 1.5rem;
                font-size: 1rem;
                transition: all 0.3s ease;
                animation: pulseSkill 2s ease-in-out infinite;
                animation-delay: calc(0.1s * var(--i, 0));
            }
            
            .about-skill-item:hover {
                transform: translateY(-5px);
                background-color: rgba(139, 20, 181, 0.4);
                box-shadow: 0 5px 15px rgba(139, 20, 181, 0.3);
            }

            .aboutSite-paragraphe {
            
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
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            
            @keyframes pulseSkill {
                0% {
                    box-shadow: 0 0 0 0 rgba(139, 20, 181, 0.4);
                }
                70% {
                    box-shadow: 0 0 0 5px rgba(139, 20, 181, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(139, 20, 181, 0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    public getElement(): HTMLElement {
        return this.element;
    }
}