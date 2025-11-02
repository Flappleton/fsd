# ⚡ Quick Fix for PowerShell Installation Issues

## Problem
You're getting: `npm : File cannot be loaded because running scripts is disabled on this system`

## Solutions (Pick One)

### ✅ Solution 1: Use Command Prompt (Easiest)
1. Close PowerShell
2. Open **Command Prompt** (CMD)
3. Navigate to your project folder
4. Run: `npm run install-all`

### ✅ Solution 2: Run Installation Scripts Directly

**Windows Batch File (install.bat):**
- Double-click `install.bat` in the project folder
- OR right-click → Run as Administrator

**PowerShell Script (if execution policy fixed):**
- Right-click `install.ps1` → Run with PowerShell

### ✅ Solution 3: Manual Installation (No Scripts Needed)

Run these commands one by one:

```bash
npm install
cd backend
npm install
cd ..
cd frontend
npm install
cd ..
```

### ✅ Solution 4: Fix PowerShell Execution Policy (One-Time)

**Run PowerShell as Administrator**, then:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then you can use `npm run install-all` normally.

---

## After Installation

Once dependencies are installed, start the app:

```bash
npm run dev
```

This should work even if `npm run install-all` didn't!

---

**Recommendation:** Use Solution 1 (Command Prompt) - it's the quickest! 🚀

