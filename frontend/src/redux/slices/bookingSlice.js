// frontend/src/slices/bookingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunks
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async ({ astrologerId, startTimeISO, durationMinutes }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/bookings/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ astrologerId, startTimeISO, durationMinutes })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      return data; // bookingId, startTime, endTime
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUserBookings",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/bookings/booking", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to fetch bookings");
      return data; // Array of bookings
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  bookings: [],
  loading: false,
  error: null,
  latestBooking: null
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    resetLatestBooking(state) {
      state.latestBooking = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.latestBooking = action.payload;
        state.error = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.latestBooking = null;
      })
      // Fetch bookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        state.error = null;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetLatestBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
