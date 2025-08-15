import astrologerImg from "../assets/feature.jpg"; // Replace with your image
import { Link } from "react-router-dom";
import {
  FaVideo,
  FaStore,
  FaBolt,
  FaStar,
  FaInfinity,
  FaBalanceScale,
  FaShieldAlt,
  FaYinYang
} from "react-icons/fa";

const BookingPage = () => {
  return (
    <div className="bg-white min-h-screen py-14">
      <div className="container mx-auto px-6">
        
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* Left */}
          <div className="md:col-span-2">
            <p className="text-lg font-semibold text-green-700 uppercase mb-1 tracking-widest">
              Astrologer
            </p>
            <h1 className="text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Geetu Parmar
            </h1>
            <p className="text-2xl font-medium text-gray-700">
              Where Numbers, Intuition & Ancient Wisdom Align
            </p>
          </div>
          {/* Right */}
          <div className="flex justify-center md:justify-end">
            <img
              src={astrologerImg}
              alt="Astrologer"
              className="w-[420px] h-[420px] object-cover rounded-full border-4 border-green-600 shadow-xl"
            />
          </div>
        </div>

        {/* CONSULTATION OPTIONS */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {/* Each item */}
          <div className="flex items-start gap-4 p-6 bg-green-50 rounded-xl shadow-sm hover:shadow-md transition">
            <FaVideo className="text-green-600 text-4xl mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-2">Online Consultation – ₹3100</h3>
              <p className="text-lg text-gray-700">
                Janam Kundali via video call, full analysis + 1-year prediction, remedies included (45 mins)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-green-50 rounded-xl shadow-sm hover:shadow-md transition">
            <FaStore className="text-green-600 text-4xl mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-2">Offline Consultation – ₹5100</h3>
              <p className="text-lg text-gray-700">
                In-office face-to-face session including ancient Ramal Vidya for deep spiritual insights
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-green-50 rounded-xl shadow-sm hover:shadow-md transition">
            <FaBolt className="text-green-600 text-4xl mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-2">Ramal Vidya – ₹2100</h3>
              <p className="text-lg text-gray-700">
                Specific, accurate answers for marriage, career, legal & property queries, with ancient precision
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-green-50 rounded-xl shadow-sm hover:shadow-md transition">
            <FaStar className="text-green-600 text-4xl mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-2">Premium 5-Star Meet – ₹11,000</h3>
              <p className="text-lg text-gray-700">
                Luxury personal session, 200-page report + handwritten Kundali, in-depth life analysis
              </p>
            </div>
          </div>
        </div>

        {/* WHY HARMONY DIGITS */}
        <div className="mt-20">
          <h2 className="text-4xl font-extrabold text-center text-green-700 mb-10">
            Why Harmony Digits?
          </h2>
          <div className="grid gap-8 md:grid-cols-4 text-center max-w-6xl mx-auto">
            <div className="p-6 rounded-xl shadow hover:shadow-lg transition bg-white border border-green-100">
              <FaInfinity className="text-green-600 text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">No Time Limit</h4>
              <p className="text-gray-600">Unlimited questions without stress</p>
            </div>
            <div className="p-6 rounded-xl shadow hover:shadow-lg transition bg-white border border-green-100">
              <FaYinYang className="text-green-600 text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Unique Blend</h4>
              <p className="text-gray-600">Vedic + Ramal + Intuition together</p>
            </div>
            <div className="p-6 rounded-xl shadow hover:shadow-lg transition bg-white border border-green-100">
              <FaBalanceScale className="text-green-600 text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Remedies Provided</h4>
              <p className="text-gray-600">Effective, personalised solutions</p>
            </div>
            <div className="p-6 rounded-xl shadow hover:shadow-lg transition bg-white border border-green-100">
              <FaShieldAlt className="text-green-600 text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Full Privacy</h4>
              <p className="text-gray-600">100% confidentiality guaranteed</p>
            </div>
          </div>
        </div>

        {/* Link Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
          <Link
            to="/offline-booking"
            className="px-8 py-4 w-52 rounded-full bg-green-600 text-white font-semibold text-lg shadow-lg transform transition-all hover:scale-105 hover:bg-green-700 text-center"
          >
            Offline Booking
          </Link>
          <Link
            to="/videocall-booking"
            className="px-8 py-4 w-52 rounded-full bg-sky-600 text-white font-semibold text-lg shadow-lg transform transition-all hover:scale-105 hover:bg-sky-700 text-center"
          >
            Book Video Call
          </Link>
          <Link
            to="/chat-booking"
            className="px-8 py-4 w-52 rounded-full bg-yellow-300 text-gray-900 font-semibold text-lg shadow-lg transform transition-all hover:scale-105 hover:bg-yellow-500 text-center"
          >
            Book Chat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
