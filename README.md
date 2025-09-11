# ✨ ChatPika — Next.js AI Chat App

An AI-powered chat app built with **Next.js 15**, **React 19**, **Tailwind v4**, **Clerk Auth**, **MongoDB**, and **Google Gemini API**.  
Supports streaming AI responses, saved chat history, and a sleek dark-mode UI.

---

## 🚀 Features
- 🔮 **AI Chat** (Gemini 1.5 Flash, streaming responses)  
- 💬 **Persistent chats** with auto-generated titles  
- 🔐 **Authentication** via Clerk  
- 🎨 **Modern UI** with Tailwind v4, shadcn-inspired components, Radix  
- 🌙 **Dark mode** with `next-themes`  
- 📱 **Responsive design** + sidebar chat list  

---

## 🧱 Tech Stack
- **Framework**: Next.js 15, React 19  
- **Styling**: Tailwind v4  
- **Auth**: Clerk  
- **Database**: MongoDB + Mongoose  
- **AI**: Google Gemini (`@google/generative-ai`)  
- **UI Utils**: Radix, shadcn patterns, `react-markdown`, `react-syntax-highlighter`, `swr`  

---

## 🔌 API Routes
- `POST /api/ai/chat` → Stream AI reply (+ save to chat)  
- `POST /api/ai/generatetitle` → Generate a short chat title  
- `POST /api/chats` → Create a chat  
- `GET /api/chats` → List user’s chats  
- `GET /api/chats/[chatId]` → Get single chat (auth required)  

---


## 🧰 Getting Started

### 1. Prerequisites
- Node.js 18+ (20 recommended)  
- MongoDB connection string  
- Clerk account (keys)  
- Google Gemini API key  

### 2. Install
```bash
npm install
```

#### 3) Environment
```bash
Create `.env.local` in the project root:
# AI
GEMINI_API_KEY=your_gemini_api_key

# Database
MONGODB_URI=your_mongodb_connection_string

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

```

#### 4) Run (Dev)
```bash
npm run dev
```

#### 5) Build & Start (Prod)
```bash
npm run build
npm start
```

---

### 🖥️ How It Works (Flow)
- Client sends `POST /api/ai/chat` with the prompt and current `chatId` (if signed in).
- Server validates env keys, ensures DB connection, and resolves the Clerk user.
- If authenticated and `chatId` is valid, the user message is appended to `Chat.messages`.
- The server calls Gemini (`generateContentStream`) and streams chunks back via `ReadableStream`.
- Client accumulates chunks into the assistant message; once complete, the assistant reply is saved to the same chat.
- After the first exchange in a chat, the client triggers `/api/ai/generatetitle` to produce a short title and updates the chat.

---

### 🎨 Styling/Theming Notes
- Tailwind v4 with design tokens in `app/globals.css`
- Dark mode via `next-themes` (`attribute="class"`)
- Reusable components in `components/ui/*` with Radix primitives and shadcn patterns

---

### 🔒 Auth & Middleware
- `middleware.ts` applies Clerk to all routes including `/api`, excluding static assets and Next internals.
- Server routes use `currentUser()` to enforce access and scope resources per `clerkId`.

---

### 🧪 Scripts
- `dev` — start dev server (Turbopack)
- `build` — production build (Turbopack)
- `start` — run production server
- `lint` — run ESLint

---

### ☁️ Deployment
- Works well on Vercel or any Node host supporting Next.js 15
- Set environment variables (`GEMINI_API_KEY`, `MONGODB_URI`, Clerk keys) in hosting provider

---

### 📄 License
MIT