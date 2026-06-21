# ShopVerse AI Customer Support Chat

A production-ready, full-stack AI customer support chat application. Users can chat with an AI agent powered by **Groq's openai/gpt-oss-20b** model, with conversation persistence in **PostgreSQL** (hosted on **Neon**) and a modern UI built with **React 19**, **TypeScript**, and **Tailwind CSS**.

**Live Demo:**

Frontend: https://support-chat-beta.vercel.app 

Backend API: https://support-chat-jezg.onrender.com/api/health

---

# Table of Contents

* Features
* Architecture
* Tech Stack
* Folder Structure
* Installation & Local Setup
* Environment Variables
* Database Setup
* Running Locally
* API Documentation
* Deployment Guide
* LLM Integration
* Design Decisions & Trade-offs
* Future Improvements
* License

---

# Features

* 💬 **Real-time AI Chat** – Send messages and receive instant AI replies.
* 🗄️ **Persistent Conversations** – All messages are stored in PostgreSQL; refresh the page to continue the same chat.
* 🎨 **Modern UI** – Responsive interface built using Tailwind CSS and shadcn/ui.
* ⚡ **Fast AI Responses** – Powered by Groq's Llama 3.3 70B.
* 🔒 **Type Safety** – TypeScript across frontend and backend.
* 🧪 **Robust Error Handling** – Handles API failures, invalid input, and network issues gracefully.
* 🚀 **Production Ready** – Designed for deployment on Vercel, Render, and Neon.

---

# Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                     USER BROWSER                            │
│               React Frontend (Vercel)                       │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXPRESS BACKEND                          │
│                       (Render)                              │
│                                                             │
│ Routes → Controllers → Services → Repositories             │
│                 │                     │                     │
│                 ▼                     ▼                     │
│         Prompt Service         Groq Service                │
└─────────────────────────────────────────────────────────────┘
            │                                 │
            ▼                                 ▼
┌──────────────────────┐      ┌─────────────────────────────┐
│ PostgreSQL (Neon)    │      │ Groq API                    │
│ Conversations        │      │ Llama 3.3 70B              │
│ Messages             │      │ AI Inference               │
└──────────────────────┘      └─────────────────────────────┘
```

## Request Flow

1. User submits a message from the React frontend.
2. Frontend sends `POST /api/chat/message`.
3. Backend validates request.
4. Conversation is created or retrieved.
5. User message is stored in PostgreSQL.
6. PromptService builds the final prompt.
7. GroqService calls Groq API.
8. AI response is generated.
9. Response is stored in PostgreSQL.
10. Frontend updates UI and persists conversation ID in localStorage.

---

# Tech Stack

## Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* TanStack React Query
* Axios
* React Markdown
* Lucide Icons

## Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* Groq SDK
* Zod
* Winston Logging

## Deployment

* Vercel (Frontend)
* Render (Backend)
* Neon PostgreSQL (Database)

---

# Installation & Local Setup

## Prerequisites

* Node.js v20+
* PostgreSQL
* Groq API Key

Create a Groq API Key at:

https://console.groq.com

---

## Backend Setup

### Clone Repository

```bash
git clone https://github.com/your-username/ai-support-chat.git
cd ai-support-chat/backend
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

```bash
cp .env.example .env
```

### Run Migrations

```bash
npx prisma migrate dev --name init
```

Or:

```bash
npx prisma db push
```

### Start Backend

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

---

## Frontend Setup

```bash
cd ../frontend
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

```bash
cp .env.example .env
```

### Start Frontend

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# Environment Variables

## Backend (.env)

```env
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"

GROQ_API_KEY="your_groq_api_key_here"

PORT=5000

NODE_ENV=development

FRONTEND_URL="http://localhost:5173"
```

## Frontend (.env)

```env
VITE_API_URL="http://localhost:5000/api"
```

---

# Database Setup

## Neon PostgreSQL

1. Create account at https://neon.tech
2. Create project.
3. Copy PostgreSQL connection string.
4. Add it to `DATABASE_URL`.

---

## Local PostgreSQL

Create database:

```sql
CREATE DATABASE support_db;
```

Example connection string:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/support_db?schema=public"
```

Run migration:

```bash
npx prisma migrate dev --name init
```

---

# Running Locally

Start backend:

```bash
cd backend
npm run dev
```

Start frontend:

```bash
cd frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# API Documentation

All endpoints are prefixed with:

```text
/api
```

---

## Health Check

### Request

```http
GET /api/health
```

### Response

```json
{
  "status": "ok",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

---

## Create Conversation

### Request

```http
POST /api/conversations
```

### Response

```json
{
  "id": "conversation-id"
}
```

---

## Get Conversation

### Request

```http
GET /api/conversations/:id
```

### Response

```json
{
  "id": "conversation-id",
  "messages": []
}
```

---

## Send Message

### Request

```http
POST /api/chat/message
```

Body:

```json
{
  "conversationId": "optional-uuid",
  "message": "What is your return policy?"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "conversationId": "uuid",
    "userMessage": {},
    "aiMessage": {}
  }
}
```

---

# Deployment Guide

## Database (Neon)

Ensure database is active and not paused.

---

## Backend (Render)

### Build Command

```bash
npm install --include=dev && npm run build
```

### Start Command

```bash
npm start
```

### Environment Variables

```env
DATABASE_URL=
GROQ_API_KEY=
FRONTEND_URL=
NODE_ENV=production
```

Deploy and obtain:

```text
https://your-backend.onrender.com
```

---

## Frontend (Vercel)

Framework Preset:

```text
Vite
```

Environment Variable:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

Deploy and obtain:

```text
https://your-frontend.vercel.app
```

---

## Post Deployment Checklist

* Backend health endpoint works.
* Frontend connects successfully.
* AI replies are generated.
* Database persistence works.
* CORS configuration is correct.

---

# LLM Integration

## Provider

Groq

## Model

```text
llama3-70b-8192
```

## Prompting Strategy

### System Prompt

Defines the AI as ShopVerse Customer Support.

### Context

Last 10 messages included as conversation history.

### Generation Settings

```text
Temperature: 0.5
Max Tokens: 500
```

---

## Error Handling

### Invalid API Key

Returns friendly error message.

### Rate Limits

Returns HTTP 429.

### Timeout

Returns fallback apology response.

---

# Design Decisions & Trade-offs

| Decision              | Reason                                       |
| --------------------- | -------------------------------------------- |
| Clean Architecture    | Easier maintenance and testing               |
| TypeScript Everywhere | Better reliability                           |
| React Query           | Efficient server-state management            |
| Prisma ORM            | Type-safe DB access                          |
| Groq                  | Fast and affordable inference                |
| localStorage Session  | Persist conversations without authentication |
| PostgreSQL            | Reliable persistence                         |

## Trade-offs

* No streaming responses.
* No authentication.
* No rate limiting.
* Static knowledge base.
* No automated testing yet.

---

# Future Improvements

* Streaming AI responses (SSE/WebSockets)
* Conversation sidebar
* New Chat button
* Dark Mode
* User Authentication
* Rate Limiting
* Jest Unit Tests
* React Testing Library
* Analytics Dashboard
* Dynamic Knowledge Base
* Admin Panel

---

# License

This project was built for demonstration and take-home assessment purposes.

---

# Author

Built with ❤️ by **Harshvardhan**
