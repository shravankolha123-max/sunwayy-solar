# TECHNICAL DOCUMENTATION - SUNWAYY SOLAR PROJECT

## 1. Quick Start Guide

### For Developers:
```bash
# Backend Setup
cd backend
npm install
npm run dev

# Frontend Setup
- Open index.html with Live Server on port 5500
- Or use: python -m http.server 8000
```

### Environment Configuration (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/sunwayy
ADMIN_SECRET=your_secure_admin_key
NODE_ENV=production
```

---

## 2. Enhanced Modules

### `enhanced-booking.js`
**Features Included:**
- ✅ Real-time solar size estimation from electricity bill
- ✅ Automated subsidy calculation (40%, 50%, 30% by scheme)
- ✅ EMI calculator with 60-month terms
- ✅ Professional invoice generation & download
- ✅ Form validation with detailed error messages
- ✅ API integration with error handling
- ✅ Notification system for user feedback

**Classes:**
```javascript
SolarEstimator()
├─ calculateSystemSize(monthlyBill)
├─ calculateCost(systemSizeKW)
├─ calculateSubsidy(totalCost, scheme)
├─ calculateEMI(principal, monthlyRate, months)
└─ getEstimate(monthlyBill, scheme, systemSizeKW)

InvoiceGenerator()
├─ generatePDF(bookingData, estimate)
└─ downloadAsText(bookingData, estimate)

BookingFormHandler()
├─ validateForm()
├─ updateEstimate()
├─ handleSubmit(e)
└─ resetForm()
```

**Usage:**
```html
<!-- Add to booking.html -->
<script src="enhanced-booking.js"></script>

<!-- The module auto-initializes on DOMContentLoaded -->
<!-- Just add an element with id="estimateDisplay" for display -->
<div id="estimateDisplay"></div>
```

---

### `enhanced-admin.js`
**Features Included:**
- ✅ Secure admin authentication with secret key
- ✅ View all bookings, consultations, and messages
- ✅ Export data to CSV format
- ✅ Advanced filtering and search
- ✅ Analytics dashboard with stats
- ✅ Date range filtering
- ✅ Responsive data tables

**Classes:**
```javascript
AdminDashboard()
├─ authenticate()
├─ loadData()
├─ switchTab(tab)
├─ renderBookings()
├─ renderConsultations()
├─ renderMessages()
├─ renderAnalytics()
├─ applyFilters()
├─ exportCSV()
└─ logout()
```

**Setup:**
```html
<!-- Create admin.html with only -->
<script src="enhanced-admin.js"></script>

<!-- The module creates entire UI automatically -->
```

**Admin URL:** `http://localhost:5500/admin.html`

---

## 3. API Reference

### Health Check
```bash
GET /health

Response:
{
  "ok": true,
  "database": "connected"
}
```

### Create Booking
```bash
POST /book
Content-Type: application/json

Request:
{
  "name": "John Doe",
  "mobile": "9876543210",
  "city": "Mumbai",
  "bill": 2500,
  "scheme": "PM Surya Yojana",
  "size": "3kW"
}

Response:
{
  "success": true,
  "id": "507f1f77bcf86cd799439011"
}
```

### Get Admin Records
```bash
GET /api/records?secret=YOUR_ADMIN_SECRET

Response:
{
  "ok": true,
  "database": "connected",
  "counts": {
    "bookings": 150,
    "contactMessages": 45,
    "consultations": 32
  },
  "bookings": [...],
  "contactMessages": [...],
  "consultations": [...]
}
```

---

## 4. Database Schema Details

### Booking Model
```javascript
{
  _id: ObjectId,
  name: String,          // User's full name
  mobile: String,        // 10-digit mobile number
  city: String,          // City location
  bill: Number,          // Monthly electricity bill in ₹
  scheme: String,        // Government scheme selected
  size: String,          // System size (e.g., "3kW", "5kW")
  createdAt: Date,       // Auto-timestamp
  updatedAt: Date        // Auto-timestamp
}
```

### Consultation Model
```javascript
{
  _id: ObjectId,
  name: String,          // Consultant's name
  mobile: String,        // Contact number
  query: String,         // Consultation query/request
  preferredDate: Date,   // Preferred consultation date
  createdAt: Date,
  updatedAt: Date
}
```

### ContactMessage Model
```javascript
{
  _id: ObjectId,
  name: String,          // Message sender name
  email: String,         // Email address
  message: String,       // Message content
  createdAt: Date,
  updatedAt: Date
}
```

---

## 5. Breakdown of Calculations

### Solar System Size Estimation
```
Formula: SystemSize (kW) = (Monthly Bill ₹ / 20) / 4.5

Example:
- Monthly Bill: ₹2000
- Monthly Units Est.: 2000/20 = 100 units
- System Size: 100/4.5 ≈ 2.2 kW → Rounded to 3 kW
```

### Subsidy Calculation
```
PM Surya Yojana:        40% subsidy
PM KUSUM Scheme:        50% subsidy
Grid Connected RTP:     30% subsidy

Example (3kW @ ₹120,000/kW):
- Total Cost: 3 × 120,000 = ₹360,000
- Subsidy (40%): 360,000 × 0.40 = ₹144,000
- Net Cost: 360,000 - 144,000 = ₹216,000
```

