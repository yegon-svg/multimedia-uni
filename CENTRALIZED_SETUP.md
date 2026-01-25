# MMU Bike Rental - Centralized System Setup Guide

## Overview

The system is now fully centralized! All bikes and admin data are stored on a backend server, making them accessible from any device (phones, tablets, computers).

## What Changed

✅ **Bikes** - Now stored centrally on the backend server
✅ **Admins** - Centralized authentication and management  
✅ **Real-time Sync** - All users see the same bikes instantly
✅ **Cross-device** - Works on phones, web, tablets, etc.

## Setup Instructions

### Step 1: Install Node.js

Download and install Node.js from [https://nodejs.org/](https://nodejs.org/) (LTS version recommended)

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Start the Backend Server

```bash
npm start
```

You should see:

```text
✅ MMU Bike Rental Backend running on http://localhost:3001/api
```

### Step 4: Run the Frontend

Open `public/index.html` in your browser or start a local web server:

```bash
# From the public folder
python -m http.server 8000
# or
npx http-server
```

Visit `http://localhost:8000` (or your server URL)

## How It Works

### Admin Workflow

1. Register as admin at **admin.html**
2. Add/Edit/Delete bikes via admin portal
3. Changes are saved to the backend database
4. All users immediately see the updated bikes

### User Workflow

1. Browse bikes at **rent.html**
2. See all bikes added by admins
3. Click "Rent Now" to checkout
4. All users see the same bikes in real-time

## API Endpoints

**Base URL**: `http://localhost:3001/api`

### Bikes

- `GET /bikes` - Get all bikes
- `POST /bikes` - Add bike (admin only)
- `PUT /bikes/:id` - Update bike (admin only)
- `DELETE /bikes/:id` - Delete bike (admin only)

### Admins

- `GET /admins` - Get all admin emails
- `POST /admins/register` - Register new admin
- `POST /admins/login` - Login as admin

## Data Storage

- Bikes: `backend/data/bikes.json`
- Admins: `backend/data/admins.json`

Data persists and is shared across all users and devices.

## Troubleshooting

### "Cannot connect to backend"

- Make sure the backend server is running on port 3001
- Check that Node.js is installed correctly
- Run `npm start` in the `backend` folder

### Bikes not showing on rent page

- Ensure backend is running
- Check browser console (F12) for errors
- Make sure frontend API_URL points to correct backend address

### Admin changes not syncing

- Refresh the page to see latest bikes
- Backend should auto-update all connected clients

## Stopping the Server

Press `Ctrl+C` in the terminal running the backend server.

## Production Deployment

For production, you can deploy to services like:

- **Heroku** - Free tier available
- **Railway** - Easy deployment
- **Vercel/Netlify** - For frontend
- **AWS/Google Cloud** - For backend

Update the `API_URL` in `public/app.js` to point to your production server.

---

**All users and devices now share the same central database!** ✨
