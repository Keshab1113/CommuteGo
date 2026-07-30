# CommuteGo

> Discover Hidden Places. Meet Local Experts. Travel Together.

![CommuteGo](https://commute-go.vercel.app/)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.14-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Overview

CommuteGo is a premium three-pillar travel platform that transforms how Indians explore their country. Unlike typical travel websites that only answer "Where should I stay?", CommuteGo answers three completely different questions:

- **Where should I actually go?** → Hidden Destinations
- **Who can show me the real place?** → Local Buddies
- **Who can travel with me?** → Travel Matchmaking

## 🎯 Three Pillars

### 1. Hidden Destinations
Discover authentic, lesser-known destinations beyond tourist traps. Filter by:
- Adventure, Nature, Peaceful, Family, Romantic
- Weekend Getaways, Camping, Road Trips
- Motorcycle Trips, Trekking, Photography

### 2. Local Buddies
Connect with verified passionate locals who share their home, culture, and stories. Not guides—friends who show you the real India.

### 3. Travel Matchmaking
Find compatible travel companions based on destination, dates, budget, interests, and adventure level.

## ✨ Features

### Premium UI/UX
- 🌙 **Dark Mode** - Primary background #141313, Card surface #1C1B1B
- ☀️ **Light Mode** - Clean white backgrounds
- 🎨 **Gradient Accents** - Cyan (#06B6D4) to Emerald (#059669)
- ✨ **Glass Morphism** - Backdrop blur effects
- 🎬 **Framer Motion** - Smooth animations throughout
- 📱 **Responsive** - Mobile-first approach

### Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section, pillars overview, featured content |
| Hidden Destinations | `/hidden-destinations` | Search & filter destinations |
| Local Buddies | `/local-buddies` | Browse verified local experts |
| Travel Matchmaking | `/travel-matchmaking` | Find/create travel companions |
| Services | `/services` | Transportation booking |
| Bus Booking | `/bus` | Bus ticket booking |
| Flight Booking | `/flight` | Flight search & booking |
| About | `/about` | About the platform |
| Contact | `/contact` | Contact information |
| Admin | `/admin` | Dashboard for admins |

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 5.4.14** - Build tool
- **Tailwind CSS 3.4.0** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Router 6** - Client-side routing

### UI Components
- **shadcn/ui** - Design system components
- **Radix UI** - Headless components
- **Tailwind CSS Animate** - CSS animations
- **mini-svg-data-uri** - SVG utilities

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/keshab1113/CommuteGo.git
cd CommuteGo/client

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
CommuteGo/
├── client/                    # React frontend
│   ├── src/
│   │   ├── component/         # Reusable components
│   │   │   ├── Header/        # Navbar components
│   │   │   ├── Footer/        # Footer components
│   │   │   ├── AdminComponents/ # Admin dashboard components
│   │   │   └── ui/            # shadcn/ui components
│   │   ├── pages/             # Page components
│   │   │   ├── AdminPages/    # Admin dashboard pages
│   │   │   └── *.jsx          # Public pages
│   │   ├── store/             # State management
│   │   ├── context/           # React context providers
│   │   ├── lib/               # Utility functions
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── public/                # Static assets
│   ├── tailwind.config.js     # Tailwind configuration
│   └── vite.config.js         # Vite configuration
├── server/                    # Backend (future)
└── README.md
```

## 🎨 Design System

### Colors

| Name | Light Mode | Dark Mode | Usage |
|------|-----------|-----------|-------|
| Background | `hsl(0 0% 100%)` | `hsl(0 0% 7%)` | Page background |
| Card | `hsl(0 0% 100%)` | `hsl(0 0% 9%)` | Card surfaces |
| Primary | `hsl(199 89% 48%)` | `hsl(199 89% 48%)` | Buttons, links |
| Accent | `hsl(160 84% 39%)` | `hsl(160 84% 39%)` | Success states |

### Premium Dark Theme
```css
--background: #141313;
--card: #1C1B1B;
--border: #2C2B2B;
--hover: #252424;
```

## 🔗 Live Demo

- **Production**: [https://commute-go.vercel.app/](https://commute-go.vercel.app/)
- **Development**: `http://localhost:5174` (when running locally)

## 👥 Platform Users

| Role | Description |
|------|-------------|
| **Traveler** | Discovers destinations, books local buddies, joins trips |
| **Local Buddy** | Shares their home city, earns by hosting travelers |
| **Community Host** | Organizes group trips and events |
| **Admin** | Manages users, content, and platform operations |

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

- **Website**: [https://commute-go.vercel.app/](https://commute-go.vercel.app/)
- **Email**: keshabdas2003@gmail.com

---

Built with ❤️ for travelers who want to explore the real India.
