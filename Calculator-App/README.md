# Calc App

A clean and responsive calculator app with 3 switchable themes, built with Next.js and TypeScript.

![Calculator App Preview](./public/preview.jpg)

## Tech Stack

- **Next.js 16** — React framework (App Router)
- **TypeScript** — Static typing
- **Tailwind CSS v4** — Utility-first styling
- **CSS Variables** — For theme switching


## Project Structure

```
calculator-app/
├── app/
│   ├── favicon.ico       # App icon
│   ├── globals.css       # Global styles & theme variables
│   ├── layout.tsx        # Root layout (font, metadata)
│   └── page.tsx          # Main calculator page
├── public/
│   └── preview.jpg       # App preview image
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json

```

## Getting Started

**Install dependencies:**

```bash
npm install
```

**Run the development server:**

```bash
npm run dev
```


## Build for Production

```bash
npm run build
npm start
```