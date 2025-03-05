import { Button } from "../Button/Button";
import { getSvgPath } from "../../utils/utils";
export class HeroSection {
    private element: HTMLElement;

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
        this.element.appendChild(subtitleElement);

        const titleElement = document.createElement('h1');
        titleElement.textContent = title;
        titleElement.innerHTML = title.replace(/\n/g, '<br>');
        titleElement.className = 'hero-title'; 
        this.element.appendChild(titleElement);


        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = paragraph;
        paragraphElement.innerHTML = paragraph.replace(/\n/g, '<br>');
        this.element.appendChild(paragraphElement);

        const button = new Button('Get in touch','');
        button.render(this.element);
    }

    private applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .hero {
                padding-top: 5.938rem;
                padding-bottom: 0.625rem;
                padding-left: 0.625rem;
                padding-right: 0.625rem;
                display: column;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 0rem;
                text-align: center;
                color : white;
                height: 100vh;
            }

        `;
        document.head.appendChild(style);
    }

    render(parent: HTMLElement) {
        parent.appendChild(this.element);
    }
}