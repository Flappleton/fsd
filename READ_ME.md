# Exam Boilerplate Project

A comprehensive, generic boilerplate covering all required experiments for your practical exams. This project is designed to be easily customizable within one hour for any topic.

## 📋 Covered Experiments

✅ **1. Responsive and Interactive UIs using Tailwind CSS**
- Fully responsive design with Tailwind CSS
- Dark/Light mode toggle
- Mobile-first approach

✅ **2. React Hooks (useEffect, useContext, custom hooks)**
- `useEffect` - Used in App.jsx, useItems.js, Dashboard.jsx
- `useContext` - Redux Context (via react-redux)
- Custom Hook - `useItems.js` for reusable item management logic

✅ **3. Manage complex state with Redux or Context API**
- Redux Toolkit for global state management
- Auth slice, Items slice, Theme slice
- Persistent state with localStorage

✅ **4. Create secure, production-ready RESTful APIs**
- Express.js backend with RESTful endpoints
- Proper HTTP methods (GET, POST, PUT, DELETE)
- Error handling and validation

✅ **5. Implement authentication and user roles with JWT**
- JWT token-based authentication
- Role-based access control (admin/user)
- Secure password hashing with bcrypt

✅ **6. Validating RESTful APIs using Postman**
- All endpoints documented and ready for Postman testing
- Authentication headers included
- Test credentials provided

✅ **7. CI/CD Deployment with GitHub Actions + Render/Vercel**
- GitHub Actions workflow configured
- Ready for deployment to Render/Vercel

## 🚀 Quick Start

### 1. Install Dependencies

**Option 1: Use the shortcut command**
```bash
npm run install-all
```

**Option 2: Manual installation (if PowerShell execution policy blocks scripts)**
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

**PowerShell Issue?** Use Option 2, or see troubleshooting section below.

### 2. Start Development Servers

```bash
# Start both backend and frontend
npm run dev

# OR start separately:
npm run server  # Backend on http://localhost:3001
npm run client  # Frontend on http://localhost:3000
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

### 4. Default Test Credentials

- **Admin**:**
  - Email: `admin@example.com`
  - Password: `admin123`

- **User:**
  - Email: `user@example.com`
  - Password: `user123`

## 📁 Project Structure

```
exam-boilerplate/
├── backend/
│   └── server.js          # Express API server with mock data
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # Utility functions
│   └── package.json
├── .github/workflows/     # CI/CD configuration
└── README.md
```

## 🎯 Quick Customization Guide (1 Hour Plan)

### Step 1: Update Data Structure (15 mins)
**File: `backend/server.js`**
- Line 26-30: Change `items` array fields to match your topic
- Example: For e-commerce, change `title` → `productName`, `description` → `productDescription`

### Step 2: Update Frontend Labels (10 mins)
**Files:**
- `frontend/src/pages/Dashboard.jsx` - Line 103, 113, 123: Update form labels
- `frontend/src/pages/Home.jsx` - Update hero section text

### Step 3: Update API Endpoints Names (10 mins)
**File: `backend/server.js`**
- Change `/api/items` routes to match your topic (e.g., `/api/products`, `/api/courses`)
- Update corresponding frontend calls in `frontend/src/hooks/useItems.js` and `frontend/src/utils/api.js`

### Step 4: Update Component Names (10 mins)
**Rename:**
- `itemSlice.js` → `productSlice.js` (or your topic)
- `useItems.js` → `useProducts.js` (or your topic)
- Update imports throughout the app

### Step 5: Customize Styling (10 mins)
**File: `frontend/src/pages/Home.jsx`**
- Update hero section content
- Modify feature cards text

### Step 6: Test and Verify (5 mins)
- Test login/register
- Test CRUD operations
- Verify role-based access

## 📝 API Testing with VSCode REST Client

### Setup (Recommended Method)
1. Install **REST Client** extension in VSCode (by Huachao Mao)
2. Open `.vscode/http.http` file
3. Click "Send Request" above each request to test endpoints

### Alternative: Postman
You can also use Postman - import `POSTMAN_COLLECTION.json` if needed.

### Test Endpoints Using VSCode REST Client

#### 1. Register User
- **Method**: POST
- **URL**: `http://localhost:3001/api/auth/register`
- **Body** (JSON):
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

