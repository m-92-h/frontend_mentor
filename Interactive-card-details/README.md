# Interactive Card Details Form 💳

![Project Preview](./public/preview.jpg)

---

## 📌 Overview

An interactive credit card form that updates the card display in real-time as the user types. Built with **TypeScript**, **Vite**, and **Bootstrap**.

---

## ✨ Features

- Live card preview updates as you type
- Real-time input validation with error messages
- Card number auto-formatting (groups of 4 digits)
- Success state after valid form submission
- Fully responsive (mobile & desktop)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| TypeScript | Type-safe logic |
| Vite | Build tool & dev server |
| Bootstrap 5 | Layout & base styling |
| CSS3 | Custom styling & animations |

---

## 📁 Project Structure

```
interactive-card-details/
├── public/
│   ├── favicon-32x32.png
│   └── preview.jpg
├── src/
│   ├── assets/
│   │   ├── bg-card-back.png
│   │   ├── bg-card-front.png
│   │   ├── bg-main-desktop.png
│   │   ├── bg-main-mobile.png
│   │   ├── card-logo.svg
│   │   └── icon-complete.svg
│   ├── main.ts
│   └── style.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/m-92-h/interactive-card-details.git

# Navigate to the project
cd interactive-card-details

# Install dependencies
npm install

# Start the dev server
npm run dev
```

### Build for Production

```bash
npm run build
```