# 🌟 Habit Tracker

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-blueviolet.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.49.4-green.svg)](https://supabase.com/)

**A beautiful, modern habit tracking application built with Next.js 15 and the latest web technologies.**

[🚀 Live Demo](https://habit.sham1ko.tech/) • [🛠️ Installation](#installation)

</div>

---

## ✨ Features

- **🎯 Smart Habit Tracking** - Create, edit, and track your daily habits
- **📊 Visual Progress** - Beautiful activity calendar showing your streaks
- **📱 Responsive Design** - Works on desktop and mobile
- **🌓 Dark Mode** - Toggle between light and dark themes
- **🔐 Secure Authentication** - Powered by Supabase Auth
- **📈 Statistics** - Track completion rates and streaks

## 🛠️ Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service with PostgreSQL
- **[Prisma](https://prisma.io/)** - Database ORM
- **[shadcn/ui](https://ui.shadcn.com/)** - UI components

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sham1ko/habit-tracker.git
   cd habit-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Database
   DATABASE_URL=your_database_url
   ```

4. **Run database migrations**

   ```bash
   npm run db:migrate
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Visit [http://localhost:3000](http://localhost:3000) to see the app! 🎉

## 🎯 Usage

1. **Sign up** or **log in** to your account
2. **Create your first habit** by clicking "New Habit"
3. **Set a clear goal** and choose frequency (daily, weekly, monthly)
4. **Track progress** by marking habits as complete
5. **View streaks** and statistics on the dashboard

---

<div align="center">

**⭐ If you found this project helpful, please consider giving it a star! ⭐**

Made with ❤️ by [Sham1ko](https://github.com/Sham1ko)

[![Star this repository](https://img.shields.io/github/stars/Sham1ko/habit-tracker?style=social)](https://github.com/Sham1ko/habit-tracker/stargazers)

</div>
