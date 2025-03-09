export type Route = {
    path: string;
    component: () => HTMLElement;
    title: string;
};

export class Router {
    private routes: Route[];
    private container: HTMLElement;
    private currentPath: string = '';

    constructor(container: HTMLElement) {
        this.routes = [];
        this.container = container;
        
        // Handle browser navigation (back/forward buttons)
        window.addEventListener('popstate', () => {
            this.navigate(window.location.pathname, false);
        });
    }

    /**
     * Add a new route to the router
     */
    public addRoute(route: Route): void {
        this.routes.push(route);
    }

    /**
     * Navigate to a specific path
     */
    public navigate(path: string, addToHistory: boolean = true): void {
        // Don't navigate if we're already on this path
        if (path === this.currentPath) return;
        
        const route = this.routes.find(route => route.path === path);
        
        if (route) {
            this.currentPath = path;
            
            // Update browser history
            if (addToHistory) {
                window.history.pushState({}, route.title, path);
            }
            
            // Update page title
            document.title = route.title;
            
            // Clear container and render new component
            this.container.innerHTML = '';
            const component = route.component();
            this.container.appendChild(component);
        } else {
            console.warn(`Route not found: ${path}`);
            // Navigate to home if route not found
            if (path !== '/') {
                this.navigate('/', addToHistory);
            }
        }
    }

    /**
     * Initialize the router with the current URL
     */
    public init(): void {
        // Get the current path or default to '/'
        const path = window.location.pathname || '/';
        this.navigate(path, false);
    }
}