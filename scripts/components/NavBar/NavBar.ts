import { getSvgPath } from "../../utils/utils";
import { Button } from "../Button/Button";
import { Router } from "../Router/Router";
export class NavBar {
    private element: HTMLElement;
    private connectButton?: Button;
    private connectButtonCallback?: () => void;

    constructor(links: { text: string, href: string }[]) {
        this.element = document.createElement('nav');
        this.element.className = 'navbar';
        this.applyStyles();

        const logoContainer = document.createElement('a');
        logoContainer.href = '/';
        logoContainer.className = 'navbar-logo-container';
        
        const logoImg = document.createElement('img');
        logoImg.src = getSvgPath("dark_logo");
        logoImg.alt = 'Logo';
        logoImg.className = 'navbar-logo';
        
        logoContainer.appendChild(logoImg);
        this.element.appendChild(logoContainer);

        const ul = document.createElement('ul');
        ul.className = 'navbar-list';

        links.forEach(link => {
            const li = document.createElement('li');
            li.className = 'navbar-item';

            const anchor = document.createElement('a');
            anchor.textContent = link.text;
            anchor.href = link.href;

            li.appendChild(anchor);
            ul.appendChild(li);
        });
        
        this.element.appendChild(ul);
        
        // Add connect button
        this.connectButton = new Button('Connect', 'arrow');
        this.connectButton.getElement().addEventListener('click', () => {
            if (this.connectButtonCallback) {
                this.connectButtonCallback();
            }
        });
        this.connectButton.render(this.element);
    }

    public onConnectButtonClick(callback: () => void): void {
        this.connectButtonCallback = callback;
    }

    /**
     * Setup router integration for navigation links
     */
    public setupRouterLinks(router: Router): void {
        // Find all links in the navbar
        const links = this.element.querySelectorAll('.navbar-item a');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href') || '/';
                router.navigate(href);
            });
        });
        
        // Setup the logo to navigate to home
        const logoLink = this.element.querySelector('.navbar-logo-container');
        if (logoLink) {
            logoLink.addEventListener('click', (e) => {
                e.preventDefault();
                router.navigate('/');
            });
        }
    }

    private applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .navbar{
                padding-right: 2.625rem;
                padding-left: 2.625rem;
                padding-top: 1.25rem;
                padding-bottom: 1.25rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                animation: fadeIn 1s ease forwards;
            }
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            .navbar-logo-container {
                padding: 0 1.8rem;
            }
            .navbar-list {
                list-style: none;
                padding-left: 3.75rem;
                padding-top: 1.375rem;
                padding-bottom: 1.375rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color:rgba(13, 9, 15, 0.5);
                border-radius: 6.25rem;
                box-shadow: 0px 10px 35px 0px rgba(97, 15, 79, 0.25);
            }
            .navbar-item {
                margin-right: 3.75rem;
            }
            .navbar a {
                color: white;
                text-decoration: none;
                transition: all 0.3s ease-in-out;
            }
            .navbar a:hover {
                color:rgb(120, 20, 98);
            }      
        `;
        document.head.appendChild(style);
    }

    render(parent: HTMLElement) {
        parent.appendChild(this.element);
    }    
    public getElement(): HTMLElement {
        return this.element;
    }
}