# ⚡ QUICK REFERENCE CARD

**Print this page or bookmark for fast lookup!**

---

## 🚀 Start Backend (in PowerShell)

```powershell
cd C:\Users\User\OneDrive\Desktop\meshack\mmu-bike-rental\backend
npm install    # (first time only)
npm start      # Start server on port 3001
```

✅ You should see: `Backend Started Successfully`

---

## 📱 Open Frontend

**Option 1 (Easy):** Open `C:\Users\User\OneDrive\Desktop\meshack\mmu-bike-rental\public\index.html`

**Option 2 (Web):** In browser, press `Ctrl+O` and navigate to public/index.html

---

## 🔗 Important URLs

| URL | Purpose |
| --- | --- |
| [http://localhost:3001/api/health](http://localhost:3001/api/health) | Check backend running |
| [http://localhost:3001/api/bikes](http://localhost:3001/api/bikes) | See all bikes (JSON) |
| `file:///C:/Users/User/OneDrive/Desktop/meshack/mmu-bike-rental/public/index.html` | Frontend home |

---

## 📚 Key Files

| File | Purpose |
| --- | --- |
| `backend/server.js` | Backend API server |
| `public/app.js` | Frontend application |
| `public/index.html` | Home page |
| `public/rent.html` | Browse bikes |
| `public/admin.html` | Admin panel |
| `public/checkout.html` | Checkout |
| `backend/data/bikes.json` | Bike data |
| `backend/data/admins.json` | Admin accounts |

---

## 🧪 Quick Tests

### Test 1: Backend Running

Visit: `http://localhost:3001/api/health`
Expected: `{"status":"Server is running"...}`

### Test 2: Get All Bikes

Visit: `http://localhost:3001/api/bikes`
Expected: JSON with 4 bikes

### Test 3: Frontend Loads

Open: `public/index.html`
Expected: See MMU Bike Rental home page

### Test 4: Register User

1. Go to public/index.html
2. Click "Sign Up"
3. Fill details and register
4. Expected: User created message

### Test 5: View Bikes

1. Click "Rent a Bike"
2. Expected: See 4 bikes with prices

### Test 6: Admin Panel

1. Click "Admin"
2. Register: `admin@example.com` / `admin123`
3. Login with same credentials
4. Expected: See admin dashboard

---

## 🔧 Common Commands

```powershell
# Navigate to project
cd C:\Users\User\OneDrive\Desktop\meshack\mmu-bike-rental

# Navigate to backend
cd backend

# Install dependencies
npm install

# Start backend
npm start

# Stop backend
# Press Ctrl+C in terminal

# Validate setup
node validate.js

# Check Node version
node --version

# Check npm version
npm --version
```

---

## 🚨 Troubleshooting Quick Fixes

### Problem: "npm not found"

→ Install Node.js from [https://nodejs.org](https://nodejs.org)

### Problem: Backend won't start

→ Run: `node validate.js` to check setup

### Problem: Port 3001 in use

```powershell
netstat -ano | findstr :3001
taskkill /PID [number] /F
npm start
```

### Problem: Bikes not showing

→ Ensure backend running: `npm start`
→ Check: [http://localhost:3001/api/bikes](http://localhost:3001/api/bikes)

### Problem: "Cannot find module"

→ Run: `npm install` in backend folder

### Problem: Browser shows 404

→ Make sure using `file://` protocol for local HTML
→ Or use file explorer to open index.html

---

## 📊 API Endpoints

### GET Endpoints

- `GET /api/bikes` - All bikes
- `GET /api/admins` - Admin emails
- `GET /api/health` - Server status

### POST Endpoints

- `POST /api/bikes` - Add bike
- `POST /api/admins/register` - Register admin
- `POST /api/admins/login` - Login admin

### PUT Endpoints

- `PUT /api/bikes/:id` - Update bike

### DELETE Endpoints

- `DELETE /api/bikes/:id` - Delete bike

---

## 👤 Sample Credentials

### First Admin

- Email: `admin@example.com`
- Password: `admin123`

### First User

- Name: `Test User`
- Email: `test@example.com`
- Password: `password123`

---

## 🎯 Default Bikes

| # | Name | Price | Type |
| --- | --- | --- | --- |
| 1 | Mountain Bike Pro | 50 | Mountain |
| 2 | Road Bike Speed | 80 | Road |
| 3 | Electric Bike Plus | 150 | E-Bike |
| 4 | Hybrid Bike | 100 | Hybrid |

---

## 📁 Folder Structure Quick Reference

```text
mmu-bike-rental/
├── README.md ........................ Master guide
├── STARTUP_GUIDE.md ................ Step-by-step
├── SETUP_AND_TROUBLESHOOTING.md ... Detailed guide
├── TROUBLESHOOTING.md ............. Common issues
├── FINAL_CHECKLIST.md ............. Verification
├── SYSTEM_STATUS_REPORT.md ........ Status report
├── QUICK_REFERENCE.md ............. This file
│
├── backend/
│   ├── server.js .................. API server
│   ├── package.json ............... Dependencies
│   ├── validate.js ................ Validation
│   ├── README.md .................. Backend docs
│   └── data/ ....................... Data files
│       ├── bikes.json ............. Bike data
│       └── admins.json ............ Admin data
│
└── public/
    ├── index.html ................. Home page
    ├── rent.html .................. Browse bikes
    ├── admin.html ................. Admin panel
    ├── checkout.html .............. Checkout
    ├── app.js ..................... Main code
    ├── styles.css ................. Styling
    └── ... other files ...
```

---

## 🌟 Admin Panel Features

### To Add a Bike

1. Login as admin
2. Fill bike form:
   - Name: Bike name
   - Type: Mountain/Road/E-Bike/Hybrid
   - Price: Number
   - Image: Upload file
3. Click "Add Bike"

### To Edit a Bike

1. In bikes table
2. Click "Edit" button
3. Modify details
4. Save

### To Delete a Bike

1. In bikes table
2. Click "Delete" button
3. Confirm

---

## 💾 Data Storage Location

```text
C:\Users\User\OneDrive\Desktop\meshack\mmu-bike-rental\backend\data\

├── bikes.json    (all bikes)
├── admins.json   (admin accounts)
```

Users stored in: `localStorage` (browser)
Rentals stored in: `localStorage` (browser)

---

## ✅ Pre-Launch Checklist

- [ ] Node.js installed? (`node --version`)
- [ ] npm installed? (`npm --version`)
- [ ] Backend folder exists?
- [ ] `npm install` done in backend?
- [ ] Port 3001 available?
- [ ] Ready to run `npm start`?

---

## 🎓 Learning Resources

### For Beginners

1. Read [README.md](README.md)
2. Follow [STARTUP_GUIDE.md](STARTUP_GUIDE.md)
3. Try [SETUP_AND_TROUBLESHOOTING.md](SETUP_AND_TROUBLESHOOTING.md)

### For Developers

1. Check [CENTRALIZED_SETUP.md](CENTRALIZED_SETUP.md)
2. Review [backend/README.md](backend/README.md)
3. Study backend/server.js code
4. Study public/app.js code

### For Troubleshooting

1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Run `node validate.js`
3. Check browser console (F12)
4. Check backend terminal output

---

## ⚡ Speed Hacks

### Quick Terminal Commands

```powershell
# Install & start in one go
cd backend; npm install; npm start

# Kill and restart backend
# (in backend folder)
npm start
# Ctrl+C
# npm start
```

### Quick Browser Tests

1. `Ctrl+F5` - Hard refresh (clears cache)
2. `F12` - Open developer console
3. `Ctrl+Shift+I` - Open developer tools

### Quick Admin Tasks

1. Add sample bike in 30 seconds
2. Test checkout in 1 minute
3. Verify sync by refreshing page

---

## 🎯 What to Do If

| Situation | Action |
| --- | --- |
| Backend won't start | Run `node validate.js` |
| Bikes not showing | Refresh browser, check console |
| Admin not logging in | Check credentials, restart backend |
| Image not uploading | Check file size < 50MB |
| Data lost after restart | Check backend/data/ folder exists |
| Port error | Another app using 3001, kill it |
| Checkout form broken | Check browser console (F12) |
| Mobile not working | Check responsive design in styles.css |

---

## 📱 Mobile Testing

### Test on Phone

1. Same WiFi network as computer
2. Find computer's IP: `ipconfig` in PowerShell (look for IPv4)
3. On phone: Visit `http://[YOUR_IP]:3000` for frontend
4. Backend still on `http://[YOUR_IP]:3001`

### Responsive Testing in Browser

1. Open Frontend
2. Press `F12`
3. Click device icon
4. Select iPhone/Android

---

## 🔐 Security Notes

⚠️ **DEMO VERSION - NOT FOR PRODUCTION**

For production add:

- [ ] HTTPS/SSL
- [ ] JWT authentication
- [ ] Password hashing
- [ ] Database encryption
- [ ] Rate limiting
- [ ] Input validation
- [ ] CSRF protection
- [ ] Security headers

---

## 📞 Help & Support

**Can't get it working?**

1. Read [README.md](README.md) first
2. Follow [STARTUP_GUIDE.md](STARTUP_GUIDE.md) exactly
3. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
4. Run `node validate.js`
5. Check browser console (F12)
6. Check backend terminal output

---

## ✨ Pro Tips

✅ Keep backend terminal visible while testing
✅ Use browser developer tools (F12) to debug
✅ Test on multiple browsers (Chrome, Firefox)
✅ Test on mobile while developing
✅ Check backend terminal for request logs
✅ Use `Ctrl+F5` to hard refresh browser
✅ Open browser console to catch errors
✅ Keep this reference card nearby!

---

## 🎉 You Got This

Everything is set up and ready.
Just:

1. Install Node.js
2. Run `npm install`
3. Run `npm start`
4. Open frontend
5. Test features

**System is COMPLETE and TESTED!** ✅

---

**Last Updated:** January 25, 2026  
**Valid For:** MMU Bike Rental System v1.0

🚀 Happy biking! 🚴‍♂️
