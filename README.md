## ChatPika — Next.js AI Chat App

A modern AI chat app built with Next.js 15, React 19, Tailwind CSS v4, and Google’s Gemini API (streaming). Includes a styled homepage, a gradient pricing page, and a responsive chat UI with smooth scrolling and dark mode.

### Features
- **Streaming AI responses** using Gemini 1.5 Flash via a `/api/chat` endpoint
- **Modern UI** with Tailwind CSS v4 and Radix ScrollArea
- **Dark mode** via `next-themes` (system-aware)
- **Responsive layouts** across devices
- **Pages**:
  - Home (hero, CTA, features, stats, footer)
  - Pricing (Starter, Pro, Team tiers; Pro highlighted)
  - Chat (live streaming conversation UI)

### Tech Stack
- **Framework**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS v4, custom CSS variables (`app/globals.css`)
- **AI**: `@google/generative-ai` (Gemini 1.5 Flash)
- **Theming**: `next-themes`
- **UI Utils**: `class-variance-authority`, `clsx`, `react-markdown`, Radix ScrollArea

### Project Structure
- `app/page.tsx` — Homepage
- `app/pricing/page.tsx` — Pricing page
- `app/chat/page.tsx` — Chat page (client component)
- `app/api/chat/route.ts` — Streaming chat API (POST)
- `components/Navbar.tsx`, `components/Footer.tsx`, `components/ThemeToggle.tsx`
- `components/CallToAction.tsx` — CTA section
- `components/FeaturesSection.tsx` — Features grid
- `components/StatsSection.tsx` — Stats section
- `components/ChatWindow.tsx` — Scrollable chat transcript (Radix)
- `components/WelcomeChat.tsx` — Quick-start suggestions
- `components/ui/button.tsx` — Button variants
- `app/globals.css` — Tailwind + custom theme tokens

### Getting Started

#### Prerequisites
- Node.js 18+ (20+ recommended)
- A Google Gemini API key

#### 1) Install
```bash
git clone <your-repo-url>
cd ai-app-nextjs
pnpm i   # or npm i / yarn
```

#### 2) Environment
Create `.env.local` in the project root:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

#### 3) Run (dev)
```bash
pnpm dev    # or npm run dev / yarn dev
# http://localhost:3000
```

#### 4) Build & Start (prod)
```bash
pnpm build
pnpm start
```

### API

#### POST `/api/chat`
- Request
```json
{ "message": "Your prompt here" }
```
- Response: Streams text chunks of the model’s reply.

Implementation notes:
- Uses `GoogleGenerativeAI` with `gemini-1.5-flash`
- Streams via `ReadableStream` for live typing effect

### Theming & Styling
- Theme toggled via `ThemeProvider` (`attribute="class"`) and `ThemeToggle`.
- Design tokens and Tailwind setup in `app/globals.css`.
- Buttons/styles extendable via `components/ui/button.tsx`.

### Scripts
- `dev` — Start dev server (Turbopack)
- `build` — Production build
- `start` — Run production server
- `lint` — Run ESLint

### Deployment
- Works on Vercel or any Node host supporting Next.js 15.
- Configure `GEMINI_API_KEY` in your hosting environment.

### Roadmap Ideas
- Auth (NextAuth.js) and user sessions
- Conversation history (DB)
- File upload / multimodal prompts
- Team workspaces and usage limits/billing

### License
MIT