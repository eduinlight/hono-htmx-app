# Hono HTMX App

A modern web application built with Hono, HTMX, and Alpine.js featuring server-side rendering and dynamic client-side interactions.

## Features

- **Hono Framework**: Fast, lightweight web framework
- **HTMX**: Modern approach to building web UIs with minimal JavaScript
- **Alpine.js**: Lightweight reactive framework for enhanced interactivity
- **Lit Web Components**: For complex use cases where Alpine.js becomes too limiting
- **Live Reload**: Development server with automatic browser refresh
- **State Preservation**: Alpine.js state is preserved during live reload
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Full type safety throughout the application

## Getting Started

### Prerequisites

- Bun runtime

### Installation & Development

1. Clone the repository
2. Copy the environment template:
   ```bash
   cp .env.dist .env
   ```
3. Install dependencies and start development server:
   ```bash
   make install
   ```
4. Open your browser and navigate to `http://localhost:3000`

The development server includes live reload functionality that automatically refreshes your browser when files change, while preserving Alpine.js component state for a seamless development experience.

## Project Structure

```
src/
├── app.ts                 # Application entry point
├── components/            # Reusable UI components
├── config/               # Application configuration
├── middlewares/          # Custom middleware
├── pages/                # Page components and routing
└── styles.css           # Global styles

client/
├── index.ts              # Client-side entry point
├── stores/               # Alpine.js stores
└── web-components/       # Lit web components
```

## Web Components

For complex interactive features that exceed Alpine.js capabilities, this project includes support for Lit web components. These are ideal for:

- Complex state management scenarios
- Reusable components with advanced logic
- Cases requiring sophisticated event handling
- Components that need fine-grained reactivity

### Creating Web Components

Web components are located in `client/web-components/` and follow this pattern:

```typescript
import { LitElement, html } from "lit";
import { customElement, state, property } from "lit/decorators.js";

@customElement("my-component")
export class MyComponent extends LitElement {
  // Disable shadow DOM to use global Tailwind styles
  protected createRenderRoot() {
    return this;
  }

  @property({ type: String })
  initialValue = "";

  @state()
  private internalState = "";

  protected render() {
    return html`
      <div class="tailwind-classes-work-here">
        <!-- Your component template -->
      </div>
    `;
  }
}
```

### Example: Todo List Component

The project includes a complete todo list component (`client/web-components/todo-list.web-component.ts`) that demonstrates:

- Property binding with `@property`
- Internal state management with `@state`
- Event handling
- Tailwind CSS integration
- TypeScript interfaces

Use it in your HTML:

```html
<todo-list value='[{"text":"Sample task","done":false}]'></todo-list>
```

### When to Use Web Components vs Alpine.js

**Use Alpine.js for:**
- Simple state management
- Basic interactivity (show/hide, form validation)
- Quick prototyping
- Server-rendered content enhancement

**Use Lit Web Components for:**
- Complex data structures and state
- Advanced user interactions
- Reusable components across projects
- Performance-critical interactive elements

## License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
