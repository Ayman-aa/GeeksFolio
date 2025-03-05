import { getSvgPath } from "../../utils/utils";

export class Button {
    private element: HTMLButtonElement;

    constructor(label: string, iconName?: string) {
        this.element = document.createElement('button');
        this.element.className = 'btn';
        
        // Create container for text and icon
        const contentContainer = document.createElement('div');
        contentContainer.className = 'btn-content';
        
        // Add text
        const textSpan = document.createElement('span');
        textSpan.textContent = label;
        contentContainer.appendChild(textSpan);
        
        // If icon name is provided, add the icon
        if (iconName) {
            const icon = document.createElement('img');
            icon.src = getSvgPath(iconName);
            icon.alt = '';
            icon.className = 'btn-icon';
            contentContainer.appendChild(icon);
        }
        
        this.element.appendChild(contentContainer);
        this.applyStyles();
    }

    private applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .btn {
                border: 0.031rem solid #610F4F;
                color: white;
                padding: 1.25rem 2.5rem;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                cursor: pointer;
                border-radius: 6.25rem;
                background-color: transparent;
                transition: all 0.3s ease;
            }
            .btn-content {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem; /* Space between text and icon */
            }
            .btn-icon {
                width: 0.8rem;
                height: 0.8rem;
            }
            .btn:hover {
                background-color: #610F4F;
            }
        `;
        document.head.appendChild(style);
    }

    public getElement(): HTMLButtonElement {
        return this.element;
    }

    public render(container: HTMLElement): void {
        container.appendChild(this.element);
    }
}