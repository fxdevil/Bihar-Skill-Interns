// Bihar Skill Intern - Enhanced Validation Script
// Add this to your HTML files for better form validation

/**
 * PASSWORD STRENGTH CHECKER
 */
function checkPasswordStrength(password) {
    let strength = 0;
    const feedback = [];
    
    if (password.length >= 8) strength++;
    else feedback.push("At least 8 characters");
    
    if (/[a-z]/.test(password)) strength++;
    else feedback.push("Lowercase letters");
    
    if (/[A-Z]/.test(password)) strength++;
    else feedback.push("Uppercase letters");
    
    if (/[0-9]/.test(password)) strength++;
    else feedback.push("Numbers");
    
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    else feedback.push("Special characters");
    
    return {
        strength: strength,
        feedback: feedback,
        level: strength <= 2 ? 'Weak' : strength === 3 ? 'Medium' : strength === 4 ? 'Strong' : 'Very Strong'
    };
}

/**
 * PHONE NUMBER VALIDATION (India)
 */
function validatePhoneNumber(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

/**
 * EMAIL VALIDATION
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * DATE VALIDATION (Age Check)
 */
function validateAge(dob, minAge = 18) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age >= minAge;
}

/**
 * FORM DATA ENCRYPTION (Basic)
 */
function encryptData(data) {
    // Note: This is basic encoding, not true encryption
    // For production, use proper encryption libraries
    return btoa(JSON.stringify(data));
}

function decryptData(encryptedData) {
    try {
        return JSON.parse(atob(encryptedData));
    } catch (e) {
        return null;
    }
}

/**
 * SESSION TIMEOUT MANAGER
 */
class SessionManager {
    constructor(timeoutMinutes = 30) {
        this.timeoutMinutes = timeoutMinutes;
        this.timeoutId = null;
        this.initSession();
    }
    
    initSession() {
        document.addEventListener('click', () => this.resetTimeout());
        document.addEventListener('keypress', () => this.resetTimeout());
        this.resetTimeout();
    }
    
    resetTimeout() {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.logout();
        }, this.timeoutMinutes * 60 * 1000);
    }
    
    logout() {
        localStorage.clear();
        alert('Your session has expired. Please login again.');
        window.location.href = 'login.html';
    }
}

/**
 * FORM VALIDATION WITH REAL-TIME FEEDBACK
 */
function setupFormValidation(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    let isValid = true;
    let error = '';
    
    // Email validation
    if (fieldName === 'email' || fieldType === 'email') {
        isValid = validateEmail(value);
        error = 'Invalid email format';
    }
    
    // Phone validation
    if (fieldName === 'phone') {
        isValid = validatePhoneNumber(value);
        error = 'Enter valid 10-digit phone number';
    }
    // Password validation
    if (fieldName === 'password') {
        isValid = value.length >= 6;
        error = 'Password must be at least 6 characters';
    }
    
    // Date of birth validation
    if (fieldName === 'dob') {
        isValid = validateAge(value, 18);
        error = 'You must be at least 18 years old';
    }
    
    // Update field styling
    if (isValid) {
        field.style.borderColor = '#10b981';
        field.style.backgroundColor = '#ecfdf5';
    } else {
        field.style.borderColor = '#ef4444';
        field.style.backgroundColor = '#fef2f2';
    }
    
    // Show error message
    let errorDiv = field.nextElementSibling;
    if (errorDiv && errorDiv.className === 'error-message') {
        if (!isValid) {
            errorDiv.textContent = error;
            errorDiv.style.display = 'block';
        } else {
            errorDiv.style.display = 'none';
        }
    }
    
    return isValid;
}

/**
 * DATA BACKUP & RESTORE
 */
function backupUserData() {
    const userData = {
        name: localStorage.getItem('userName'),
        email: localStorage.getItem('userEmail'),
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('userDataBackup', JSON.stringify(userData));
    console.log('Data backed up successfully');
}

function restoreUserData() {
    const backup = localStorage.getItem('userDataBackup');
    if (backup) {
        const userData = JSON.parse(backup);
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('userEmail', userData.email);
        console.log('Data restored successfully');
        return true;
    }
    return false;
}

/**
 * LOGOUT WITH CONFIRMATION
 */
function logout(redirectUrl = 'login.html') {
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
        localStorage.clear();
        window.location.href = redirectUrl;
    }
}

/**
 * INITIALIZE ALL VALIDATIONS
 */
function initializeEnhancements() {
    // Setup session timeout (30 minutes)
    new SessionManager(30);
    
    // Setup form validations
    setupFormValidation('registrationForm');
    setupFormValidation('loginForm');
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEnhancements);
} else {
    initializeEnhancements();
}
