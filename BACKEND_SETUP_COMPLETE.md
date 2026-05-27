# 🎓 Bihar Skill Intern - Complete Backend Setup

## ✨ What's Been Created

### Backend Structure
```
backend/
├── config/
│   └── database.js              # MySQL connection pool
├── middleware/
│   ├── auth.js                  # JWT verification & role checks
│   └── validation.js            # Form validation
├── routes/
│   ├── auth.js                  # Student & Admin Login/Register
│   ├── students.js              # Student profile & courses
│   ├── admin.js                 # Admin dashboard stats
│   ├── courses.js               # Course management
│   ├── payments.js              # Payment processing
│   └── certificates.js          # Certificate generation
├── server.js                     # Main Express server
├── package.json                  # Dependencies
├── .env.example                  # Environment template
├── database_schema.sql           # Complete MySQL schema
└── SETUP_GUIDE.md               # Detailed setup instructions
```

### Frontend Integration Files
- `api-config.js` - API client for frontend
- `FRONTEND_INTEGRATION_EXAMPLES.js` - Code examples

---

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Database
```bash
# Option A: MySQL Command Line
mysql -u root -p < database_schema.sql

# Option B: Copy database_schema.sql to MySQL Workbench and execute
```

### 3. Configure Environment
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your credentials
# DB_USER=root
# DB_PASSWORD=your_password
```

### 4. Start Server
```bash
npm start
# Output: ✅ Backend server running on port 5000
```

### 5. Test API
```bash
curl http://localhost:5000/api/health
# Response: {"status":"Backend is running successfully!"}
```

---

## 📋 Completed Features

### ✅ Authentication System
- Student Registration (with validation)
- Student Login (with JWT)
- Admin Registration
- Admin Login
- Token Verification
- Password Hashing (bcrypt)

### ✅ Student Features
- View Profile
- Update Profile
- Browse Courses
- Enroll in Courses
- Track Progress
- View Certificates

### ✅ Admin Features
- Dashboard with Statistics
- View All Students
- Student Details
- Delete Students
- Manage Courses
- Payment Tracking

### ✅ Payment System
- Initiate Payment
- Payment Verification
- Payment History
- Order Tracking

### ✅ Courses Management
- View All Courses
- Course Details
- Student Enrollment
- Progress Tracking
- Marks Management

### ✅ Certificates
- Certificate Issuance
- Certificate Download
- Certificate Verification

### ✅ Database
- Complete schema with 10+ tables
- Proper relationships (FK)
- Indexes for performance
- Views for easier querying
- Audit logging support

---

## 🔑 API Endpoints

### Authentication
```
POST   /api/auth/register                 # Student Registration
POST   /api/auth/login                    # Student Login
POST   /api/auth/admin/register           # Admin Registration
POST   /api/auth/admin/login              # Admin Login
GET    /api/auth/verify                   # Verify JWT Token
```

### Students
```
GET    /api/students/profile              # Get Profile
PUT    /api/students/profile              # Update Profile
GET    /api/students/courses              # Get Enrolled Courses
GET    /api/students/progress             # Get Progress
```

### Admin
```
GET    /api/admin/students                # Get All Students
GET    /api/admin/students/:id            # Get Student Details
DELETE /api/admin/students/:id            # Delete Student
GET    /api/admin/stats                   # Dashboard Stats
```

### Courses
```
GET    /api/courses/                      # Get All Courses
GET    /api/courses/:id                   # Get Course Details
POST   /api/courses/:id/enroll            # Enroll in Course
```

### Payments
```
POST   /api/payments/initiate             # Start Payment
POST   /api/payments/verify               # Verify Payment
GET    /api/payments/history              # Payment History
```

### Certificates
```
GET    /api/certificates/                 # Get Certificates
GET    /api/certificates/:id              # Get Certificate
GET    /api/certificates/:id/download     # Download PDF
```

---

## 🔐 Security Features

✅ Password Hashing (bcryptjs)
✅ JWT Token Authentication
✅ Role-based Access Control
✅ Input Validation
✅ CORS Protection
✅ SQL Injection Prevention (Prepared Statements)
✅ Environment Variables
✅ Audit Logging Support

---

## 📱 Frontend Integration

### Step 1: Include API Script
```html
<script src="api-config.js"></script>
```

### Step 2: Use in Your Forms
```javascript
async function handleRegister(event) {
    event.preventDefault();
    const data = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        college: document.getElementById('college').value,
        course: document.getElementById('course').value,
        district: document.getElementById('district').value
    };
    
    const response = await APIService.registerStudent(data);
    if (response.success) {
        window.location.href = 'login.html';
    } else {
        alert('Error: ' + response.message);
    }
}
```

### Step 3: Protect Pages
```javascript
window.addEventListener('load', async () => {
    try {
        await APIService.verifyToken();
    } catch (error) {
        window.location.href = 'login.html';
    }
});
```

---

## 🧪 Testing with Postman

1. **Import Collection** (Optional)
   - Create new request in Postman

2. **Register Student**
   ```
   POST http://localhost:5000/api/auth/register
   Body (JSON):
   {
       "firstName": "John",
       "lastName": "Doe",
       "email": "john@example.com",
       "phone": "9876543210",
       "password": "Password123",
       "dob": "2000-01-15",
       "gender": "male",
       "college": "MIT",
       "course": "Engineering",
       "district": "Patna"
   }
   ```

3. **Login**
   ```
   POST http://localhost:5000/api/auth/login
   Body (JSON):
   {
       "email": "john@example.com",
       "password": "Password123"
   }
   ```
   Response will include token:
   ```json
   {
       "token": "eyJhbGciOiJIUzI1NiIs..."
   }
   ```

4. **Use Token in Headers**
   - In Postman, go to Authorization tab
   - Select "Bearer Token"
   - Paste the token
   - Make authenticated requests

---

## 🔧 Configuration

### Important Settings
Edit `backend/.env`:

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bihar_skill_intern

# Server
PORT=5000
NODE_ENV=development

# Security
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d
ADMIN_REGISTRATION_KEY=change_this_for_new_admins_after_first_setup
ALLOW_DEMO_PAYMENTS=false

# Frontend
FRONTEND_URL=http://localhost
```

