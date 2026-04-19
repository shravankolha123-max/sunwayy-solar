/**
 * ENHANCED BOOKING SYSTEM
 * Handles solar booking form, estimates, and invoice generation
 * Supports: Form validation, API integration, PDF generation, notifications
 */

const API_BASE = 
  typeof location !== "undefined" && 
  (location.hostname === "127.0.0.1" || location.hostname === "localhost") && 
  location.port === "5500"
    ? "http://localhost:5000"
    : "";

// ==================
// ESTIMATE CALCULATOR
// ==================

class SolarEstimator {
  constructor() {
    this.rates = {
      costPerKW: 120000, // ₹120,000 per kW
      subsidyPercentage: {
        "PM Surya Yojana": 0.40, // 40% subsidy
        "PM KUSUM Scheme": 0.50, // 50% subsidy
        "Grid Connected Rooftop": 0.30 // 30% subsidy
      },
      emiRate: 7.5, // 7.5% EMI
      emiMonths: 60 // 60 months (5 years)
    };
  }

  // Calculate system size based on monthly bill
  calculateSystemSize(monthlyBill) {
    // Average: 5 units per ₹100 of bill
    const estimatedMonthlyUnits = monthlyBill / 20; // Rough conversion
    const systemSizeKW = Math.ceil(estimatedMonthlyUnits / 4.5); // 4.5 units per kW
    return Math.max(1, Math.min(systemSizeKW, 10)); // Cap between 1-10kW
  }

  // Calculate total cost
  calculateCost(systemSizeKW) {
    return systemSizeKW * this.rates.costPerKW;
  }

  // Calculate subsidy amount
  calculateSubsidy(totalCost, scheme) {
    const subsidyPercent = this.rates.subsidyPercentage[scheme] || 0.30;
    return Math.round(totalCost * subsidyPercent);
  }

  // Calculate EMI
  calculateEMI(principal, monthlyRate, months) {
    const rate = monthlyRate / 100;
    if (rate === 0) return Math.round(principal / months);
    return Math.round(
      (principal * rate * Math.pow(1 + rate, months)) /
      (Math.pow(1 + rate, months) - 1)
    );
  }

  // Get complete estimate
  getEstimate(monthlyBill, scheme, systemSizeKW = null) {
    const size = systemSizeKW || this.calculateSystemSize(monthlyBill);
    const totalCost = this.calculateCost(size);
    const subsidy = this.calculateSubsidy(totalCost, scheme);
    const netCost = totalCost - subsidy;
    const monthlyRate = this.rates.emiRate / 12;
    const emi = this.calculateEMI(netCost, this.rates.emiRate, this.rates.emiMonths);

    return {
      systemSizeKW: size,
      totalCost,
      subsidy,
      netCost,
      monthlyEMI: emi,
      emiMonths: this.rates.emiMonths,
      yearlySaving: monthlyBill * 0.75 * 12 // Assume 75% bill reduction
    };
  }
}

// ==================
// INVOICE GENERATOR
// ==================

class InvoiceGenerator {
  static generatePDF(bookingData, estimate) {
    const content = `
      ╔════════════════════════════════════════════════════════════╗
      ║            SUNWAYY SOLAR ENERGY PRIVATE LIMITED             ║
      ║                  BOOKING INVOICE                            ║
      ╚════════════════════════════════════════════════════════════╝
      
      Invoice Date: ${new Date().toLocaleDateString("en-IN")}
      Invoice ID: INV-${Date.now()}
      
      ┌─────────────────────────────────────────────────────────┐
      │ CUSTOMER DETAILS                                        │
      ├─────────────────────────────────────────────────────────┤
      │ Name:     ${bookingData.name}
      │ Mobile:   ${bookingData.mobile}
      │ City:     ${bookingData.city}
      │ Bill (₹): ${bookingData.bill}
      └─────────────────────────────────────────────────────────┘
      
      ┌─────────────────────────────────────────────────────────┐
      │ SYSTEM DETAILS & ESTIMATE                               │
      ├─────────────────────────────────────────────────────────┤
      │ Solar Scheme:        ${bookingData.scheme}
      │ Recommended Size:    ${estimate.systemSizeKW} kW
      │ Total System Cost:   ₹${estimate.totalCost.toLocaleString()}
      │ Government Subsidy:  ₹${estimate.subsidy.toLocaleString()} (40%)
      │ Net Amount to Pay:   ₹${estimate.netCost.toLocaleString()}
      │ Monthly EMI (5yr):   ₹${estimate.monthlyEMI.toLocaleString()}
      └─────────────────────────────────────────────────────────┘
      
      ┌─────────────────────────────────────────────────────────┐
      │ FINANCIAL BENEFITS                                      │
      ├─────────────────────────────────────────────────────────┤
      │ Current Monthly Bill:  ₹${bookingData.bill}
      │ Annual Cost (Current): ₹${(bookingData.bill * 12).toLocaleString()}
      │ Estimated Yearly Savings: ₹${estimate.yearlySaving.toLocaleString()}
      │ 5-Year Total Savings:  ₹${(estimate.yearlySaving * 5).toLocaleString()}
      │ Payback Period:        ~${Math.round(estimate.netCost / (estimate.yearlySaving / 12))} months
      └─────────────────────────────────────────────────────────┘
      
      TERMS & CONDITIONS:
      ✓ 25-year panel warranty
      ✓ 5-year installation warranty
      ✓ Free maintenance for first 5 years
      ✓ 24/7 customer support
      
      This is an automated estimate. Please contact us for final quote.
      
      Generated on: ${new Date().toLocaleString("en-IN")}
      ════════════════════════════════════════════════════════════
    `;

    return content;
  }

