const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const Booking = require('../models/Booking');
const User = require('../models/User');
const astro = require('../models/astrologer');
const { protect } = require('../middleware/authMiddleware');

const GRACE_MIN = parseInt(process.env.ROOM_GRACE_MINUTES || '3', 10);

// ✅ NEW — fetch all bookings for logged-in user
router.get('/booking', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({
      $or: [{ user: req.user._id }, { astrologer: req.user._id }],
    })
      .populate('astrologer', 'firstName lastName')
      .populate('user', 'name email');

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create booking
router.post('/booking', protect, async (req, res) => {
  try {
    const { astrologerId, startTimeISO, durationMinutes } = req.body;
    if (!astrologerId || !startTimeISO || !durationMinutes) {
      return res
        .status(400)
        .json({ error: 'astrologerId, startTimeISO, durationMinutes required' });
    }

    const start = new Date(startTimeISO);
    if (Number.isNaN(start.getTime())) {
      return res.status(400).json({ error: 'Invalid startTimeISO' });
    }

    const duration = parseInt(durationMinutes, 10);
    if (!Number.isInteger(duration) || duration <= 0) {
      return res.status(400).json({ error: 'Invalid durationMinutes' });
    }

    const astroUser = await astro.findById(astrologerId);
    if (!astroUser) return res.status(404).json({ error: 'Astrologer not found' });

    const end = new Date(start.getTime() + duration * 60 * 1000);

    const existingAstroBooking = await Booking.findOne({
      astrologer: astrologerId,
      $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
    });

    if (existingAstroBooking) {
      return res
        .status(409)
        .json({ error: 'Astrologer already has a booking in this time slot' });
    }

    const roomId = uuidv4();

    const booking = new Booking({
      user: req.user._id,
      astrologer: astroUser._id,
      startTime: start,
      endTime: end,
      durationMinutes: duration,
      roomId,
    });

    await booking.save();

    res.status(201).json({
      message: 'Booking created',
      bookingId: booking._id,
      startTime: booking.startTime,
      endTime: booking.endTime,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get specific booking
router.get('/booking/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('astrologer', 'firstName emailId');

    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    const isInvolved =
      booking.user._id.equals(req.user._id) ||
      booking.astrologer._id.equals(req.user._id);
    if (!isInvolved) return res.status(403).json({ error: 'Not authorized' });

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get room info
router.get('/:id/room', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name')
      .populate('astrologer', 'firstName lastName');

    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    const isUser = booking.user._id.toString() === req.user._id.toString();
    const isAstro =
      booking.astrologer._id.toString() === req.user._id.toString();

    if (!isUser && !isAstro)
      return res.status(403).json({ error: 'Not authorized' });

    const now = new Date();
    const allowedStart = new Date(
      booking.startTime.getTime() - GRACE_MIN * 60 * 1000
    );
    const allowedEnd = new Date(
      booking.endTime.getTime() + GRACE_MIN * 60 * 1000
    );

    if (now < allowedStart)
      return res.status(403).json({ error: 'Meeting not started yet' });
    if (now > allowedEnd)
      return res.status(403).json({ error: 'Meeting window has ended' });

    const userName = isUser
      ? booking.user.name
      : `${booking.astrologer.firstName} ${
          booking.astrologer.lastName || ''
        }`;

    res.json({ roomId: booking.roomId, userName });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
