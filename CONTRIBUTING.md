[![DevStream Open Source Codebase](./public/social_preview_index.jpg)](https://devstream.dev)

> Welcome to the **DevStream** open-source codebase! This repo contains a simple example app using the core components from devstream.dev to help you get started building **AI-powered software development tools** powered by StackBlitz's **WebContainer API**.

## Overview

This repository contains the core components used to build AI-powered software development tools with WebContainers.

### What's the Difference Between DevStream (This Repo) and [DevStream.dev](https://devstream.dev)?

- **DevStream.dev**: This is the **commercial product** from StackBlitz—a hosted, browser-based AI development tool that enables users to prompt, run, edit, and deploy full-stack web applications directly in the browser. Built on top of the [DevStream open-source repo](https://github.com/stackblitz/devstream) and powered by the StackBlitz **WebContainer API**.

- **DevStream (This Repo)**: This open-source repository provides the core components used to make **DevStream.dev**. This repo contains the UI interface for DevStream as well as the server components, built using [Remix Run](https://remix.run/). By leveraging this repo and StackBlitz's **WebContainer API**, you can create your own AI-powered software development tools.

# Get Started Building with Bolt

Bolt combines the capabilities of AI with sandboxed development environments to create a collaborative experience where code can be developed by the assistant and the programmer together. Bolt combines [WebContainer API](https://webcontainers.io/api) with [Claude Sonnet 3.5](https://www.anthropic.com/news/claude-3-5-sonnet) using [Remix](https://remix.run/) and the [AI SDK](https://sdk.vercel.ai/).

### WebContainer API

Bolt uses [WebContainers](https://webcontainers.io/) to run generated code in the browser. WebContainers provide Bolt with a full-stack sandbox environment using [WebContainer API](https://webcontainers.io/api). WebContainers run full-stack applications directly in the browser without the cost and security concerns of cloud hosted AI agents. WebContainers are interactive and editable, and enables Bolt's AI to run code and understand any changes from the user.

The [WebContainer API](https://webcontainers.io) is free for personal and open source usage. If you're building an application for commercial usage, you can learn more about our [WebContainer API commercial usage pricing here](https://stackblitz.com/pricing#webcontainer-api).

### Remix App

Bolt is built with [Remix](https://remix.run/) and
deployed using [CloudFlare Pages](https://pages.cloudflare.com/) and
[CloudFlare Workers](https://workers.cloudflare.com/).

### AI SDK Integration

Bolt uses the [AI SDK](https://github.com/vercel/ai) to integrate with AI
models. At this time, Bolt supports using Anthropic's Claude Sonnet 3.5.
You can get an API key from the [Anthropic API Console](https://console.anthropic.com/) to use with Bolt.
Take a look at how [Bolt uses the AI SDK](https://github.com/stackblitz/bolt.new/tree/main/app/lib/.server/llm)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v20.15.1)
- pnpm (v9.4.0)

## Setup

1. Clone the repository (if you haven't already):

```bash
git clone https://github.com/stackblitz/bolt.new.git
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file in the root directory and add your Anthropic API key:

```
ANTHROPIC_API_KEY=XXX
```

Optionally, you can set the debug level:

```
VITE_LOG_LEVEL=debug
```

**Important**: Never commit your `.env.local` file to version control. It's already included in .gitignore.

## Available Scripts

- `pnpm run dev`: Starts the development server.
- `pnpm run build`: Builds the project.
- `pnpm run start`: Runs the built application locally using Wrangler Pages. This script uses `bindings.sh` to set up necessary bindings so you don't have to duplicate environment variables.
- `pnpm run preview`: Builds the project and then starts it locally, useful for testing the production build. Note, HTTP streaming currently doesn't work as expected with `wrangler pages dev`.
- `pnpm test`: Runs the test suite using Vitest.
- `pnpm run typecheck`: Runs TypeScript type checking.
- `pnpm run typegen`: Generates TypeScript types using Wrangler.
- `pnpm run deploy`: Builds the project and deploys it to Cloudflare Pages.

## Development

To start the development server:

```bash
pnpm run dev
```

This will start the Remix Vite development server.

## Testing

Run the test suite with:

```bash
pnpm test
```

## Deployment

To deploy the application to Cloudflare Pages:

```bash
pnpm run deploy
```

Make sure you have the necessary permissions and Wrangler is correctly configured for your Cloudflare account.
