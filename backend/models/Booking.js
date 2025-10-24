// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    astrologer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'astro', 
        required: true 
    },
    startTime: { 
        type: Date, 
        required: true 
    },
    endTime: { 
        type: Date, 
        required: true 
    },
    durationMinutes: { 
        type: Number, 
        required: true 
    },
    roomId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    status: { 
        type: String, 
        enum: ['scheduled', 'completed', 'cancelled'], 
        default: 'scheduled' 
    },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
