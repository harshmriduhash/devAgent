# Core Application Files

## Entry Points

### entry.client.tsx

- Uses `RemixBrowser` from '@remix-run/react'
- Hydrates the application on the client side using `hydrateRoot`
- Wraps hydration in `startTransition` for better performance
- Targets the 'root' DOM element for hydration

### entry.server.tsx

- Handles server-side rendering (SSR)
- Uses `renderToReadableStream` for streaming HTML
- Sets up important security headers:
  - Cross-Origin-Embedder-Policy: require-corp
  - Cross-Origin-Opener-Policy: same-origin
- Injects the theme data into the HTML structure
- Handles bot detection using `isbot`
- Creates a streaming response with proper HTML structure

### root.tsx

Key Features:

- Defines the base HTML structure
- Manages theme switching functionality
- Sets up global styles and resources

Important Parts:

- Links configuration for:
  - Stylesheets (Tailwind, global styles, xterm)
  - Fonts (Inter from Google Fonts)
  - Favicon
  - React Toastify styles
- Head component:
  - Created using remix-island
  - Includes meta tags and theme initialization script
- Layout component:
  - Manages theme updates using nanostores
  - Updates HTML theme attribute on theme changes
- App component:
  - Renders the Outlet for nested routes

## Type Definitions

### app/types/actions.ts

- Defines action types for file and shell operations
- Types:
  - `ActionType`: 'file' | 'shell'
  - `BaseAction`: Base interface with content property
  - `FileAction`: Extends BaseAction for file operations
  - `ShellAction`: Extends BaseAction for shell operations
  - `BoltAction`: Union type of FileAction | ShellAction
  - `BoltActionData`: Union type of BoltAction | BaseAction

### app/types/terminal.ts

- Defines terminal interface for xterm integration
- Interface `ITerminal`:
  - Properties: cols, rows (optional)
  - Methods: reset(), write(), onData()
  - Handles terminal input/output operations

### app/types/theme.ts

- Simple theme type definition
- Type `Theme`: 'dark' | 'light'

## Functions and Configuration

### functions/[[path]].ts

- Sets up Cloudflare Pages function handler
- Imports server build configuration
- Creates request handler for Remix application

### load-context.ts

- Defines TypeScript types for Cloudflare platform
- Extends Remix's AppLoadContext with Cloudflare types
- Provides type safety for Cloudflare Workers environment

## Styles

### app/styles/index.scss

- Main stylesheet entry point
- Imports all component and base styles
- Sets up basic HTML/body layout
- Imports:
  - variables.scss: Global SCSS variables
  - z-index.scss: Z-index management
  - animations.scss: Global animations
  - Component styles:
    - terminal.scss
    - resize-handle.scss
    - code.scss
    - editor.scss
    - toast.scss

### Style Structure

- Modular SCSS architecture
- Component-specific styles in `/components` directory
- Global variables and utilities in root style files
- Animation definitions for UI interactions

## Routes

### app/routes/\_index.tsx

- Main application entry route
- Features:
  - Meta information for SEO
  - Header component
  - Chat interface with fallback
  - Client-only rendering for chat component
- Layout: Flex column structure for full viewport

### app/routes/api.chat.ts

- Chat API endpoint implementation
- Handles chat message streaming
- Features:
  - Message continuation handling
  - Token limit management
  - Error handling for stream responses
- Uses SwitchableStream for managing chat responses
- Integrates with CloudFlare environment

### app/routes/chat.$id.tsx

- Dynamic chat route with ID parameter
- Handles individual chat sessions

### app/routes/api.enhancer.ts

- API endpoint for prompt enhancement
- Handles AI-powered prompt improvements

## Utilities

### Core Utilities

#### markdown.ts

- Markdown processing and sanitization
- Features:
  - HTML sanitization with allowed elements
  - GFM (GitHub Flavored Markdown) support
  - Custom plugins for limited markdown
  - HTML processing with rehype
- Configurable plugin system for markdown transformation

#### logger.ts

- Advanced logging system with levels
- Features:
  - Multiple debug levels (trace, debug, info, warn, error)
  - Scoped logging support
  - Color-coded console output
  - Environment-aware logging (DEV/PROD)
  - Worker environment detection

#### shell.ts

- Shell command handling and processing
- Terminal command execution utilities

#### diff.ts

- Code difference calculation and processing
- Handles file comparisons and changes

### Helper Utilities

#### buffer.ts

- Buffer manipulation utilities
- Binary data handling

#### classNames.ts

- CSS class name manipulation
- Dynamic class generation

#### debounce.ts

- Function debouncing utility
- Performance optimization for frequent calls

#### promises.ts

- Promise utility functions
- Async operation helpers

