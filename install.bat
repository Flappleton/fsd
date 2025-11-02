@echo off
REM Batch file for Windows - Works even if PowerShell scripts are disabled
echo Installing dependencies...

echo Installing root dependencies...
call npm install

echo Installing backend dependencies...
cd backend
call npm install
cd ..

echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo All dependencies installed!
echo Run 'npm run dev' to start the application.
pause

