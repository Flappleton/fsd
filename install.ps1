# PowerShell Installation Script
# Alternative to npm run install-all
# Run this if npm scripts are blocked by execution policy

Write-Host "📦 Installing dependencies..." -ForegroundColor Green

# Install root dependencies
Write-Host "Installing root dependencies..." -ForegroundColor Yellow
npm install

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install
Set-Location ..

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location frontend
npm install
Set-Location ..

Write-Host "✅ All dependencies installed!" -ForegroundColor Green
Write-Host "Run 'npm run dev' to start the application." -ForegroundColor Cyan

