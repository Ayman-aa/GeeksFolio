# GeeksFolio

A sleek portfolio website built with vanilla TypeScript and a component-based architecture. No frameworks, no bloat—just pure TypeScript goodness! ✨

## 🧙‍♂️ The Magic of Vanilla TypeScript

GeeksFolio demonstrates the power of TypeScript without frameworks. Who needs React when you can craft your own component system?

```typescript
// Look ma, no frameworks!
export class Button {
    private element: HTMLButtonElement;
    
    constructor(label: string, iconName?: string) {
        this.element = document.createElement('button');
        // Actual implementation from your Button.ts
    }
}
```

## 🧩 Component System Architecture
Our homemade component system follows these principles:

- Encapsulation: Each component manages its own DOM elements and styles
- Composition: Build complex UIs by combining simple components
- Event handling: Clean communication between components

```typescript
// Components that talk to each other - just like in your actual code!
heroSection.addContactButton(() => {
    contactForm.open();
});
```

## 🔥 Firebase Integration
Data storage is handled by Firebase Firestore:

- Form submissions go straight to the cloud
- Server timestamps keep everything in order
- Form data flows seamlessly from frontend to database

```javascript
// Server-side magic with Firebase - just like in your functions/index.js
app.post("/submit-form", async (req, res) => {
  const formData = req.body;
  formData.timestamp = admin.firestore.FieldValue.serverTimestamp();
  const docRef = await admin.firestore().collection("form-submissions").add(formData);
});
```

## 🚂 Railway Deployment

Our API is deployed to Railway:

- Express server handles form submissions
- API endpoints communicate with Firebase
- Modular structure keeps the code maintainable

```javascript
// Choo choo! All aboard the Railway express!
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

## 🚀 Netlify Deployment

Static assets are deployed to Netlify:

- Automatic deployment from GitHub
- Custom #fix-imports.js script to handle ES modules properly
- CDN distribution for lightning-fast loading

Deployment url: [link](https://aymaniseme.netlify.app)