### EMI Calculation
```
Formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1)

Where:
- P = Principal (Net Cost after subsidy)
- r = Monthly interest rate (Annual rate / 12 / 100)
- n = Total number of months (60)

Example (₹216,000 @ 7.5% for 60 months):
- Monthly Rate: 7.5 / 12 / 100 = 0.00625
- EMI ≈ ₹4,100/month
```

---

## 6. Multilingual Implementation

### Adding New Language:
```javascript
// In script.js and booking.js, add to translations object:
const translations = {
  en: { /* existing */ },
  hi: { /* existing */ },
  mr: { /* existing */ },
  
  // Add new language:
  fr: {
    company: "Sunwayy Solar Energy",
    home: "Accueil",
    services: "Services",
    // ... all other keys
  }
};

// Also update the language switcher:
// <option value="fr">Français</option>
```

### In HTML:
```html
<!-- Use data-key attribute for any text to translate -->
<h1 data-key="hero_title">Clean Solar Energy for Your Home</h1>

<!-- JavaScript automatically replaces this on language change -->
```

---

## 7. Dark Mode Implementation

### In HTML:
```html
<!-- Theme toggle button (already in header) -->
<button id="themeToggle">🌙</button>
```

### In CSS:
```css
/* Light mode (default) */
:root {
  --primary-color: #0b4fa3;
  --bg-color: #f4f9ff;
  --text-color: #333;
}

/* Dark mode */
body.dark-mode {
  --primary-color: #0d6edc;
  --bg-color: #1a1a1a;
  --text-color: #f0f0f0;
}
```

### JavaScript Toggle:
```javascript
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// On page load:
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}
```

---

## 8. Error Handling & Validation

### Frontend Validation (JavaScript):
```javascript
// Mobile Number Validation
/^[6-9]\d{9}$/.test(mobileNumber)  // Indian mobile format

// Email Validation
/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// Bill Validation
bill > 0 && bill <= 50000  // Reasonable bill range
```

### Backend Validation (Express):
```javascript
// All endpoints include:
- Null/undefined checks
- Type validation (String, Number)
- Range validation (bill amount)
- Error responses with status codes:
  - 400: Bad Request (validation failure)
  - 401: Unauthorized (admin secret)
  - 500: Server Error (database)
```

---

## 9. Performance Optimization Tips

### Frontend:
```javascript
// Debounce search input
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

searchInput.addEventListener("input", debounce(() => {
  applyFilters();
}, 300));
```

### CSS:
- Use CSS Grid/Flexbox instead of positioning
- Minimize animations
- Lazy-load images
- Use CSS properties for themes (no JS repainting)

### Database:
```javascript
// Add indexes for faster queries:
db.bookings.createIndex({ city: 1 });
db.bookings.createIndex({ createdAt: -1 });
db.bookings.createIndex({ mobile: 1 });
```

---

## 10. Security Best Practices

✅ **Implemented:**
- Admin secret key for record access
- CORS restrictions
- Input validation (Frontend + Backend)
- Environment variables for secrets
- No hardcoded credentials

⚠️ **For Production:**
- Use OAuth for user authentication
- Implement rate limiting
- Add HTTPS/SSL
- Use helmet.js for security headers
- Sanitize all user inputs
- Hash sensitive data in database

---

## 11. Testing Examples

### Test User Data:
```javascript
// Valid booking
{
  name: "Rajesh Kumar",
  mobile: "9876543210",
  city: "Mumbai",
  bill: 2500,
  scheme: "PM Surya Yojana",
  size: "3kW"
}

// Test All Schemes
- "PM Surya Yojana" (40% subsidy)
- "PM KUSUM Scheme" (50% subsidy)
- "Grid Connected Rooftop" (30% subsidy)
```

### Browser Console Tests:
```javascript
// Test estimator
const est = new SolarEstimator();
est.getEstimate(2500, "PM Surya Yojana", 3);

// Test API
fetch('http://localhost:5000/health')
  .then(r => r.json())
  .then(d => console.log(d));
```

---

## 12. Deployment Checklist

| Item | Status |
|------|--------|
| Environment variables set | ☐ |
| MongoDB connected | ☐ |
| ADMIN_SECRET configured | ☐ |
| API endpoints tested | ☐ |
| Frontend mobile responsive | ☐ |
| All translations loaded | ☐ |
| Theme toggle working | ☐ |
| Invoice generation tested | ☐ |
| Admin dashboard accessible | ☐ |
| CORS properly configured | ☐ |
| Error messages user-friendly | ☐ |
| Dark mode working | ☐ |

---

## 13. Troubleshooting Guide

### Issue: "Cannot read properties of null"
**Solution:** Ensure element IDs match in HTML and JavaScript

### Issue: CORS Error in Console
**Solution:** Check API_BASE URL and ensure backend is running

### Issue: Estimates not calculating
**Solution:** Verify SolarEstimator class is loaded before BookingFormHandler

### Issue: Theme not persisting
**Solution:** Check localStorage permissions in browser

### Issue: Admin records showing as empty
**Solution:** Verify ADMIN_SECRET matches in .env and admin page

---

## 14. File Size & Performance

| File | Size | Load Time |
|------|------|-----------|
| script.js | ~15 KB | <50ms |
| enhanced-booking.js | ~8 KB | <50ms |
| enhanced-admin.js | ~20 KB | <100ms |
| style.css | ~12 KB | <50ms |
| enhanced-styles.css | ~8 KB | <50ms |

---

## 15. Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| IE 11 | ❌ Not Supported |

---

**Document Version:** 1.0  
**Last Updated:** April 16, 2026  
**Maintained By:** Development Team
