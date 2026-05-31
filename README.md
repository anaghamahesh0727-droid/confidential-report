# 🔒 Confidential Report

A modern web application built with TanStack Start (React SSR framework) featuring a beautiful UI with Radix UI components and Tailwind CSS.

## 🚀 Features

- **Modern React Framework**: Built with TanStack Start for server-side rendering
- **Beautiful UI Components**: Powered by Radix UI and Tailwind CSS
- **Type-Safe**: Full TypeScript support
- **Responsive Design**: Works seamlessly on all devices
- **Rich Media Support**: Includes photo gallery, video, and audio features

## 📦 Tech Stack

- **Framework**: TanStack Start (React 19)
- **UI Library**: Radix UI
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Language**: TypeScript
- **Form Handling**: React Hook Form + Zod
- **Animations**: Framer Motion

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/anaghamahesh0727-droid/confidential-report.git
cd confidential-report
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (Node server — use on Render, Railway, Fly.io, VPS, etc.)
- `npm start` - Run the production Node server after `npm run build`
- `npm run build:static` - Build static files in `dist/client` (any static host)
- `npm run build:github-pages` - Static build with base path for GitHub Pages
- `npm run preview` - Preview production build
- `npm run preview:static` - Preview static build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📁 Project Structure

```
confidential-report/
├── public/           # Static assets (photos, videos, audio)
├── src/
│   ├── components/   # React components
│   ├── routes/       # TanStack Router pages
│   ├── lib/          # Utility functions
│   └── styles.css    # Global styles
├── index.html        # Landing page
└── package.json      # Dependencies
```

## 🌐 Deployment

This app uses client-side routing. **Do not** deploy only raw static files without the SPA shell, or deep links (e.g. `/gallery`) will 404.

### Static hosting (GitHub Pages, Netlify static, S3, etc.)

1. `npm run build:github-pages` (or `npm run build:static` for root-hosted sites)
2. Publish the **`dist/client`** folder as the site root
3. GitHub Pages: set the Pages source to that folder (or use Actions to upload `dist/client`)

Live site: [https://anaghamahesh0727-droid.github.io/confidential-report/](https://anaghamahesh0727-droid.github.io/confidential-report/)

### Node hosting (Render, Railway, Fly.io, VPS, etc.)

1. `npm run build`
2. `npm start` (serves on port 3000 by default; set `PORT` if needed)

No Vercel or Netlify config files are required — routing is handled by the app build.

## 📝 License

This project is private and confidential.

## 👤 Author

**Anagha T M**
- GitHub: [@anaghamahesh0727-droid](https://github.com/anaghamahesh0727-droid)
- Email: anaghamahesh0727@gmail.com

---

Made with ❤️ using TanStack Start