#### react.ts

- React-specific utility functions
- Component helpers

### UI/UX Utilities

#### mobile.ts

- Mobile device detection
- Responsive design helpers

#### easings.ts

- Animation easing functions
- Smooth transition utilities

#### terminal.ts

- Terminal-related utilities
- Terminal interaction helpers

### Other Utilities

#### stripIndent.ts

- Text indentation processing
- Code formatting helper

#### unreachable.ts

- TypeScript utility for unreachable code
- Type safety helper

#### constants.ts

- Global constant definitions
- Application-wide configuration values

## Project Structure

### Components Structure

#### chat/

- Chat interface components
- Message handling and display
- Chat input and controls

#### editor/

- Code editor implementation
- CodeMirror integration
- Syntax highlighting
- File editing interface

#### header/

- Application header components
- Navigation controls
- App-wide actions

#### sidebar/

- Sidebar navigation
- File explorer
- Project navigation

#### workbench/

- Main workspace components
- Code editing environment
- Terminal integration
- Preview handling

#### ui/

- Reusable UI components
- Common interface elements
- Shared styling components

### Build Configuration

#### Package Configuration (package.json)

- Node.js version: >=18.18.0
- Package manager: pnpm@9.4.0
- Key Scripts:
  - `dev`: Remix development server
  - `build`: Production build
  - `deploy`: Cloudflare Pages deployment
  - `test`: Vitest testing
  - `start`: Local development with bindings
- Key Dependencies:
  - @ai-sdk/anthropic: AI integration
  - @webcontainer/api: WebContainer support
  - @remix-run/cloudflare: Remix framework
  - CodeMirror packages for editor
  - React and related libraries

#### TypeScript Configuration (tsconfig.json)

- Target: ESNext
- Module: ESNext
- React JSX support
- Strict type checking
- Path aliases:
  - `~/*` maps to `./app/*`
- Includes:
  - TypeScript files
  - Server/Client specific code
  - Component files

#### Vite Configuration (vite.config.ts)

- Build target: esnext
- Plugins:
  - Node polyfills
  - Remix Cloudflare integration
  - UnoCSS
  - TypeScript paths
  - CSS modules optimization
- Chrome 129 issue handling
- Development server configuration

#### Cloudflare Configuration

##### worker-configuration.d.ts

- Environment type definitions
- Anthropic API key configuration

##### wrangler.toml

- Project name: bolt
- Node.js compatibility flags
- Pages build output configuration
- Compatibility date: 2024-07-01

#### Build Scripts

##### bindings.sh

- Environment variable processing
- Cloudflare bindings setup
- Development environment configuration
- Secure handling of API keys

## Updated Project Structure

