# 🚴 MMU Bike Rental System - Master Guide

## 📋 Quick Links

- **Start Here**: [SETUP_AND_TROUBLESHOOTING.md](SETUP_AND_TROUBLESHOOTING.md) - Complete setup guide
- **Setup Video**: [QUICKSTART.md](QUICKSTART.md) - 5-minute quick start
- **Issues**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common problems & fixes
- **Architecture**: [CENTRALIZED_SETUP.md](CENTRALIZED_SETUP.md) - System design overview
- **Backend Docs**: [backend/README.md](backend/README.md) - API reference

---

## ⚡ Quick Start (60 seconds)

### 1. Install Node.js

- Download from [https://nodejs.org](https://nodejs.org) (LTS version)
- Run installer, restart computer

### 2. Install Backend Dependencies

```powershell
cd backend
npm install
```

### 3. Start Backend Server

```powershell
npm start
```

### 4. Open Frontend

Open `public/index.html` in your browser

---

## 🎯 What This System Does

✅ **For Users:**

- Browse and rent bikes
- Fill in rental details
- Simulate checkout
- Track rentals

✅ **For Admins:**

- Register admin account
- Add new bikes with images
- Edit bike details
- Delete bikes
- See all bikes and users

✅ **For Everyone:**

- All bikes visible to all devices (centralized)
- Changes appear instantly
- Works on phones and desktops
- Secure admin accounts

---

## 📁 System Structure

```text
mmu-bike-rental/
├── public/                    # Frontend files (open in browser)
│   ├── index.html            # Home page
│   ├── rent.html             # Browse bikes
│   ├── checkout.html         # Checkout page
│   ├── admin.html            # Admin panel
│   ├── auth.html             # User login/signup
│   ├── app.js                # Main application logic
│   ├── styles.css            # Styling
│   └── [other files...]
│
├── backend/                   # Node.js/Express server
│   ├── server.js             # Main backend (runs on port 3001)
│   ├── package.json          # Dependencies list
│   ├── validate.js           # Setup validation script
│   ├── README.md             # Backend documentation
│   ├── data/
│   │   ├── bikes.json        # All bikes (centralized)
│   │   └── admins.json       # Admin accounts (centralized)
│   └── [other files...]
│
├── SETUP_AND_TROUBLESHOOTING.md    # Main guide (start here!)
├── QUICKSTART.md                    # 5-minute guide
├── TROUBLESHOOTING.md               # Issues & solutions
├── CENTRALIZED_SETUP.md             # Architecture
└── README.md                        # This file
```

---

## 🔄 How It Works

### User Flow

1. **User visits `index.html`**
2. **Signs up** (saved locally)
3. **Goes to `rent.html`** to browse bikes
4. **Clicks "Rent Now"** on a bike
5. **Redirected to `checkout.html`**
6. **Fills in rental details**
7. **Simulates payment**
8. **Bike availability updated** on all users' screens

### Admin Flow

1. **Admin visits `admin.html`**
2. **Registers admin account** (only 2 admins allowed)
3. **Logs in** to admin dashboard
4. **Adds new bike** with:
   - Name
   - Type
   - Price
   - Image (uploaded)
5. **New bike visible to all users** immediately
6. **Can edit or delete bikes** anytime

### Technical Flow

```text
User Actions (Browser)
        ↓
   app.js Code
        ↓
Fetch to Backend API (localhost:3001/api)
        ↓
   server.js Processing
        ↓
Read/Write JSON Files (backend/data/)
        ↓
Send Response Back to Browser
        ↓
Update Page Display
```

---

## 🛠️ Technology Stack

| Component | Technology | Purpose |
| --- | --- | --- |
| **Backend** | Node.js + Express | Centralized server |
| **Frontend** | HTML5 + CSS3 + JavaScript | User interface |
| **Storage** | JSON files | Centralized bike database |
| **Communication** | HTTP/JSON | API calls |
| **Auth** | Base64 encoding | Demo authentication |

---

## 📊 Key Features

### 1. **Centralized Bikes Database**

- All bikes stored in `backend/data/bikes.json`
- Changes visible to all users instantly
- Works on phones and desktops
- Persisted across server restarts

### 2. **Admin Management**

- Maximum 2 admin accounts
- Admin credentials stored centrally
- Only admins can add/edit/delete bikes
- Secure login system

### 3. **Bike Rental System**

- 4 initial bikes (Mountain 50, Road 80, E-Bike 150, Hybrid 100)
- Users enter rental details
- Checkout with price calculation
- Availability tracking

### 4. **Image Support**

- Admins can upload bike images
- Images stored as Base64
- Displayed in bike grid
- Survives restarts

### 5. **Error Handling**

- Server logs all errors
- Clear error messages for users
- Validation on both frontend and backend
- Graceful fallbacks

---

## ⚙️ API Endpoints

### Bikes

- `GET /api/bikes` - Get all bikes
- `POST /api/bikes` - Add bike
- `PUT /api/bikes/:id` - Update bike
- `DELETE /api/bikes/:id` - Delete bike

### Admins

- `POST /api/admins/register` - Register admin
- `POST /api/admins/login` - Login admin
- `GET /api/admins` - Get admin emails (safe list)

### Health

- `GET /api/health` - Check server status

---

## 🔐 Security Notes

⚠️ **This is a demo/educational system. For production:**

1. Use proper authentication (JWT, OAuth)
2. Hash passwords (bcrypt, argon2)
3. Use real database (MongoDB, PostgreSQL)
4. Add HTTPS/SSL
5. Implement rate limiting
6. Add input validation on backend
7. Use environment variables for config

---

## 🐛 Troubleshooting

**Backend not starting?**

- Install Node.js from [https://nodejs.org](https://nodejs.org)
- Run `npm install` in backend folder
- Check port 3001 is available

**Bikes not showing?**

- Start backend: `npm start`
- Check: [http://localhost:3001/api/bikes](http://localhost:3001/api/bikes)
- Open browser console (F12) for errors

**Admin panel not loading?**

- Ensure backend is running
- Clear browser cache
- Check Network tab in DevTools

**Data not persisting?**

- Check `backend/data/` folder exists
- Verify backend has write permissions
- Check disk space available

**See full troubleshooting in [SETUP_AND_TROUBLESHOOTING.md](SETUP_AND_TROUBLESHOOTING.md)**

---

## 📞 Getting Help

If system not working:

1. **Check Setup**
   - Run: `node backend/validate.js`
   - Should show: ✅ Everything looks good!

2. **Check Logs**
   - Backend terminal: Look for errors
   - Browser console (F12): Look for red errors

3. **Check Connectivity**
   - Visit: [http://localhost:3001/api/health](http://localhost:3001/api/health)
   - Should return: `{"status":"Server is running"...}`

4. **Include When Reporting Issues**
   - Error message from console
   - Backend terminal output
   - Steps to reproduce
   - Screenshot

---

## 📈 Next Steps

### After Setup Complete

1. ✅ Register admin account
2. ✅ Add a test bike
3. ✅ Go to rent.html and verify bike appears
4. ✅ Click "Rent Now" and test checkout
5. ✅ Verify changes sync across tabs

### To Deploy Online

1. Get web server (Heroku, AWS, DigitalOcean)
2. Upload backend folder
3. Update frontend API_URL to production server
4. Run backend in production mode

### To Enhance

1. Add real payment gateway
2. Implement email notifications
3. Add user profiles
4. Add bike reviews/ratings
5. Add availability calendar
6. Add real-time tracking

---

## 📝 Important Files

| File | Purpose | Edit |
| --- | --- | --- |
| `backend/server.js` | Backend API server | ⚠️ Carefully |
| `public/app.js` | Main app logic | ⚠️ Carefully |
| `public/checkout.html` | Checkout page | ⚠️ Carefully |
| `public/styles.css` | Styling | ✅ Yes |
| `backend/data/bikes.json` | Bike data | ⚠️ Use admin panel |
| `backend/data/admins.json` | Admin accounts | ⚠️ Careful! |

---

## ✨ Features Summary

| Feature | Status | Notes |
| --- | --- | --- |
| User registration | ✅ Working | Local storage |
| Bike browsing | ✅ Working | Centralized |
| Admin panel | ✅ Working | 2 admin max |
| Bike upload | ✅ Working | Images as Base64 |
| Checkout flow | ✅ Working | Simulated payment |
| Real-time sync | ✅ Working | Refresh to sync |
| Error handling | ✅ Working | Logs in terminal |
| Mobile support | ✅ Working | Responsive design |

---

## 🎉 System Status

✅ **Backend**: Ready to run
✅ **Frontend**: Ready to use  
✅ **Documentation**: Complete
✅ **Validation**: Script available
✅ **Error Handling**: Implemented

**Next Action**: Install Node.js and run backend!

---

## 📞 Support

For issues or questions:

1. Read [SETUP_AND_TROUBLESHOOTING.md](SETUP_AND_TROUBLESHOOTING.md)
2. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
3. Review browser console (F12)
4. Check backend terminal output
5. Run: `node backend/validate.js`

**System ready to use!** 🚀
