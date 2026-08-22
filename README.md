# 🌍 Globe Trotter
**Odoo x LDCE Hackathon '26 Submission**

Globe Trotter is a full-stack, intelligent travel companion designed to take the stress out of group travel planning. Stop switching between spreadsheets, maps, and group chats—plan your dream trip all in one place.

## ✨ Key Features
- **Smart Itinerary Builder:** Plan day-by-day activities with times, costs, and quick notes.
- **Live Interactive Maps:** Automatically fetches and embeds live maps for your specific destinations.
- **Automated Budget Tracking:** Instantly calculates total trip costs and visualizes remaining budget with progress bars.
- **Travelers Community:** Share tips, discover hidden gems, and get inspired by other travelers on a live social feed.
- **Secure Authentication:** JWT-based login system with fully protected routes to keep your trip data private.

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Vite, TailwindCSS v4, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **API Communication:** Axios with Interceptors

## 🚀 How to Run Locally

### 1. Start the Backend
Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install
node src/index.js

### 2. Start the Frontend
Open a second terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev

The app will be running at http://localhost:5173
