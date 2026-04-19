/**
 * ENHANCED ADMIN DASHBOARD
 * Manage all booking records, consultations, and contact messages
 * Features: View, export, analytics, filtering, search
 */

const API_BASE =
  typeof location !== "undefined" &&
  (location.hostname === "127.0.0.1" || location.hostname === "localhost") &&
  location.port === "5500"
    ? "http://localhost:5000"
    : "";

// ==================
// ADMIN DASHBOARD
// ==================

class AdminDashboard {
  constructor() {
    this.adminSecret = localStorage.getItem("adminSecret") || "";
    this.data = {
      bookings: [],
      consultations: [],
      contactMessages: []
    };
    this.currentTab = "bookings";
    this.filters = {
      searchTerm: "",
      dateFrom: null,
      dateTo: null
    };
    this.init();
  }

  init() {
    this.setupUI();
    this.attachEventListeners();
    this.authenticate();
  }

  setupUI() {
    document.body.innerHTML = `
      <div class="admin-container">
        <header class="admin-header">
          <h1>Sunwayy Solar Admin Dashboard</h1>
          <div class="header-actions">
            <input type="password" id="adminSecret" placeholder="Enter Admin Secret" />
            <button id="loginBtn" class="btn btn-primary">Login</button>
            <button id="logoutBtn" class="btn btn-secondary" style="display:none;">Logout</button>
          </div>
        </header>

        <div class="admin-content" style="display:none;">
          <nav class="admin-nav">
            <button class="nav-btn active" data-tab="bookings">📋 Bookings</button>
            <button class="nav-btn" data-tab="consultations">💬 Consultations</button>
            <button class="nav-btn" data-tab="messages">✉️ Contact Messages</button>
            <button class="nav-btn" data-tab="analytics">📊 Analytics</button>
          </nav>

          <div class="admin-toolbar">
            <input type="text" id="searchInput" placeholder="Search..." class="search-box" />
            <input type="date" id="dateFrom" placeholder="From" class="date-input" />
            <input type="date" id="dateTo" placeholder="To" class="date-input" />
            <button id="exportBtn" class="btn btn-success">📥 Export CSV</button>
            <button id="refreshBtn" class="btn btn-info">🔄 Refresh</button>
          </div>

          <div class="admin-data">
            <div id="bookingsTab" class="tab-content active"></div>
            <div id="consultationsTab" class="tab-content"></div>
            <div id="messagesTab" class="tab-content"></div>
            <div id="analyticsTab" class="tab-content"></div>
          </div>
        </div>

        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f5f5;
          }

          .admin-container {
            max-width: 1400px;
            margin: 0 auto;
          }

          .admin-header {
            background: #0b4fa3;
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .header-actions {
            display: flex;
            gap: 10px;
          }

          .header-actions input {
            padding: 8px 12px;
            border: none;
            border-radius: 4px;
            font-size: 14px;
          }

          .btn {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .btn-primary {
            background: #ff7a00;
            color: white;
          }

          .btn-primary:hover {
            background: #e67e00;
          }

          .btn-secondary {
            background: #e74c3c;
            color: white;
          }

          .btn-success {
            background: #27ae60;
            color: white;
          }

          .btn-info {
            background: #3498db;
            color: white;
          }

          .admin-nav {
            display: flex;
            gap: 0;
            background: white;
            border-bottom: 2px solid #ddd;
            padding: 0 20px;
          }

          .nav-btn {
            padding: 15px 20px;
            border: none;
            background: none;
            cursor: pointer;
            font-weight: 600;
            color: #666;
            border-bottom: 3px solid transparent;
            transition: 0.3s;
          }

          .nav-btn.active {
            color: #0b4fa3;
            border-bottom-color: #0b4fa3;
          }

          .admin-toolbar {
            background: white;
            padding: 15px 20px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            border-bottom: 1px solid #ddd;
          }

          .search-box {
            flex: 1;
            min-width: 200px;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
          }

          .date-input {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
          }

          .tab-content {
            background: white;
            margin: 20px;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: none;
          }

          .tab-content.active {
            display: block;
          }

          .table-container {
            overflow-x: auto;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }

          th {
            background: #f0f0f0;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            border-bottom: 2px solid #ddd;
          }

          td {
            padding: 12px;
            border-bottom: 1px solid #eee;
          }

          tr:hover {
            background: #f9f9f9;
          }

          .record-card {
            background: #f9f9f9;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 6px;
            border-left: 4px solid #0b4fa3;
          }

          .record-title {
            font-weight: 600;
            color: #0b4fa3;
            margin-bottom: 8px;
          }

          .record-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            font-size: 14px;
          }

          .detail-item {
            display: flex;
            justify-content: space-between;
          }

          .detail-label {
            font-weight: 600;
            color: #555;
          }

          .detail-value {
            color: #333;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 25px;
          }

          .stat-box {
            background: linear-gradient(135deg, #0b4fa3, #0d6edc);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
          }

          .stat-number {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .stat-label {
            font-size: 14px;
            opacity: 0.9;
          }

          .alert {
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 15px;
          }

          .alert-info {
            background: #e3f2fd;
            color: #0b4fa3;
            border-left: 4px solid #0b4fa3;
          }

          .alert-error {
            background: #f8d7da;
            color: #721c24;
            border-left: 4px solid #f5c6cb;
          }

          .alert-success {
            background: #d4edda;
            color: #155724;
            border-left: 4px solid #c3e6cb;
          }

          .admin-content {
            min-height: calc(100vh - 70px);
          }

          @media (max-width: 768px) {
            .admin-header {
              flex-direction: column;
              gap: 10px;
            }

            .header-actions {
              width: 100%;
              flex-direction: column;
            }

            .admin-nav {
              overflow-x: auto;
              padding: 0 10px;
            }

            .nav-btn {
              padding: 12px 15px;
              font-size: 13px;
            }

            .record-details {
              grid-template-columns: 1fr;
            }
          }
        </style>
      </div>
    `;
  }