  static downloadAsText(bookingData, estimate) {
    const content = this.generatePDF(bookingData, estimate);
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    element.setAttribute("download", `Invoice_${bookingData.name}_${Date.now()}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}

// ==================
// FORM HANDLER
// ==================

class BookingFormHandler {
  constructor() {
    this.estimator = new SolarEstimator();
    this.form = document.getElementById("bookingForm");
    this.billInput = document.getElementById("bill");
    this.schemeSelect = document.getElementById("scheme");
    this.sizeSelect = document.getElementById("size");
    this.isSubmitting = false;
    this.init();
  }

  init() {
    // Real-time estimate calculation
    this.billInput?.addEventListener("input", () => this.updateEstimate());
    this.schemeSelect?.addEventListener("change", () => this.updateEstimate());
    this.sizeSelect?.addEventListener("change", () => this.updateEstimate());

    // Form submission
    this.form?.addEventListener("submit", (e) => this.handleSubmit(e));

    // Initial estimate
    this.updateEstimate();
  }

  updateEstimate() {
    const bill = parseFloat(this.billInput?.value) || 0;
    const scheme = this.schemeSelect?.value || "PM Surya Yojana";
    const size = this.sizeSelect?.value || null;

    if (bill <= 0) {
      this.clearEstimate();
      return;
    }

    const estimate = this.estimator.getEstimate(bill, scheme, size ? parseFloat(size) : null);
    this.displayEstimate(estimate);
  }

  displayEstimate(estimate) {
    const estimateDiv = document.getElementById("estimateDisplay") || this.createEstimateDiv();
    estimateDiv.innerHTML = `
      <div class="estimate-card">
        <h3>✨ Instant Solar Estimate</h3>
        <div class="estimate-grid">
          <div class="estimate-item">
            <span class="label">Recommended System Size</span>
            <span class="value">${estimate.systemSizeKW} kW</span>
          </div>
          <div class="estimate-item">
            <span class="label">Total Investment</span>
            <span class="value">₹${estimate.totalCost.toLocaleString()}</span>
          </div>
          <div class="estimate-item">
            <span class="label">After Subsidy</span>
            <span class="value">₹${estimate.netCost.toLocaleString()}</span>
          </div>
          <div class="estimate-item">
            <span class="label">Monthly EMI (5 Years)</span>
            <span class="value">₹${estimate.monthlyEMI.toLocaleString()}</span>
          </div>
          <div class="estimate-item">
            <span class="label">Annual Bill Savings</span>
            <span class="value">₹${estimate.yearlySaving.toLocaleString()}</span>
          </div>
          <div class="estimate-item">
            <span class="label">Payback Period</span>
            <span class="value">~${Math.round(estimate.netCost / (estimate.yearlySaving / 12))} months</span>
          </div>
        </div>
      </div>
    `;
  }

  clearEstimate() {
    const estimateDiv = document.getElementById("estimateDisplay");
    if (estimateDiv) estimateDiv.innerHTML = "";
  }

  createEstimateDiv() {
    const div = document.createElement("div");
    div.id = "estimateDisplay";
    div.className = "estimate-display";
    this.form.parentNode.insertBefore(div, this.form.nextSibling);
    return div;
  }

  validateForm() {
    const fields = {
      name: document.getElementById("name")?.value.trim(),
      mobile: document.getElementById("mobile")?.value.trim(),
      city: document.getElementById("city")?.value.trim(),
      bill: parseFloat(document.getElementById("bill")?.value),
      scheme: document.getElementById("scheme")?.value,
      size: document.getElementById("size")?.value
    };

    // Validation rules
    if (!fields.name || fields.name.length < 3) {
      this.showError("Please enter a valid name (minimum 3 characters)");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(fields.mobile)) {
      this.showError("Please enter a valid 10-digit mobile number");
      return false;
    }

    if (!fields.city || fields.city.length < 2) {
      this.showError("Please enter a valid city name");
      return false;
    }

    if (!fields.bill || fields.bill <= 0) {
      this.showError("Please enter a valid monthly electricity bill");
      return false;
    }

    if (!fields.scheme || !fields.size) {
      this.showError("Please select both scheme and system size");
      return false;
    }

    return fields;
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (this.isSubmitting) return;

    const fields = this.validateForm();
    if (!fields) return;

    this.isSubmitting = true;
    const button = this.form.querySelector("button[type='submit']");
    const originalText = button.textContent;
    button.textContent = "Processing...";
    button.disabled = true;

    try {
      // Calculate estimate
      const estimate = this.estimator.getEstimate(
        fields.bill,
        fields.scheme,
        parseFloat(fields.size)
      );

      // Send to backend
      const response = await fetch(`${API_BASE}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Booking failed");
      }

      const result = await response.json();

      // Success actions
      this.showSuccess("✅ Booking Confirmed! Generating your invoice...");

      // Generate and download invoice
      setTimeout(() => {
        InvoiceGenerator.downloadAsText(fields, estimate);
        setTimeout(() => this.resetForm(), 1000);
      }, 1500);

    } catch (error) {
      console.error("Booking error:", error);
      this.showError(`Error: ${error.message}`);
    } finally {
      this.isSubmitting = false;
      button.textContent = originalText;
      button.disabled = false;
    }
  }

  showSuccess(message) {
    const notification = document.createElement("div");
    notification.className = "notification success";
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  showError(message) {
    const notification = document.createElement("div");
    notification.className = "notification error";
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  resetForm() {
    this.form.reset();
    this.clearEstimate();
  }
}

// ==================
// INITIALIZATION
// ==================

document.addEventListener("DOMContentLoaded", () => {
  new BookingFormHandler();
});

// Export for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SolarEstimator, InvoiceGenerator, BookingFormHandler };
}