---

## 📊 Database Schema

### Tables Created
1. **students** - Student information
2. **admins** - Admin accounts
3. **courses** - Course details
4. **student_courses** - Enrollment records
5. **payments** - Payment transactions
6. **certificates** - Issued certificates
7. **attendance** - Attendance records
8. **marks** - Student grades
9. **notifications** - User notifications
10. **audit_logs** - Activity tracking

### Relationships
- Student → Courses (Many-to-Many via student_courses)
- Student → Payments (One-to-Many)
- Student → Certificates (One-to-Many)
- Course → Payments (One-to-Many)

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in .env |
| MySQL connection error | Check credentials, ensure MySQL is running |
| npm install fails | Delete node_modules, run `npm install` again |
| CORS error | Check FRONTEND_URL in .env |
| JWT expired | Login again to get new token |

---

## 📝 Next Steps

1. ✅ Install dependencies
2. ✅ Setup database
3. ✅ Configure .env
4. ✅ Start backend server
5. ✅ Test API endpoints
6. ⏳ Integrate with frontend
7. ⏳ Setup Razorpay payment
8. ⏳ Email notifications
9. ⏳ Deploy to production

---

## 🚀 Production Deployment

Before deploying:
1. Change JWT_SECRET to strong random key
2. Set NODE_ENV=production
3. Use production database
4. Enable HTTPS
5. Setup email service
6. Configure payment gateway
7. Setup monitoring & logging

---

## 📞 Support Resources

- Backend SETUP_GUIDE.md
- FRONTEND_INTEGRATION_EXAMPLES.js
- database_schema.sql
- API endpoints documentation

---

**Backend Setup Complete! 🎉**

Start with: `npm start` in backend folder
Then integrate with your frontend using `api-config.js`

Good luck! 🚀
