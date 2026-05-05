# Real-Time Productivity Management System (Mini SaaS)

A comprehensive real-time task management application built with the MERN stack. This system features a dynamic prioritization engine, real-time updates via WebSockets, and personalized productivity insights.

## 🚀 Key Features

- **Robust Authentication**: Secure user registration and login using JSON Web Tokens (JWT) and Bcrypt password hashing.
- **Smart Task Prioritization**: A custom engine that dynamically calculates task priority. Priority scores increase as deadlines approach, ensuring that overdue tasks always appear at the top.
- **Real-Time Synchronization**: Instant task updates across multiple devices using Socket.io. Any changes in task status or creation are reflected immediately without a page refresh.
- **Interactive Dashboard**: A clean, responsive UI with productivity insights, including daily activity counts and category-wise distributions.
- **Mobile Responsive**: Built with Tailwind CSS to ensure a seamless experience across desktop and mobile devices.

## 🛠️ Technology Stack

- **Frontend**: React.js, Redux Toolkit, React Router, Tailwind CSS, Socket.io-client
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Real-Time**: Socket.io (WebSockets)

## 📦 Project Structure

```text
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route logic
│   ├── middleware/      # Authentication & route protection
│   ├── models/          # Mongoose schemas
│   └── routes/          # API endpoints
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── pages/       # Application views
    │   └── store/       # Redux state management
```

## ⚙️ Local Installation

### Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB instance)

### 1. Backend Setup
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure your variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5173`.

## 🌐 Deployment

The application is designed for easy deployment:
- **Backend**: Can be hosted on platforms like Render, Railway, or AWS.
- **Frontend**: Optimized for hosting on Vercel or Netlify.
- **Database**: Managed via MongoDB Atlas.

---
**Developed for the Agumentik Group of Companies Summer Internship Assessment.**
