# 🚀 Quick Start Guide - 1 Hour Customization Plan

This guide helps you customize the boilerplate for your exam topic in under 1 hour.

## ⚡ Step 1: Install & Run (5 mins)

```bash
# Install all dependencies (if npm scripts work)
npm run install-all

# OR install manually if PowerShell scripts are disabled:
# npm install
# cd backend && npm install && cd ..
# cd frontend && npm install && cd ..

# Start both servers
npm run dev
```

**PowerShell Issue?** Use manual installation method, or run in Command Prompt instead.

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

**Test Login:**
- Admin: `admin@example.com` / `admin123`
- User: `user@example.com` / `user123`

## 🎯 Step 2: Customize Data Structure (15 mins)

### Backend Data (backend/server.js)

**Find:** Line 33-37 (items array)
```javascript
let items = [
  { id: 1, title: 'Item 1', description: 'Description...', status: 'active', createdBy: 'admin' },
]
```

**Change to match your topic:**

**E-commerce Example:**
```javascript
let items = [
  { id: 1, productName: 'Laptop', price: 999, category: 'Electronics', stock: 10, createdBy: 'admin' },
]
```

**Study Materials Example:**
```javascript
let items = [
  { id: 1, courseName: 'Math 101', subject: 'Mathematics', semester: 'Fall 2024', createdBy: 'admin' },
]
```

**Then update:**
- Line 188: Change fields in POST route (create item)
- Line 216: Change fields in PUT route (update item)

## 📝 Step 3: Update Frontend Forms (10 mins)

**File:** `frontend/src/pages/Dashboard.jsx`

**Find:** Line 103, 113, 123 (form labels)
```jsx
<label>Title</label>  // Change to "Product Name", "Course Name", etc.
<label>Description</label>  // Change to "Price", "Subject", etc.
<label>Status</label>  // Change to "Stock", "Semester", etc.
```

**Find:** Line 142 (formData initial state)
```javascript
const [formData, setFormData] = useState({ title: '', description: '', status: 'active' })
```

**Update to match your fields:**
```javascript
// E-commerce example:
const [formData, setFormData] = useState({ productName: '', price: '', category: '' })
```

## 🔄 Step 4: Rename Components (10 mins)

**Option A: Keep same structure (easiest)**
- Just update labels and field names (already done in steps above)

**Option B: Full rename (if you want)**
1. Rename `itemSlice.js` → `productSlice.js` (or your topic)
2. Rename `useItems.js` → `useProducts.js`
3. Update all imports in:
   - `store/store.js`
   - `pages/Dashboard.jsx`
   - `hooks/useItems.js` (or renamed file)

## 🎨 Step 5: Update Content (10 mins)

### Home Page (frontend/src/pages/Home.jsx)

**Line 10:** Change hero title
```jsx
<h1>Welcome to YourProjectName</h1>
```

**Line 12:** Change subtitle
```jsx
<p>A flexible template for your exam project</p>
```

**Line 57-78:** Update feature cards text to match your topic

### Navbar (frontend/src/components/Navbar.jsx)

**Line 20:** Change logo text
```jsx
<Link>ExamTemplate</Link>  // Change to your project name
```

## 🔗 Step 6: Update API Routes (Optional - 5 mins)

**Only if you want different route names:**

**Backend (server.js):**
- Line 166: Change `/api/items` to `/api/products` (or your topic)

**Frontend:**
- `hooks/useItems.js`: Update all `/items` to `/products`
- `utils/api.js`: Check base URL is correct

## ✅ Step 7: Test Everything (5 mins)

1. ✅ Login with both users
2. ✅ Create new item/product/course
3. ✅ Edit item (test role-based access)
4. ✅ Delete item (admin only)
5. ✅ Toggle dark mode
6. ✅ Test responsive design (resize window)

## 📦 Step 8: API Testing with VSCode REST Client (5 mins)

1. Install REST Client extension in VSCode (by Huachao Mao)
2. Open `.vscode/http.http` file
3. Click "Send Request" above "Login (Admin)" request
4. Copy token from response
5. Update line 4: `@token = Bearer YOUR_TOKEN_HERE`
6. Click "Send Request" on other requests (they'll use the token automatically)
7. Test all endpoints: Get All Items, Create Item, Update Item, Delete Item

**Alternative:** If required to use Postman, import `POSTMAN_COLLECTION.json`

## 🎓 Exam Tips

1. **Read comments** - Every file has "TO CUSTOMIZE" comments
2. **Start simple** - Don't overcomplicate, focus on working demo
3. **Test as you go** - Make sure each change works before moving on
4. **Use search** - Search for "TO CUSTOMIZE" to find all modification points
5. **Keep it generic** - The structure works for any topic

## 🔍 Quick Reference: Where to Change What

| What to Change | File | Line Range |
|---------------|------|------------|
| Data structure | `backend/server.js` | 33-37 |
| API fields | `backend/server.js` | 188, 216 |
| Form fields | `frontend/src/pages/Dashboard.jsx` | 103, 113, 123, 142 |
| Page content | `frontend/src/pages/Home.jsx` | 10, 12, 57-78 |
| Navigation | `frontend/src/components/Navbar.jsx` | 20 |

## 💡 Common Customizations

### E-Commerce Website
- Items → Products
- Title → Product Name
- Description → Price, Description
- Status → Stock, Category

### Study Materials
- Items → Courses/Materials
- Title → Course Name
- Description → Subject, Semester
- Status → Year, Department

### Blog/News
- Items → Posts/Articles
- Title → Post Title
- Description → Content
- Status → Published/Draft

---

**Good luck! You've got this! 🚀**

