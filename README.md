# ITZ FIZZ — Scroll-Driven Hero Section Animation

A production-ready **Next.js (App Router)** implementation featuring an immersive, high-performance scroll-driven hero section powered by **Tailwind CSS** and **GSAP ScrollTrigger**.

---

## ⚡ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: TypeScript (`.tsx`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom Glassmorphism tokens & Cyber Theme
- **Motion & Physics Engine**: [GSAP (GreenSock)](https://gsap.com/) & `ScrollTrigger` Plugin
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Key Functional Requirements Met

1. **Hero Section Layout**:
   - Occupies full viewport height (`100vh`) above the fold.
   - Letter-spaced headline: **`W E L C O M E   I T Z   F I Z Z`** with individually staggered typography.
   - Impact metrics / statistics cards with frosted glassmorphism, glowing borders, and backdrop-blur styling.

2. **Initial Load Animation**:
   - Sequential GSAP timeline on mount:
     1. Navigation and status badge fade in.
     2. Headline characters smoothly stagger in (fade + 3D Y-offset + blur clear).
     3. Stats cards animate in one-by-one.
     4. Main visual element (vehicle/object) smoothly introduces itself.

3. **Scroll-Based Animation (Core Feature)**:
   - Uses GSAP `ScrollTrigger` configured with `scrub: 1.2` (smooth continuous scrub).
   - Directly tied to page scroll progress — **no abrupt time-based autoplay**.
   - As the user scrolls:
     - The hero section pins seamlessly.
     - Headline and stats cards translate and fade upwards.
     - The main visual element scales up (1.0x → 1.55x), rotates with 3D perspective (`rotateX`, `rotateZ`), and shifts forward.
     - Real-time telemetry HUD overlay fades into view reflecting dynamic scroll downforce and velocity.

4. **Performance & Motion**:
   - Strictly utilizes hardware-accelerated transform properties (`scale`, `translate3d`, `rotateX/Z`, `opacity`).
   - Cleaned up using `gsap.context()` and `ctx.revert()` in `useEffect` to prevent memory leaks and hydration conflicts.
   - Zero layout thrashing (`will-change`, no width/height/top/left reflows).

---

## 🛠️ Step-by-Step Instructions: Running Locally

### 1. Prerequisites
- **Node.js**: v18.18.0 or later (v20+ / v22+ recommended)
- **npm** (or `pnpm` / `yarn` / `bun`)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
To test the optimized production build:
```bash
npm run build
npm run start
```

---

## 🌐 Deployment Guide (GitHub & Vercel)

### Deploying to GitHub

1. Initialize git and stage all files:
   ```bash
   git init
   git add .
   git commit -m "feat: complete scroll-driven hero section with GSAP and Tailwind CSS"
   ```

2. Create a new repository on [GitHub](https://github.com/new).

3. Link the remote and push your code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY_NAME>.git
   git push -u origin main
   ```

### Deploying to Vercel (One-Click)

1. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
2. Click **"Add New..."** → **"Project"**.
3. Import your GitHub repository.
4. Framework Preset will automatically detect **Next.js**.
5. Keep the default settings:
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
6. Click **Deploy**. Your project will be live on a `*.vercel.app` URL in under 60 seconds!

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css        # Glassmorphism, cyber grid, scrollbar styles
│   ├── layout.tsx         # Root HTML layout and metadata
│   └── page.tsx           # "use client" component with GSAP & ScrollTrigger logic
├── public/                # Static public assets
├── tailwind.config.ts     # Custom colors, shadows, and utility extensions
├── postcss.config.mjs     # PostCSS setup with Tailwind & Autoprefixer
├── tsconfig.json          # TypeScript path aliases and compiler configuration
├── next.config.mjs        # Next.js production settings
├── package.json           # Dependencies (gsap, lucide-react, next, react, etc.)
└── README.md              # Project documentation and deployment guide
```
