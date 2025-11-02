# ✅ Experiments Checklist

Use this checklist to verify all experiments are covered during your exam.

## 1. ✅ Responsive and Interactive UIs using Tailwind CSS

**Location:** Throughout the frontend
- **Files to show:**
  - `frontend/src/pages/Home.jsx` - Responsive grid layouts
  - `frontend/src/pages/Dashboard.jsx` - Mobile-responsive cards
  - `frontend/src/components/Navbar.jsx` - Responsive navigation
- **Features:**
  - ✅ Responsive design (mobile, tablet, desktop)
  - ✅ Tailwind utility classes
  - ✅ Dark mode styling
  - ✅ Interactive hover effects

**How to demonstrate:**
- Resize browser window to show responsive layout
- Show Tailwind classes in code
- Toggle dark mode button

---

## 2. ✅ React Hooks (useEffect, useContext, custom hooks)

**Location:** Multiple files

### useEffect
- **File:** `frontend/src/App.jsx` (Line 20-26)
  - Applies theme class to HTML when theme changes
- **File:** `frontend/src/hooks/useItems.js` (Line 19-22)
  - Fetches items when component mounts
- **File:** `frontend/src/pages/Dashboard.jsx`
  - Various useEffect usage

### useContext (via Redux)
- **File:** `frontend/src/components/Navbar.jsx` (Line 10)
  - `useSelector` hook to access Redux context
- **File:** `frontend/src/pages/Dashboard.jsx` (Line 14)
  - `useSelector` for auth state
- **File:** `frontend/src/pages/Login.jsx` (Line 17)
  - `useSelector` and `useDispatch` hooks

### Custom Hooks
- **File:** `frontend/src/hooks/useItems.js`
  - Complete custom hook for item management
  - Used in: `frontend/src/pages/Dashboard.jsx` (Line 18)

**How to demonstrate:**
- Show useItems custom hook
- Point out useEffect in App.jsx for theme
- Show useSelector/useDispatch (React-Redux hooks using Context)

---

## 3. ✅ Manage complex state with Redux or Context API

**Location:** Redux store implementation

**Files:**
- `frontend/src/store/store.js` - Store configuration
- `frontend/src/store/slices/authSlice.js` - Authentication state
- `frontend/src/store/slices/itemSlice.js` - Items state
- `frontend/src/store/slices/themeSlice.js` - Theme state

**Features:**
- ✅ Multiple state slices
- ✅ Actions and reducers
- ✅ Persistent state (localStorage)
- ✅ Global state accessible from any component

**How to demonstrate:**
- Show Redux store structure
- Demonstrate state updates (login/logout)
- Show theme persistence (refresh page, theme remains)
- Open Redux DevTools (if installed) to show state changes

---

## 4. ✅ Create secure, production-ready RESTful APIs

**Location:** `backend/server.js`

**Endpoints:**
- ✅ `POST /api/auth/register` - Register user
- ✅ `POST /api/auth/login` - Login user
- ✅ `GET /api/items` - Get all items (protected)
- ✅ `GET /api/items/:id` - Get single item (protected)
- ✅ `POST /api/items` - Create item (protected)
- ✅ `PUT /api/items/:id` - Update item (protected)
- ✅ `DELETE /api/items/:id` - Delete item (protected, admin only)

**Security Features:**
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Protected routes middleware
- ✅ Role-based access control
- ✅ Error handling

**How to demonstrate:**
- Show RESTful endpoints
- Demonstrate CRUD operations
- Show authentication middleware
- Show role-based access (admin vs user)

---

## 5. ✅ Implement authentication and user roles with JWT

**Location:** Backend and Frontend

**Backend (`backend/server.js`):**
- Line 82-98: `authenticateToken` middleware
- Line 107-141: Register endpoint with JWT
- Line 144-175: Login endpoint with JWT
- Role-based access: Lines 236, 267

**Frontend:**
- `frontend/src/store/slices/authSlice.js` - Token storage
- `frontend/src/utils/api.js` - Automatic token injection
- `frontend/src/components/ProtectedRoute.jsx` - Route protection

**Features:**
- ✅ JWT token generation
- ✅ Token verification
- ✅ Token storage (localStorage)
- ✅ Automatic token injection in API calls
- ✅ Role-based permissions (admin/user)

**How to demonstrate:**
- Login and show token in localStorage
- Show token in API request headers
- Test admin-only routes (delete)
- Show role display in Navbar

---

## 6. ✅ Validating RESTful APIs using VSCode REST Client

**Location:** VSCode REST Client file

**File:** `.vscode/http.http`

**Installation:**
1. Install "REST Client" extension in VSCode (by Huachao Mao)
2. Open `.vscode/http.http` file
3. Click "Send Request" above each request

**Endpoints to test:**
1. Register → Get token
2. Login → Get token
3. Get all items (with token)
4. Create item (with token)
5. Update item (with token)
6. Delete item (admin token required)

**How to demonstrate:**
1. Open `.vscode/http.http` in VSCode
2. Run "Login" request (click "Send Request" above it)
3. Copy token from response
4. Update line 4: `@token = Bearer YOUR_TOKEN_HERE`
5. Run other requests - they automatically use the token
6. Show error responses (401, 403, 404) by using invalid token
7. Demonstrate role-based access (try delete as regular user)

**Steps:**
1. Install REST Client extension
2. Open `.vscode/http.http`
3. Run login request → Copy token
4. Update `@token` variable
5. Test all protected routes
6. Show error handling (invalid token, unauthorized access)

**Alternative:** If required to use Postman, import `POSTMAN_COLLECTION.json`

---

## 7. ✅ CI/CD Deployment with GitHub Actions + Render/Vercel

**Location:** `.github/workflows/deploy.yml`

**File:** `.github/workflows/deploy.yml`

**Features:**
- ✅ GitHub Actions workflow
- ✅ Automated build on push
- ✅ Ready for Render/Vercel deployment

**How to demonstrate:**
- Show workflow file
- Explain deployment process
- Show build commands
- Mention Render/Vercel configuration steps

**Deployment Steps:**
1. Push code to GitHub
2. GitHub Actions runs automatically
3. Build frontend
4. Deploy to hosting service

**Alternative:** Show deployment to Vercel/Render live (if deployed)

---

## 📝 Exam Presentation Tips

1. **Start with Overview:**
   - Show project structure
   - Explain what each experiment covers

2. **Demonstrate Features:**
   - Login/Register flow
   - CRUD operations
   - Role-based access
   - Responsive design
   - Dark mode

3. **Show Code:**
   - Point out React Hooks usage
   - Show Redux store structure
   - Show API endpoints
   - Show Postman collection

4. **Test Everything:**
   - Run the application
   - Test all features live
   - Show Postman requests

5. **Customization:**
   - Mention what you customized
   - Show the customization comments
   - Explain how easy it is to modify

---

## 🎯 Quick Reference: File Locations

| Experiment | Key Files |
|------------|-----------|
| Tailwind CSS | All `.jsx` files in `frontend/src/pages/` and `components/` |
| React Hooks | `App.jsx`, `useItems.js`, `Dashboard.jsx`, `Login.jsx` |
| Redux | `store/store.js`, `store/slices/*.js` |
| RESTful APIs | `backend/server.js` |
| JWT Auth | `backend/server.js`, `authSlice.js`, `api.js` |
| Postman | `POSTMAN_COLLECTION.json` |
| CI/CD | `.github/workflows/deploy.yml` |

---

**Good luck with your exam! You've covered everything! 🚀**

