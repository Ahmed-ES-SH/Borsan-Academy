# Borsan Academy Frontend

**Borsan Academy** is a modern and responsive web application for browsing and exploring educational courses across multiple categories. The platform is built with scalability, performance, and user experience in mind, supporting both Arabic and English interfaces through a fully custom multilingual system — no external i18n libraries used.

## 🛠️ Tech Stack & Main Libraries

The project utilizes a combination of powerful libraries and tools:

- **Next.js** (`^15.2.3`) — React framework for routing, SSR, and API routes.
- **React** (`^19.0.0`) — Core library for building user interfaces.
- **TypeScript** — Provides static typing to ensure code quality and scalability.
- **Tailwind CSS** — Utility-first CSS framework for rapid UI styling.
- **@tailwindcss/forms** (`^0.3.4`) — Tailwind plugin for styling forms easily.
- **Framer Motion** (`^12.4.10`) — Animation and motion library for React.
- **Clerk** (`@clerk/nextjs ^6.15.0`) — Authentication and user session management.
- **Stripe / @stripe/stripe-js** (`^18.0.0 / ^7.1.0`) — Payment gateway integration.
- **Pusher JS** (`^8.4.0`) — Real-time event broadcasting and messaging.
- **Axios** (`^1.8.2`) — Promise-based HTTP client for API communication.
- **Cookie Universal** (`^2.2.2`) — Universal cookie handler for SSR and client.
- **Swiper** (`^11.2.5`) — Responsive sliders and carousels.
- **Sharp** (`^0.33.5`) — High-performance image processing library.
- **React Icons** (`^5.5.0`) — SVG-based icon packs for React.

## 🌍 Language Support

The application supports **Arabic** and **English** natively.  
The multilingual functionality is **fully custom-built** using code and JSON translation files, without relying on external libraries like `next-intl` or `i18next`.  
Language detection, switching, and content loading are handled through dynamic routing and context.

## 📁 Project Structure

Project files are organized for clarity, scalability, and maintainability, as shown below:

```

/app
├─ _components # Reusable UI components (buttons, cards, etc.)
├─ _helpers # Utility functions (e.g., formatters, parsers)
├─ [local] # Dynamic routing for language (e.g., /en, /ar)
├─ api # API route handlers (if used)
├─ constants # Constant values (e.g., routes, enums)
├─ context # React context for app-wide state (e.g., language, auth)
├─ Css # Global and component-level CSS (Tailwind setup)
├─ dashboard # Pages related to the user or admin dashboard
├─ translations # JSON files for Arabic and English translations
├─ types # TypeScript interfaces and type definitions
├─ favicon.ico # Application favicon
├─ globals.css # Global styles and Tailwind base imports
├─ layout.tsx # Root layout shared across all pages
├─ middleware.ts # Middleware for locale handling or auth redirection
├─ not-found.tsx # Custom 404 page
└─ page.tsx # Root index page

/public # Public assets (images, logos, etc.)
/.clerk # Clerk configuration files
.env.local # Environment variables
.eslintrc.config.mjs # ESLint config for code linting
.gitignore # Git ignored files
next.config.ts # Next.js configuration
next-env.d.ts # TypeScript Next.js types
package.json # Project metadata and scripts
package-lock.json # Dependency lock file
postcss.config.mjs # PostCSS configuration for Tailwind
tailwind.config.mjs # TailwindCSS configuration
tsconfig.json # TypeScript compiler configuration
tsconfig.tsbuildinfo # TS build cache
README.md # This file

```

## 🚀 Getting Started

To run the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/Ahmed-ES-SH/borsan-frontend.git

# 2. Navigate to the project directory
cd borsan-frontend

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev


## 👨‍💻 Author
Crafted with ❤️ by [Ahmed Ismail]
Feel free to connect with me or contribute to improve this project!
```
