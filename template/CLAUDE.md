# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Code Style Rules

- **Never generate comments** - This codebase maintains clean, self-documenting code without comments
- **Import organization**: External libraries first, then empty line, then internal libraries if monorepo, then empty line, then relative imports
- **Component naming**: PascalCase for components, descriptive filenames with suffixes (`.component.tsx`, `.layout.tsx`, `.provider.tsx`, `.wrapper.tsx`)
- **File naming**: Kebab-case for all file and directory names (e.g., `home.component.tsx`, `request-context.provider.tsx`)
- **Export pattern**: Use barrel exports via `index.ts` files in each directory with `export * from "./filename"`
- **Variable naming**: camelCase for functions/variables, PascalCase for components/types, SCREAMING_SNAKE_CASE for constants
- **JSX conventions**: Use `class` instead of `className` (Hono JSX style), destructure props in parameters
- **TypeScript patterns**: Use `interface` for complex objects, `type` for aliases, `PropsWithChildren` for components with children
- **Directory structure**: Group related files in directories with descriptive names under `src/components/` hierarchy

## Development Commands

This project uses Docker and Make for development workflow:

- `make install` - Initial setup: builds containers, installs dependencies, starts services
- `make start` - Start development servers (Hono app on :3000)
- `make stop` - Stop all services
- `make restart` - Restart services
- `make format` - Format code using Biome
- `make lint` - Lint and auto-fix code using Biome  
- `make check` - Run Biome format + lint together
- `make enter` - Enter the running container for debugging

The development server runs three concurrent processes:
- `bun run start-dev` - Hono server with live reload on :3000
- `bun run bundle-dev` - Vite client bundling with watch mode
- `bun run live-reload` - WebSocket server for browser live reload on :3001

## Architecture Overview

### Hybrid Rendering Strategy
This is a server-first application using Hono with JSX for server-side rendering, enhanced with HTMX for dynamic interactions. The architecture supports both full page loads and partial HTMX updates using a wrapper pattern.

### HTMX Integration Pattern
The core pattern is the `PublicLayoutHtmxWrapper` which conditionally renders:
- Full layout for normal requests
- Fragment content only for HTMX requests (detected via `HX-Request` header)

This allows the same component to handle both full page renders and HTMX partial updates.

### Client-Side Architecture
- **Alpine.js**: Primary client framework for simple interactivity
- **Lit Web Components**: For complex components that exceed Alpine.js capabilities
- **State Management**: Alpine stores with live-reload persistence
- **Build System**: Vite bundles client code to `public/js/bundle.js` as IIFE

### Key Architectural Components

**Request Context Pattern**: Uses Hono context providers to pass server state to components, enabling server-rendered components to access request data.

**Live Reload System**: Custom implementation that preserves Alpine.js state during development reloads and handles both JavaScript and CSS updates via WebSocket.

**Tailwind Integration**: Dynamic CSS generation with file watching, integrated with the live reload system.

**Component Organization**:
- `src/components/landings/` - Page-specific components
- `src/components/layouts/` - Layout shells
- `src/components/wrappers/` - HTMX-aware wrapper components
- `src/components/shared/` - Reusable UI components
- `client/web-components/` - Lit web components for complex interactions

### Development Patterns

**Adding New Pages**: Create in `src/components/landings/`, export from index, add route to `src/pages/landings.tsx`

**HTMX Components**: Wrap with `PublicLayoutHtmxWrapper` to enable automatic full/partial rendering

**Client State**: Use Alpine stores (in `client/stores/`) for simple state, Lit components for complex state

**Styling**: Uses Tailwind with dynamic compilation - changes trigger CSS rebuilds and browser refresh

The build outputs client code as a single IIFE bundle that imports external libraries (HTMX, Alpine.js, Socket.io) as globals served from `public/js/`.