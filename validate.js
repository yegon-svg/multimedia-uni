#!/usr/bin/env node

/**
 * Setup Validator for MMU Bike Rental
 * Run this after npm install to verify everything is configured correctly
 */

const fs = require('fs');
const path = require('path');

console.log('\n' + '='.repeat(50));
console.log('MMU Bike Rental - Setup Validator');
console.log('='.repeat(50) + '\n');

let issues = [];
let checks = 0;
let passed = 0;

function check(name, condition, details = '') {
  checks++;
  const status = condition ? '✅' : '❌';
  console.log(`${status} ${name}`);
  if (details && !condition) {
    console.log(`   └─ ${details}`);
    issues.push(name);
  }
  if (condition) passed++;
}

// Check Node.js packages
console.log('\n📦 Checking Dependencies:');
const packagePath = path.join(__dirname, 'package.json');
check('package.json exists', fs.existsSync(packagePath));

const nodeModulesPath = path.join(__dirname, 'node_modules');
check('node_modules installed', fs.existsSync(nodeModulesPath), 
  'Run: npm install');

check('express installed', fs.existsSync(path.join(nodeModulesPath, 'express')),
  'Run: npm install');

check('cors installed', fs.existsSync(path.join(nodeModulesPath, 'cors')),
  'Run: npm install');

// Check data directory
console.log('\n📁 Checking Data Directory:');
const dataDir = path.join(__dirname, 'data');
check('data/ folder exists', fs.existsSync(dataDir),
  'The data folder will be created on first run');

// Check server file
console.log('\n⚙️ Checking Server Files:');
const serverPath = path.join(__dirname, 'server.js');
check('server.js exists', fs.existsSync(serverPath));

if (fs.existsSync(serverPath)) {
  const serverContent = fs.readFileSync(serverPath, 'utf8');
  check('server.js has Express setup', serverContent.includes('express()'));
  check('server.js has CORS enabled', serverContent.includes('cors()'));
  check('server.js listens on port 3001', serverContent.includes('3001'));
  check('server.js has bikes endpoint', serverContent.includes('/api/bikes'));
  check('server.js has admins endpoint', serverContent.includes('/api/admins'));
}

// Check frontend files
console.log('\n🌐 Checking Frontend Files:');
const publicDir = path.join(__dirname, '..', 'public');
const appPath = path.join(publicDir, 'app.js');
const checkoutPath = path.join(publicDir, 'checkout.html');
const indexPath = path.join(publicDir, 'index.html');
const adminPath = path.join(publicDir, 'admin.html');
const rentPath = path.join(publicDir, 'rent.html');

check('app.js exists', fs.existsSync(appPath));
check('checkout.html exists', fs.existsSync(checkoutPath));
check('index.html exists', fs.existsSync(indexPath));
check('admin.html exists', fs.existsSync(adminPath));
check('rent.html exists', fs.existsSync(rentPath));

if (fs.existsSync(appPath)) {
  const appContent = fs.readFileSync(appPath, 'utf8');
  check('app.js uses centralized API', appContent.includes('API_URL') && appContent.includes('localhost:3001'));
  check('app.js has getBikes function', appContent.includes('async function getBikes'));
  check('app.js has apiCall function', appContent.includes('async function apiCall'));
}

if (fs.existsSync(checkoutPath)) {
  const checkoutContent = fs.readFileSync(checkoutPath, 'utf8');
  check('checkout.html uses centralized API', checkoutContent.includes('localhost:3001'));
}

// Summary
console.log('\n' + '='.repeat(50));
console.log(`Results: ${passed}/${checks} checks passed`);
console.log('='.repeat(50) + '\n');

if (issues.length > 0) {
  console.log('❌ Issues found:\n');
  issues.forEach((issue, i) => {
    console.log(`${i + 1}. ${issue}`);
  });
  console.log('\nFix the above issues before running the server.\n');
  process.exit(1);
} else {
  console.log('✅ Everything looks good!\n');
  console.log('To start the server, run:\n');
  console.log('   npm start\n');
  console.log('The backend will run on: http://localhost:3001/api\n');
  process.exit(0);
}
