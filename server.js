const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  next();
});

// Data file paths
const dataDir = path.join(__dirname, 'data');
const bikesFile = path.join(dataDir, 'bikes.json');
const adminsFile = path.join(dataDir, 'admins.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize data files if they don't exist
if (!fs.existsSync(bikesFile)) {
  const initialBikes = [
    { id: 1, name: 'Mountain Bike Pro', type: 'Mountain', price: 50, image: 'mountain-bike-1.jpeg', available: true, description: 'Perfect for off-road trails', createdAt: new Date().toISOString() },
    { id: 2, name: 'Road Bike Speed', type: 'Road', price: 80, image: 'road-bike-1.jpeg', available: true, description: 'Fast and lightweight for campus', createdAt: new Date().toISOString() },
    { id: 3, name: 'Electric Bike Plus', type: 'E-Bike', price: 150, image: 'electric-1.jpeg', available: true, description: 'Eco-friendly with long battery', createdAt: new Date().toISOString() },
    { id: 4, name: 'Hybrid Bike', type: 'Hybrid', price: 100, image: 'hybrid-d.jpeg', available: true, description: 'Versatile for any terrain', createdAt: new Date().toISOString() }
  ];
  fs.writeFileSync(bikesFile, JSON.stringify(initialBikes, null, 2));
}

if (!fs.existsSync(adminsFile)) {
  fs.writeFileSync(adminsFile, JSON.stringify([], null, 2));
}

// Helper functions
function readBikes() {
  try {
    return JSON.parse(fs.readFileSync(bikesFile, 'utf8'));
  } catch {
    return [];
  }
}

function writeBikes(bikes) {
  fs.writeFileSync(bikesFile, JSON.stringify(bikes, null, 2));
}

function readAdmins() {
  try {
    return JSON.parse(fs.readFileSync(adminsFile, 'utf8'));
  } catch {
    return [];
  }
}

function writeAdmins(admins) {
  fs.writeFileSync(adminsFile, JSON.stringify(admins, null, 2));
}

// ========== BIKES ENDPOINTS ==========

// Get all bikes
app.get('/api/bikes', (req, res) => {
  try {
    const bikes = readBikes();
    res.json(bikes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bikes' });
  }
});

// Add a new bike
app.post('/api/bikes', (req, res) => {
  try {
    const { name, type, price, image, description, available } = req.body;
    
    if (!name || !type || price === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const bikes = readBikes();
    const id = bikes.length ? Math.max(...bikes.map(b => b.id)) + 1 : 1;
    
    const newBike = {
      id,
      name,
      type,
      price: Number(price),
      image: image || 'default.png',
      description: description || '',
      available: available !== false,
      createdAt: new Date().toISOString()
    };

    bikes.push(newBike);
    writeBikes(bikes);
    
    res.status(201).json(newBike);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add bike' });
  }
});

// Update a bike
app.put('/api/bikes/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const bikes = readBikes();
    const idx = bikes.findIndex(b => b.id === id);

    if (idx === -1) {
      return res.status(404).json({ error: 'Bike not found' });
    }

    bikes[idx] = { ...bikes[idx], ...req.body, id, updatedAt: new Date().toISOString() };
    writeBikes(bikes);
    
    res.json(bikes[idx]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update bike' });
  }
});

// Delete a bike
app.delete('/api/bikes/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    let bikes = readBikes();
    bikes = bikes.filter(b => b.id !== id);
    writeBikes(bikes);
    
    res.json({ success: true, message: 'Bike deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete bike' });
  }
});

// ========== ADMINS ENDPOINTS ==========

// Get all admins
app.get('/api/admins', (req, res) => {
  try {
    const admins = readAdmins();
    // Don't return passwords
    const safe = admins.map(a => ({ id: a.id, email: a.email, createdAt: a.createdAt }));
    res.json(safe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
});

// Register admin
app.post('/api/admins/register', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const admins = readAdmins();

    // Check admin limit (max 2)
    if (admins.length >= 2) {
      return res.status(400).json({ error: 'Admin limit reached. Only 2 admins allowed.' });
    }

    // Check if admin already exists
    if (admins.find(a => a.email === email)) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const newAdmin = {
      id: Date.now(),
      email,
      password: Buffer.from(password).toString('base64'),
      createdAt: new Date().toISOString()
    };

    admins.push(newAdmin);
    writeAdmins(admins);

    res.status(201).json({ id: newAdmin.id, email: newAdmin.email });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register admin' });
  }
});

// Login admin
app.post('/api/admins/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const admins = readAdmins();
    const admin = admins.find(a => a.email === email);

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const storedPassword = Buffer.from(admin.password, 'base64').toString();
    if (storedPassword !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ id: admin.id, email: admin.email });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  console.warn(`[404] ${req.method} ${req.path} - Not Found`);
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('✅ MMU Bike Rental Backend Started Successfully');
  console.log('='.repeat(60));
  console.log(`\n🌐 Server running on: http://localhost:${PORT}`);
  console.log(`📚 API Base URL: http://localhost:${PORT}/api`);
  console.log('\n📋 Available Endpoints:');
  console.log(`   GET    http://localhost:${PORT}/api/bikes`);
  console.log(`   POST   http://localhost:${PORT}/api/bikes`);
  console.log(`   PUT    http://localhost:${PORT}/api/bikes/:id`);
  console.log(`   DELETE http://localhost:${PORT}/api/bikes/:id`);
  console.log(`\n   GET    http://localhost:${PORT}/api/admins`);
  console.log(`   POST   http://localhost:${PORT}/api/admins/register`);
  console.log(`   POST   http://localhost:${PORT}/api/admins/login`);
  console.log(`\n   GET    http://localhost:${PORT}/api/health (Status check)`);
  console.log('\n📁 Data stored in: backend/data/');
  console.log(`   - Bikes: backend/data/bikes.json`);
  console.log(`   - Admins: backend/data/admins.json`);
  console.log('\n💡 Press Ctrl+C to stop the server');
  console.log('='.repeat(60) + '\n');

  // Log that data was initialized
  const bikes = readBikes();
  const admins = readAdmins();
  console.log(`Initial data loaded: ${bikes.length} bikes, ${admins.length} admins\n`);
});
