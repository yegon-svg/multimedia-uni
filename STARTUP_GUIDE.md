# 🚀 STARTUP GUIDE - Step by Step

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the System](#running-the-system)
4. [Verification](#verification)
5. [What to Do Next](#what-to-do-next)

---

## Prerequisites

### What You Need

- Windows 10/11 (or Mac/Linux)
- Administrator access
- Internet connection
- A web browser (Chrome, Firefox, Edge)

### Check These First

```text
✓ Have you downloaded Node.js from https://nodejs.org?
✓ Is it the LTS (Long Term Support) version?
✓ Do you have this folder: C:\Users\User\OneDrive\Desktop\meshack\mmu-bike-rental\
```

---

## Installation

### Step 1️⃣: Install Node.js

1. Go to [https://nodejs.org](https://nodejs.org)
2. Click the green **LTS** button
3. Run the installer
4. Accept all default options
5. **IMPORTANT: Restart your computer after installation!**

### Step 2️⃣: Verify Installation

After restarting:

1. Open **PowerShell** or **Command Prompt**
   - Press `Windows + R`
   - Type `powershell`
   - Press Enter

2. Type these commands:

```powershell
node --version
```

Should show: `v18.xx.x` or similar

```powershell
npm --version
```

Should show: `9.xx.x` or similar

**If you see errors**: Node.js not installed correctly. Try reinstalling.

### Step 3️⃣: Install Backend Dependencies

1. Open **PowerShell** (if closed, open a new one)

2. Navigate to the backend folder:

```powershell
cd "C:\Users\User\OneDrive\Desktop\meshack\mmu-bike-rental\backend"
```

1. Run:

```powershell
npm install
```

**What happens:**

- Downloads Express (web server)
- Downloads CORS (cross-origin support)
- Creates `node_modules` folder
- Creates `package-lock.json` file

**This takes 1-2 minutes. Wait for it to complete!**

---

## Running the System

### Step 1️⃣: Start the Backend Server

Keep your current PowerShell window open!

1. You should already be in the backend folder:

```text
C:\Users\User\OneDrive\Desktop\meshack\mmu-bike-rental\backend>
```

1. Run:

```powershell
npm start
```

1. **You should see this output:**

```text
============================================================
✅ MMU Bike Rental Backend Started Successfully
============================================================

🌐 Server running on: http://localhost:3001
📚 API Base URL: http://localhost:3001/api

📋 Available Endpoints:
   GET    http://localhost:3001/api/bikes
   POST   http://localhost:3001/api/bikes
   PUT    http://localhost:3001/api/bikes/:id
   DELETE http://localhost:3001/api/bikes/:id
   POST   http://localhost:3001/api/admins/register
   POST   http://localhost:3001/api/admins/login
   GET    http://localhost:3001/api/admins
   GET    http://localhost:3001/api/health

📁 Data stored in: C:\Users\User\OneDrive\Desktop\meshack\mmu-bike-rental\backend\data

✅ Initial data loaded: 4 bikes, 0 admins

💡 Press Ctrl+C to stop the server
============================================================
```

**✅ Backend is running! Do NOT close this window!**

---

### Step 2️⃣: Open the Frontend

**Open a NEW terminal window** (don't close the backend terminal!)

### Option A: Using File Explorer (Easy)

1. Open File Explorer
2. Navigate to: `C:\Users\User\OneDrive\Desktop\meshack\mmu-bike-rental\public`
3. Double-click: `index.html`
4. Browser opens automatically

### Option B: Using Web Browser

1. Open your browser (Chrome, Firefox, Edge)
2. Press `Ctrl + O`
3. Navigate to: `C:\Users\User\OneDrive\Desktop\meshack\mmu-bike-rental\public\index.html`
4. Select and click Open

**You should see the MMU Bike Rental home page!**

---

## Verification

### ✅ Verification 1: Backend is Running

1. Keep the backend terminal visible
2. Check you see "Backend Started Successfully"
3. Check you see the 8 API endpoints listed
4. Check you see "4 bikes, 0 admins"

### ✅ Verification 2: Frontend Loads

1. Look at your browser
2. Should see: "MMU Bike Rental" as the title
3. Should see navigation menu at top
4. Should see "Welcome" or "Home" content

### ✅ Verification 3: User Registration

1. Click **"Sign Up"** button
2. Fill in:
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
3. Click **"Register"**
4. Should see: ✅ **"User created successfully!"**
5. Should redirect to home page

### ✅ Verification 4: View Bikes

1. Click **"Rent a Bike"** or navigate to rent.html
2. Should see **4 bikes**:
   - Mountain Bike Pro - 50 KES
   - Road Bike Speed - 80 KES
   - Electric Bike Plus - 150 KES
   - Hybrid Bike - 100 KES
3. Each bike should have an image
4. Each bike should have a **"Rent Now"** button

### ✅ Verification 5: Admin Panel

1. Click **"Admin"** in navigation
2. Fill in:
   - Email: `admin1@example.com`
   - Password: `admin123`
3. Click **"Register"**
4. Should see: ✅ **"Admin created! Please login."**
5. Fill in same credentials
6. Click **"Login"**
7. Should see: **Admin Dashboard**

### ✅ Verification 6: Add Bike (Admin)

1. In admin dashboard
2. Fill in bike details:
   - Name: `Test Mountain Bike`
   - Type: `Mountain`
   - Price: `75`
3. Click **"Choose File"** and select an image
4. Click **"Add Bike"**
5. Should see: ✅ **"Bike added successfully!"**
6. Should see new bike in the bikes table

### ✅ Verification 7: See Bike on Rent Page

1. Click **"Rent a Bike"** in navigation
2. Refresh the page
3. Should now see **5 bikes** (original 4 + your new test bike)
4. New bike should show: `Test Mountain Bike` - `75 KES`

### ✅ Verification 8: Checkout Page

1. Click **"Rent Now"** on any bike
2. Should redirect to checkout.html
3. Should show bike details
4. Should show checkout form:
   - Duration input
   - Total price calculation
   - Submit button

## Success

**If you reach here, everything works!** 🎉

---

## What to Do Next

### Option 1: Explore More Features

- [ ] Try adding different types of bikes (Road, E-Bike, etc.)
- [ ] Try editing a bike (admin panel)
- [ ] Try deleting a bike (admin panel)
- [ ] Fill in checkout form and simulate payment
- [ ] Open multiple browser tabs and verify real-time sync

### Option 2: Test on Multiple Devices

- [ ] Open on another computer/laptop
- [ ] Open on your phone
- [ ] Go to rent.html on both devices
- [ ] Add bike on one device
- [ ] Refresh on other device - should see it!

### Option 3: Advanced Testing

- [ ] Open Developer Tools (F12)
- [ ] Go to Network tab
- [ ] Watch API calls to backend
- [ ] Go to Console tab
- [ ] Look for any errors/warnings

### Option 4: Customize

- Edit `public/styles.css` to change colors
- Edit `public/index.html` to change text
- Add more bikes via admin panel
- Change bike prices

---

## Common Issues During Setup

### Issue: "npm not found"

**Problem**: Node.js not installed or terminal not restarted

**Solution:**

1. Verify: `node --version`
2. If error, restart computer
3. Try again

### Issue: "EACCES permission denied"

**Problem**: Folder permissions issue

**Solution:**

1. Close PowerShell
2. Right-click PowerShell
3. Click "Run as administrator"
4. Try `npm install` again

### Issue: "Cannot find module 'express'"

**Problem**: Dependencies not installed

**Solution:**

```powershell
cd backend
npm install
```

### Issue: "Port 3001 already in use"

**Problem**: Another program using port 3001

**Solution:**

```powershell
netstat -ano | findstr :3001
taskkill /PID [PID_NUMBER] /F
npm start
```

### Issue: "Bikes not showing in frontend"

**Problem**: Backend not running

**Solution:**

1. Check backend terminal
2. Should see "Backend Started Successfully"
3. Refresh browser

### Issue: "Cannot connect to localhost:3001"

**Problem**: Firewall or port issue

**Solution:**

1. Verify: [http://localhost:3001/api/health](http://localhost:3001/api/health)
2. Should show JSON response
3. Check Windows Firewall allows Node.js

---

## Dashboard View Guide

### Admin Dashboard Shows 3 Tables

#### 1. Bikes Table

- All available bikes
- Bike ID, Name, Type, Price, Availability
- Edit/Delete buttons for each bike
- Shows newly added bikes

#### 2. Users Table

- All registered users
- User ID, Name, Email, Phone
- Shows when users sign up

#### 3. Rentals Table

- All completed rentals
- Rental ID, User, Bike, Duration, Price, Date

---

## Keeping Backend Running

### Important Rules

- ✅ Keep backend terminal open and visible
- ✅ Don't close the terminal window
- ✅ Don't press Ctrl+C (stops the server)
- ✅ It's OK to minimize the window

### To Stop Backend

- Click in terminal window
- Press `Ctrl + C`
- Wait for prompt to return
- Type `exit` to close terminal

### To Restart Backend

1. Stop backend (Ctrl+C)
2. Run again: `npm start`
3. Wait for startup message

---

## Success Indicators

✅ You'll know everything works when:

1. Backend terminal shows "Backend Started Successfully"
2. Frontend home page loads in browser
3. You can register a user
4. You can see 4 bikes on rent.html
5. You can register as admin
6. You can add a new bike
7. New bike appears on rent.html
8. You can fill checkout form
9. Admin changes sync across browser tabs
10. No red errors in console (F12)

---

## Screenshots Guide

### Backend Terminal

```text
Your backend terminal should show a fancy box with:
✅ MMU Bike Rental Backend Started Successfully
🌐 Server running on: http://localhost:3001
📚 API Base URL: http://localhost:3001/api
📋 Available Endpoints: (8 endpoints listed)
💡 Press Ctrl+C to stop the server
```

### Frontend Browser

```text
Top shows: "MMU Bike Rental" title
Navigation bar with: Home, Rent a Bike, Admin, Sign Up, etc.
Main content area with welcome message
No red error text
```

### Rent Page

```text
Grid of bike cards showing:
- Bike image
- Bike name (Mountain Bike Pro, Road Bike Speed, etc.)
- Price (50, 80, 150, 100)
- Description
- "Rent Now" button
```

### Admin Panel

```text
After login shows:
- Welcome: Admin Dashboard
- 3 tables: Bikes, Users, Rentals
- Add Bike form at top:
  - Name field
  - Type dropdown
  - Price field
  - Image upload
  - Add Bike button
```

---

## Need Help?

**See detailed guides:**

- 📖 [README.md](README.md) - System overview
- 🔧 [SETUP_AND_TROUBLESHOOTING.md](SETUP_AND_TROUBLESHOOTING.md) - Comprehensive guide
- ❓ [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues
- 📊 [FINAL_CHECKLIST.md](FINAL_CHECKLIST.md) - Verification

**Or validate setup:**

```powershell
cd backend
node validate.js
```

---

## You're Ready

**All done with this guide?**

Your system should now be:

- ✅ Installed
- ✅ Running
- ✅ Verified
- ✅ Ready to use

**Happy biking!** 🚴‍♂️

---

**Questions?** Check the other documentation files or re-read this guide!

**Everything working?** You can now customize and use the system!

**Last Updated:** January 2026
