# Nookanomics Website

A premium, Animal Crossing‑themed web application built with **Vite**, **React**, **TypeScript**, and **Tailwind CSS**. The site includes:

- **Home** – a welcoming landing page with animated hero text.
- **Directory** – a grid of Animal Crossing resources.
- **Videos** – a gallery of related videos.
- **Merchandise** – a showcase of t‑shirts, hoodies, mugs, and more.

## Tech Stack

- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS (custom configuration for a glass‑morphism, premium look)
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

The dev server will be available at `http://localhost:5173`.

## Build & Deploy

```bash
npm run build   # creates a production‑ready `dist` folder
```
Upload the contents of `dist/` to your Hostinger hosting account (or any static‑site host).

## Project Structure

```
src/
├─ assets/          # images, fonts, icons
├─ components/      # reusable UI components (Navbar, Layout, etc.)
├─ pages/           # Home, Directory, Videos, Merchandise
├─ styles/          # Tailwind config, global CSS
├─ App.tsx          # app entry with routing
└─ main.tsx         # React entry point
```

---
*Feel free to explore the code – the design aims for a modern, dynamic user experience.*
