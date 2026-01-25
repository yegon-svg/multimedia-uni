# 🔧 Complete Setup & Troubleshooting Guide

## ✅ Setup Checklist

### 1. Prerequisites

- [ ] Windows 10/11, Mac, or Linux
- [ ] Administrator access to install software
- [ ] Internet connection

### 2. Install Node.js

- [ ] Download from [https://nodejs.org](https://nodejs.org) (LTS version)
- [ ] Run installer with default settings
- [ ] **Restart your computer after installation**

### 3. Verify Installation

Open **PowerShell** or **Command Prompt** and run:

```powershell
node --version
npm --version
```

Should show version numbers. If not, restart your computer.

### 4. Install Dependencies

Navigate to backend folder:

```powershell
cd "C:\Users\User\OneDrive\Desktop\meshack\mmu-bike-rental\backend"
npm install
```

This will install:

- express (web framework)
- cors (for cross-origin requests)

### 5. Validate Setup

```powershell
node validate.js
```

Should show: **✅ Everything looks good!**

---

## 🚀 Running the System

### Terminal 1: Start Backend

```powershell
cd "C:\Users\User\OneDrive\Desktop\meshack\mmu-bike-rental\backend"
npm start
```

**Expected output:**

```text
============================================================
✅ MMU Bike Rental Backend Started Successfully
============================================================

🌐 Server running on: http://localhost:3001
📚 API Base URL: http://localhost:3001/api

📋 Available Endpoints:
   GET    http://localhost:3001/api/bikes
   POST   http://localhost:3001/api/bikes
   ...

💡 Press Ctrl+C to stop the server
============================================================

Initial data loaded: 4 bikes, 0 admins
```

**Keep this terminal open!**

### Terminal 2: Open Frontend

In a new terminal or file explorer:

**Option A - File Explorer:**

1. Navigate to: `C:\Users\User\OneDrive\Desktop\meshack\mmu-bike-rental\public`
2. Double-click: `index.html`

**Option B - Web Server (Recommended):**

```powershell
cd "C:\Users\User\OneDrive\Desktop\meshack\mmu-bike-rental\public"
python -m http.server 8000
```

Then visit: `http://localhost:8000`

---

## 🧪 Testing Each Feature

### Test 1: Backend is Running

Visit: `http://localhost:3001/api/health`

Expected response:

```json
{
  "status": "Server is running",
  "timestamp": "2026-01-25T..."
}
```

### Test 2: Bikes are Available

Visit: `http://localhost:3001/api/bikes`

Expected response - 4 bikes:

```json
[
  { "id": 1, "name": "Mountain Bike Pro", "price": 50, ... },
  { "id": 2, "name": "Road Bike Speed", "price": 80, ... },
  { "id": 3, "name": "Electric Bike Plus", "price": 150, ... },
  { "id": 4, "name": "Hybrid Bike", "price": 100, ... }
]
```

### Test 3: User Registration

1. Go to frontend home page
2. Click "Sign Up"
3. Fill in details:
   - Full Name: "John Doe"
   - Email: [john@example.com](mailto:john@example.com)
   - Password: "password123"
   - Phone: "0712345678" (optional)
4. Click "Register"
5. Should redirect to home page

### Test 4: Admin Registration

1. Go to `admin.html`
2. Register admin:
   - Email: [admin@example.com](mailto:admin@example.com)
   - Password: "admin123"
3. Click "Register"
4. Message: "✅ Admin created! Please login."

### Test 5: Admin Login

1. Fill in admin credentials
2. Click "Login"
3. Should show Admin Dashboard

### Test 6: Add Bike (Admin)

1. In admin dashboard
2. Fill in bike details:
   - Name: "Test Bike"
   - Type: "Road"
   - Price: "50"
   - Select image file
   - Click "Add Bike"
3. Message: "✅ Bike added successfully!"
4. Bike appears in table

### Test 7: View Bikes (User)

1. Go to `rent.html`
2. Should see 5 bikes (original 4 + newly added test bike)
3. Each bike shows price, description, "Rent Now" button

### Test 8: Checkout

1. Click "Rent Now" on any bike
2. Redirects to `checkout.html`
3. Shows bike details and checkout form
4. Can fill in details (don't submit)

### Test 9: Admin Changes Sync

1. Open 2 browser tabs: one on `rent.html`, one on `admin.html`
2. In admin tab, add new bike
3. In rent tab, refresh page
4. New bike should appear!

---

## ❌ Common Issues & Solutions

### Issue: "npm not found"

**Cause:** Node.js not installed or not restarted after installation

**Solution:**

1. Check installation: `node --version`
2. If error, restart computer
3. Reinstall Node.js if needed

### Issue: "Cannot connect to backend"

**Cause:** Backend server not running

**Solution:**

1. Check Terminal 1 is running `npm start`
2. Should show "Backend Started Successfully"
3. Verify: Visit `http://localhost:3001/api/health`

### Issue: "CORS Error"

**Cause:** Backend not accessible from frontend

**Solution:**

1. Ensure backend is running on port 3001
2. Check firewall allows port 3001
3. Try: `http://localhost:3001/api/health` in browser

### Issue: "Bikes not showing"

**Cause:** Frontend can't connect to backend

**Solution:**

1. Press F12 to open Developer Tools
2. Go to Network tab
3. Refresh page
4. Look for `/api/bikes` request
5. Check if it's 200 or error
6. If error, backend might not be running

### Issue: "Admin changes not appearing"

**Cause:** Page needs refresh to sync

**Solution:**

1. Refresh `rent.html` page
2. New bikes should appear
3. Clear browser cache if still not showing

### Issue: "Port 3001 already in use"

**Cause:** Another process using port 3001

**Solution:**

```powershell
# Find process using port 3001
netstat -ano | findstr :3001

# Kill the process (replace PID)
taskkill /PID 12345 /F

# Then start backend again
npm start
```

### Issue: "npm install fails"

**Cause:** Network issue or corrupted install

**Solution:**

```powershell
# Clear npm cache
npm cache clean --force

# Try install again
npm install
```

---

## 📊 System Architecture

```text
┌─────────────────────────────────────────────────┐
│        Frontend (Web Browser)                   │
│  (index.html, rent.html, admin.html, etc.)      │
└──────────────────┬──────────────────────────────┘
                   │
                   │ HTTP/JSON
                   │ (port 3000 or file://)
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│    Node.js/Express Backend                      │
│    (server.js - port 3001)                      │
│                                                 │
│    ✅ Centralized Bikes Database                │
│    ✅ Admin Authentication                      │
│    ✅ CORS Enabled                              │
│    ✅ Error Logging                             │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│  Centralized Data (JSON Files)                  │
│                                                 │
│  📁 backend/data/                               │
│     ├─ bikes.json    (all 4+ bikes)             │
│     └─ admins.json   (admin accounts)           │
└─────────────────────────────────────────────────┘
```

---

## 🎯 Key Features Verified

✅ **Centralized Bikes** - All users see same 4 bikes
✅ **Admin Control** - Only 2 admins allowed, can add/edit/delete bikes
✅ **Real-time Sync** - Changes appear instantly when page refreshes
✅ **Cross-Device** - Works on phones, tablets, computers
✅ **Error Handling** - Server logs all errors for debugging
✅ **Data Persistence** - Data saved in backend/data/ folder

---

## 📞 Getting Help

**When reporting an issue, include:**

1. Error message from browser console (F12)
2. Backend terminal output
3. Steps to reproduce
4. Screenshots if possible

**Check these files:**

- `backend/server.js` - Backend configuration
- `public/app.js` - Frontend app logic
- `public/checkout.html` - Checkout page
- `backend/data/bikes.json` - Current bike data
- `backend/data/admins.json` - Current admin accounts

---

## ✨ Next Steps

1. ✅ Setup complete
2. ✅ Backend running
3. ✅ Frontend accessible
4. ✅ All features working
5. 🎉 **System is ready to use!**

Happy biking! 🚴
