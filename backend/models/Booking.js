const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    bill: { type: Number, required: true, min: 0 },
    scheme: { type: String, required: true, trim: true },
    size: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
