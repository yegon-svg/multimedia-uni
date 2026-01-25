# MMU Bike Rental - Backend Server

This is the centralized backend for the MMU Bike Rental system. It manages bikes and admin data that are shared across all users and devices.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start the Server
```bash
npm start
```

The server will run on `http://localhost:3001`

### 3. Verify Server is Running
Visit `http://localhost:3001/api/health` in your browser. You should see:
```json
{
  "status": "Server is running",
  "timestamp": "2026-01-25T..."
}
```

## API Endpoints

### Bikes
- **GET** `/api/bikes` - Get all bikes
- **POST** `/api/bikes` - Add a new bike (admin only)
- **PUT** `/api/bikes/:id` - Update a bike (admin only)
- **DELETE** `/api/bikes/:id` - Delete a bike (admin only)

### Admins
- **GET** `/api/admins` - Get all admin emails (safe list)
- **POST** `/api/admins/register` - Register a new admin
- **POST** `/api/admins/login` - Login as admin

## Data Storage
- Bikes are stored in `backend/data/bikes.json`
- Admins are stored in `backend/data/admins.json`

All data is centralized and shared with all users accessing the frontend application.

## How It Works

1. When the frontend loads, it fetches bikes from the backend instead of localStorage
2. When an admin adds/edits/deletes a bike, it's saved to the centralized database
3. All users see the same bikes in real-time
4. Works across different devices (phones, tablets, computers)
5. Admin authentication is also centralized

## Stopping the Server
Press `Ctrl+C` in the terminal to stop the server.
