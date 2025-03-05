import { Button } from "../Button/Button";
import { getSvgPath } from "../../utils/utils";
export class HeroSection {
    private element: HTMLElement;
    private contactButton?: Button;
    private contactButtonCallback?: () => void;
    

    constructor(title: string, subtitle: string, paragraph: string) {
        this.element = document.createElement('section');
        this.element.className = 'hero';
        this.applyStyles();

        const avatar = document.createElement('img');
        avatar.src = getSvgPath('hero-avatar');
        avatar.alt = 'Avatar';
        avatar.className = 'avatar';
        this.element.appendChild(avatar);

        const subtitleElement = document.createElement('h3');
        subtitleElement.textContent = subtitle;
        subtitleElement.className = 'hero-subtitle';
        this.element.appendChild(subtitleElement);

        const titleElement = document.createElement('h1');
        titleElement.innerHTML = title.replace(/\n/g, '<br>');
        titleElement.className = 'hero-title'; 
        this.element.appendChild(titleElement);

        const paragraphElement = document.createElement('p');
        paragraphElement.innerHTML = paragraph.replace(/\n/g, '<br>');
        paragraphElement.className = 'hero-paragraph';
        this.element.appendChild(paragraphElement);
        
        // Add button container
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'hero-buttons';
        
        // We'll add the contact button in the addContactButton method
        
        this.element.appendChild(buttonContainer);
    }

    public addContactButton(callback: () => void): void {
        this.contactButtonCallback = callback;
        
        // Use getElementsByClassName which returns an HTMLCollection
        const containers = this.element.getElementsByClassName('hero-buttons');
        if (containers.length > 0) {
            const buttonContainer = containers[0] as HTMLElement;
            this.contactButton = new Button('Let\'s Talk', 'arrow');
            this.contactButton.getElement().addEventListener('click', () => {
                if (this.contactButtonCallback) {
                    this.contactButtonCallback();
                }
            });
            this.contactButton.render(buttonContainer);
        }
    }

    private applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .hero {
                padding-top: 5rem;
                padding-bottom: 0.625rem;
                padding-left: 0.625rem;
                padding-right: 0.625rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 0rem;
                text-align: center;
                color: white;
                margin-bottom: 3.125rem;
            }
            
            .avatar {
                width: 6.25rem;
                height: 6.25rem;
                border-radius: 50%;
                opacity: 0;
                animation: fadeIn 1s ease forwards;
            }
            
            .hero-subtitle {
                font-size: 1.25rem;
                margin-bottom: 0.5rem;
                transform: translateY(1.25rem);
                opacity: 0;
                animation: slideUp 0.8s ease forwards 0.2s;
            }
            
            .hero-title {
                margin: 1.8rem 0;
                transform: translateY(1.25rem);
                opacity: 0;
                animation: slideUp 0.8s ease forwards 0.4s;
            }
            
            .hero-paragraph {
                margin-top: 0.5rem;
                transform: translateY(1.25rem);
                opacity: 0;
                animation: slideUp 0.8s ease forwards 0.6s;
            }
            
            .hero-buttons {
                opacity: 0;
                animation: fadeIn 1s ease forwards 0.8s;
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
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    render(parent: HTMLElement) {
        parent.appendChild(this.element);
    }
}