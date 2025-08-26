## ✨ ChatPika — Next.js AI Chat App

A sleek AI chat app built with Next.js 15, React 19, Tailwind CSS v4, and Google’s Gemini API. Enjoy streaming responses, dark mode, and a modern gradient-inspired UI.

### 🚀 Features
- **⚡ Streaming AI replies** via `Gemini 1.5 Flash` (`/api/chat`)
- **🎨 Modern UI** with Tailwind v4, gradients, and Radix ScrollArea
- **🌓 Dark mode** powered by `next-themes` (system-aware)
- **📱 Fully responsive** across devices
- **🧭 Pages included**:
  - **Home**: Hero, CTA, features, stats, footer
  - **Pricing**: Starter / Pro / Team with highlighted Pro tier
  - **Chat**: Live streaming conversation UI with Markdown support

### 🧱 Tech Stack
- **Framework**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS v4 + custom tokens in `app/globals.css`
- **AI**: `@google/generative-ai` (Gemini 1.5 Flash)
- **Theming**: `next-themes`
- **UI Utils**: `class-variance-authority`, `clsx`, `react-markdown`, Radix ScrollArea

### 🗂️ Project Structure
- `app/page.tsx` — Homepage
- `app/pricing/page.tsx` — Pricing
- `app/chat/page.tsx` — Chat (client component)
- `app/api/chat/route.ts` — Streaming API (POST)
- `components/Navbar.tsx` • `components/Footer.tsx` • `components/ThemeToggle.tsx`
- `components/CallToAction.tsx` — CTA
- `components/FeaturesSection.tsx` — Features grid
- `components/StatsSection.tsx` — Stats
- `components/ChatWindow.tsx` — Scrollable chat transcript
- `components/WelcomeChat.tsx` — Quick-start tiles
- `components/ui/button.tsx` — Button variants
- `app/globals.css` — Tailwind + theme tokens

---

### 🧰 Getting Started

#### 1) Prerequisites
- Node.js 18+ (20+ recommended)
- A Google Gemini API key

#### 2) Install
```bash
git clone https://github.com/pikacoder44/ChatPika
cd ai-app-nextjs
npm i   
```

#### 3) Environment
Create `.env.local`:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

#### 4) Run (Dev)
```bash
npm run dev  
# http://localhost:3000
```

#### 5) Build & Start (Prod)
```bash
npm build
npm start
```

---

### 🔌 API Overview

#### POST `/api/chat`
- **Request**:
```json
{ "message": "Your prompt here" }
```
- **Response**: Streams text chunks (for live typing effect)

Under the hood:
- Uses `GoogleGenerativeAI` with model `gemini-1.5-flash`
- Streams via `ReadableStream` and flushes chunks to the client

---

### 🎨 Theming & Styling Tips
- Toggle theme via `ThemeProvider` (`attribute="class"`) + `ThemeToggle`
- Customize tokens in `app/globals.css` (colors, radii, borders)
- Adjust button variants in `components/ui/button.tsx`
- Page-level visuals in:
  - `app/page.tsx` (hero/CTA background gradients)
  - `app/pricing/page.tsx` (card gradients and emphasis)
  - `app/chat/page.tsx` (chat layout)

---

### 🧪 Scripts
- `dev` — Start dev server (Turbopack)
- `build` — Production build
- `start` — Run production server
- `lint` — Run ESLint

---

### ☁️ Deployment
- Works great on Vercel or any Node host supporting Next.js 15
- Set `GEMINI_API_KEY` in your hosting environment variables

---

### 🛣️ Roadmap Ideas
- 🔐 Auth (NextAuth.js) and user sessions
- 💾 Conversation history (DB)
- 🖼️ File upload / multimodal prompts
- 👥 Team workspaces, usage limits, billing

---

### 📄 License
MIT