```
/app
  /components
    /chat           # Chat interface components
    /editor         # Code editor components
    /header         # App header components
    /sidebar        # Navigation sidebar
    /ui            # Shared UI components
    /workbench     # Main workspace
  /routes
    - _index.tsx         # Main application page
    - api.chat.ts        # Chat API endpoint
    - api.enhancer.ts    # Prompt enhancement API
    - chat.$id.tsx       # Dynamic chat routes
  /styles
    /components          # Component-specific styles
    - animations.scss    # Global animations
    - index.scss        # Main style entry
    - variables.scss    # Global variables
    - z-index.scss      # Z-index management
  /types                # Type definitions
    - actions.ts        # Action type definitions
    - terminal.ts       # Terminal interface
    - theme.ts          # Theme type definition
  /utils                # Utility functions
    - buffer.ts         # Buffer manipulation
    - classNames.ts     # CSS class utilities
    - constants.ts      # Global constants
    - debounce.ts       # Function debouncing
    - diff.ts           # Code difference tools
    - easings.ts        # Animation easings
    - logger.ts         # Logging system
    - markdown.ts       # Markdown processing
    - mobile.ts         # Mobile detection
    - promises.ts       # Promise utilities
    - react.ts          # React helpers
    - shell.ts          # Shell command tools
    - stripIndent.ts    # Text formatting
    - terminal.ts       # Terminal utilities
    - unreachable.ts    # TypeScript helpers
  /lib
    /persistence
      - db.ts              # IndexedDB implementation
      - useChatHistory.ts  # Chat history React hook
      - index.ts          # Persistence exports
    /runtime
      - message-parser.ts  # Message parsing system
      - action-runner.ts   # Action execution
    - crypto.ts           # Encryption utilities
    - fetch.ts            # Network requests
/functions
  - [[path]].ts         # Cloudflare Pages handler
/types
  - istextorbinary.d.ts # Binary file type definitions
/build-config
  - bindings.sh     # Environment setup
  - tsconfig.json   # TypeScript config
  - vite.config.ts  # Vite build config
  - wrangler.toml   # Cloudflare config

## Library Components

### Runtime System

#### message-parser.ts
- Streaming message parser implementation
- Handles parsing of artifacts and actions in messages
- Features:
  - Streaming message processing
  - Artifact and action callbacks
  - State management for parsing
  - Custom element factory support

#### action-runner.ts
- Executes actions from parsed messages
- Handles file and shell operations
- Manages action lifecycle and state

### Persistence Layer

#### db.ts
- IndexedDB implementation for chat history
- Features:
  - Database initialization and upgrades
  - CRUD operations for chat messages
  - URL ID management
  - Transaction handling
  - Error handling and logging

#### useChatHistory.ts
- React hook for chat history management
- Provides interface for:
  - Loading chat history
  - Saving messages
  - Managing chat sessions
  - URL-based chat retrieval

### Network and Security

#### fetch.ts
- Custom fetch implementation
- Features:
  - Development environment support
  - HTTPS agent configuration
  - Node-fetch integration for dev mode

#### crypto.ts
- Encryption utilities
- Features:
  - AES-CBC encryption/decryption
  - Base64 encoding/decoding
  - Secure key management
  - IV (Initialization Vector) handling

## WebContainer Integration

### webcontainer/index.ts
- WebContainer initialization and management
- Features:
  - Hot module reloading support
  - SSR compatibility
  - Work directory configuration
  - Container lifecycle management

### webcontainer/auth.client.ts
- Client-side authentication for WebContainer
- Handles WebContainer API authentication

## State Management

### Stores

#### workbench.ts
- Central workbench state management
- Features:
  - File system management
  - Editor state
  - Terminal integration
  - Preview management
  - Artifact handling
  - Document management

#### files.ts
- File system state management
- File operations and tracking
- Modification tracking

#### editor.ts
- Editor state management
- Document handling
- Selection state
- Scroll position tracking

#### terminal.ts
- Terminal state management
- Terminal instance handling
- Size and visibility control

#### theme.ts
- Theme state management
- Dark/light mode switching
- Theme persistence

#### settings.ts
- Application settings management
- User preferences storage

#### previews.ts
- Preview window state management
- Preview rendering control

#### chat.ts
- Chat interface state management
- Message handling

## React Hooks

### useMessageParser.ts
- Message parsing hook
- Handles streaming message processing
- Artifact and action management

### usePromptEnhancer.ts
- AI prompt enhancement hook
- Improves user prompts
- Handles enhancement requests

### useShortcuts.ts
- Keyboard shortcuts management
- Global shortcut handling
- Custom key bindings

### useSnapScroll.ts
- Scroll behavior management
- Smooth scrolling implementation
- Scroll snapping functionality

## Server Components

### .server/llm
- Language Model integration
- AI model configuration
- Server-side AI processing

## Development Environment

### Code Quality Tools

#### Prettier Configuration
- `.prettierrc`:
  - Print width: 120
  - Single quotes
  - 2 space indentation
  - Semicolons enforced
  - Bracket spacing enabled

#### ESLint Configuration
- `eslint.config.mjs`:
  - Blitz plugin integration
  - Custom naming conventions
  - Import restrictions
  - TypeScript-specific rules
  - Path alias enforcement

### Version Control

#### Husky
- Pre-commit hooks
- Commit message validation
- Code quality checks

### Styling System

#### UnoCSS Configuration
- Custom color system:
  - Base colors
  - Alpha palettes
  - Theme variables
- Component shortcuts
- Icon integration
- Dark/Light theme support
- Custom transformers

#### Theme Variables
- Element-specific colors
- UI component theming
- Interactive states
- Typography system
- Layout components

## Project Metadata

### License
- MIT License
- Copyright (c) 2024 StackBlitz, Inc.
- Open source usage terms

### Contributing Guidelines
- Setup instructions
- Development workflow
- Testing procedures
- Deployment process
- WebContainer API usage

## Updated Project Structure

```

/
├── .github/ # GitHub configuration
│ ├── workflows/ # GitHub Actions
│ ├── actions/ # Custom actions
│ └── ISSUE_TEMPLATE/ # Issue templates
├── .husky/ # Git hooks
├── app/ # Main application code
│ [Previous app structure remains unchanged...]
├── build-config/ # Build configuration
│ [Previous build-config structure remains unchanged...]
├── config/ # Configuration files
│ ├── .prettierrc # Prettier config
│ ├── .prettierignore # Prettier ignore
│ ├── eslint.config.mjs # ESLint config
│ └── uno.config.ts # UnoCSS config
└── scripts/ # Build scripts
└── bindings.sh # Environment setup

```

```

```

```
