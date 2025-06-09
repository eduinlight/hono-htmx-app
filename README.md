# Hono HTMX App Template

A modern web application template built with Hono, HTMX, and Alpine.js featuring server-side rendering and dynamic client-side interactions.

## Template Usage

This repository contains a reusable template for creating Hono-HTMX applications. To use this template:

1. Use the `template/` directory as your project base
2. Copy the template contents to your new project directory
3. Follow the installation instructions below

## Features

- **Hono Framework**: Fast, lightweight web framework
- **HTMX**: Modern approach to building web UIs with minimal JavaScript
- **Alpine.js**: Lightweight reactive framework for enhanced interactivity
- **Live Reload**: Development server with automatic browser refresh
- **State Preservation**: Alpine.js state is preserved during live reload
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Full type safety throughout the application

## Getting Started

### Prerequisites

- Bun (JavaScript runtime and package manager)

### Installation & Development

1. Create a new project using the template:
   ```bash
   bunx create-hono-htmx-app my-project
   cd my-project
   ```
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
```

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