#### 2. Login
- **Method**: POST
- **URL**: `http://localhost:3001/api/auth/login`
- **Body** (JSON):
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```
- **Response**: Copy the `token` from response

#### Using VSCode REST Client:
1. Open `.vscode/http.http` file
2. Run "Login" request first
3. Copy token from response
4. Update `@token = Bearer YOUR_TOKEN_HERE` at top of file
5. Run other requests (they'll use the token automatically)

#### 3. Get All Items (Protected)
- File: `.vscode/http.http`
- Request: "Get All Items"
- Requires token (update `@token` variable after login)

#### 4. Create Item (Protected)
- File: `.vscode/http.http`
- Request: "Create New Item"
- Modify JSON body as needed

#### 5. Update Item (Protected)
- File: `.vscode/http.http`
- Request: "Update Item"
- Admin or creator only

#### 6. Delete Item (Protected - Admin Only)
- File: `.vscode/http.http`
- Request: "Delete Item"
- Admin role required

## 🔐 Authentication Flow

1. User registers/logs in → Backend generates JWT token
2. Token stored in Redux state and localStorage
3. Token sent in `Authorization: Bearer TOKEN` header for protected routes
4. Backend validates token on each request
5. Role-based access control checks user role

## 🎨 Theme (Dark/Light Mode)

- Toggle button in Navbar
- Preference saved in localStorage
- Managed by Redux `themeSlice`

## 📦 Deployment

### Render Deployment
1. Create account on render.com
2. Create new Web Service
3. Connect GitHub repository
4. Set build command: `cd frontend && npm install && npm run build`
5. Set start command: `cd backend && npm install && npm start`
6. Add environment variables if needed

### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project root
3. Follow prompts
4. Configure GitHub Actions (optional)

## ⚠️ Important Notes

- **Mock Backend**: No real database - all data stored in arrays (resets on server restart)
- **JWT Secret**: Configure `JWT_SECRET` in `.env` file (see `DEPLOYMENT_ENV_SETUP.md`)
- **Password Hashing**: Uses bcryptjs (salted hashes)
- **CORS**: Configured via `CORS_ORIGIN` in `.env` file
- **Environment Variables**: See `backend/env.example` and `frontend/env.example`

## 🆘 Troubleshooting

### PowerShell Execution Policy Error?

**Error:** `cannot be loaded because running scripts is disabled`

**Quick Fix - Use Command Prompt:**
1. Open Command Prompt (CMD) instead of PowerShell
2. Navigate to project folder
3. Run `npm run install-all`

**Or Fix PowerShell (One-time):**
```powershell
# Run PowerShell as Administrator, then:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Or Use Manual Installation:**
Just follow Option 2 in the installation section - no scripts needed!

**Port already in use?**
- Change ports in `backend/server.js` (PORT) and `frontend/vite.config.js` (server.port)

**Cannot connect to API?**
- Ensure backend is running on port 3001
- Check CORS settings in `backend/server.js`

**Token errors?**
- Clear localStorage and login again
- Check JWT_SECRET matches

## 📚 Key Files to Modify During Exam

1. **`backend/server.js`** - Data structure, API endpoints
2. **`frontend/src/pages/Dashboard.jsx`** - Main content page
3. **`frontend/src/pages/Home.jsx`** - Landing page
4. **`frontend/src/store/slices/itemSlice.js`** - State management for items
5. **`frontend/src/components/Navbar.jsx`** - Navigation and branding

## 🎓 Exam Tips

1. **Read all comments** - Every file has detailed comments explaining what to change
2. **Search for "TO CUSTOMIZE"** - These comments mark areas you need to modify
3. **Test locally first** - Ensure everything works before deploying
4. **Keep Postman ready** - Test API endpoints to demonstrate RESTful APIs
5. **Document your changes** - Mention what you customized during the exam

---

**Good luck with your exams!** 🚀

