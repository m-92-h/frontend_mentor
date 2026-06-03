# 🌍 GeoFinder

A simple web application that lets you explore information about all countries in the world — including population, region, capital, languages, currencies, and border countries.

![GeoFinder Preview](public/preview.jpg)

---

## 🛠️ Built With

| Tool                                                     | Purpose                      |
| -------------------------------------------------------- | ---------------------------- |
| [Vite](https://vitejs.dev/)                              | Build tool & dev server      |
| [TypeScript](https://www.typescriptlang.org/)            | Type-safe JavaScript         |
| CSS                                                      | Styling & dark mode          |
| [REST Countries API (local)](https://restcountries.com/) | Country data via `data.json` |

---

## ✨ Features

- 🔍 Live search by country name
- 🗺️ Filter countries by region
- 📄 Detailed country page with border navigation
- 🌙 Dark / Light mode toggle with saved preference

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/m-92-h/GeoFinder.git

# 2. Navigate to the project folder
cd geofinder

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

---

## 📁 Project Structure

```
GEOFINDER/
├── public/
│   ├── data.json           # Country data (static)
│   └── preview.jpg         # Project preview image
├── src/
│   ├── assets/             # icons search
│   ├── main.ts             # Main application logic
│   └── style.css           # Global styles
├── index.html
├── package.json
└── tsconfig.json
```
