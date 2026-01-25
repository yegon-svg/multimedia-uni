@echo off
REM MMU Bike Rental - Setup Script for Windows

echo.
echo ========================================
echo MMU Bike Rental - Centralized System
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed!
    echo.
    echo Please download and install Node.js from:
    echo https://nodejs.org/ (LTS version recommended)
    echo.
    echo After installation, close and reopen this terminal.
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version
echo.

REM Check if npm is installed
where npm >nul 2>nul
if errorlevel 1 (
    echo ❌ npm is not installed!
    pause
    exit /b 1
)

echo ✅ npm found:
npm --version
echo.

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ✅ Setup complete!
echo.
echo To start the system:
echo.
echo 1. Start the backend server (in this terminal):
echo    npm start
echo.
echo 2. In another terminal, open the frontend:
echo    public/index.html in your browser
echo.
pause
