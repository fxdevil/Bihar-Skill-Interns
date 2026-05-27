// Example: How to use API in your HTML forms
// Add this script to your register.html <head> section

<script src="api-config.js"></script>
<script>
// Register Form Submission Example
async function handleRegisterSubmit(event) {
    event.preventDefault();
    
    const formData = {
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

    try {
        const response = await APIService.registerStudent(formData);
        if (response.success) {
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        } else {
            alert('Error: ' + response.message);
        }
    } catch (error) {
        alert('Registration failed: ' + error.message);
        console.error(error);
    }
}

// Login Form Submission Example
async function handleLoginSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await APIService.loginStudent(email, password);
        if (response.success) {
            alert('Login successful!');
            window.location.href = 'courses.html';
        } else {
            alert('Error: ' + response.message);
        }
    } catch (error) {
        alert('Login failed: ' + error.message);
        console.error(error);
    }
}

// Load Student Profile
async function loadStudentProfile() {
    try {
        const response = await APIService.getStudentProfile();
        if (response.success) {
            console.log('Student:', response.student);
            // Update UI with student data
        }
    } catch (error) {
        console.error('Failed to load profile:', error);
    }
}

// Load Courses
async function loadCourses() {
    try {
        const response = await APIService.getAllCourses();
        if (response.success) {
            console.log('Courses:', response.courses);
            // Update UI with courses
        }
    } catch (error) {
        console.error('Failed to load courses:', error);
    }
}

// Enroll in Course
async function enrollCourse(courseId) {
    try {
        const response = await APIService.enrollCourse(courseId);
        if (response.success) {
            alert('Successfully enrolled in course!');
            loadCourses(); // Refresh courses list
        } else {
            alert('Error: ' + response.message);
        }
    } catch (error) {
        alert('Enrollment failed: ' + error.message);
    }
}

// Admin - Load Dashboard Stats
async function loadAdminStats() {
    try {
        const response = await APIService.getDashboardStats();
        if (response.success) {
            document.getElementById('totalStudents').textContent = response.stats.totalStudents;
            document.getElementById('totalCourses').textContent = response.stats.totalCourses;
            document.getElementById('totalCertificates').textContent = response.stats.totalCertificates;
            document.getElementById('totalPayments').textContent = '₹' + response.stats.totalPayments;
        }
    } catch (error) {
        console.error('Failed to load stats:', error);
    }
}

// Admin - Load All Students
async function loadAllStudents() {
    try {
        const response = await APIService.getAllStudents();
        if (response.success) {
            console.log('Students:', response.students);
            // Update table with students
            populateStudentsTable(response.students);
        }
    } catch (error) {
        console.error('Failed to load students:', error);
    }
}

// Admin - Delete Student
async function deleteStudent(studentId) {
    if (!confirm('Are you sure you want to delete this student?')) return;
    
    try {
        const response = await APIService.deleteStudent(studentId);
        if (response.success) {
            alert('Student deleted successfully');
            loadAllStudents(); // Refresh list
        }
    } catch (error) {
        alert('Failed to delete student: ' + error.message);
    }
}

// Logout
function logout() {
    APIService.logout();
}

// Check if user is logged in
async function checkAuth() {
    try {
        const response = await APIService.verifyToken();
        if (!response.success) {
            window.location.href = 'login.html';
        }
    } catch (error) {
        window.location.href = 'login.html';
    }
}

// Run on page load
window.addEventListener('load', () => {
    checkAuth();
    // Load specific page data
    if (window.location.pathname.includes('courses.html')) {
        loadCourses();
    } else if (window.location.pathname.includes('admin-dashboard.html')) {
        loadAdminStats();
        loadAllStudents();
    } else if (window.location.pathname.includes('profile.html')) {
        loadStudentProfile();
    }
});

</script>

// =============================================
// HTML FORM EXAMPLES
// =============================================

<!-- REGISTRATION FORM EXAMPLE -->
<form onsubmit="handleRegisterSubmit(event)">
    <input type="text" id="firstName" placeholder="First Name" required>
    <input type="text" id="lastName" placeholder="Last Name" required>
    <input type="email" id="email" placeholder="Email" required>
    <input type="tel" id="phone" placeholder="Phone" required>
    <input type="password" id="password" placeholder="Password" required>
    <input type="date" id="dob" required>
    <select id="gender" required>
        <option>Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
    </select>
    <input type="text" id="college" placeholder="College" required>
    <input type="text" id="course" placeholder="Course" required>
    <input type="text" id="district" placeholder="District" required>
    <button type="submit">Register</button>
</form>

<!-- LOGIN FORM EXAMPLE -->
<form onsubmit="handleLoginSubmit(event)">
    <input type="email" id="email" placeholder="Email" required>
    <input type="password" id="password" placeholder="Password" required>
    <button type="submit">Login</button>
</form>

<!-- ADMIN STATS DISPLAY EXAMPLE -->
<div class="stats">
    <div class="stat-card">
        <h3>Total Students</h3>
        <p id="totalStudents">0</p>
    </div>
    <div class="stat-card">
        <h3>Total Courses</h3>
        <p id="totalCourses">0</p>
    </div>
    <div class="stat-card">
        <h3>Certificates Issued</h3>
        <p id="totalCertificates">0</p>
    </div>
    <div class="stat-card">
        <h3>Total Payments</h3>
        <p id="totalPayments">₹0</p>
    </div>
</div>