  attachEventListeners() {
    document.getElementById("loginBtn").addEventListener("click", () => this.authenticate());
    document.getElementById("logoutBtn").addEventListener("click", () => this.logout());
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.addEventListener("click", (e) => this.switchTab(e.target.dataset.tab));
    });
    document.getElementById("searchInput").addEventListener("input", () => this.applyFilters());
    document.getElementById("dateFrom").addEventListener("change", () => this.applyFilters());
    document.getElementById("dateTo").addEventListener("change", () => this.applyFilters());
    document.getElementById("exportBtn").addEventListener("click", () => this.exportCSV());
    document.getElementById("refreshBtn").addEventListener("click", () => this.loadData());
  }

  async authenticate() {
    const secretInput = document.getElementById("adminSecret");
    const secret = secretInput.value.trim();

    if (!secret) {
      this.showAlert("Please enter the admin secret", "error");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/records?secret=${encodeURIComponent(secret)}`);

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      localStorage.setItem("adminSecret", secret);
      this.adminSecret = secret;

      // Show admin content
      document.querySelector(".admin-content").style.display = "block";
      secretInput.style.display = "none";
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("logoutBtn").style.display = "inline-block";

      this.showAlert("✅ Authenticated successfully!", "success");
      await this.loadData();

    } catch (error) {
      this.showAlert(`Authentication Failed: ${error.message}`, "error");
    }
  }

  async loadData() {
    try {
      const response = await fetch(
        `${API_BASE}/api/records?secret=${encodeURIComponent(this.adminSecret)}`
      );

      if (!response.ok) {
        throw new Error("Failed to load data");
      }

      const result = await response.json();
      this.data = {
        bookings: result.bookings || [],
        consultations: result.consultations || [],
        contactMessages: result.contactMessages || []
      };

      this.renderTabs();
      this.showAlert("✅ Data refreshed", "success");

    } catch (error) {
      this.showAlert(`Load Error: ${error.message}`, "error");
    }
  }

  switchTab(tab) {
    this.currentTab = tab;
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    event.target.classList.add("active");

    document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));

    const tabMap = {
      bookings: "bookingsTab",
      consultations: "consultationsTab",
      messages: "messagesTab",
      analytics: "analyticsTab"
    };

    document.getElementById(tabMap[tab]).classList.add("active");
  }

  renderTabs() {
    this.renderBookings();
    this.renderConsultations();
    this.renderMessages();
    this.renderAnalytics();
  }

  renderBookings() {
    const container = document.getElementById("bookingsTab");
    const bookings = this.applyFilters(this.data.bookings);

    container.innerHTML = `
      <h2>All Bookings (${bookings.length})</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>City</th>
              <th>Bill (₹)</th>
              <th>Scheme</th>
              <th>Size</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${bookings.map(b => `
              <tr>
                <td>${b.name}</td>
                <td>${b.mobile}</td>
                <td>${b.city}</td>
                <td>${b.bill}</td>
                <td>${b.scheme}</td>
                <td>${b.size}</td>
                <td>${new Date(b.createdAt).toLocaleDateString()}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  renderConsultations() {
    const container = document.getElementById("consultationsTab");
    const consultations = this.applyFilters(this.data.consultations);

    container.innerHTML = `
      <h2>All Consultations (${consultations.length})</h2>
      ${consultations.map(c => `
        <div class="record-card">
          <div class="record-title">${c.name}</div>
          <div class="record-details">
            <div class="detail-item">
              <span class="detail-label">Mobile:</span>
              <span class="detail-value">${c.mobile}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${new Date(c.createdAt).toLocaleDateString()}</span>
            </div>
            <div class="detail-item" style="grid-column: 1/-1;">
              <span class="detail-label">Query:</span>
              <span class="detail-value">${c.query}</span>
            </div>
          </div>
        </div>
      `).join("")}
    `;
  }

  renderMessages() {
    const container = document.getElementById("messagesTab");
    const messages = this.applyFilters(this.data.contactMessages);

    container.innerHTML = `
      <h2>All Contact Messages (${messages.length})</h2>
      ${messages.map(m => `
        <div class="record-card">
          <div class="record-title">${m.name} (${m.email})</div>
          <div class="record-details">
            <div class="detail-item" style="grid-column: 1/-1;">
              <span class="detail-label">Message:</span>
              <span class="detail-value">${m.message}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${new Date(m.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      `).join("")}
    `;
  }

  renderAnalytics() {
    const container = document.getElementById("analyticsTab");
    const totalBookings = this.data.bookings.length;
    const totalConsultations = this.data.consultations.length;
    const totalMessages = this.data.contactMessages.length;

    const avgBill = this.data.bookings.length > 0
      ? Math.round(this.data.bookings.reduce((sum, b) => sum + b.bill, 0) / this.data.bookings.length)
      : 0;

    const cities = [...new Set(this.data.bookings.map(b => b.city))];
    const schemes = [...new Set(this.data.bookings.map(b => b.scheme))];

    container.innerHTML = `
      <h2>📊 Analytics Dashboard</h2>

      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-number">${totalBookings}</div>
          <div class="stat-label">Total Bookings</div>
        </div>
        <div class="stat-box" style="background: linear-gradient(135deg, #27ae60, #2ecc71);">
          <div class="stat-number">${totalConsultations}</div>
          <div class="stat-label">Consultations</div>
        </div>
        <div class="stat-box" style="background: linear-gradient(135deg, #f39c12, #e74c3c);">
          <div class="stat-number">${totalMessages}</div>
          <div class="stat-label">Contact Messages</div>
        </div>
        <div class="stat-box" style="background: linear-gradient(135deg, #9b59b6, #8e44ad);">
          <div class="stat-number">₹${avgBill.toLocaleString()}</div>
          <div class="stat-label">Avg. Monthly Bill</div>
        </div>
      </div>

      <h3>Cities with Most Bookings:</h3>
      <ul>
        ${cities.map(city => {
          const count = this.data.bookings.filter(b => b.city === city).length;
          return `<li>${city}: ${count} bookings</li>`;
        }).join("")}
      </ul>

      <h3>Scheme Distribution:</h3>
      <ul>
        ${schemes.map(scheme => {
          const count = this.data.bookings.filter(b => b.scheme === scheme).length;
          return `<li>${scheme}: ${count} bookings</li>`;
        }).join("")}
      </ul>
    `;
  }

  applyFilters(data = null) {
    const search = document.getElementById("searchInput")?.value.toLowerCase() || "";
    const dataToFilter = data || this.data[this.currentTab === "bookings" ? "bookings" : this.currentTab];

    return dataToFilter.filter(item => {
      const searchMatch = JSON.stringify(item).toLowerCase().includes(search);
      return searchMatch;
    });
  }

  exportCSV() {
    let data = [];
    let filename = "bookings.csv";

    if (this.currentTab === "bookings") {
      data = this.data.bookings;
      filename = `bookings_${Date.now()}.csv`;
    } else if (this.currentTab === "consultations") {
      data = this.data.consultations;
      filename = `consultations_${Date.now()}.csv`;
    } else {
      data = this.data.contactMessages;
      filename = `messages_${Date.now()}.csv`;
    }

    const csv = this.convertToCSV(data);
    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    link.download = filename;
    link.click();

    this.showAlert(`✅ Exported ${data.length} records to ${filename}`, "success");
  }

  convertToCSV(data) {
    if (!data.length) return "";

    const headers = Object.keys(data[0]);
    let csv = headers.join(",") + "\n";

    data.forEach(row => {
      csv += headers.map(header => {
        let value = row[header] || "";
        if (typeof value === "string" && value.includes(",")) {
          value = `"${value}"`;
        }
        return value;
      }).join(",") + "\n";
    });

    return csv;
  }

  logout() {
    localStorage.removeItem("adminSecret");
    location.reload();
  }

  showAlert(message, type = "info") {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    document.querySelector(".admin-content")?.insertBefore(alert, document.querySelector(".admin-nav")?.nextSibling);
    setTimeout(() => alert.remove(), 4000);
  }
}

// ==================
// INITIALIZATION
// ==================

document.addEventListener("DOMContentLoaded", () => {
  new AdminDashboard();
});
