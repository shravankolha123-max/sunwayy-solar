const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true, trim: true, maxlength: 300 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
