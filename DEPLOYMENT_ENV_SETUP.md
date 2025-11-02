# 🔐 Environment Variables Setup for Deployment

This guide helps you set up environment variables for deployment on Render/Vercel.

## 📋 Quick Setup

### 1. Backend Environment Variables

**File:** `backend/env.example` (copy to `backend/.env` for local, or set in deployment platform)

**For Local Development:**
```bash
# Copy example file
cd backend
cp env.example .env
# Then edit .env with your values
```

**For Production Deployment (Render/Vercel):**
Set these in your deployment platform's environment variables section:

```env
JWT_SECRET=your-very-strong-secret-key-here
PORT=3001
CORS_ORIGIN=https://your-frontend-domain.com
NODE_ENV=production
```

### 2. Frontend Environment Variables

**File:** `frontend/env.example` (copy to `frontend/.env` for local, or set in deployment platform)

**For Local Development:**
```bash
# Copy example file
cd frontend
cp env.example .env
# Then edit .env with your values
```

**For Production Deployment (Vercel/Render):**
Set these in your deployment platform's environment variables section:

```env
VITE_API_URL=https://your-backend-api.com
VITE_APP_NAME=YourAppName
VITE_NODE_ENV=production
```

## 🚀 Deployment Platform Setup

### Render.com Setup

#### Backend (Node.js Service)
1. Go to your Render service dashboard
2. Navigate to "Environment" tab
3. Add these variables:
   - `JWT_SECRET` - Generate a strong secret (use: `openssl rand -base64 32`)
   - `PORT` - Usually auto-set, but you can specify `3001`
   - `CORS_ORIGIN` - Your frontend URL (e.g., `https://yourapp.onrender.com`)
   - `NODE_ENV` - Set to `production`

#### Frontend (Static Site)
1. Go to your Render static site dashboard
2. Navigate to "Environment" tab
3. Add these variables:
   - `VITE_API_URL` - Your backend URL (e.g., `https://yourapp-api.onrender.com`)
   - `VITE_APP_NAME` - Your app name
   - `VITE_NODE_ENV` - Set to `production`

### Vercel Setup

#### Frontend (Next.js/Vite)
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add these variables:
   - `VITE_API_URL` - Your backend URL
   - `VITE_APP_NAME` - Your app name
   - `VITE_NODE_ENV` - Set to `production`

**Note:** For backend on Vercel, follow similar steps in your backend project.

## 🔑 Generating Strong JWT Secret

**Command Line:**
```bash
# Generate a secure random secret
openssl rand -base64 32
```

**Or use Node.js:**
```javascript
require('crypto').randomBytes(32).toString('base64')
```

**Important:** 
- Never commit `.env` files to git (they're in `.gitignore`)
- Use different secrets for development and production
- Keep secrets secure and don't share them

## ✅ Verification Checklist

After deployment, verify:

- [ ] Backend .env variables set in deployment platform
- [ ] Frontend .env variables set in deployment platform
- [ ] JWT_SECRET is strong and unique
- [ ] CORS_ORIGIN matches your frontend domain
- [ ] VITE_API_URL points to your backend domain
- [ ] Both services can communicate (no CORS errors)
- [ ] Login/authentication works end-to-end

## 🆘 Common Issues

**CORS Errors:**
- Check `CORS_ORIGIN` matches your exact frontend URL (including https://)
- No trailing slashes

**API Connection Failed:**
- Verify `VITE_API_URL` is correct
- Check backend is running
- Verify both services are deployed

**JWT Errors:**
- Ensure `JWT_SECRET` is set
- Check secret is the same if using multiple backend instances
- Verify token expiration settings

---

**Your .env files are ready for deployment!** 🚀

