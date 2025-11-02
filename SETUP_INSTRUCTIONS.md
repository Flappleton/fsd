# 📦 Setup Instructions

## Initial Setup (First Time Only)

### 1. Install Dependencies

**Method 1: Manual Installation (Recommended if PowerShell scripts are disabled)**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

**Method 2: Shortcut Command (Requires npm scripts enabled)**
```bash
npm run install-all
```

**Note:** If you get a PowerShell execution policy error, use Method 1 above, or fix PowerShell (see Troubleshooting section).

### 2. Start the Application

**Option 1: Start both servers together**
```bash
npm run dev
```

**Option 2: Start separately**
```bash
# Terminal 1 - Backend
npm run server
# Server runs on http://localhost:3001

# Terminal 2 - Frontend
npm run client
# App runs on http://localhost:3000
```

### 3. Access the Application

- **Frontend:** Open http://localhost:3000 in your browser
- **Backend API:** http://localhost:3001

### 4. Test Login

**Default Test Accounts:**
- **Admin:** `admin@example.com` / `admin123`
- **User:** `user@example.com` / `user123`

## Daily Usage

Once everything is installed, just run:
```bash
npm run dev
```

This starts both servers automatically.

## Troubleshooting

### PowerShell Execution Policy Error?

**Error:** `cannot be loaded because running scripts is disabled on this system`

**Solution 1: Run in Command Prompt (CMD) instead**
- Open Command Prompt (not PowerShell)
- Navigate to project folder
- Run `npm run install-all`

**Solution 2: Fix PowerShell Execution Policy (One-time setup)**
```powershell
# Open PowerShell as Administrator, then run:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then you can use `npm run install-all` in PowerShell.

**Solution 3: Use Manual Installation (No scripts needed)**
Just follow Method 1 in the installation section above - it doesn't require npm scripts.

### Port Already in Use?

**Backend (3001):**
- Edit `backend/server.js` - Change `const PORT = 3001` to another port
- Update `frontend/src/utils/api.js` - Change `baseURL` to match

**Frontend (3000):**
- Edit `frontend/vite.config.js` - Change `port: 3000` to another port

### Module Not Found Errors?

Make sure you've run:
```bash
npm run install-all
```

### Backend Not Connecting?

1. Check backend is running (should see console message)
2. Check port matches in `frontend/src/utils/api.js`
3. Check CORS is enabled in `backend/server.js`

### Token Errors?

- Clear browser localStorage
- Logout and login again
- Check token in browser DevTools → Application → Local Storage

## Project Structure

```
exam-boilerplate/
├── backend/              # Express.js API server
│   ├── server.js        # Main server file with all routes
│   └── package.json     # Backend dependencies
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Redux store
│   │   ├── hooks/       # Custom hooks
│   │   └── utils/       # Utilities
│   └── package.json     # Frontend dependencies
├── .github/workflows/   # CI/CD configuration
├── README.md            # Main documentation
├── QUICK_START.md       # Quick customization guide
├── EXPERIMENTS_CHECKLIST.md  # Exam checklist
└── POSTMAN_COLLECTION.json   # Postman API tests
```

## Next Steps

1. ✅ Install dependencies
2. ✅ Run the application
3. ✅ Test login and features
4. ✅ Read `QUICK_START.md` for customization
5. ✅ Review `EXPERIMENTS_CHECKLIST.md` before exam

---

**Ready to go! 🚀**

