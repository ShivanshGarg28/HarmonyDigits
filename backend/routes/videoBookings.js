// routes/bookings.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const Booking = require('../models/Booking');
const User = require('../models/User');
const Astrologer = require('../models/astrologer');
const userAuth = require('../middleware/auth');

const GRACE_MIN = parseInt(process.env.ROOM_GRACE_MINUTES || '3', 10);

//create booking
router.post('/booking', async (req, res) => {
  try {
    const { astrologerId, startTimeISO, durationMinutes } = req.body;
    if (!astrologerId || !startTimeISO || !durationMinutes) {
      return res.status(400).json({ error: 'astrologerId, startTimeISO, durationMinutes required' });
    }

    // parse startTime (expect ISO string from frontend, in UTC ideally)
    const start = new Date(startTimeISO);
    if (Number.isNaN(start.getTime())) {
      return res.status(400).json({ error: 'Invalid startTimeISO' });
    }

    const duration = parseInt(durationMinutes, 10);
    if (!Number.isInteger(duration) || duration <= 0) {
      return res.status(400).json({ error: 'Invalid durationMinutes' });
    }

    // check astrologer exists
    const astro = await Astrologer.findById(astrologerId);
    if (!astro) return res.status(404).json({ error: 'Astrologer not found' });

    // compute endTime
    const end = new Date(start.getTime() + duration * 60 * 1000);

    // check overlapping bookings for astrologer
    const existingAstroBooking = await Booking.findOne({
      astrologer: astrologerId,
      $or: [
        { startTime: { $lt: end }, endTime: { $gt: start } } // overlap condition
      ]
    });

    if (existingAstroBooking) {
      return res.status(409).json({ error: 'Astrologer already has a booking in this time slot' });
    }

    // generate secure roomId
    const roomId = uuidv4();

    const booking = new Booking({
      user: req.user._id,
      astrologer: astro._id,
      startTime: start,
      endTime: end,
      durationMinutes: duration,
      roomId
    });

    await booking.save();

    res.status(201).json({
      message: 'Booking created',
      bookingId: booking._id,
    //roomId: booking.roomId, // optional
      startTime: booking.startTime,
      endTime: booking.endTime
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//to fetch bookings
router.get('/booking/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('astrologer', 'name email');

    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    // ensure only involved parties can fetch
    const isInvolved = booking.user._id.equals(req.user._id) || booking.astrologer._id.equals(req.user._id);
    if (!isInvolved) return res.status(403).json({ error: 'Not authorized' });

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// to get roomId
router.get('/:id/room', userAuth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name')
      .populate('astrologer', 'name');

    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    const isUser = booking.user._id.equals(req.user._id);
    const isAstro = booking.astrologer._id.equals(req.user._id);
    if (!isUser && !isAstro) return res.status(403).json({ error: 'Not authorized' });

    const now = new Date();
    const allowedStart = new Date(booking.startTime.getTime() - GRACE_MIN * 60 * 1000);
    const allowedEnd = new Date(booking.endTime.getTime() + GRACE_MIN * 60 * 1000);

    if (now < allowedStart) return res.status(403).json({ error: 'Meeting not started yet' });
    if (now > allowedEnd) return res.status(403).json({ error: 'Meeting window has ended' });

    const userName = isUser ? booking.user.name : booking.astrologer.name;

    res.json({ roomId: booking.roomId, userName });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
