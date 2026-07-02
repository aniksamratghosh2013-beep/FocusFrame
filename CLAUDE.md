# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FocusFrame is a premium smart eyewear product with a cinematic single-page website and a Node.js backend server. The project consists of:

1. A static HTML/CSS/JavaScript frontend (landing page)
2. A Node.js/Express backend server with API endpoints
3. An AI chat assistant (Dasher) powered by NLP.js or Groq API
4. Email subscription and newsletter functionality

## Code Architecture and Structure

### Frontend (Static Site)
- `index.html` - Main product landing page with all sections
- `dashboard.html`, `features.html`, `pricing.html`, `about.html`, `blog.html`, `careers.html` - Additional pages
- CSS is embedded directly in HTML files with a comprehensive design system
- JavaScript for interactive elements, animations, and the 3D product viewer

### Backend (Node.js Server)
- `server/server.js` - Main Express server with API endpoints:
  - `/api/subscribe` - Email subscription endpoint
  - `/api/send-daily` - Daily newsletter sending endpoint
  - `/api/chat` - Dasher AI assistant endpoint
- `server/db.js` - JSON-based database for email subscribers
- `server/mailer.js` - Email sending functionality using Nodemailer
- `server/model.nlp` - Trained NLP model for the chat assistant

### Design System
- `Design_System.md` - Comprehensive design guidelines
- `Component_Library.md` - CSS component library with design tokens

## Common Development Tasks

### Running the Application
```bash
cd server
node server.js
```
The application will start on port 3000 (or the PORT environment variable).

### Development Workflow
1. Frontend changes: Edit HTML/CSS/JS directly in the root files
2. Backend changes: Modify files in the `server/` directory
3. Chat assistant: Update intents in `server.js` or train new NLP models
4. Email functionality: Modify `mailer.js` and templates

### Environment Variables
Create a `.env` file in the `server/` directory with:
- `CRON_KEY` - Secret key for the daily newsletter endpoint
- `GROQ_API_KEY` - Optional key for enhanced AI chat capabilities
- Email configuration variables for Nodemailer

## Technology Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Google Fonts (Space Grotesk, Inter)
- Embedded CSS with custom properties
- Responsive design with mobile-first approach

### Backend
- Node.js with Express.js
- NLP.js for intent classification
- OpenAI SDK for Groq API integration
- Nodemailer for email functionality
- dotenv for environment management

## Design System
The project follows a comprehensive design system with:
- Dark mode aesthetic with indigo/violet primary colors
- Space Grotesk (headings) and Inter (body) font pairing
- 8dp incremental spacing system
- Component library with buttons, cards, inputs, etc.
- Responsive grid system and utility classes

## Chat Assistant (Dasher)
The AI assistant uses:
1. Groq API with LLMs when GROQ_API_KEY is set
2. NLP.js intent classifier as a fallback
3. Predefined intents for common questions about pricing, features, etc.

To add new intents, update the `nlp.addDocument()` and `nlp.addAnswer()` calls in `server/server.js`.

## Email Functionality
- Subscriber emails stored in `server/data/subscribers.json`
- Daily newsletter sending via `/api/send-daily` endpoint
- Email templates and sending logic in `server/mailer.js`

## Deployment
The application is configured for deployment on Render:
- Build command: `cd server && npm install`
- Start command: `node server/server.js`
- Environment variables for email configuration and API keys

## Git Workflow
Standard git workflow with common hooks available in `.git/hooks/`. The `.gitignore` file excludes:
- `node_modules/`
- `.env` (environment variables)
- `server/data/subscribers.json` (subscriber data)
- `glasses.zip` (large asset files)
- Server models directory

When making commits, be aware that the repository contains both frontend static files and backend Node.js code.