# QukLink

A comprehensive link monetization and management platform built with React and Node.js.

## Overview

QukLink is a full-stack web application that enables users to create, manage, and monetize their links. The platform provides features for link analytics, collections, subscriptions, shop management, and more.

## Features

- **Dashboard** - Comprehensive overview of your link performance
- **Link Management** - Create, organize, and track your links
- **Collections** - Group links into organized collections
- **Analytics** - Detailed insights and statistics for your links
- **Shop** - Sell products and manage orders
- **Subscriptions** - Manage subscriber relationships
- **Bookmarks** - Save and organize favorite links
- **Notifications** - Stay updated with real-time notifications
- **Settings** - Customize your profile, payments, and preferences

## Tech Stack

### Frontend
- React 18 with TypeScript
- React Router v6
- Vite (Build Tool)
- CSS3 with Custom Properties (Dark Mode Support)

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT Authentication
- Google OAuth 2.0
- bcryptjs for password hashing

## Project Structure

```
QukLink/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── settings/  # Settings pages (Profile, Payments, etc.)
│   │   ├── shop/      # Shop related pages
│   │   ├── subscriptions/
│   │   ├── bookmarks/
│   │   └── services/  # API services
│   └── public/        # Static assets
│
├── backend/           # Express.js backend API
│   ├── models/        # Mongoose models
│   ├── controllers/   # Route controllers
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   └── config/        # Configuration files
│
└── Images/            # Design assets
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/ARK650/QukLink.git
cd QukLink
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
npm install
```

4. Set up environment variables
- Create `.env` file in the backend directory
- Add required environment variables (MongoDB URI, JWT Secret, etc.)

5. Start the development servers

Frontend:
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
npm start
```

## Author

**ARK650**
- GitHub: [@ARK650](https://github.com/ARK650)
- Email: cark98@gmail.com

## License

This project is proprietary software. All rights reserved.

See the [LICENSE](LICENSE) file for details.

---

© 2025 ARK650. All Rights Reserved.
