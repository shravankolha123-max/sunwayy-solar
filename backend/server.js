require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Booking = require("./models/Booking");
const ContactMessage = require("./models/ContactMessage");
const Consultation = require("./models/Consultation");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

/* No credentials — avoids CORS issues when opening HTML as file:// (Origin: null) or from Live Server */
app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
  })
);
app.use(express.json());

app.get("/health", (req, res) => {
  const db =
    mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.json({ ok: true, database: db });
});

/** Lists saved user data (local / trusted use only; add auth before any public deploy). */
app.get("/api/records", async (req, res) => {
  const secret = process.env.ADMIN_SECRET;
  if (secret) {
    const provided =
      req.query.secret === secret || req.get("X-Admin-Secret") === secret;
    if (!provided) {
      return res.status(401).json({ ok: false, error: "Unauthorized" });
    }
  }

  try {
    const [bookings, contactMessages, consultations] = await Promise.all([
      Booking.find().sort({ createdAt: -1 }).limit(500).lean(),
      ContactMessage.find().sort({ createdAt: -1 }).limit(500).lean(),
      Consultation.find().sort({ createdAt: -1 }).limit(500).lean(),
    ]);

    res.json({
      ok: true,
      database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      counts: {
        bookings: bookings.length,
        contactMessages: contactMessages.length,
        consultations: consultations.length,
      },
      bookings,
      contactMessages,
      consultations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

app.post("/book", async (req, res) => {
  try {
    const { name, mobile, city, bill, scheme, size } = req.body;

    if (!name || mobile == null || !city || bill == null || !scheme || !size) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: name, mobile, city, bill, scheme, size",
      });
    }

    const billNum = Number(bill);
    if (Number.isNaN(billNum) || billNum < 0) {
      return res.status(400).json({
        success: false,
        error: "bill must be a non-negative number",
      });
    }

    const doc = await Booking.create({
      name: String(name).trim(),
      mobile: String(mobile).trim(),
      city: String(city).trim(),
      bill: billNum,
      scheme: String(scheme).trim(),
      size: String(size).trim(),
    });

    res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

app.post("/contact", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !String(message).trim()) {
      return res.status(400).json({
        success: false,
        error: "message is required",
      });
    }

    const doc = await ContactMessage.create({
      message: String(message).trim().slice(0, 300),
    });

    res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

app.post("/consultation", async (req, res) => {
  try {
    const { name, mobile, city } = req.body;
    if (!name || mobile == null || !city) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: name, mobile, city",
      });
    }

    const doc = await Consultation.create({
      name: String(name).trim(),
      mobile: String(mobile).trim(),
      city: String(city).trim(),
    });

    res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* Serve frontend (admin, index, etc.) from http://localhost:5000/ — same origin as API */
app.use(express.static(path.join(__dirname, "..")));

async function start() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Set MONGODB_URI in backend/.env (see .env.example)");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`API + site: http://localhost:${PORT}`);
    console.log(`Admin:     http://localhost:${PORT}/admin.html`);
  });
}

start().catch((err) => {
  console.error("Failed to start:", err.message);
  process.exit(1);
});
