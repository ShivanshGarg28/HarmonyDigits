// earlier code

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Helper to safely parse JSON
// const safeJson = async (res) => {
//   try {
//     return await res.json();
//   } catch {
//     return null;
//   }
// };

// export const createBooking = createAsyncThunk(
//   "bookings/createBooking",
//   async ({ astrologerId, startTimeISO, durationMinutes }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("userToken");
//       const res = await fetch("/api/booking", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ astrologerId, startTimeISO, durationMinutes }),
//       });

//       const data = await safeJson(res);
//       if (!res.ok) throw new Error(data?.error || data?.message || "Booking failed");

//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// export const fetchUserBookings = createAsyncThunk(
//   "bookings/fetchUserBookings",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch("/api/booking", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await safeJson(res);
//       if (!res.ok) throw new Error(data?.error || "Unable to fetch bookings");
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// const bookingSlice = createSlice({
//   name: "bookings",
//   initialState: {
//     bookings: [],
//     loading: false,
//     error: null,
//     latestBooking: null,
//   },
//   reducers: {
//     resetLatestBooking(state) {
//       state.latestBooking = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createBooking.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createBooking.fulfilled, (state, action) => {
//         state.loading = false;
//         state.latestBooking = action.payload;
//       })
//       .addCase(createBooking.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchUserBookings.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserBookings.fulfilled, (state, action) => {
//         state.loading = false;
//         state.bookings = action.payload;
//       })
//       .addCase(fetchUserBookings.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetLatestBooking } = bookingSlice.actions;
// export default bookingSlice.reducer;


//chatgpt code
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper to safely parse JSON
const safeJson = async (res) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

// ---------------- Thunks ----------------

// Create a new booking
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async ({ astrologerId, startTimeISO, durationMinutes }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken"); // ✅ fixed
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ astrologerId, startTimeISO, durationMinutes }),
      });

      const data = await safeJson(res);
      if (!res.ok) throw new Error(data?.error || data?.message || "Booking failed");

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch all bookings for current user
export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUserBookings",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken"); // ✅ fixed
      const res = await fetch("/api/booking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await safeJson(res);
      if (!res.ok) throw new Error(data?.error || "Unable to fetch bookings");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ---------------- Slice ----------------

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
    latestBooking: null,
  },
  reducers: {
    resetLatestBooking(state) {
      state.latestBooking = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createBooking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.latestBooking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchUserBookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ---------------- Exports ----------------
export const { resetLatestBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
