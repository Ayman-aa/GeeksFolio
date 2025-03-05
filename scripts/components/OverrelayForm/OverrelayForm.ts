import { Button } from "../Button/Button";

export class OverlayForm {
    private overlay: HTMLElement;
    private form: HTMLFormElement;
    private formContainer: HTMLElement;
    private isOpen: boolean = false;
    private onSubmitCallback?: (data: any) => void;
    private escapeKeyHandler: (event: KeyboardEvent) => void;
    private toast: HTMLElement;

    constructor(title: string, fields: FormField[], submitButtonText: string = "Submit") {
        // Create overlay container
        this.overlay = document.createElement('div');
        this.overlay.className = 'overlay';
        this.overlay.style.display = 'none';
        
        // Create form container
        this.formContainer = document.createElement('div');
        this.formContainer.className = 'form-container';
        
        // Create form title
        const formTitle = document.createElement('h3');
        formTitle.textContent = title;
        formTitle.className = 'form-title';
        this.formContainer.appendChild(formTitle);
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.className = 'close-button';
        closeButton.addEventListener('click', () => this.close());
        this.formContainer.appendChild(closeButton);
        
        // Create form element
        this.form = document.createElement('form');
        this.form.className = 'contact-form';
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Add form fields
        fields.forEach(field => {
            const fieldContainer = document.createElement('div');
            fieldContainer.className = 'field-container';
            
            // Create label if provided
            if (field.label) {
                const label = document.createElement('label');
                label.setAttribute('for', field.id);
                label.textContent = field.label;
                fieldContainer.appendChild(label);
            }
            
            // Create input or textarea
            let input: HTMLInputElement | HTMLTextAreaElement;
            
            if (field.type === 'textarea') {
                input = document.createElement('textarea');
                (input as HTMLTextAreaElement).rows = field.rows || 4;
            } else {
                input = document.createElement('input');
                input.type = field.type;
            }
            
            input.id = field.id;
            input.name = field.name;
            input.placeholder = field.placeholder || '';
            input.required = field.required || false;
            
            fieldContainer.appendChild(input);
            this.form.appendChild(fieldContainer);
        });
        
        // Create submit button
        const submitButtonContainer = document.createElement('div');
        submitButtonContainer.className = 'button-container';
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = submitButtonText;
        submitButton.className = 'submit-button';
        submitButtonContainer.appendChild(submitButton);
        this.form.appendChild(submitButtonContainer);
        
        this.formContainer.appendChild(this.form);
        this.overlay.appendChild(this.formContainer);
        
        // Create toast notification element (hidden initially)
        this.toast = document.createElement('div');
        this.toast.className = 'toast';
        this.toast.style.display = 'none';
        document.body.appendChild(this.toast);
        
        // Add click event on the overlay background to close it
        this.overlay.addEventListener('click', (event) => {
            // Close only if the click is directly on the overlay, not on its children
            if (event.target === this.overlay) {
                this.close();
            }
        });
        
        // Set up escape key handler
        this.escapeKeyHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && this.isOpen) {
                this.close();
            }
        };
        
        // Add styles
        this.applyStyles();
        
        // Append to body when constructed
        document.body.appendChild(this.overlay);
    }
    
    private applyStyles(): void {
        const style = document.createElement('style');
        style.textContent = `
            .overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(0.5rem);
                -webkit-backdrop-filter: blur(0.5rem); /* Safari support */
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease, backdrop-filter 0.3s ease;
            }
            
            .overlay.visible {
                opacity: 1;
            }
            
            .form-container {
                background-color: #1A1427;
                border-radius: 1rem;
                padding: 2rem;
                width: 90%;
                max-width: 37.5rem;
                position: relative;
                box-shadow: 0 0.625rem 2.188rem 0 rgba(97, 15, 79, 0.25);
                color: white;
                transform: translateY(1.25rem);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            .overlay.visible .form-container {
                transform: translateY(0);
                opacity: 1;
            }
            
            .form-title {
                margin-top: 0;
                margin-bottom: 1.5rem;
                color: white;
                font-size: 1.5rem;
            }
            
            .close-button {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: white;
                transition: transform 0.2s ease;
            }
            
            .close-button:hover {
                transform: scale(1.1);
            }
            
            .field-container {
                margin-bottom: 1.25rem;
            }
            
            label {
                display: block;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
            }
            
            input, textarea {
                width: 96%;
                padding: 0.75rem;
                border: 0.0625rem solid #610F4F;
                border-radius: 0.375rem;
                background-color: transparent;
                color: white;
                font-size: 1rem;
            }
            
            input:focus, textarea:focus {
                outline: none;
                border-color: #8B14B5;
                box-shadow: 0 0 0 0.125rem rgba(139, 20, 181, 0.3);
            }
            
            .button-container {
                display: flex;
                justify-content: flex-start;
                margin-top: 1.5rem;
            }
            
            .submit-button {
                background-color: #610F4F;
                color: white;
                border: none;
                border-radius: 6.25rem;
                padding: 0.75rem 2rem;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .submit-button:hover {
                background-color: #8B14B5;
            }
            
            /* Toast notification styles */
            .toast {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                background-color: #1A1427;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);
                z-index: 2000;
                transform: translateY(150%);
                transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
                border-left: 0.25rem solid #610F4F;
            }
            
            .toast.visible {
                transform: translateY(0);
            }
            
            .toast.success {
                border-left-color: #4CAF50;
            }
            
            .toast.error {
                border-left-color: #F44336;
            }
        `;
        document.head.appendChild(style);
    }
    
    public open(): void {
        // Add ESC key listener when form is opened
        document.addEventListener('keydown', this.escapeKeyHandler);
        
        this.overlay.style.display = 'flex';
        // Trigger reflow for animation
        void this.overlay.offsetWidth;
        this.overlay.classList.add('visible');
        this.isOpen = true;
    }
    
    public close(): void {
        // Remove ESC key listener when form is closed
        document.removeEventListener('keydown', this.escapeKeyHandler);
        
        this.overlay.classList.remove('visible');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            if (!this.isOpen) {
                this.overlay.style.display = 'none';
            }
        }, 300);
        
        this.isOpen = false;
    }
    
    public toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    public onSubmit(callback: (data: any) => void): void {
        this.onSubmitCallback = callback;
    }
    
    private handleSubmit(): void {
        const formData = new FormData(this.form);
        const data: Record<string, string> = {};
        
        formData.forEach((value, key) => {
            data[key] = value as string;
        });
        
        if (this.onSubmitCallback) {
            this.onSubmitCallback(data);
        }
        
        // Show success notification
        this.showToast("Message sent successfully!", "success");
        
        // Close the form after submission
        this.close();
    }
    
    private showToast(message: string, type: 'success' | 'error' = 'success'): void {
        // Configure the toast
        this.toast.textContent = message;
        this.toast.className = `toast ${type}`;
        this.toast.style.display = 'block';
        
        // Trigger animation
        setTimeout(() => {
            this.toast.classList.add('visible');
        }, 10);
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            this.toast.classList.remove('visible');
            
            // Remove from DOM after animation completes
            setTimeout(() => {
                this.toast.style.display = 'none';
            }, 500);
        }, 3000);
    }
    
    // Clean up event listeners when no longer needed
    public destroy(): void {
        document.removeEventListener('keydown', this.escapeKeyHandler);
        this.overlay.remove();
        this.toast.remove();
    }
}

export interface FormField {
    id: string;
    name: string;
    type: 'text' | 'email' | 'tel' | 'textarea' | 'password';
    label?: string;
    placeholder?: string;
    required?: boolean;
    rows?: number; // For textarea only
}