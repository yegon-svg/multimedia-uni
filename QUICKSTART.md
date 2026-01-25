# 🚀 Quick Start Guide - MMU Bike Rental (Centralized)

## ⚡ 5-Minute Setup

### Prerequisites

- **Node.js** (Download from [https://nodejs.org](https://nodejs.org) - LTS version)
- **Git** (Optional, for version control)
- **A web browser** (Chrome, Firefox, Safari, Edge)

---

## 🔧 Installation Steps

### Step 1: Install Node.js

1. Download from [https://nodejs.org/](https://nodejs.org/)
2. Run the installer
3. Accept defaults and complete installation
4. Restart your computer OR restart your terminal

### Step 2: Verify Installation

Open PowerShell and run:

```powershell
node --version
npm --version
```

Should show version numbers like `v18.x.x` and `9.x.x`

### Step 3: Install Dependencies

```powershell
cd "c:\Users\User\OneDrive\Desktop\meshack\mmu-bike-rental\backend"
npm install
```

This installs Express.js and other required packages.

### Step 4: Start Backend Server

```powershell
npm start
```

You should see:

```text
✅ MMU Bike Rental Backend running on http://localhost:3001/api
```

**Keep this terminal open!**

### Step 5: Open Frontend

In a **new terminal/browser window**:

1. Navigate to: `c:\Users\User\OneDrive\Desktop\meshack\mmu-bike-rental\public`
2. Double-click `index.html` OR
3. Open in browser: `file:///C:/Users/User/OneDrive/Desktop/meshack/mmu-bike-rental/public/index.html`

---

## ✅ Verify Everything Works

### Test 1: Backend Health Check

Visit in browser: `http://localhost:3001/api/health`

Should show:

```json
{
  "status": "Server is running",
  "timestamp": "2026-01-25T..."
}
```

### Test 2: Check Bikes

Visit in browser: `http://localhost:3001/api/bikes`

Should show 4 bikes with prices: 50, 80, 150, 100

### Test 3: User Registration

1. On frontend, click "Sign Up"
2. Create test account
3. Should redirect to "Rent" page

### Test 4: Admin Panel

1. Go to `admin.html`
2. Register as admin (first 2 registrations can be admins)
3. Login with admin credentials
4. Try adding a new bike
5. Go back to `rent.html` - new bike should appear!

---

## 🎯 Common Issues & Fixes

| Problem | Solution |
| --- | --- |
| "npm not found" | Restart terminal after installing Node.js |
| "CORS error" | Make sure backend is running (`npm start`) |
| "Cannot connect to backend" | Check terminal shows "running on [http://localhost:3001](http://localhost:3001)" |
| "Bikes not showing" | Refresh browser, clear cache (Ctrl+Shift+Delete) |
| "Admin changes not appearing" | Refresh rent.html page |
| Port 3001 already in use | Kill process: `netstat -ano \| findstr :3001` |

---

## 📁 Project Structure

```text
mmu-bike-rental/
├── backend/              ← Backend server
│   ├── server.js         ← Main server file
│   ├── package.json      ← Dependencies
│   └── data/             ← Centralized data
│       ├── bikes.json    ← All bikes (shared)
│       └── admins.json   ← Admin accounts (shared)
│
└── public/               ← Frontend (web browser)
    ├── index.html        ← Home page
    ├── admin.html        ← Admin portal
    ├── rent.html         ← Bike rentals
    ├── checkout.html     ← Payment page
    ├── app.js            ← Main app logic
    └── styles.css        ← Styling
```

---

## 🌐 Frontend URLs

After backend is running, access these:

| Page | URL |
| --- | --- |
| Home | `file:///C:.../public/index.html` |
| Register | `...public/signup.html` |
| Login | `...public/login.html` |
| Browse Bikes | `...public/rent.html` |
| Admin Panel | `...public/admin.html` |
| Checkout | `...public/checkout.html?bikeId=1` |

---

## 🔌 API Endpoints

Backend runs on `http://localhost:3001/api`

### Bikes (Centralized)

```text
GET    /api/bikes          ← Get all bikes
POST   /api/bikes          ← Add new bike (admin)
PUT    /api/bikes/:id      ← Update bike (admin)
DELETE /api/bikes/:id      ← Delete bike (admin)
```

### Admins (Centralized)

```text
GET    /api/admins              ← List admin emails
POST   /api/admins/register     ← Register admin
POST   /api/admins/login        ← Login admin
```

---

## 🧪 Testing Checklist

- [ ] Node.js installed
- [ ] Backend installs packages
- [ ] Backend starts without errors
- [ ] Health check returns 200
- [ ] Bikes API returns 4 bikes
- [ ] Frontend loads
- [ ] Can register new user
- [ ] Can register admin (first 2 users)
- [ ] Admin can add bike
- [ ] New bike appears on rent page for all users
- [ ] Can proceed to checkout
- [ ] Bikes sync across tabs

---

## 🛑 Stopping the Server

**To stop backend**: Press `Ctrl+C` in the terminal running `npm start`

---

## 📞 Help

If something doesn't work:

1. **Check terminal output** - Look for error messages
2. **Verify Node.js** - Run `node --version`
3. **Check ports** - Port 3001 must be free
4. **Clear browser cache** - Ctrl+Shift+Delete
5. **Restart everything** - Stop server, close browser, start over

---

## ✨ Features

✅ Centralized bike database - All users see same bikes
✅ Real-time sync - Changes appear instantly
✅ Cross-device - Works on phones, tablets, PCs
✅ Admin control - Only admins can modify bikes
✅ Secure - Admin authentication system
✅ Persistent - Data saved in backend

**Everything is now centralized and working!** 🎉
