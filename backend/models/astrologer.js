const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const astrologerSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["admin"], // Astrologers are always admins
      default: "admin",
    },
    firstName: { type: String, required: true, maxLength: 50 },
    lastName: { type: String, maxLength: 50 },
    age: { type: Number, required: true, max: 100 },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true
    },
    skills: {
      type: [String],
      enum: [
        "Vedic Astrology", "Western Astrology", "KP Astrology", "Nadi Astrology",
        "Lal Kitab", "Tarot Reading", "Numerology", "Palmistry",
        "Horoscope Matching", "Birth Chart Analysis", "Muhurat Calculation",
        "Prashna Kundli", "Gemstone Consultation", "Face Reading",
        "Reiki Healing", "Chakra Balancing", "Meditation & Spiritual Guidance",
        "Vastu Shastra Consultation", "Angel Card Reading"
      ],
      required: true
    },
    language: {
      type: [String],
      enum: [
        "Hindi", "English", "Sanskrit", "Tamil", "Telugu", "Kannada",
        "Gujarati", "Marathi", "Punjabi", "Bengali", "Malayalam",
        "Urdu", "Odia", "Assamese"
      ],
      required: true
    },
    experience: { type: Number, default: 0, max: 50 },
    rating: { type: Number, default: 0 },
    price: { type: Number, required: true },
    about: { type: String, required: true, maxLength: 200 },
    emailId: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      validate: [validator.isEmail, "Enter valid Email ID"]
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password not strong enough");
        }
      }
    }
  },
  { timestamps: true }
);

// Hash password before save
astrologerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
astrologerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export as "User" so middleware works without changes
module.exports = mongoose.model("astro", astrologerSchema);
